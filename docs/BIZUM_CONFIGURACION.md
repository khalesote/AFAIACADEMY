# Configuración de Bizum en la Aplicación

## 📋 Introducción

Bizum es un sistema de pagos móvil instantáneo muy popular en España. Esta guía explica cómo configurar Bizum en la aplicación Academia de Inmigrantes.

## ⚠️ Requisitos Previos

Para integrar Bizum en tu aplicación, necesitas:

1. **Contratar Bizum para empresas** con tu banco
2. **Obtener credenciales de API** de tu banco o pasarela de pago
3. **Configurar variables de entorno** en tu proyecto

## 🔧 Pasos de Configuración

### 1. Contratar el Servicio Bizum

Contacta con tu banco para contratar el servicio Bizum para empresas. Algunos bancos que ofrecen este servicio:

- Banco Santander
- BBVA
- CaixaBank
- Banco Sabadell
- ING
- Y otros bancos españoles

**Información que necesitarás:**
- Merchant ID (ID de comercio)
- API Key (Clave de API)
- Secret Key (Clave secreta)
- Entorno (Sandbox/Producción)

### 2. Configurar Variables de Entorno

Una vez que tengas las credenciales, configura las siguientes variables de entorno:

#### En el archivo `.env` o en tu plataforma de despliegue:

```env
# Configuración de Bizum
EXPO_PUBLIC_BIZUM_MERCHANT_ID=tu_merchant_id
EXPO_PUBLIC_BIZUM_API_KEY=tu_api_key
EXPO_PUBLIC_BIZUM_SECRET_KEY=tu_secret_key
EXPO_PUBLIC_BIZUM_ENVIRONMENT=sandbox  # o 'production'
EXPO_PUBLIC_BIZUM_API_URL=https://academia-backend-s9np.onrender.com
EXPO_PUBLIC_BIZUM_RETURN_URL=academiadeinmigrantes://bizum-redirect
```

### 3. Configurar el Backend

Necesitas crear endpoints en tu backend para procesar pagos Bizum. Los endpoints necesarios son:

#### `/api/bizum/create-payment` (POST)
Crea una solicitud de pago Bizum.

**Request:**
```json
{
  "amount": 18.15,
  "level": "A1",
  "description": "Matrícula A1",
  "customerEmail": "usuario@example.com",
  "customerPhone": "+34612345678",
  "returnUrl": "academiadeinmigrantes://bizum-redirect"
}
```

**Response (opción A - URL de redirección):**
```json
{
  "paymentId": "bizum_123456",
  "paymentUrl": "bizum://payment?token=abc123"
}
```

**Response (opción B - Código QR/Número):**
```json
{
  "paymentId": "bizum_123456",
  "phoneNumber": "+34612345678",
  "reference": "MAT-A1-123456",
  "qrCode": "data:image/png;base64,..."
}
```

#### `/api/bizum/verify-payment/:paymentId` (GET)
Verifica el estado de un pago.

**Response:**
```json
{
  "status": "succeeded",
  "paymentId": "bizum_123456",
  "amount": 18.15,
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 4. Implementar Webhooks (Opcional pero Recomendado)

Para recibir notificaciones automáticas cuando se complete un pago, configura un webhook:

#### `/api/bizum/webhook` (POST)
Recibe notificaciones de Bizum sobre el estado de los pagos.

**Request (ejemplo):**
```json
{
  "event": "payment.succeeded",
  "paymentId": "bizum_123456",
  "amount": 18.15,
  "timestamp": "2025-01-15T10:30:00Z"
}
```

## 🔌 Métodos de Integración

Bizum se puede integrar de varias formas:

### Opción 1: Integración Directa con API Bancaria
- Requiere contrato directo con el banco
- Mayor control sobre el proceso
- Más complejo de implementar

### Opción 2: A través de Pasarela de Pago
- Algunas pasarelas como Redsys (usada por Cecabank) pueden soportar Bizum
- Más fácil de implementar
- Requiere verificar si tu pasarela lo soporta

### Opción 3: A través de TPV Virtual Moderno
- Algunos TPVs virtuales modernos incluyen soporte para Bizum
- Consulta con tu proveedor de TPV

## 📱 Flujo de Pago con Bizum

1. **Usuario selecciona Bizum** como método de pago
2. **App crea solicitud de pago** en el backend
3. **Backend genera URL/QR/Número** para el pago
4. **Usuario completa el pago** en la app de Bizum
5. **Backend verifica el pago** (polling o webhook)
6. **App confirma el pago** y desbloquea el contenido

## 🧪 Testing

### Modo Sandbox
- Usa `EXPO_PUBLIC_BIZUM_ENVIRONMENT=sandbox`
- Permite probar sin realizar pagos reales
- Consulta la documentación de tu banco para obtener credenciales de prueba

### Modo Producción
- Usa `EXPO_PUBLIC_BIZUM_ENVIRONMENT=production`
- Solo después de probar completamente en sandbox
- Requiere credenciales de producción

## 📚 Recursos Adicionales

- [Sitio oficial de Bizum](https://www.bizum.es)
- [Documentación técnica de tu banco](contacta con tu banco)
- [Guía de integración de Bizum para empresas](https://www.bizum.es/empresas)

## ⚠️ Notas Importantes

1. **Bizum requiere la app instalada**: Los usuarios necesitan tener la app de Bizum instalada en su dispositivo
2. **Límites de pago**: Bizum tiene límites de pago (consulta con tu banco)
3. **Comisiones**: Verifica las comisiones con tu banco
4. **Disponibilidad**: Bizum solo está disponible en España
5. **Tiempo de confirmación**: Los pagos Bizum son instantáneos, pero la confirmación puede tardar unos segundos

## 🆘 Solución de Problemas

### Error: "Configuración de Bizum incompleta"
- Verifica que todas las variables de entorno estén configuradas
- Asegúrate de que las credenciales sean correctas

### Error: "No se puede abrir la URL de Bizum"
- Verifica que el usuario tenga la app de Bizum instalada
- Comprueba que la URL de redirección sea correcta

### Error: "Pago no confirmado"
- Verifica que el webhook esté configurado correctamente
- Implementa polling como respaldo si el webhook falla

## 📞 Soporte

Si tienes problemas con la configuración:
1. Contacta con el soporte técnico de tu banco
2. Revisa la documentación técnica proporcionada por tu banco
3. Verifica los logs del backend para más detalles





















