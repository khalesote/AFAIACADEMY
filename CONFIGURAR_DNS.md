# Configuración DNS para academiadeinmigrantes.es

## Instrucciones de Render

### Para `academiadeinmigrantes.es` (dominio principal):

**Opción 1 (Recomendada - si tu proveedor soporta ANAME/ALIAS):**
- Tipo: `ANAME` o `ALIAS`
- Nombre/Host: `@` (o dejar en blanco, o `academiadeinmigrantes.es`)
- Valor/Destino: `academia-backend-s9np.onrender.com`

**Opción 2 (Si no soporta ANAME/ALIAS):**
- Tipo: `A`
- Nombre/Host: `@` (o dejar en blanco, o `academiadeines.es`)
- Valor/Destino: `216.24.57.1`

### Para `www.academiadeinmigrantes.es`:

- Tipo: `CNAME`
- Nombre/Host: `www`
- Valor/Destino: `academia-backend-s9np.onrender.com`

---

## Instrucciones por Proveedor de DNS

### GoDaddy

1. Inicia sesión en GoDaddy
2. Ve a "Mis Productos" → "DNS"
3. Busca tu dominio `academiadeinmigrantes.es`
4. Haz clic en "Administrar DNS"

**Para el dominio principal:**
- Busca si hay un registro A existente para `@`
- Si existe, edítalo y cambia el valor a `216.24.57.1`
- Si no existe, añade un nuevo registro:
  - Tipo: `A`
  - Nombre: `@`
  - Valor: `216.24.57.1`
  - TTL: `600` (o el valor por defecto)

**Para www:**
- Busca si hay un registro CNAME existente para `www`
- Si existe, edítalo y cambia el valor a `academia-backend-s9np.onrender.com`
- Si no existe, añade un nuevo registro:
  - Tipo: `CNAME`
  - Nombre: `www`
  - Valor: `academia-backend-s9np.onrender.com`
  - TTL: `600` (o el valor por defecto)

5. Guarda los cambios
6. Espera 5-30 minutos
7. Vuelve a Render y haz clic en "Verify"

---

### Namecheap

1. Inicia sesión en Namecheap
2. Ve a "Domain List"
3. Haz clic en "Manage" junto a `academiadeinmigrantes.es`
4. Ve a la pestaña "Advanced DNS"

**Para el dominio principal:**
- Busca el registro A para `@` (o el registro A principal)
- Edítalo o añade uno nuevo:
  - Tipo: `A Record`
  - Host: `@`
  - Value: `216.24.57.1`
  - TTL: `Automatic` o `30 min`

**Para www:**
- Busca el registro CNAME para `www`
- Edítalo o añade uno nuevo:
  - Tipo: `CNAME Record`
  - Host: `www`
  - Value: `academia-backend-s9np.onrender.com`
  - TTL: `Automatic` o `30 min`

5. Guarda los cambios (el botón "Save All Changes" está en la parte superior)
6. Espera 5-30 minutos
7. Vuelve a Render y haz clic en "Verify"

---

### Cloudflare

1. Inicia sesión en Cloudflare
2. Selecciona el dominio `academiadeinmigrantes.es`
3. Ve a "DNS" → "Records"

**Para el dominio principal:**
- Busca el registro A para `@` (o `academiadeinmigrantes.es`)
- Edítalo o añade uno nuevo:
  - Tipo: `A`
  - Name: `@` (o `academiadeinmigrantes.es`)
  - IPv4 address: `216.24.57.1`
  - Proxy status: `DNS only` (nube gris, NO naranja)
  - TTL: `Auto`

**Para www:**
- Busca el registro CNAME para `www`
- Edítalo o añade uno nuevo:
  - Tipo: `CNAME`
  - Name: `www`
  - Target: `academia-backend-s9np.onrender.com`
  - Proxy status: `DNS only` (nube gris, NO naranja)
  - TTL: `Auto`

4. Guarda los cambios
5. Espera 5-30 minutos
6. Vuelve a Render y haz clic en "Verify"

**IMPORTANTE en Cloudflare:** Asegúrate de que el proxy esté desactivado (nube gris) para los registros A y CNAME. Si está activado (nube naranja), Render no podrá verificar el dominio.

---

### Google Domains / Squarespace Domains

1. Inicia sesión en tu cuenta
2. Ve a "DNS" o "DNS Settings"
3. Busca la sección de registros DNS

**Para el dominio principal:**
- Añade o edita un registro:
  - Tipo: `A`
  - Nombre: `@` (o dejar en blanco)
  - Datos: `216.24.57.1`
  - TTL: `3600` (o el valor por defecto)

**Para www:**
- Añade o edita un registro:
  - Tipo: `CNAME`
  - Nombre: `www`
  - Datos: `academia-backend-s9np.onrender.com`
  - TTL: `3600` (o el valor por defecto)

4. Guarda los cambios
5. Espera 5-30 minutos
6. Vuelve a Render y haz clic en "Verify"

---

### Otros Proveedores

Si tu proveedor no está en la lista, busca en su panel de DNS:

1. **Registro A para el dominio principal:**
   - Tipo: `A`
   - Nombre/Host: `@` o `academiadeinmigrantes.es` (o dejar en blanco)
   - Valor/Destino: `216.24.57.1`

2. **Registro CNAME para www:**
   - Tipo: `CNAME`
   - Nombre/Host: `www`
   - Valor/Destino: `academia-backend-s9np.onrender.com`

---

## Verificación

Después de configurar los DNS y esperar 5-30 minutos:

1. Vuelve a Render
2. Haz clic en "Verify" junto a cada dominio
3. Render verificará automáticamente y activará el SSL

Una vez verificado, podrás acceder a tu backend desde el dominio principal y el subdominio `www`.

## Troubleshooting

**Si la verificación falla:**
1. Espera más tiempo (hasta 48 horas en casos raros)
2. Verifica que los registros DNS estén correctos usando:
   - `nslookup academiadeinmigrantes.es`
   - `dig academiadeinmigrantes.es`
3. Asegúrate de que no haya otros registros A o CNAME conflictivos
4. En Cloudflare, asegúrate de que el proxy esté desactivado (nube gris)
5. Verifica el backend con `https://academiadeinmigrantes.es/api/health`

