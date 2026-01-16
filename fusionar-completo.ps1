# Script completo para fusionar archivos nuevos desde main a version-estable
# Uso: .\fusionar-completo.ps1

Write-Host "🔄 FUSIÓN COMPLETA: Recuperar versión estable + Archivos nuevos" -ForegroundColor Cyan
Write-Host "=" * 70 -ForegroundColor Cyan

# 1. Guardar cambios actuales
Write-Host "`n📦 Paso 1: Guardando cambios actuales..." -ForegroundColor Yellow
$stashMessage = "Cambios antes de fusionar - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git stash push -m $stashMessage
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Cambios guardados en stash" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  No hay cambios para guardar" -ForegroundColor Yellow
}

# 2. Cambiar a version-estable
Write-Host "`n✅ Paso 2: Cambiando a version-estable..." -ForegroundColor Yellow
git checkout version-estable
if ($LASTEXITCODE -ne 0) {
    Write-Host "   ❌ Error: No se pudo cambiar a version-estable" -ForegroundColor Red
    exit 1
}
Write-Host "   ✅ En rama version-estable" -ForegroundColor Green

# 3. Crear nueva rama
$nuevaRama = "fusion-contenido-nuevo-$(Get-Date -Format 'yyyyMMdd-HHmm')"
Write-Host "`n🌿 Paso 3: Creando nueva rama: $nuevaRama" -ForegroundColor Yellow
git checkout -b $nuevaRama
Write-Host "   ✅ Rama creada: $nuevaRama" -ForegroundColor Green

# 4. Copiar TODOS los archivos nuevos desde main
Write-Host "`n📋 Paso 4: Copiando archivos nuevos desde main..." -ForegroundColor Yellow
Write-Host "   (Esto puede tomar unos minutos...)" -ForegroundColor Gray

$archivosCopiados = 0
$errores = 0

# Función para copiar archivo
function Copiar-Archivo {
    param($archivo)
    try {
        $resultado = git checkout main -- $archivo 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "   ✅ $archivo" -ForegroundColor Green
            return $true
        } else {
            Write-Host "   ⚠️  $archivo (no existe en main)" -ForegroundColor Yellow
            return $false
        }
    } catch {
        Write-Host "   ❌ Error: $archivo - $_" -ForegroundColor Red
        return $false
    }
}

# Lista completa de archivos a copiar
$archivos = @(
    # PAGOS - Componentes
    "components/BizumPayment.tsx",
    "components/CursoIndividualPayment.tsx",
    "components/ExamenNacionalidadPayment.tsx",
    "components/FormacionPayment.tsx",
    "components/PagoFormacionProfesional.tsx",
    "components/ProfesionalTrainingPayment.tsx",
    "components/StripePayment.tsx",
    
    # PAGOS - Config
    "config/bizum.ts",
    "config/stripe.ts",
    "config/stripeExamenNacionalidad.ts",
    "config/stripeFormacion.ts",
    "config/stripeMatriculas.ts",
    
    # PAGOS - Utils
    
    # PAGOS - Pantallas
    "app/(tabs)/PagoFormacionScreen.tsx",
    "app/(tabs)/PreFormacionScreen.tsx"
)

# Copiar archivos individuales
foreach ($archivo in $archivos) {
    if (Copiar-Archivo $archivo) {
        $archivosCopiados++
    } else {
        $errores++
    }
}

# Copiar carpetas completas (más eficiente)
Write-Host "`n📁 Copiando carpetas completas..." -ForegroundColor Yellow

$carpetas = @(
    "components",
    "app/(tabs)/B1_Umbral/clases",
    "app/(tabs)/B2_Avanzado/clases",
    "app/components",
    "app/services",
    "app/types",
    "utils"
)

foreach ($carpeta in $carpetas) {
    try {
        git checkout main -- "$carpeta/*" 2>&1 | Out-Null
        Write-Host "   ✅ Carpeta: $carpeta" -ForegroundColor Green
    } catch {
        Write-Host "   ⚠️  Carpeta: $carpeta (algunos archivos pueden no existir)" -ForegroundColor Yellow
    }
}

# Copiar pantallas de cursos profesionales
Write-Host "`n📚 Copiando pantallas de cursos profesionales..." -ForegroundColor Yellow
$cursos = @(
    "CursoAgriculturaScreen.tsx",
    "CursoAlbanileriaScreen.tsx",
    "CursoAlmacenScreen.tsx",
    "CursoAtencionClienteScreen.tsx",
    "CursoCamareroScreen.tsx",
    "CursoCarniceriaScreen.tsx",
    "CursoCarpinteriaScreen.tsx",
    "CursoCarretilleroScreen.tsx",
    "CursoCocinaScreen.tsx",
    "CursoComercioScreen.tsx",
    "CursoCuidadoMayoresScreen.tsx",
    "CursoElectricidadScreen.tsx",
    "CursoEsteticaScreen.tsx",
    "CursoExcelScreen.tsx",
    "CursoFontaneroScreen.tsx",
    "CursoInformaticaScreen.tsx",
    "CursoJardineriaScreen.tsx",
    "CursoLimpiezaScreen.tsx",
    "CursoManipulacionAlimentosScreen.tsx",
    "CursoMecanicaScreen.tsx",
    "CursoPanaderiaScreen.tsx",
    "CursoPeluqueriaScreen.tsx",
    "CursoPinturaScreen.tsx",
    "CursoRecepcionistaScreen.tsx",
    "CursoRepartidorScreen.tsx",
    "CursoSeguridadLaboralScreen.tsx",
    "CursoSoldaduraScreen.tsx",
    "CursoWordScreen.tsx"
)

foreach ($curso in $cursos) {
    Copiar-Archivo "app/(tabs)/$curso" | Out-Null
}

# Copiar otras pantallas importantes
Write-Host "`n🖥️  Copiando otras pantallas..." -ForegroundColor Yellow
$otrasPantallas = @(
    "app/(tabs)/AutoresPoetasScreen.tsx",
    "app/(tabs)/BibliotecaDigitalScreen.tsx",
    "app/(tabs)/CulturaGeneralScreen.tsx",
    "app/(tabs)/CuentosPopularesScreen.tsx",
    "app/(tabs)/FiestasScreen.tsx",
    "app/(tabs)/GramaticaScreen.tsx",
    "app/(tabs)/MuseosScreen.tsx",
    "app/(tabs)/MusicaScreen.tsx",
    "app/(tabs)/PersonajesScreen.tsx",
    "app/(tabs)/TeatroScreen.tsx",
    "app/(tabs)/VocabularioScreen.tsx",
    "app/(tabs)/VerbosScreen.tsx",
    "app/(tabs)/AdjetivosScreen.tsx",
    "app/(tabs)/JuegoAlfabetoScreen.tsx",
    "app/(tabs)/JuegoAudioScreen.tsx",
    "app/(tabs)/JuegoColoresScreen.tsx",
    "app/(tabs)/JuegoEmparejarScreen.tsx",
    "app/(tabs)/JuegoInstrumentosScreen.tsx",
    "app/(tabs)/JuegoMemoriaScreen.tsx",
    "app/(tabs)/JuegoOrdenarScreen.tsx",
    "app/(tabs)/JuegoPalabrasScreen.tsx",
    "app/(tabs)/JuegoSeleccionScreen.tsx",
    "app/(tabs)/JuegosDeTareasScreen.tsx",
    "app/(tabs)/SnakeLetrasScreen.tsx",
    "app/(tabs)/FoneticaMenuScreen.tsx",
    "app/(tabs)/FoneticaPronunciacionScreen.tsx",
    "app/(tabs)/FoneticaVocalesScreen.tsx",
    "app/(tabs)/FoneticaJuegoReconocimientoScreen.tsx",
    "app/(tabs)/TextoFonEticaScreen.tsx",
    "app/(tabs)/LetraScreen.tsx",
    "app/(tabs)/DiccionarioScreen.tsx",
    "app/(tabs)/DiccionarioSQLiteScreen.tsx",
    "app/(tabs)/ExamenNacionalidadScreen.tsx",
    "app/(tabs)/DiplomaGeneradoScreen.tsx",
    "app/AdminUsersScreen.tsx",
    "app/AgendaScreen.tsx",
    "app/CafeLiterarioScreen.tsx",
    "app/ClasesEspanolScreen.tsx",
    "app/ContactFormScreen.tsx",
    "app/CrucigramaScreen.tsx",
    "app/DiplomaScreen.tsx",
    "app/LibrosDescargablesScreen.tsx",
    "app/NoticiasScreen.tsx",
    "app/UserProfileScreen.tsx"
)

foreach ($pantalla in $otrasPantallas) {
    Copiar-Archivo $pantalla | Out-Null
}

# 5. Resumen
Write-Host "`n" + ("=" * 70) -ForegroundColor Cyan
Write-Host "📊 RESUMEN FINAL" -ForegroundColor Cyan
Write-Host "=" * 70 -ForegroundColor Cyan
Write-Host "  ✅ Archivos copiados: $archivosCopiados" -ForegroundColor Green
Write-Host "  ⚠️  Archivos no encontrados: $errores" -ForegroundColor Yellow
Write-Host "  🌿 Nueva rama: $nuevaRama" -ForegroundColor Cyan

# 6. Mostrar estado
Write-Host "`n📝 Archivos modificados/agregados:" -ForegroundColor Yellow
git status --short | Select-Object -First 30

Write-Host "`nFusion completada!" -ForegroundColor Green
Write-Host "`nPROXIMOS PASOS:" -ForegroundColor Cyan
Write-Host "  1. Revisa los cambios: git status" -ForegroundColor White
Write-Host "  2. Instala dependencias: npm install" -ForegroundColor White
Write-Host "  3. Copia variables de entorno del .env" -ForegroundColor White
Write-Host "  4. Prueba la app: npx expo run:android" -ForegroundColor White
Write-Host "  5. Si todo funciona: git add . ; git commit -m 'feat: agregar contenido nuevo y sistema de pagos'" -ForegroundColor White
Write-Host "Para ver los cambios guardados: git stash list" -ForegroundColor Gray

