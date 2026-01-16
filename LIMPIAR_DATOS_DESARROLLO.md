# Limpieza de Datos de Desarrollo

## ¿Por qué aparecen mis datos al recompilar?

**Firebase Authentication mantiene la sesión persistente** incluso después de cerrar la app. Cuando recompilas la app, Firebase automáticamente detecta tu sesión activa y restaura tu usuario autenticado, cargando tu perfil desde Firestore.

Este es el comportamiento **normal y esperado** de Firebase Authentication. Es una característica de seguridad que mantiene a los usuarios autenticados entre sesiones.

## Soluciones para empezar desde cero

### Opción 1: Usar el botón "Limpiar datos de desarrollo" (Recomendado)

1. Abre la app y ve a tu perfil
2. En la sección "Acciones", busca el botón **"🧹 Limpiar datos de desarrollo"**
   - Este botón solo aparece en modo desarrollo (`__DEV__`)
3. Confirma la acción
4. La app cerrará tu sesión y eliminará todos los datos locales

Este botón hace lo siguiente:
- ✅ Cierra la sesión de Firebase
- ✅ Elimina todos los datos de AsyncStorage (matrículas, progreso, imágenes, etc.)
- ✅ Te deja en la pantalla de inicio sin sesión activa

### Opción 2: Cerrar sesión manualmente

1. Ve a tu perfil
2. Presiona "Cerrar sesión"
3. Esto cerrará tu sesión de Firebase pero mantendrá algunos datos en AsyncStorage

### Opción 3: Script de limpieza

Puedes ejecutar el script `limpiar_datos_desarrollo.ps1` desde PowerShell:

```powershell
.\limpiar_datos_desarrollo.ps1
```

Nota: Este script solo limpia la caché de Metro. Para limpiar completamente los datos, usa el botón en la app.

## ¿Qué datos se limpian?

Cuando usas "Limpiar datos de desarrollo", se eliminan:

- ✅ Sesión de Firebase Authentication
- ✅ Imagen de perfil local
- ✅ Datos de matrícula (A1, A2, B1, B2)
- ✅ Progreso del usuario (unidades completadas)
- ✅ Accesos a cursos
- ✅ Datos de agenda
- ✅ Referencias de usuario
- ✅ Códigos de acceso usados
- ✅ Cualquier otro dato almacenado localmente

**IMPORTANTE:** Los datos en Firestore (base de datos en la nube) NO se eliminan. Solo se limpian los datos locales y la sesión.

## Notas importantes

1. **Solo en desarrollo**: El botón de limpieza solo aparece cuando `__DEV__` es `true`
2. **No afecta Firestore**: Los datos en la nube permanecen intactos
3. **Útil para testing**: Perfecto para probar flujos de registro y matrícula desde cero

## Ubicación del código

- Función de limpieza: `utils/clearDevelopmentData.ts`
- Botón en perfil: `app/profile/index.tsx` (solo visible en `__DEV__`)
- Script PowerShell: `limpiar_datos_desarrollo.ps1`

## En producción

En producción (cuando `__DEV__` es `false`), el botón de limpieza NO aparece. Los usuarios pueden cerrar sesión normalmente, pero no tendrán acceso a la opción de limpieza completa de datos.

