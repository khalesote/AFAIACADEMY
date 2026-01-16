# Análisis del Flujo de Matrícula

## Resumen Ejecutivo
Se ha identificado una inconsistencia crítica en el sistema de matrícula: el sistema actual permite matrículas individuales por nivel (A1, A2, B1, B2), pero el `UserProgressContext` solo verifica matrículas de bloques (A1A2, B1B2). Esto puede causar que niveles no se desbloqueen correctamente aunque el usuario esté matriculado.

## Flujo Actual

### 1. Inicio del Proceso
- **Ubicación**: `app/(tabs)/SchoolScreen.tsx`
- **Acción**: Usuario presiona botón "Matricúlate"
- **Navegación**: `router.push('/FormularioDatosPersonales')`

### 2. Formulario de Datos Personales
- **Ubicación**: `app/(tabs)/FormularioDatosPersonales.tsx`
- **Función**: Recopila datos del usuario (nombre, apellidos, documento, etc.)
- **Navegación**: Al completar, navega a `MatriculaScreen` con los datos como parámetros

### 3. Pantalla de Matrícula
- **Ubicación**: `app/(tabs)/MatriculaScreen.tsx`
- **Función**: 
  - Permite seleccionar nivel (A1, A2, B1, B2)
  - Procesa pago o código de acceso
  - Captura facial (opcional)
  - Completa la matrícula

### 4. Completar Matrícula
- **Función**: `completeEnrollment(selectedLevel)`
- **Acciones**:
  1. Llama a `unlockLevel(selectedLevel)` del contexto
  2. Guarda en AsyncStorage: `matricula_${selectedLevel}_completada = 'true'`
  3. Actualiza `unlockedLevels` array
  4. Guarda en Firebase (si está autenticado)
  5. Navega de vuelta a SchoolScreen con parámetro `matriculado`

### 5. Carga de Estado en SchoolScreen
- **Ubicación**: `app/(tabs)/SchoolScreen.tsx`
- **Función**: `loadMatriculas()` en `useEffect`
- **Verifica**:
  - Matrículas individuales: `matricula_A1_completada`, `matricula_A2_completada`, etc.
  - Matrículas de bloques (compatibilidad): `matricula_A1A2_completada`, `matricula_B1B2_completada`
- **Establece estados**: `matriculadoA1`, `matriculadoA2`, `matriculadoB1`, `matriculadoB2`

### 6. Desbloqueo de Niveles
- **Ubicación**: `app/(tabs)/SchoolScreen.tsx`
- **Función**: `useEffect` que verifica matrículas y desbloquea niveles
- **Lógica**: Si está matriculado y el nivel no está desbloqueado, llama a `unlockLevel()`

## Problemas Identificados

### 🔴 Problema Crítico 1: UserProgressContext no verifica matrículas individuales
**Ubicación**: `contexts/UserProgressContext.tsx` (líneas 106-148)

**Problema**: 
- Solo verifica `matricula_A1A2_completada` y `matricula_B1B2_completada`
- No verifica matrículas individuales (`matricula_A1_completada`, `matricula_A2_completada`, etc.)
- Esto causa que si un usuario se matricula individualmente, el contexto no lo detecte al cargar

**Impacto**: 
- Niveles pueden no desbloquearse correctamente al reiniciar la app
- Inconsistencia entre el estado en SchoolScreen y el contexto

**Código problemático**:
```typescript
// Solo verifica bloques
const [matA1A2, matB1B2] = await Promise.all([
  AsyncStorage.getItem('matricula_A1A2_completada'),
  AsyncStorage.getItem('matricula_B1B2_completada')
]);
```

### 🟡 Problema Menor 2: Duplicación de guardado
**Ubicación**: `app/(tabs)/MatriculaScreen.tsx` (líneas 119 y 143)

**Problema**: 
- Se guarda la misma clave dos veces: `matricula_${selectedLevel}_completada`
- Línea 119: `await AsyncStorage.setItem(\`matricula_${selectedLevel}_completada\`, 'true');`
- Línea 143: `await AsyncStorage.setItem(matriculaKey, 'true');` (donde `matriculaKey` es la misma)

**Impacto**: 
- Código redundante, no afecta funcionalidad pero es innecesario

### 🟢 Observación 3: Compatibilidad con sistema antiguo
**Ubicación**: Múltiples archivos

**Estado**: 
- El sistema mantiene compatibilidad con matrículas de bloques (A1A2, B1B2)
- SchoolScreen carga ambos sistemas (individual y bloques)
- Esto está bien, pero debe mantenerse consistente

## Soluciones Propuestas

### Solución 1: Actualizar UserProgressContext
- Verificar matrículas individuales además de bloques
- Si encuentra matrícula individual, desbloquear ese nivel
- Mantener compatibilidad con sistema de bloques

### Solución 2: Eliminar duplicación
- Eliminar una de las dos líneas que guardan la matrícula
- Mantener solo una llamada a `AsyncStorage.setItem`

### Solución 3: Mejorar sincronización
- Asegurar que cuando se guarda una matrícula individual, también se actualice el contexto
- Verificar que el desbloqueo se propague correctamente

## Flujo Ideal Corregido

1. Usuario se matricula en MatriculaScreen
2. Se guarda `matricula_A1_completada = 'true'` en AsyncStorage
3. Se llama a `unlockLevel('A1')` del contexto
4. Al reiniciar la app, UserProgressContext verifica:
   - Matrículas individuales (A1, A2, B1, B2)
   - Matrículas de bloques (A1A2, B1B2) para compatibilidad
5. Si encuentra matrícula, desbloquea el nivel correspondiente
6. SchoolScreen carga el estado y muestra niveles desbloqueados

## Archivos Modificados

1. ✅ `contexts/UserProgressContext.tsx` - Agregada verificación de matrículas individuales (A1, A2, B1, B2) además de bloques
2. ✅ `app/(tabs)/MatriculaScreen.tsx` - Eliminada duplicación de guardado
3. ✅ `app/(tabs)/A1_Acceso/index.tsx` - Actualizada verificación para incluir matrículas individuales

## Resumen de Correcciones Aplicadas

### Corrección 1: UserProgressContext
- **Antes**: Solo verificaba `matricula_A1A2_completada` y `matricula_B1B2_completada`
- **Ahora**: Verifica matrículas individuales (`matricula_A1_completada`, `matricula_A2_completada`, `matricula_B1_completada`, `matricula_B2_completada`) Y mantiene compatibilidad con bloques
- **Impacto**: Los niveles ahora se desbloquean correctamente al reiniciar la app, independientemente de si el usuario se matriculó individualmente o por bloques

### Corrección 2: MatriculaScreen
- **Antes**: Guardaba la matrícula dos veces (líneas 119 y 143)
- **Ahora**: Guarda una sola vez, eliminando código redundante
- **Impacto**: Código más limpio y eficiente

### Corrección 3: A1_Acceso
- **Antes**: Solo verificaba `matricula_A1A2_completada`
- **Ahora**: Verifica tanto `matricula_A1_completada` como `matricula_A1A2_completada` (compatibilidad)
- **Impacto**: Los usuarios con matrícula individual en A1 pueden acceder correctamente al nivel

## Estado Final del Flujo

✅ **Flujo completo funcional**:
1. Usuario presiona "Matricúlate" en SchoolScreen
2. Completa FormularioDatosPersonales
3. Selecciona nivel en MatriculaScreen
4. Completa pago o código de acceso
5. Se guarda matrícula individual en AsyncStorage
6. Se desbloquea el nivel en el contexto
7. Al reiniciar la app, el contexto verifica matrículas individuales Y bloques
8. Los niveles se desbloquean correctamente según la matrícula
9. SchoolScreen muestra los niveles desbloqueados
10. Las pantallas de niveles (A1_Acceso, etc.) verifican correctamente la matrícula

