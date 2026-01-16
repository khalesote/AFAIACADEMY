# Referencia Alfanumérica para Registro en OEPM

## ¿Qué es?

Esta es la referencia alfanumérica única de tu aplicación **Academia de Inmigrantes** que necesitas para registrar la aplicación en la **Oficina Española de Patentes y Marcas (OEPM)**.

## Formato

La referencia tiene el siguiente formato:
```
ACAD-XXXX-XXXX-XXXX-XXXX
```

Donde cada X es un carácter alfanumérico (A-Z, 0-9).

**Ejemplo:** `ACAD-A3B7-9F2C-4D8E-1G5H`

## Cómo Obtener la Referencia

### Opción 1: Desde el Código (Recomendado)

Ejecuta este código en tu aplicación o en una consola de desarrollo:

```typescript
import { getAppReferenceForOEPM } from './utils/getAppReferenceForOEPM';

// Obtener la referencia
const referencia = await getAppReferenceForOEPM();
console.log('Referencia para OEPM:', referencia);
```

### Opción 2: Desde la Pantalla de Usuario

1. Abre la aplicación
2. Ve a la pantalla de información de usuario
3. Busca la sección "Referencia de Usuario"
4. Copia la referencia mostrada

### Opción 3: Desde AsyncStorage

La referencia se guarda en AsyncStorage con la clave: `app_reference_oepm`

Puedes obtenerla ejecutando:

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

const referencia = await AsyncStorage.getItem('app_reference_oepm');
console.log('Referencia OEPM:', referencia);
```

## Información para el Registro en OEPM

Cuando registres tu aplicación en OEPM, necesitarás proporcionar:

1. **Referencia alfanumérica:** La referencia generada (formato: ACAD-XXXX-XXXX-XXXX-XXXX)
2. **Nombre de la aplicación:** Academia de Inmigrantes
3. **Versión:** 1.0.0
4. **Plataformas:** Android e iOS
5. **Descripción:** Aplicación educativa para aprendizaje de español dirigida a inmigrantes

## Características de la Referencia

- ✅ **Única:** Cada instalación de la aplicación tiene su propia referencia
- ✅ **Permanente:** Una vez generada, no cambia durante la vida útil de la aplicación
- ✅ **Alfanumérica:** Contiene letras mayúsculas y números
- ✅ **Formato estándar:** Fácil de leer y copiar
- ✅ **Validable:** Se puede verificar el formato antes de usar

## Notas Importantes

⚠️ **IMPORTANTE:** 
- Guarda esta referencia de forma segura
- Úsala en todos los documentos oficiales relacionados con el registro en OEPM
- No la compartas públicamente si contiene información sensible
- La referencia se genera automáticamente la primera vez que se ejecuta la aplicación

## Archivos Relacionados

- `utils/appReference.ts` - Funciones para generar y gestionar la referencia
- `utils/getAppReferenceForOEPM.ts` - Funciones específicas para OEPM
- `app/UserInfoScreen.tsx` - Pantalla donde se muestra la referencia

## Soporte

Si necesitas ayuda para obtener o usar la referencia, consulta la documentación técnica o contacta con el equipo de desarrollo.


















































