# 📋 Lista Completa de Archivos para Copiar a la Versión Vieja

## 🎯 INSTRUCCIONES
1. Copia TODOS los archivos de esta lista a la versión vieja que funciona
2. Mantén la misma estructura de carpetas
3. Instala las dependencias nuevas (ver sección Dependencias)
4. Copia las variables de entorno del `.env`

---

## 💳 1. ARCHIVOS DE PAGOS

### Componentes de Pago (`components/`)
```
✅ BizumPayment.tsx
✅ CursoIndividualPayment.tsx
✅ ExamenNacionalidadPayment.tsx
✅ FormacionPayment.tsx
✅ PagoFormacionProfesional.tsx
✅ ProfesionalTrainingPayment.tsx
✅ StripePayment.tsx
```

### Configuraciones (`config/`)
```
✅ bizum.ts
✅ stripe.ts
✅ stripeExamenNacionalidad.ts
✅ stripeFormacion.ts
✅ stripeMatriculas.ts
```

### Utilidades (`utils/`)
```
```

### Pantallas de Pago (`app/(tabs)/`)
```
✅ PagoFormacionScreen.tsx
✅ PreFormacionScreen.tsx
✅ PreFormacionScreen_temp.tsx (si existe)
```

---

## 📚 2. CONTENIDO NUEVO - PANTALLAS PRINCIPALES

### Pantallas de Cursos Profesionales (`app/(tabs)/`)
```
✅ CursoAgriculturaScreen.tsx
✅ CursoAlbanileriaScreen.tsx
✅ CursoAlmacenScreen.tsx
✅ CursoAtencionClienteScreen.tsx
✅ CursoCamareroScreen.tsx
✅ CursoCarniceriaScreen.tsx
✅ CursoCarpinteriaScreen.tsx
✅ CursoCarretilleroScreen.tsx
✅ CursoCocinaScreen.tsx
✅ CursoComercioScreen.tsx
✅ CursoCuidadoMayoresScreen.tsx
✅ CursoElectricidadScreen.tsx
✅ CursoEsteticaScreen.tsx
✅ CursoExcelScreen.tsx
✅ CursoFontaneroScreen.tsx
✅ CursoInformaticaScreen.tsx
✅ CursoJardineriaScreen.tsx
✅ CursoLimpiezaScreen.tsx
✅ CursoManipulacionAlimentosScreen.tsx
✅ CursoMecanicaScreen.tsx
✅ CursoPanaderiaScreen.tsx
✅ CursoPeluqueriaScreen.tsx
✅ CursoPinturaScreen.tsx
✅ CursoRecepcionistaScreen.tsx
✅ CursoRepartidorScreen.tsx
✅ CursoSeguridadLaboralScreen.tsx
✅ CursoSoldaduraScreen.tsx
✅ CursoWordScreen.tsx
```

### Pantallas Culturales y Educativas (`app/(tabs)/`)
```
✅ AutoresPoetasScreen.tsx
✅ BibliotecaDigitalScreen.tsx
✅ CulturaGeneralScreen.tsx
✅ CuentosPopularesScreen.tsx
✅ FiestasScreen.tsx
✅ GramaticaScreen.tsx
✅ MuseosScreen.tsx
✅ MusicaScreen.tsx
✅ PersonajesScreen.tsx
✅ TeatroScreen.tsx
✅ VocabularioScreen.tsx
✅ VerbosScreen.tsx
✅ AdjetivosScreen.tsx
```

### Pantallas de Juegos (`app/(tabs)/`)
```
✅ JuegoAlfabetoScreen.tsx
✅ JuegoAudioScreen.tsx
✅ JuegoColoresScreen.tsx
✅ JuegoEmparejarScreen.tsx
✅ JuegoInstrumentosScreen.tsx
✅ JuegoMemoriaScreen.tsx
✅ JuegoOrdenarScreen.tsx
✅ JuegoPalabrasScreen.tsx
✅ JuegoSeleccionScreen.tsx
✅ JuegosDeTareasScreen.tsx
✅ SnakeLetrasScreen.tsx
```

### Pantallas de Fonética (`app/(tabs)/`)
```
✅ FoneticaMenuScreen.tsx
✅ FoneticaPronunciacionScreen.tsx
✅ FoneticaVocalesScreen.tsx
✅ FoneticaJuegoReconocimientoScreen.tsx
✅ TextoFonEticaScreen.tsx
✅ LetraScreen.tsx
```

### Pantallas de Diccionario (`app/(tabs)/`)
```
✅ DiccionarioScreen.tsx
✅ DiccionarioSQLiteScreen.tsx
```

### Pantallas de Información y Servicios (`app/(tabs)/`)
```
✅ AbogadosExtranjeriaScreen.tsx
✅ AsesoriaScreen.tsx
✅ AyudasONGScreen.tsx
✅ CarpetaCiudadanaScreen.tsx
✅ ComunidadInfoScreen.tsx
✅ CreadorCVScreen.tsx
✅ CreadorCVProScreen.tsx
✅ IntegracionMujerScreen.tsx
✅ NoticiasInmigracionScreen.tsx
✅ PoliticaAccesoDatosScreen.tsx
✅ PoliticaSeguridadScreen.tsx
✅ RevistaScreen.tsx
```

### Pantallas de Exámenes y Diplomas (`app/(tabs)/`)
```
✅ ExamenNacionalidadScreen.tsx
✅ DiplomaGeneradoScreen.tsx
✅ DiplomaSoloProfesorA2.tsx
```

### Otras Pantallas (`app/(tabs)/`)
```
✅ AprendeComponerFrasesScreen.tsx
✅ AprendeGestionarPapelesScreen.tsx
✅ DialogosAnimadosScreen.tsx
✅ DialogoScreen.tsx
✅ ExpresionNivel1Screen.tsx
✅ MatriculaScreen.tsx
✅ NivelesScreen.tsx
✅ SerEstarScreen.tsx
✅ SituacionesScreen.tsx
✅ Unidad2DialogoAutoresScreen.tsx
```

### Pantallas en `app/` (raíz)
```
✅ AdminUsersScreen.tsx
✅ AgendaScreen.tsx
✅ CafeLiterarioScreen.tsx
✅ CafeLiterarioDialogoScreen.tsx
✅ ClasesEspanolScreen.tsx
✅ ContactFormScreen.tsx
✅ CrucigramaScreen.tsx
✅ DiplomaScreen.tsx
✅ LibrosDescargablesScreen.tsx
✅ NoticiasScreen.tsx
✅ OfferWebViewScreen.tsx
✅ ProfesionesDialogosScreen.tsx
✅ PruebaVozScreen.tsx
✅ RegisterScreen.tsx
✅ SnakeGameScreen.tsx
✅ SnakeLetrasScreen.tsx
✅ TestFirebaseScreen.tsx
✅ TestVoiceScreen.tsx
✅ UserInfoScreen.tsx
✅ UserProfileScreen.tsx
✅ VideoPresentationScreen.tsx
✅ AbecedarioTraduccionArabe.tsx
```

---

## 📖 3. CONTENIDO NUEVO - CLASES Y UNIDADES

### Clases B1 Umbral (`app/(tabs)/B1_Umbral/clases/`)
```
✅ Alimentacion.tsx
✅ Cultura.tsx
✅ Deportes.tsx
✅ Estudios.tsx
✅ Experiencias.tsx
✅ FiestasTradiciones.tsx
✅ MedioAmbiente.tsx
✅ MedioAmbienteNuevo.tsx
✅ MediosComunicacion.tsx
✅ ProblemasSociales.tsx
✅ Relaciones.tsx
✅ Salud.tsx
✅ Tecnologia.tsx
✅ Trabajo.tsx
✅ Transporte.tsx
✅ Turismo.tsx
✅ Viajes.tsx
✅ VidaCotidiana.tsx
✅ Vivienda.tsx
✅ Voluntariado.tsx
✅ LiteraturaExpresiones.tsx
✅ GastronomiaHispana.tsx (si existe)
```

### Clases B2 Avanzado (`app/(tabs)/B2_Avanzado/clases/`)
```
✅ ActualidadInternacional.tsx
✅ ArteTeatro.tsx
✅ CienciaTecnologia.tsx
✅ CulturaArte.tsx
✅ DebatesSociales.tsx
✅ EconomiaConsumo.tsx
✅ EstudiosSuperiores.tsx
✅ HistoriaEspanola.tsx
✅ Liderazgo.tsx
✅ LiteraturaEspanola.tsx
✅ MundoLaboral.tsx
✅ Poesia.tsx
✅ RelacionesInterculturales.tsx
✅ SaludMental.tsx
✅ ViajesLargos.tsx
✅ ExpresionOral.tsx
✅ ExamenFinal.tsx
```

### Clases A1 y A2 (si hay nuevas)
```
✅ Revisa app/(tabs)/A1_Acceso/clases/
✅ Revisa app/(tabs)/A2_Plataforma/clases/
```

---

## 🧩 4. COMPONENTES NUEVOS

### Componentes en `components/`
```
✅ AudioButton.tsx
✅ AudioTextSection.tsx
✅ CaptchaModal.tsx
✅ CartoonDialogSection.tsx
✅ ClasesEspanol.tsx
✅ Collapsible.tsx
✅ ComprensionAuditiva.tsx
✅ ContentCard.tsx
✅ Crucigrama.tsx
✅ CrucigramaMejorado.tsx
✅ EjerciciosInteractivos.tsx
✅ EjerciciosInteractivos_backup.tsx (opcional)
✅ EjerciciosInteractivos_old.tsx (opcional)
✅ ExamenNacionalidadAccessCodeInput.tsx
✅ ExamenPresencialForm.tsx
✅ ExternalLink.tsx
✅ FormacionAccessCodeInput.tsx
✅ HapticTab.tsx
✅ HelloWave.tsx
✅ HouseDiagram.tsx
✅ HumanBodyDiagram.tsx
✅ LevelCard.tsx
✅ LevelLock.tsx
✅ LibrosDescargables.tsx
✅ MainLayout.tsx
✅ MarketingPoster.js
✅ NavigationButton.tsx
✅ ParallaxScrollView.tsx
✅ ProtectedRoute.tsx
✅ ScreenshotPrevent.tsx
✅ TikTokVerification.tsx
✅ ThemedText.tsx
✅ ThemedView.tsx
✅ UnidadCard.tsx
✅ UnitMeta.tsx
```

### Componentes en `app/components/`
```
✅ AudioButton.tsx
✅ AudioTextSection.tsx
✅ ClasesEspanol.tsx
✅ ComprensionAuditiva.tsx
✅ ContentCard.tsx
✅ Crucigrama.tsx
✅ CrucigramaMejorado.tsx
✅ EjerciciosInteractivos.tsx
✅ EjerciciosInteractivos_backup.tsx
✅ EjerciciosInteractivos_old.tsx
✅ HouseDiagram.tsx
✅ HumanBodyDiagram.tsx
✅ LibrosDescargables.tsx
✅ MainLayout.tsx
✅ NavigationButton.tsx
✅ TikTokVerification.tsx
✅ UnitMeta.tsx
```

---

## 🛠️ 5. UTILIDADES Y SERVICIOS

### Utilidades (`utils/`)
```
✅ accessCodes.ts
✅ agenda.ts
✅ appReference.ts
✅ asyncSafe.ts
✅ clearDevelopmentData.ts
✅ cvTemplates.ts
✅ cvTemplatesPro.ts
✅ defaultResumeData.ts
✅ ejerciciosB1B2.ts
✅ getAppReferenceForOEPM.ts
✅ installationVerification.ts
✅ preventScreenshot.ts
✅ requestMicrophonePermission.ts
✅ speechSession.ts
✅ test_shuffle.js
✅ types.ts
✅ unitCompletion.ts
✅ unitProgress.ts
✅ userDatabase.ts
✅ userHelpers.ts
✅ userReference.ts
```

### Servicios (`app/services/`)
```
✅ simpleUserService.ts
✅ userService.ts
```

---

## 📁 6. ARCHIVOS DE CONFIGURACIÓN Y DATOS

### Archivos JSON de Datos
```
✅ app/dialogoAutores.json
✅ app/dialogoEncuentroCafe.json
✅ app/dialogoUnidad3.json
✅ app/dialogoUnidad4.json
✅ app/dialogoUnidad5.json
```

### Tipos TypeScript (`app/types/`)
```
✅ B1_Umbral_clases_types.ts
```

### Archivos de Configuración
```
✅ .env (solo las variables nuevas de pagos)
✅ app.json (si hay cambios en configuración)
```

---

## 🎨 7. ASSETS Y RECURSOS

### Assets (`app/assets/`)
```
✅ Copia TODA la carpeta assets/ completa
✅ Incluye: audio/, autores/, lottie/, museos/, Snake3d/, videos/, etc.
✅ Incluye archivos: banderas.json, diccionario.db, examen_demo_b2.json, etc.
```

---

## 📦 8. DEPENDENCIAS NUEVAS

### Instalar en la versión vieja:
```bash
npm install @stripe/stripe-react-native@0.45.0
npm install fast-xml-parser@^5.2.2
npm install @emailjs/browser@^4.4.1
```

### Verificar si estas dependencias ya existen:
```bash
# Revisa package.json de la versión vieja y compara
```

---

## ⚙️ 9. VARIABLES DE ENTORNO (.env)

### Variables de Stripe:
```
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
```

### Otras variables relacionadas con pagos:
```
# Revisa tu .env actual y copia todas las variables relacionadas
```

---

## ✅ 10. CHECKLIST FINAL

Después de copiar todo:

- [ ] Instalar dependencias nuevas: `npm install`
- [ ] Copiar variables de entorno al `.env`
- [ ] Verificar que las rutas de importación sean correctas
- [ ] Verificar que los assets estén en las rutas correctas
- [ ] Probar que la app compile: `npx expo start`
- [ ] Probar funcionalidad de pagos
- [ ] Probar pantallas nuevas

---

## 🚨 NOTAS IMPORTANTES

1. **NO copies** archivos de configuración de Android (`android/`) a menos que sean específicos de pagos
2. **NO copies** `node_modules/` - se reinstalan
3. **NO copies** archivos de build (`.gradle`, `build/`, etc.)
4. **SÍ copia** toda la carpeta `app/` excepto archivos de build
5. **SÍ copia** toda la carpeta `components/`
6. **SÍ copia** toda la carpeta `utils/`
7. **SÍ copia** toda la carpeta `config/`

---

## 📝 COMANDOS ÚTILES

```bash
# 1. Instalar dependencias
npm install

# 2. Limpiar cache
npx expo start -c

# 3. Verificar que compile
npx expo run:android

# 4. Verificar estructura
# Asegúrate de que todas las rutas de import sean correctas
```





