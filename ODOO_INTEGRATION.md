# Integración con Odoo

## Información que necesitas proporcionar a Odoo

Para que Odoo pueda configurar la integración con tu aplicación, necesitas proporcionarles la siguiente información:

### 1. URL del Backend
```
https://academia-backend-s9np.onrender.com
```

### 2. Endpoint de Sincronización
```
POST https://academia-backend-s9np.onrender.com/api/odoo/sync-user
```

### 3. Formato de Datos que Enviamos

El endpoint espera recibir un JSON con la siguiente estructura:

```json
{
  "uid": "user_1234567890_abc123",
  "email": "usuario@example.com",
  "firstName": "Juan",
  "lastName": "Pérez",
  "phone": "+34612345678",
  "country": "España",
  "city": "Madrid",
  "userReference": "ACAD-XXXX-XXXX-XXXX",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### 4. Formato de Datos que Odoo Debe Proporcionar

Para que la integración funcione, Odoo debe proporcionarte:

#### Opción A: Autenticación por Usuario/Contraseña
- **URL de Odoo**: `https://tu-odoo.com` (o la URL de tu instancia)
- **Base de datos**: Nombre de la base de datos en Odoo
- **Usuario**: Usuario con permisos para crear contactos
- **Contraseña**: Contraseña del usuario

#### Opción B: Autenticación por API Key (si Odoo lo soporta)
- **URL de Odoo**: `https://tu-odoo.com`
- **API Key**: Token de autenticación

### 5. Variables de Entorno Necesarias

Configura estas variables en tu backend (Render.com):

```
ODOO_URL=https://tu-odoo.com
ODOO_DATABASE=nombre_base_datos
ODOO_USERNAME=usuario_odoo
ODOO_PASSWORD=contraseña_odoo
```

O si usas API Key:

```
ODOO_URL=https://tu-odoo.com
ODOO_DATABASE=nombre_base_datos
ODOO_API_KEY=tu_api_key
```

### 6. Modelo de Datos en Odoo

La integración crea/actualiza contactos en el modelo `res.partner` de Odoo con los siguientes campos:

- `name`: Nombre completo (firstName + lastName)
- `email`: Email del usuario
- `phone`: Teléfono
- `mobile`: Teléfono móvil
- `city`: Ciudad
- `country_id`: ID del país (Odoo espera un ID, no el nombre)
- `comment`: Notas con información adicional (UID de Firebase, referencia, fecha)
- `is_company`: false (contacto individual)
- `customer_rank`: 1 (marcado como cliente)

### 7. Flujo de Sincronización

1. Usuario se registra en la app móvil (Firebase Auth)
2. Se crea el perfil en Firestore
3. Automáticamente se envía una petición al backend para sincronizar con Odoo
4. El backend crea/actualiza el contacto en Odoo
5. Si Odoo falla, el registro en Firebase sigue siendo exitoso (no bloquea)

### 8. Información Adicional para Odoo

- **Método HTTP**: POST
- **Content-Type**: application/json
- **Autenticación**: No requerida en el endpoint (se maneja internamente)
- **Respuesta exitosa**: 
  ```json
  {
    "success": true,
    "message": "Usuario sincronizado con Odoo",
    "odooId": 123,
    "data": { ... }
  }
  ```

### 9. Campos Personalizados (Opcional)

Si quieres agregar campos personalizados en Odoo para almacenar información adicional de Firebase, puedes:

1. Crear campos personalizados en Odoo (ej: `x_firebase_uid`, `x_user_reference`)
2. Modificar el endpoint `/api/odoo/sync-user` en `academia-backend/server.js` para incluir estos campos

### 10. Pruebas

Para probar la integración, puedes hacer una petición manual:

```bash
curl -X POST https://academia-backend-s9np.onrender.com/api/odoo/sync-user \
  -H "Content-Type: application/json" \
  -d '{
    "uid": "test_123",
    "email": "test@example.com",
    "firstName": "Test",
    "lastName": "Usuario",
    "phone": "+34612345678",
    "country": "España",
    "city": "Madrid"
  }'
```

## Notas Importantes

- La sincronización con Odoo es **asíncrona y no bloquea** el registro del usuario
- Si Odoo no está configurado, el registro sigue funcionando normalmente
- Los errores de sincronización se registran pero no afectan la experiencia del usuario
- La integración intenta crear el contacto en Odoo cada vez que se registra un usuario

## Siguiente Paso

Una vez que Odoo te proporcione las credenciales, configura las variables de entorno en Render.com y la sincronización comenzará a funcionar automáticamente.


































