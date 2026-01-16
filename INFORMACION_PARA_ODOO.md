# Información para Odoo - Integración con Academia de Inmigrantes

## Resumen
Necesitamos que Odoo configure un endpoint o webhook para recibir automáticamente los datos de los usuarios cuando se registran en nuestra aplicación móvil.

---

## 1. URL del Endpoint

**URL del Backend:**
```
https://academia-backend-s9np.onrender.com
```

**Endpoint de Sincronización:**
```
POST https://academia-backend-s9np.onrender.com/api/odoo/sync-user
```

---

## 2. Formato de Datos que Enviamos

Cada vez que un usuario se registra en nuestra app, enviamos un JSON con esta estructura:

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

### Campos:
- **uid**: ID único del usuario en Firebase
- **email**: Email del usuario (obligatorio)
- **firstName**: Nombre (obligatorio)
- **lastName**: Apellido (obligatorio)
- **phone**: Teléfono (opcional)
- **country**: País (opcional)
- **city**: Ciudad (opcional)
- **userReference**: Referencia alfanumérica única (opcional)
- **createdAt**: Fecha de creación en formato ISO (opcional)

---

## 3. Método HTTP y Headers

- **Método**: `POST`
- **Content-Type**: `application/json`
- **Autenticación**: No requerida (el endpoint es público)

---

## 4. Respuesta Esperada

El endpoint devuelve:

**Éxito:**
```json
{
  "success": true,
  "message": "Usuario sincronizado con Odoo",
  "odooId": 123
}
```

**Error:**
```json
{
  "success": false,
  "error": "Descripción del error"
}
```

---

## 5. Mapeo de Datos a Odoo

Los datos se mapean al modelo `res.partner` de Odoo de la siguiente manera:

| Campo App | Campo Odoo | Notas |
|-----------|------------|-------|
| firstName + lastName | name | Nombre completo |
| email | email | Email del contacto |
| phone | phone / mobile | Teléfono |
| city | city | Ciudad |
| country | country_id | Necesita ser ID de país en Odoo |
| - | is_company | false (contacto individual) |
| - | customer_rank | 1 (marcado como cliente) |
| uid + userReference | comment | Notas con información adicional |

---

## 6. Información que Necesitamos de Odoo

Para completar la integración, **necesitamos que Odoo nos proporcione** las siguientes credenciales para configurar en nuestro servidor:

### Opción A: Autenticación por Usuario/Contraseña (Recomendada)
- ✅ **URL de Odoo**: `https://tu-instancia.odoo.com` (o la URL de su instancia)
- ✅ **Base de datos**: Nombre de la base de datos
- ✅ **Usuario**: Usuario con permisos para crear contactos en `res.partner`
- ✅ **Contraseña**: Contraseña del usuario

**Nota**: El usuario debe tener permisos de escritura en el modelo `res.partner`.

### Opción B: Autenticación por API Key (si lo soportan)
- ✅ **URL de Odoo**: `https://tu-instancia.odoo.com`
- ✅ **API Key**: Token de autenticación con permisos para crear contactos

---

## 6.1. Configuración en Nuestro Servidor

Una vez que Odoo nos proporcione las credenciales, las configuraremos como variables de entorno en nuestro servidor (Render.com):

| Variable de Entorno | Descripción | Ejemplo |
|---------------------|-------------|---------|
| `ODOO_URL` | URL completa de la instancia de Odoo | `https://tu-empresa.odoo.com` |
| `ODOO_DATABASE` | Nombre de la base de datos | `tu_base_de_datos` |
| `ODOO_USERNAME` | Usuario de Odoo (Opción A) | `usuario_api` |
| `ODOO_PASSWORD` | Contraseña del usuario (Opción A) | `contraseña_segura` |
| `ODOO_API_KEY` | API Key (Opción B, alternativa) | `token_api_123456` |

**Importante**: Solo necesitamos **una de las dos opciones** (usuario/contraseña O API Key), no ambas.

---

## 7. Flujo de Sincronización

1. Usuario se registra en la app móvil (Firebase Authentication)
2. Se crea el perfil del usuario en Firestore (base de datos de Firebase)
3. **Automáticamente** (en segundo plano) se envía una petición POST a nuestro backend: `/api/odoo/sync-user`
4. Nuestro backend se conecta a Odoo usando las credenciales configuradas
5. Odoo crea un nuevo contacto en el modelo `res.partner`
6. Si Odoo falla o no está disponible, el registro en Firebase sigue siendo exitoso (no bloquea la experiencia del usuario)

---

## 8. Ejemplo de Petición

### Ejemplo con cURL

```bash
curl -X POST https://academia-backend-s9np.onrender.com/api/odoo/sync-user \
  -H "Content-Type: application/json" \
  -d '{
    "uid": "user_1234567890_abc123",
    "email": "juan.perez@example.com",
    "firstName": "Juan",
    "lastName": "Pérez",
    "phone": "+34612345678",
    "country": "España",
    "city": "Madrid",
    "userReference": "ACAD-A3B7-9F2C-4D8E",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }'
```

### Ejemplo con JavaScript/Fetch

```javascript
const response = await fetch('https://academia-backend-s9np.onrender.com/api/odoo/sync-user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    uid: 'user_1234567890_abc123',
    email: 'juan.perez@example.com',
    firstName: 'Juan',
    lastName: 'Pérez',
    phone: '+34612345678',
    country: 'España',
    city: 'Madrid',
    userReference: 'ACAD-A3B7-9F2C-4D8E',
    createdAt: new Date().toISOString()
  })
});

const result = await response.json();
console.log(result);
```

---

## 9. Campos Personalizados en Odoo (Opcional)

Si Odoo quiere almacenar información adicional de Firebase (como el UID o la referencia del usuario), pueden crear campos personalizados en el modelo `res.partner`:

- `x_firebase_uid`: Para almacenar el UID de Firebase (tipo: Char)
- `x_user_reference`: Para almacenar la referencia alfanumérica del usuario (tipo: Char)
- `x_firebase_created_at`: Para almacenar la fecha de creación en Firebase (tipo: Datetime)

**Nota**: Los campos personalizados en Odoo deben comenzar con `x_` o `x_` seguido de un nombre descriptivo.

Si crean estos campos, podemos modificar nuestro endpoint para incluirlos automáticamente en la sincronización.

---

## 10. Pruebas y Validación

### Prueba Manual

Para probar la integración antes de que los usuarios reales se registren, pueden hacer una petición de prueba al endpoint con los datos de ejemplo mostrados en la sección 8.

### Verificación en Odoo

Después de una petición exitosa, deberían ver:
1. Un nuevo contacto creado en `res.partner` con el nombre completo del usuario
2. El email del usuario en el campo `email`
3. El teléfono (si se proporcionó) en los campos `phone` y `mobile`
4. La ciudad (si se proporcionó) en el campo `city`
5. Una nota en el campo `comment` con información adicional (UID, referencia, fecha)

### Respuestas del Endpoint

**Éxito (200 OK)**:
```json
{
  "success": true,
  "message": "Usuario sincronizado con Odoo",
  "odooId": 123,
  "data": {
    "name": "Juan Pérez",
    "email": "juan.perez@example.com",
    ...
  }
}
```

**Error de validación (400 Bad Request)**:
```json
{
  "success": false,
  "error": "Faltan campos requeridos: email, firstName, lastName"
}
```

**Error de Odoo (200 OK con error)**:
```json
{
  "success": false,
  "error": "Error sincronizando con Odoo: [mensaje del error]",
  "warning": "El usuario se registró en Firebase pero no se pudo sincronizar con Odoo"
}
```

---

## 11. Notas Importantes

- ✅ **Sincronización automática**: Cada vez que un usuario se registra en la app, se sincroniza automáticamente con Odoo
- ✅ **No bloquea el registro**: La sincronización es asíncrona y no bloquea el proceso de registro del usuario
- ✅ **Tolerante a fallos**: Si Odoo no está disponible o hay un error, el registro en Firebase sigue siendo exitoso
- ✅ **Sin impacto en el usuario**: Los errores de sincronización se registran en nuestros logs pero no afectan la experiencia del usuario
- ✅ **Sincronización única**: Cada usuario se sincroniza una vez al registrarse (no hay sincronizaciones duplicadas automáticas)
- ✅ **Seguridad**: Las credenciales de Odoo se almacenan de forma segura como variables de entorno en nuestro servidor

---

## 12. Preguntas Frecuentes

### ¿Qué pasa si un usuario ya existe en Odoo?
Actualmente, el endpoint crea un nuevo contacto cada vez. Si necesitan evitar duplicados, pueden:
- Crear un campo personalizado `x_firebase_uid` en Odoo
- Modificar nuestro código para buscar contactos existentes antes de crear uno nuevo

### ¿Se actualizan los contactos existentes?
No, actualmente solo creamos nuevos contactos. Si necesitan actualización automática, podemos implementarla.

### ¿Qué permisos necesita el usuario de Odoo?
El usuario debe tener permisos de **crear** y **escribir** en el modelo `res.partner`.

### ¿Hay límite de peticiones?
No hay límite técnico, pero recomendamos que Odoo esté preparado para recibir múltiples peticiones simultáneas durante picos de registro.

### ¿Cómo sabemos si la sincronización funcionó?
Pueden verificar en Odoo si aparece el nuevo contacto, o revisar los logs de nuestro servidor.

---

## 13. Contacto y Soporte

Si Odoo necesita información adicional o tiene preguntas sobre la integración, pueden contactar con el equipo técnico.

**Información del Backend:**
- URL: `https://academia-backend-s9np.onrender.com`
- Endpoint: `POST /api/odoo/sync-user`
- Documentación: Este archivo

---

**Última actualización**: Enero 2024



