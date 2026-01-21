# Guía para Configurar Mensajes Promocionales en Firestore

## 1. Estructura de la Colección

Crea una colección llamada `promoMessages` en tu base de datos Firestore con la siguiente estructura:

```javascript
{
  textEs: "¡Oferta especial! 50% descuento en cursos avanzados",
  textAr: "عرض خاص! خصم 50% على الدورات المتقدمة",
  isActive: true,
  priority: 10,
  createdAt: Timestamp,
  expiresAt: Timestamp (opcional),
  link: "/(tabs)/B2_Avanzado" (opcional)
}
```

## 2. Campos Explicados

- **textEs**: Texto del mensaje en español
- **textAr**: Texto del mensaje en árabe
- **isActive**: Booleano para activar/desactivar el mensaje
- **priority**: Número para ordenar los mensajes (mayor número = mayor prioridad)
- **createdAt**: Fecha de creación (automática)
- **expiresAt**: Fecha de expiración (opcional, el mensaje no se mostrará después de esta fecha)
- **link**: Ruta de navegación cuando el usuario hace clic (opcional)

## 3. Ejemplos de Mensajes

### Mensaje de Descuento
```javascript
{
  textEs: "🔥 ¡Oferta especial! 50% descuento en todas las matrículas",
  textAr: "🔥 عرض خاص! خصم 50% على جميع التسجيلات",
  isActive: true,
  priority: 100,
  createdAt: serverTimestamp(),
  expiresAt: serverTimestamp({ days: 7 }),
  link: "/SchoolScreen"
}
```

### Mensaje de Nuevo Servicio
```javascript
{
  textEs: "🆕 Nuevo: Creador de CV profesional",
  textAr: "🆕 جديد: منشئ السيرة الذاتية الاحترافية",
  isActive: true,
  priority: 80,
  createdAt: serverTimestamp(),
  link: "/(tabs)/CreadorCVProScreen"
}
```

### Mensaje Informativo
```javascript
{
  textEs: "📚 Biblioteca digital ahora disponible",
  textAr: "📚 المكتبة الرقمية متاحة الآن",
  isActive: true,
  priority: 50,
  createdAt: serverTimestamp(),
  link: "/BibliotecaDigitalScreen"
}
```

## 4. Configuración en Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Selecciona tu proyecto: `academia-inmigrantes-movil`
3. En el menú izquierdo, ve a **Firestore Database**
4. Crea la colección `promoMessages`
5. Agrega documentos con la estructura anterior

## 5. Reglas de Seguridad (Opcional)

Agrega estas reglas en Firestore para proteger la colección:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /promoMessages/{docId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

## 6. Funcionamiento en la App

- Los mensajes se cargan automáticamente al iniciar la app
- Solo se muestran mensajes con `isActive: true`
- Los mensajes expirados (`expiresAt` < ahora) no se muestran
- Se ordenan por `priority` (descendente) y `createdAt` (descendente)
- Los mensajes dinámicos se combinan con los mensajes estáticos predefinidos

## 7. Actualización en Tiempo Real

Los mensajes se actualizan automáticamente cada vez que la app se reinicia o cuando los datos cambian en Firestore.
