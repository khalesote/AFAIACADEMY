# Configuración Cecabank (OK) y diagnóstico

## Estado actual (FUNCIONA)
Se logró que el TPV muestre el formulario de tarjeta en la app.

### Endpoint usado
- `POST /api/cecabank/redirect-clean`

### Firma correcta (según manual/panel)
- **Algoritmo:** SHA-256
- **Salida:** HEX en **minúsculas**
- **Cadena base (sin clave):**
```
MerchantID +
AcquirerBIN +
TerminalID +
Num_operacion +
Importe +
TipoMoneda +
Exponente +
Cifrado (SHA2) +
URL_OK +
URL_NOK
```
- **Cadena a firmar:**
```
Clave_encriptacion + cadena_base
```
- **Si en el panel solo hay URL_OK:**  
se usa **URL_OK también como URL_NOK** para la firma y el formulario.

### Campos usados en el formulario
Obligatorios:
- MerchantID
- AcquirerBIN
- TerminalID
- Num_operacion
- Importe
- TipoMoneda
- Exponente
- Cifrado = `SHA2`
- URL_OK
- URL_NOK (si solo hay URL_OK, se repite)
- Pago_soportado = `SSL`

Opcionales:
- Idioma
- Descripcion
- Email
- Nombre

### URL de producción del TPV
- `https://pgw.ceca.es/tpvweb/tpv/compra.action`

### WebView (frontend)
Se añadió `baseUrl` para que carguen recursos del TPV:
- Producción: `https://pgw.ceca.es`

## Variables en Render (backend)
```
CECABANK_MERCHANT_ID=...
CECABANK_ACQUIRER_BIN=...
CECABANK_TERMINAL_ID=...
CECABANK_CLAVE=...
CECABANK_ENTORNO=PRODUCCION
CECABANK_ONLY_URL_OK=true
```

## Variables en Frontend (.env)
```
EXPO_PUBLIC_CECABANK_API_URL=https://academia-backend-s9np.onrender.com
EXPO_PUBLIC_CECABANK_SUCCESS_URL=https://academiadeinmigrantes.es/api/cecabank/ok
EXPO_PUBLIC_CECABANK_ERROR_URL=https://academiadeinmigrantes.es/api/cecabank/ko
```
> Importante: URL_OK/URL_NOK deben coincidir **exactamente** con las del panel (sin `www` si así están registradas).

## Qué fallaba antes
1) **Firma con campos incorrectos**  
   Se estaban usando combinaciones erróneas: HMAC, Base64, fechas/horas, etc.

2) **URL_OK no coincidía exactamente**  
   `www` vs sin `www` → firma inválida.

3) **URL_NOK/URL_KO mal manejadas**  
   Si el panel solo tiene URL_OK, usar URL_NOK distinto rompe la firma.

4) **WebView sin baseUrl**  
   No cargaban CSS/JS del TPV → pantalla blanca.

## Cómo validar rápido
En logs del backend debe aparecer:
- `🧼 Cecabank CLEAN body recibido: ...`
- `🔐 Cecabank CLEAN cadena firma (sin clave): ...`
- y el formulario debe abrir la pantalla de tarjeta.

