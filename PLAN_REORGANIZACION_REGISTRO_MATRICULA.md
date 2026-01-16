# Plan de Reorganización: Registro y Matrícula

## Objetivo
Separar claramente el proceso de registro del proceso de matrícula:
- **Registro**: Usuario se registra con todos sus datos personales → Guardado como "registered" en Firebase
- **Matrícula**: Usuario registrado selecciona nivel y paga → Solo actualiza estado de matrícula en Firebase

## Cambios a Realizar

### 1. RegisterScreen (app/RegisterScreen.tsx)
**Estado actual**: Solo pide nombre, apellidos, email y contraseña

**Nuevo estado**: Debe incluir:
- Email y contraseña (crear cuenta en Firebase Auth)
- Nombre
- Primer apellido
- Segundo apellido (opcional)
- Fecha de nacimiento
- Provincia
- Teléfono
- Tipo de documento (NIE/NIF/PASAPORTE)
- Número de documento

**Al registrarse**:
1. Crear usuario en Firebase Auth con email/contraseña
2. Guardar todos los datos personales en Firestore como usuario "registered" (userType: 'registered')
3. NO marcar como matriculado

### 2. MatriculaScreen (app/(tabs)/MatriculaScreen.tsx)
**Estado actual**: Incluye formulario de datos personales + selección de nivel + pago

**Nuevo estado**: Solo debe incluir:
- Verificación de que el usuario está registrado
- Si no está registrado, redirigir a registro
- Selección de nivel (A1, A2, B1, B2)
- Método de pago (Stripe/Cecabank) o código de acceso
- Captura facial (opcional)
- Al completar pago, actualizar estado de matrícula en Firebase

**Eliminar**:
- Formulario de datos personales (ya está en registro)
- Parámetros de navegación con datos personales

### 3. Protección de Acceso
**SchoolScreen y PreFormacionScreen**:
- Verificar que el usuario esté matriculado antes de permitir acceso
- Si no está matriculado, mostrar mensaje y botón para matricularse

### 4. UserService (services/userService.ts)
**Modificar registerUser**:
- Crear usuario en Firebase Auth
- Guardar todos los datos personales en Firestore
- Marcar como userType: 'registered' (NO 'enrolled')

**Modificar completeEnrollment** (en MatriculaScreen):
- Solo actualizar campos de matrícula en Firebase
- Cambiar userType a 'enrolled' si corresponde
- NO pedir datos personales de nuevo

## Flujo Nuevo

### Registro
1. Usuario va a RegisterScreen
2. Completa formulario completo (email, contraseña, datos personales)
3. Se crea cuenta en Firebase Auth
4. Se guardan todos los datos en Firestore como "registered"
5. Usuario puede acceder a la app (excepto Escuela Virtual y PreFormación)

### Matrícula
1. Usuario registrado va a MatriculaScreen
2. Sistema verifica que esté registrado (tiene datos personales en Firebase)
3. Si no está registrado, redirige a RegisterScreen
4. Usuario selecciona nivel (A1, A2, B1, B2)
5. Usuario paga o usa código de acceso
6. Se actualiza estado de matrícula en Firebase
7. Se cambia userType a 'enrolled' si corresponde
8. Usuario puede acceder a Escuela Virtual

## Archivos a Modificar

1. ✅ `app/RegisterScreen.tsx` - Agregar formulario completo de datos personales
2. ✅ `app/(tabs)/MatriculaScreen.tsx` - Eliminar formulario, solo selección y pago
3. ✅ `services/userService.ts` - Actualizar registerUser para guardar todos los datos
4. ✅ `app/(tabs)/SchoolScreen.tsx` - Verificar matrícula antes de permitir acceso
5. ✅ `app/(tabs)/PreFormacionScreen.tsx` - Verificar matrícula antes de permitir acceso
6. ✅ `app/(tabs)/FormularioDatosPersonales.tsx` - Puede eliminarse o usarse solo para PreFormación

























