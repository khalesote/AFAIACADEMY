# 📊 Flujo de Progreso de Unidades (Unit Progress)

## 🔄 **RESUMEN DEL FLUJO**

La aplicación tiene **DOS sistemas de progreso** que funcionan en paralelo:

1. **`UserProgressContext.tsx`** - Sistema principal (arrays booleanos indexados)
2. **`unitProgress.ts`** - Sistema secundario (arrays de IDs de unidades)

---

## 🏗️ **ARQUITECTURA DEL SISTEMA**

### **Sistema 1: UserProgressContext (Principal)**

**Ubicación**: `contexts/UserProgressContext.tsx`

**Cómo funciona**:
- Usa **arrays booleanos** indexados por posición de unidad
- Cada nivel tiene un array: `unitsCompleted: boolean[]`
- Ejemplo A1: `[true, true, false, false, false, false, false]` = unidades 1 y 2 completadas

**Claves de almacenamiento**:
- `userProgress_v2` - Progreso completo de todos los niveles

**Estructura de datos**:
```typescript
type LevelProgress = {
  unlocked: boolean;
  unitsCompleted: boolean[];  // Array indexado por posición
  oralPassed: boolean;
  writtenPassed: boolean;
  diplomaReady: boolean;
};
```

---

### **Sistema 2: unitProgress.ts (Secundario/Legacy)**

**Ubicación**: `utils/unitProgress.ts`

**Cómo funciona**:
- Usa **arrays de IDs** de unidades completadas
- Almacena los IDs de las unidades que se han completado
- Ejemplo A1: `["unidad1", "unidad2"]` = unidades 1 y 2 completadas

**Claves de almacenamiento**:
- `unitProgress_a1` - Unidades completadas de A1
- `unitProgress_a2` - Unidades completadas de A2
- `unitProgress_b1` - Unidades completadas de B1
- `unitProgress_b2` - Unidades completadas de B2

**Estructura de datos**:
```typescript
// Almacena arrays de strings (IDs de unidades)
["unidad1", "unidad2", "unidad3"]  // Para A1/A2
["Trabajo", "Relaciones", "Salud"]  // Para B1/B2
```

---

## 📋 **FLUJO COMPLETO DE PROGRESO**

### **Paso 1: Usuario entra a una unidad**

```
Usuario → Navega a Unidad1 de A1
         ↓
Pantalla de Unidad carga
         ↓
useUserProgress() obtiene progreso actual
         ↓
Verifica: alreadyCompleted = progress.A1.unitsCompleted[0]
```

**Código ejemplo** (`Unidad1.tsx`):
```typescript
const { progress: userProgress, markUnitCompleted } = useUserProgress();
const levelProgress = userProgress.A1;
const alreadyCompleted = levelProgress?.unitsCompleted?.[0] ?? false;
```

---

### **Paso 2: Usuario completa ejercicios**

**Opción A: Completa ejercicios interactivos**

```
Usuario completa todos los ejercicios
         ↓
EjerciciosInteractivos.onComplete() se dispara
         ↓
markUnitCompleted('A1', 0) se llama
         ↓
UserProgressContext actualiza el estado
         ↓
AsyncStorage guarda: userProgress_v2
```

**Código ejemplo** (`Unidad1.tsx`):
```typescript
<EjerciciosInteractivos 
  ejercicios={ejercicios}
  onComplete={async () => {
    markUnitCompleted('A1', 0);  // Marca unidad 0 (primera) como completada
    setSaved(true);
    Alert.alert('¡Unidad completada!', 'Unidad 2 desbloqueada...');
  }}
/>
```

**Opción B: Usa botón "marcar unidad como completada" (UnitMeta)**

```
Usuario presiona botón en UnitMeta
         ↓
marcarCompletada() se ejecuta
         ↓
1. completeUnit() de unitProgress.ts (sistema secundario)
2. AsyncStorage legacy (A1_unidadesCompletadas)
         ↓
Ambos sistemas se actualizan
```

**Código ejemplo** (`UnitMeta.tsx`):
```typescript
const marcarCompletada = async () => {
  // 1) Sistema nuevo (unitProgress.ts)
  const level = nivel.toLowerCase() as 'a1' | 'a2' | 'b1' | 'b2';
  let unitId = '';
  if (level === 'a1' || level === 'a2') {
    unitId = `unidad${unidad}`;
  } else {
    const list = getUnitsForLevel(level);
    const idx = Math.max(0, Math.min(list.length - 1, unidad - 1));
    unitId = list[idx] || '';
  }
  
  if (unitId) {
    await completeUnit(level, unitId);  // Guarda en unitProgress_a1, etc.
  }
  
  // 2) Sistema legacy (compatibilidad)
  const prev = parseInt((await AsyncStorage.getItem(storageKey)) || '0') || 0;
  const next = Math.max(prev, unidad);
  await AsyncStorage.setItem(storageKey, String(next));
};
```

---

### **Paso 3: Guardado en AsyncStorage**

**Sistema 1 (UserProgressContext)**:
```typescript
// Guarda en: 'userProgress_v2'
{
  "A1": {
    "unlocked": true,
    "unitsCompleted": [true, true, false, false, false, false, false],
    "oralPassed": false,
    "writtenPassed": false,
    "diplomaReady": false
  },
  "A2": { ... },
  "B1": { ... },
  "B2": { ... }
}
```

**Sistema 2 (unitProgress.ts)**:
```typescript
// Guarda en: 'unitProgress_a1'
["unidad1", "unidad2"]

// Guarda en: 'unitProgress_b1'
["Trabajo", "Relaciones", "Salud"]
```

**Sistema Legacy (UnitMeta)**:
```typescript
// Guarda en: 'A1_unidadesCompletadas'
"2"  // Número de la última unidad completada
```

---

### **Paso 4: Verificación de acceso a unidades**

**En pantallas de índice** (`A1_Acceso/index.tsx`):

```
Pantalla carga
         ↓
useUserProgress() obtiene progreso
         ↓
unitsDone = progress.A1.unitsCompleted
         ↓
isUnitAccessible(index) verifica:
  - Si index === 0 → siempre accesible
  - Si index > 0 → requiere unitsDone[index - 1] === true
         ↓
Botones se muestran habilitados/bloqueados
```

**Código ejemplo**:
```typescript
const { progress, isLoading } = useUserProgress();
const levelProgress = progress[A1_ACCESO_LEVEL];
const unitsDone = levelProgress?.unitsCompleted ?? Array(7).fill(false);

const isUnitAccessible = (index: number) => {
  if (index === 0) return true;  // Primera unidad siempre accesible
  return unitsDone[index - 1] === true;  // Requiere unidad anterior completada
};

// Renderizado
{[...Array(7)].map((_, i) => {
  const n = i + 1;
  const accessible = isUnitAccessible(i);
  return (
    <TouchableOpacity
      disabled={!accessible}
      onPress={() => accessible && handlePressUnidad(n)}
    >
      {/* Botón de unidad */}
    </TouchableOpacity>
  );
})}
```

---

## 🔧 **FUNCIONES PRINCIPALES**

### **UserProgressContext.tsx**

#### `markUnitCompleted(level: LevelKey, unitIndex: number)`
- **Propósito**: Marca una unidad como completada usando índice
- **Parámetros**:
  - `level`: 'A1' | 'A2' | 'B1' | 'B2'
  - `unitIndex`: Índice de la unidad (0-based)
- **Almacenamiento**: `userProgress_v2`
- **Uso**: Pantallas de unidades (Unidad1.tsx, Trabajo.tsx, etc.)

#### `unlockLevel(level: LevelKey)`
- **Propósito**: Desbloquea un nivel completo
- **Uso**: Cuando el usuario se matricula

#### `markOralPassed(level: LevelKey)`
- **Propósito**: Marca el examen oral como aprobado

#### `markWrittenPassed(level: LevelKey)`
- **Propósito**: Marca el examen escrito como aprobado

---

### **unitProgress.ts**

#### `completeUnit(level: Level, unitId: string)`
- **Propósito**: Marca una unidad como completada usando ID
- **Parámetros**:
  - `level`: 'a1' | 'a2' | 'b1' | 'b2'
  - `unitId`: ID de la unidad ('unidad1', 'Trabajo', etc.)
- **Almacenamiento**: `unitProgress_{level}`
- **Uso**: Componente UnitMeta

#### `isUnitCompleted(level: Level, unitId: string)`
- **Propósito**: Verifica si una unidad está completada
- **Retorna**: `boolean`

#### `getCompletedUnits(level: Level)`
- **Propósito**: Obtiene todas las unidades completadas de un nivel
- **Retorna**: `string[]` (array de IDs)

#### `getUnitsForLevel(level: Level)`
- **Propósito**: Obtiene la lista de IDs de unidades para un nivel
- **Retorna**: `string[]`
- **Ejemplos**:
  - A1: `["unidad1", "unidad2", ..., "unidad7"]`
  - B1: `["Relaciones", "Trabajo", "Estudios", ...]`

#### `syncA1A2FromLegacy()`
- **Propósito**: Sincroniza progreso desde sistema legacy
- **Uso**: Migración de datos antiguos

---

## 🔀 **MAPEO DE UNIDADES**

### **A1 y A2 (Sistema numérico)**

**ID en unitProgress.ts**: `unidad1`, `unidad2`, ..., `unidad7` (A1) o `unidad10` (A2)

**Índice en UserProgressContext**: `0`, `1`, `2`, ..., `6` (A1) o `9` (A2)

**Conversión**:
```typescript
// De número a ID
unitId = `unidad${unidad}`;  // unidad = 1 → "unidad1"

// De ID a índice
unitIndex = parseInt(unitId.replace('unidad', '')) - 1;  // "unidad1" → 0
```

---

### **B1 y B2 (Sistema de nombres)**

**ID en unitProgress.ts**: `'Trabajo'`, `'Relaciones'`, `'Salud'`, etc.

**Índice en UserProgressContext**: `0`, `1`, `2`, ..., `19` (B1) o `15` (B2)

**Conversión**:
```typescript
// De índice a ID
const list = getUnitsForLevel('b1');
const unitId = list[index];  // index = 0 → "Relaciones"

// De ID a índice
const index = list.indexOf(unitId);  // "Trabajo" → 1
```

**Lista B1 (orden en unitProgress.ts)**:
1. Relaciones (índice 0)
2. Trabajo (índice 1)
3. Estudios (índice 2)
4. Cultura (índice 3)
5. MediosComunicacion (índice 4)
6. Salud (índice 5)
7. MedioAmbiente (índice 6)
8. Tecnologia (índice 7)
9. Turismo (índice 8)
10. VidaCotidiana (índice 9)
11. Alimentacion (índice 10)
12. Compras (índice 11)
13. Deportes (índice 12)
14. Experiencias (índice 13)
15. FiestasTradiciones (índice 14)
16. ProblemasSociales (índice 15)
17. Transporte (índice 16)
18. Vivienda (índice 17)
19. Voluntariado (índice 18)
20. MedioAmbienteNuevo (índice 19)

---

## 🔄 **SINCRONIZACIÓN ENTRE SISTEMAS**

### **Problema actual**

Los dos sistemas **NO están completamente sincronizados**:

- **UserProgressContext**: Se actualiza cuando el usuario completa ejercicios
- **unitProgress.ts**: Se actualiza cuando el usuario presiona "marcar unidad como completada" en UnitMeta

### **Solución recomendada**

Sincronizar ambos sistemas cuando se marca una unidad como completada:

```typescript
// En las pantallas de unidades, después de markUnitCompleted:
const handleComplete = () => {
  // Sistema 1: UserProgressContext
  markUnitCompleted('A1', 0);
  
  // Sistema 2: unitProgress.ts (sincronización)
  const level = 'a1';
  const unitId = 'unidad1';
  await completeUnit(level, unitId);
};
```

---

## 📊 **EJEMPLO DE FLUJO COMPLETO**

### **Escenario: Usuario completa Unidad 1 de A1**

1. **Usuario entra a Unidad1**
   ```
   Unidad1.tsx carga
   → useUserProgress() obtiene progreso
   → alreadyCompleted = false (unidad no completada)
   ```

2. **Usuario completa ejercicios**
   ```
   EjerciciosInteractivos.onComplete() se dispara
   → markUnitCompleted('A1', 0) se llama
   → UserProgressContext actualiza: unitsCompleted[0] = true
   → AsyncStorage guarda: userProgress_v2
   ```

3. **Usuario vuelve al índice A1**
   ```
   A1_Acceso/index.tsx carga
   → useUserProgress() obtiene progreso actualizado
   → unitsDone[0] = true
   → isUnitAccessible(1) verifica: unitsDone[0] === true ✅
   → Unidad 2 se muestra habilitada
   ```

4. **Usuario puede acceder a Unidad 2**
   ```
   Botón de Unidad 2 está habilitado
   → Usuario puede hacer clic y entrar
   ```

---

## ⚠️ **PROBLEMAS CONOCIDOS**

### **1. Desincronización entre sistemas**

**Problema**: `UserProgressContext` y `unitProgress.ts` no siempre están sincronizados.

**Causa**: Se actualizan en momentos diferentes:
- `UserProgressContext`: Al completar ejercicios
- `unitProgress.ts`: Al presionar botón en UnitMeta

**Solución**: Sincronizar ambos sistemas cuando se marca una unidad como completada.

---

### **2. Sistema legacy aún activo**

**Problema**: `UnitMeta.tsx` mantiene claves legacy (`A1_unidadesCompletadas`).

**Causa**: Compatibilidad con versiones antiguas de la app.

**Impacto**: Mínimo, pero genera datos redundantes.

---

### **3. Índices hardcodeados en B1/B2**

**Problema**: Algunas pantallas de B1/B2 tienen índices hardcodeados que pueden no coincidir con el orden real.

**Ejemplo**: `VidaCotidiana.tsx` usa índice 14, pero debe verificar que coincide con el orden en `unitProgress.ts`.

**Solución**: Usar `getUnitsForLevel()` para obtener el índice correcto dinámicamente.

---

## ✅ **RECOMENDACIONES**

1. **Unificar sistemas**: Migrar completamente a `UserProgressContext` y deprecar `unitProgress.ts`
2. **Sincronización automática**: Cuando se marca una unidad en `UserProgressContext`, actualizar también `unitProgress.ts`
3. **Índices dinámicos**: Usar `getUnitsForLevel()` para calcular índices en lugar de hardcodearlos
4. **Validación**: Agregar validación para asegurar que los índices coinciden con los IDs

---

## 📝 **RESUMEN**

| Aspecto | UserProgressContext | unitProgress.ts |
|---------|---------------------|-----------------|
| **Tipo de datos** | Arrays booleanos indexados | Arrays de IDs |
| **Clave AsyncStorage** | `userProgress_v2` | `unitProgress_{level}` |
| **Uso principal** | Pantallas de unidades | Componente UnitMeta |
| **Actualización** | Al completar ejercicios | Al presionar botón |
| **Estado** | ✅ Sistema principal | ⚠️ Sistema secundario/legacy |

**Conclusión**: El sistema principal es `UserProgressContext`, pero `unitProgress.ts` se mantiene para compatibilidad y uso en `UnitMeta`.



