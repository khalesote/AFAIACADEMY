# 📋 Guía Completa: Configurar Mensajes Promocionales

## 🎯 ¿Qué es el sistema de mensajes promocionales?

Es un sistema dinámico que te permite agregar, editar y gestionar mensajes promocionales en la app **desde Firebase Console**, sin necesidad de actualizar la aplicación.

---

## 📱 ¿Dónde aparecen los mensajes?

Los mensajes aparecen en el **primer scroll** de la homepage (después del "¡Bienvenido!"):
```
┌─────────────────────────────────┐
│  ¡Bienvenido! مرحباً!      │
├─────────────────────────────────┤
│  🎓 Aprende español...      │ ← Scroll de Promociones
│  📚 Recursos y Biblioteca... │
│  🔥 ¡Oferta especial!...   │ ← ¡Tus mensajes aquí!
│  💬 Únete al chat...       │
└─────────────────────────────────┘
```

---

## 🔥 Paso a Paso: Agregar Nuevo Mensaje

### 1. **Entra a Firebase Console**
- Ve a: https://console.firebase.google.com
- Selecciona: `academia-inmigrantes-movil`

### 2. **Ve a Firestore Database**
- Menú izquierdo → **Firestore Database**

### 3. **Busca la colección**
- Haz clic en **`promoMessages`**

### 4. **Crea nuevo documento**
- Haz clic en **"+ Agregar documento"**
- Selecciona **"ID automático"**

### 5. **Completa los campos**

#### **Campos Obligatorios:**
```
textEs: "Tu mensaje en español"
textAr: "رسالتك باللغة العربية"
isActive: true
priority: 100
```

#### **Campos Opcionales:**
```
expiresAt: [Timestamp] (fecha cuando expira)
link: "/ruta/de/navegacion"
createdAt: [Timestamp] (se agrega solo)
```

---

## 📝 Ejemplos de Mensajes

### **Ejemplo 1: Descuento**
```
textEs: "🔥 ¡Oferta especial! 50% descuento en matrículas"
textAr: "🔥 عرض خاص! خصم 50% على التسجيلات"
isActive: true
priority: 100
```

### **Ejemplo 2: Nuevo Servicio**
```
textEs: "🆕 Nuevo: Creador de CV profesional"
textAr: "🆕 جديد: منشئ السيرة الذاتية الاحترافية"
isActive: true
priority: 90
link: "/(tabs)/CreadorCVProScreen"
```

### **Ejemplo 3: Mensaje Temporal**
```
textEs: "⏰ Últimos días para inscribirte"
textAr: "⏰ الأيام الأخيرة للتسجيل"
isActive: true
priority: 80
expiresAt: [Fecha futura]
```

---

## 🎛️ Explicación de Campos

| Campo | Tipo | Descripción | Ejemplo |
|-------|-------|-------------|----------|
| `textEs` | string | Texto en español | "¡Oferta especial!" |
| `textAr` | string | Texto en árabe | "عرض خاص!" |
| `isActive` | boolean | Activa/desactiva mensaje | `true` |
| `priority` | number | Orden de aparición (mayor = primero) | `100` |
| `expiresAt` | Timestamp | Fecha de expiración (opcional) | `2024-12-31` |
| `link` | string | Ruta de navegación al hacer clic (opcional) | `"/SchoolScreen"` |

---

## 🔄 ¿Cómo funciona el sistema?

### **1. Carga automática:**
- Al iniciar la app, consulta Firestore
- Carga solo mensajes con `isActive: true`
- Filtra mensajes expirados (si tienen `expiresAt`)

### **2. Orden de aparición:**
- **Mayor `priority` aparece primero**
- Si misma prioridad, más nuevo primero
- Se mezclan con mensajes estáticos predefinidos

### **3. Actualización en tiempo real:**
- **Sin recompilar**: Solo recarga la app
- **Inmediato**: Aparece al instante
- **Control total**: Activa/desactiva cuando quieras

---

## 🎯 Mejores Prácticas

### **✅ Recomendaciones:**
- **Usa emojis consistentes**: 🔥 🎓 📚 🎯
- **Mensajes cortos**: Máximo 50 caracteres
- **Traducción profesional**: Usa traductor confiable
- **Prioridades lógicas**: Ofertas = 100, info = 50

### **❌ Evitar:**
- **Mensajes muy largos**: Se cortan en el scroll
- **Mezclar idiomas**: Usa campos separados
- **Olvidar `isActive: false`**: Para desactivar temporalmente

---

## 🛠️ Operaciones Comunes

### **Editar un mensaje:**
1. Ve a `promoMessages`
2. Haz clic en el documento
3. Modifica los campos
4. Haz clic en "Guardar"

### **Desactivar un mensaje:**
1. Edita el documento
2. Cambia `isActive` a `false`
3. Guarda

### **Eliminar un mensaje:**
1. Ve al documento
2. Haz clic en los tres puntos (⋮)
3. Selecciona "Eliminar documento"

---

## 🚀 Proceso Completo

```
1. Agregas mensaje en Firebase Console
2. Guardas el documento
3. Recargas la app
4. ¡Mensaje aparece en el scroll! 🎉
```

---

## 🔧 Solución de Problemas

### **Si no aparece el mensaje:**
- **Revisa `isActive: true`**
- **Verifica spelling de campos**
- **Recarga completamente la app**
- **Revisa logs en consola**

### **Si hay errores de permisos:**
- **Verifica reglas de Firestore**
- **Asegúrate que `promoMessages` tenga `allow read: if true`**

---

## 📞 Soporte

**¿Necesitas ayuda?**
- Revisa los logs en la consola de la app
- Verifica que todos los campos estén correctos
- Asegúrate que `isActive: true`

**¡Listo! Ahora tienes control total sobre los mensajes promocionales** 🎯
