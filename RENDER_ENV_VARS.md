# Variables de Entorno para Render

## Variables Requeridas

Configura estas variables de entorno en el panel de Render (Settings → Environment):

### 1. Variables de Stripe (OBLIGATORIAS)

```
STRIPE_SECRET_KEY=sk_live_... o sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 2. Variables de Email SMTP2GO (OPCIONALES pero recomendadas)

```
SMTP2GO_USERNAME=tu_usuario_smtp2go
SMTP2GO_PASSWORD=tu_contraseña_smtp2go
```

### 3. Variables de Odoo (OPCIONALES - para sincronización de usuarios)

```
ODOO_URL=https://tu-instancia.odoo.com
ODOO_DATABASE=nombre_base_datos
ODOO_USERNAME=usuario_odoo
ODOO_PASSWORD=contraseña_odoo
```

**O si Odoo usa API Key:**
```
ODOO_URL=https://tu-instancia.odoo.com
ODOO_DATABASE=nombre_base_datos
ODOO_API_KEY=tu_api_key
```

**Nota**: Estas variables se configuran cuando Odoo te proporcione las credenciales de acceso.

### 4. Variables Generales (OPCIONALES)

```
NODE_ENV=production
PORT=10000
FORMACION_PRICE_EUR=10
```

## Cómo Configurar en Render

1. Ve a tu servicio en Render: https://dashboard.render.com
2. Selecciona tu servicio `academia-backend`
3. Ve a **Environment** en el menú lateral
4. Haz clic en **Add Environment Variable**
5. Agrega cada variable una por una:
   - **Key**: El nombre de la variable (ej: `STRIPE_SECRET_KEY`)
   - **Value**: El valor de la variable (ej: `sk_live_...`)
6. Haz clic en **Save Changes**
7. Render reiniciará automáticamente el servicio

## Verificación

Después de configurar las variables, verifica que el backend las esté leyendo correctamente:

1. Ve a los **Logs** de tu servicio en Render
2. Busca mensajes como:
   - `✅ Credenciales de SMTP2GO configuradas`

## Importante

- **NO** compartas estas variables públicamente
- **NO** las subas a Git
- Las variables con `EXPO_PUBLIC_` son para el frontend (React Native/Expo)
- Las variables sin `EXPO_PUBLIC_` son solo para el backend (Render)

