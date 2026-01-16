# Script para fusionar archivos nuevos desde main a versión estable
# Uso: .\fusionar-archivos-nuevos.ps1

Write-Host "🔄 Iniciando proceso de fusión..." -ForegroundColor Cyan

# 1. Guardar cambios actuales
Write-Host "`n📦 Guardando cambios actuales..." -ForegroundColor Yellow
git stash push -m "Cambios antes de fusionar - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

# 2. Identificar rama estable (ajusta según tu caso)
$ramaEstable = "version-estable"  # Cambia esto si es otra rama
Write-Host "`n✅ Cambiando a rama estable: $ramaEstable" -ForegroundColor Green
git checkout $ramaEstable

# 3. Crear nueva rama para fusionar
$nuevaRama = "fusion-contenido-nuevo-$(Get-Date -Format 'yyyyMMdd')"
Write-Host "`n🌿 Creando nueva rama: $nuevaRama" -ForegroundColor Green
git checkout -b $nuevaRama

# 4. Lista de archivos nuevos a copiar (basado en ARCHIVOS_PARA_COPIAR.md)
$archivosNuevos = @(
    # Archivos de pagos - Componentes
    "components/BizumPayment.tsx",
    "components/CursoIndividualPayment.tsx",
    "components/ExamenNacionalidadPayment.tsx",
    "components/FormacionPayment.tsx",
    "components/PagoFormacionProfesional.tsx",
    "components/ProfesionalTrainingPayment.tsx",
    "components/StripePayment.tsx",
    
    # Configuraciones
    "config/bizum.ts",
    "config/stripe.ts",
    "config/stripeExamenNacionalidad.ts",
    "config/stripeFormacion.ts",
    "config/stripeMatriculas.ts",
    
    # Utilidades
    
    # Pantallas de pago
    "app/(tabs)/PagoFormacionScreen.tsx",
    "app/(tabs)/PreFormacionScreen.tsx"
)

# 5. Copiar archivos desde main
Write-Host "`n📋 Copiando archivos nuevos desde main..." -ForegroundColor Yellow
$archivosCopiados = 0
$archivosNoEncontrados = @()

foreach ($archivo in $archivosNuevos) {
    $rutaCompleta = Join-Path $PSScriptRoot "..\$archivo"
    if (Test-Path $rutaCompleta) {
        try {
            git checkout main -- $archivo
            Write-Host "  ✅ $archivo" -ForegroundColor Green
            $archivosCopiados++
        } catch {
            Write-Host "  ❌ Error copiando $archivo : $_" -ForegroundColor Red
            $archivosNoEncontrados += $archivo
        }
    } else {
        Write-Host "  ⚠️  No encontrado: $archivo" -ForegroundColor Yellow
        $archivosNoEncontrados += $archivo
    }
}

# 6. Copiar carpetas completas (más eficiente para muchos archivos)
Write-Host "`n📁 Copiando carpetas completas..." -ForegroundColor Yellow

$carpetasACopiar = @(
    "app/(tabs)/B1_Umbral/clases",
    "app/(tabs)/B2_Avanzado/clases",
    "app/components",
    "app/services",
    "app/types"
)

foreach ($carpeta in $carpetasACopiar) {
    $rutaCompleta = Join-Path $PSScriptRoot "..\$carpeta"
    if (Test-Path $rutaCompleta) {
        try {
            git checkout main -- "$carpeta/*"
            Write-Host "  ✅ Carpeta: $carpeta" -ForegroundColor Green
        } catch {
            Write-Host "  ⚠️  Carpeta: $carpeta (algunos archivos pueden no existir)" -ForegroundColor Yellow
        }
    }
}

# 7. Resumen
Write-Host "`n📊 RESUMEN:" -ForegroundColor Cyan
Write-Host "  ✅ Archivos copiados: $archivosCopiados" -ForegroundColor Green
if ($archivosNoEncontrados.Count -gt 0) {
    Write-Host "  ⚠️  Archivos no encontrados: $($archivosNoEncontrados.Count)" -ForegroundColor Yellow
    foreach ($archivo in $archivosNoEncontrados) {
        Write-Host "     - $archivo" -ForegroundColor Gray
    }
}

# 8. Mostrar estado
Write-Host "`n📝 Estado actual:" -ForegroundColor Cyan
git status --short | Select-Object -First 20

Write-Host "`n✅ Proceso completado!" -ForegroundColor Green
Write-Host "`n📋 Próximos pasos:" -ForegroundColor Yellow
Write-Host "  1. Revisa los cambios: git status" -ForegroundColor White
Write-Host "  2. Instala dependencias: npm install" -ForegroundColor White
Write-Host "  3. Prueba la app: npx expo run:android" -ForegroundColor White
Write-Host "  4. Si todo funciona: git commit -m 'feat: agregar contenido nuevo y sistema de pagos'" -ForegroundColor White





