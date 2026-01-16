# 📚 Cómo Pasar a la Siguiente Unidad - Guía para el Usuario

## 🎯 **RESUMEN RÁPIDO**

Para desbloquear la siguiente unidad, el usuario debe:
1. ✅ **Completar todos los ejercicios** de la unidad actual
2. ✅ **Volver al índice** del nivel (A1, A2, B1, B2)
3. ✅ **La siguiente unidad se desbloquea automáticamente**

---

## 📋 **FLUJO PASO A PASO**

### **Paso 1: Entrar a una Unidad**

```
Usuario → Navega al nivel (ej: A1)
         ↓
Ve lista de unidades
         ↓
Unidad 1 está siempre desbloqueada ✅
Unidad 2, 3, 4... están bloqueadas 🔒
         ↓
Usuario hace clic en Unidad 1
```

**Mensaje en pantalla**:
> "Para abrir la unidad siguiente tienes que completar los ejercicios de la unidad anterior."
> 
> "لفتح الوحدة التالية يجب إكمال تمارين الوحدة السابقة."

---

### **Paso 2: Completar los Ejercicios**

El usuario entra a la unidad y ve:

1. **Contenido de la unidad** (textos, audios, videos)
2. **Ejercicios Interactivos** (al final de la unidad)
3. **Barra de progreso** que muestra el porcentaje completado

**Ejemplo de ejercicios**:
- Opción múltiple
- Rellenar huecos
- Escribir respuestas
- Relacionar conceptos

**Barra de progreso**:
- 🔴 Rojo: 0-33% completado
- 🟠 Naranja: 34-66% completado
- 🟢 Verde: 67-100% completado

---

### **Paso 3: Completar TODOS los Ejercicios**

**IMPORTANTE**: El usuario debe completar **TODOS** los ejercicios para desbloquear la siguiente unidad.

**Cuando completa el último ejercicio**:
```
Usuario responde el último ejercicio
         ↓
onComplete() se dispara automáticamente
         ↓
markUnitCompleted('A1', 0) se ejecuta
         ↓
Unidad 1 se marca como completada ✅
         ↓
Alert aparece: "¡Unidad completada!"
         ↓
Mensaje: "Unidad 2 desbloqueada automáticamente"
```

**Alert que aparece**:
```
¡Unidad completada!
Unidad 2 desbloqueada automáticamente. 
Regresa al índice A1 para verla.

[Ver índice A1]
```

---

### **Paso 4: Volver al Índice**

El usuario puede:
- Hacer clic en "Ver índice A1" en el alert
- O navegar manualmente de vuelta al índice

**Al volver al índice**:
```
Pantalla de índice carga
         ↓
Sistema verifica progreso:
  - Unidad 1: ✅ Completada
  - Unidad 2: 🔒 Bloqueada → ✅ DESBLOQUEADA
         ↓
Botón de Unidad 2 ahora está habilitado
```

**Visualmente**:
- ✅ **Unidad 1** - Verde con ✓ (completada)
- ✅ **Unidad 2** - Verde (ahora desbloqueada y accesible)
- 🔒 **Unidad 3** - Gris (aún bloqueada)

---

### **Paso 5: Acceder a la Siguiente Unidad**

```
Usuario hace clic en Unidad 2
         ↓
Unidad 2 se abre
         ↓
Usuario puede estudiar y completar ejercicios
         ↓
Al completar todos los ejercicios → Unidad 3 se desbloquea
```

---

## 🔄 **SISTEMA DE DESBLOQUEO**

### **Regla de Desbloqueo**

```typescript
isUnitAccessible(index) {
  if (index === 0) return true;  // Primera unidad siempre accesible
  return unitsDone[index - 1] === true;  // Requiere unidad anterior completada
}
```

**Ejemplo práctico**:
- **Unidad 1** (índice 0): ✅ Siempre accesible
- **Unidad 2** (índice 1): ✅ Accesible si Unidad 1 está completada
- **Unidad 3** (índice 2): ✅ Accesible si Unidad 2 está completada
- **Unidad 4** (índice 3): ✅ Accesible si Unidad 3 está completada
- ...y así sucesivamente

---

## ⚠️ **ALTERNATIVA: Botón "Marcar Unidad como Completada"**

Si el usuario no completa los ejercicios interactivos, puede usar el botón manual:

**Ubicación**: Al final de cada unidad, en el componente `UnitMeta`

**Botón**:
```
✔️ marcar unidad como completada
```

**Qué hace**:
- Marca la unidad como completada manualmente
- Desbloquea la siguiente unidad
- **PERO**: No requiere completar los ejercicios

**Cuándo usar**:
- Si el usuario ya estudió el contenido pero no quiere hacer los ejercicios
- Si hay algún problema técnico con los ejercicios
- Si el usuario quiere avanzar más rápido

**Nota**: Esta opción está disponible, pero se recomienda completar los ejercicios para un mejor aprendizaje.

---

## 📊 **EJEMPLO COMPLETO: De Unidad 1 a Unidad 2**

### **Estado Inicial**

```
Índice A1:
- Unidad 1: ✅ Verde (accesible)
- Unidad 2: 🔒 Gris (bloqueada)
- Unidad 3: 🔒 Gris (bloqueada)
- ...
```

### **Usuario Completa Unidad 1**

1. **Entra a Unidad 1**
2. **Estudia el contenido**
3. **Completa los ejercicios interactivos**
   - Ejercicio 1: ✅ Correcto
   - Ejercicio 2: ✅ Correcto
   - Ejercicio 3: ✅ Correcto
   - ... (todos los ejercicios)
4. **Barra de progreso llega al 100%**
5. **Alert aparece**: "¡Unidad completada!"
6. **Sistema marca**: `unitsCompleted[0] = true`

### **Usuario Vuelve al Índice**

```
Índice A1 (actualizado):
- Unidad 1: ✅ Verde con ✓ (completada)
- Unidad 2: ✅ Verde (ahora desbloqueada) ← NUEVO
- Unidad 3: 🔒 Gris (aún bloqueada)
- ...
```

### **Usuario Puede Acceder a Unidad 2**

- Hace clic en "Unidad 2"
- Unidad 2 se abre
- Puede estudiar y completar ejercicios
- Al completar → Unidad 3 se desbloquea

---

## 🎯 **REQUISITOS PARA DESBLOQUEAR**

### **Para Desbloquear Unidad N+1**

✅ **Requisito único**: Completar Unidad N

**NO se requiere**:
- ❌ Completar todas las unidades anteriores
- ❌ Aprobar examen oral
- ❌ Aprobar examen escrito
- ❌ Matricularse de nuevo

**Solo se requiere**:
- ✅ Completar la unidad inmediatamente anterior

---

## 🔒 **EXCEPCIÓN: Examen Final**

Para acceder al **Examen Final**, el usuario debe:

✅ **Completar TODAS las unidades del nivel**

**Ejemplo A1**:
```
Unidad 1: ✅ Completada
Unidad 2: ✅ Completada
Unidad 3: ✅ Completada
Unidad 4: ✅ Completada
Unidad 5: ✅ Completada
Unidad 6: ✅ Completada
Unidad 7: ✅ Completada ← Última unidad
         ↓
Examen Final A1: ✅ DESBLOQUEADO
```

**Código**:
```typescript
if (!unitsDone[6]) {  // Unidad 7 (índice 6)
  Alert.alert('Examen final bloqueado', 
    'Completa la Unidad 7 y marca "Unidad finalizada" para acceder al examen final.');
  return;
}
router.push('/A1_Acceso/clases/ExamenFinal');
```

---

## 📱 **INDICADORES VISUALES**

### **En el Índice de Unidades**

| Estado | Color | Icono | Significado |
|--------|-------|-------|-------------|
| **Completada** | 🟢 Verde | ✓ | Unidad completada |
| **Desbloqueada** | 🟢 Verde | - | Accesible, no completada |
| **Bloqueada** | ⚫ Gris | 🔒 | Requiere unidad anterior |

### **En la Pantalla de Unidad**

- **Barra de progreso**: Muestra porcentaje de ejercicios completados
- **Botón "marcar unidad como completada"**: Disponible al final
- **Alert de completado**: Aparece cuando se completan todos los ejercicios

---

## ❓ **PREGUNTAS FRECUENTES**

### **¿Puedo saltar unidades?**

❌ **No**. Debes completar las unidades en orden:
- Unidad 1 → Unidad 2 → Unidad 3 → ...

### **¿Qué pasa si no completo todos los ejercicios?**

⚠️ La siguiente unidad **NO se desbloquea automáticamente**.

**Solución**: Usa el botón "marcar unidad como completada" para desbloquearla manualmente.

### **¿Puedo volver a hacer una unidad ya completada?**

✅ **Sí**. Puedes entrar a cualquier unidad ya desbloqueada, incluso si ya la completaste.

### **¿Se guarda mi progreso automáticamente?**

✅ **Sí**. El progreso se guarda automáticamente cuando:
- Completas todos los ejercicios
- Presionas "marcar unidad como completada"

### **¿Qué pasa si cierro la app antes de completar?**

⚠️ El progreso de ejercicios **NO se guarda** hasta completar todos.

**Solución**: Completa todos los ejercicios o usa el botón manual.

---

## 🎓 **RESUMEN PARA EL USUARIO**

### **Para pasar a la siguiente unidad:**

1. ✅ **Completa todos los ejercicios** de la unidad actual
2. ✅ **Espera el mensaje** "¡Unidad completada!"
3. ✅ **Vuelve al índice** del nivel
4. ✅ **La siguiente unidad estará desbloqueada** automáticamente

### **Alternativa rápida:**

- Usa el botón **"✔️ marcar unidad como completada"** al final de la unidad
- No requiere completar ejercicios
- Desbloquea la siguiente unidad inmediatamente

---

## 🔧 **PARA DESARROLLADORES**

### **Flujo Técnico**

```typescript
// 1. Usuario completa ejercicios
EjerciciosInteractivos.onComplete() 
  → markUnitCompleted('A1', 0)
  → UserProgressContext actualiza: unitsCompleted[0] = true
  → AsyncStorage guarda: userProgress_v2

// 2. Usuario vuelve al índice
A1_Acceso/index.tsx carga
  → useUserProgress() obtiene progreso
  → unitsDone[0] = true
  → isUnitAccessible(1) verifica: unitsDone[0] === true ✅
  → Unidad 2 se muestra habilitada
```

### **Verificación de Acceso**

```typescript
const isUnitAccessible = (index: number) => {
  if (index === 0) return true;  // Primera siempre accesible
  return unitsDone[index - 1] === true;  // Requiere anterior completada
};
```

---

## ✅ **CONCLUSIÓN**

**El usuario solo necesita completar todos los ejercicios de una unidad para desbloquear automáticamente la siguiente.**

No hay pasos adicionales, no hay botones especiales, no hay confirmaciones extra. El sistema es automático y transparente.



