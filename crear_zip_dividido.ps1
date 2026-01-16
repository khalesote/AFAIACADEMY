# Script para crear 3 archivos ZIP del código fuente (máximo 10MB cada uno)
# Para registro de propiedad intelectual

$ErrorActionPreference = "Stop"

$fecha = Get-Date -Format "yyyyMMdd"
$rutaBase = $PSScriptRoot
$maxSizeMB = 10
$maxSizeBytes = $maxSizeMB * 1024 * 1024

Write-Host "========================================" -ForegroundColor Magenta
Write-Host "Creando 3 archivos ZIP para registro" -ForegroundColor Magenta
Write-Host "Máximo ${maxSizeMB}MB cada uno" -ForegroundColor Magenta
Write-Host "========================================" -ForegroundColor Magenta

# Función para obtener archivos de un directorio recursivamente
function Get-ArchivosRecursivo {
    param(
        [string]$directorio,
        [array]$excluirPatrones = @()
    )
    
    if (-not (Test-Path $directorio)) {
        return @()
    }
    
    $archivos = @()
    Get-ChildItem -Path $directorio -Recurse -File -ErrorAction SilentlyContinue | ForEach-Object {
        $rutaRelativa = $_.FullName.Replace($rutaBase, "").TrimStart('\', '/').Replace('\', '/')
        $incluir = $true
        
        # Verificar exclusiones
        foreach ($excluir in $excluirPatrones) {
            if ($rutaRelativa -like "*$excluir*") {
                $incluir = $false
                break
            }
        }
        
        # Excluir extensiones compiladas
        $extension = [System.IO.Path]::GetExtension($_.FullName)
        $extensionesExcluidas = @(".o", ".a", ".so", ".apk", ".aab", ".dll", ".jar", ".lock", ".bin", ".pyc", ".d")
        if ($extensionesExcluidas -contains $extension) {
            $incluir = $false
        }
        
        if ($incluir) {
            $archivos += $_.FullName
        }
    }
    
    return $archivos
}

# Función para crear ZIP
function Crear-ZIP {
    param(
        [string]$nombreGrupo,
        [string]$descripcion,
        [array]$archivosIncluir,
        [array]$directoriosIncluir = @()
    )
    
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "Grupo: $descripcion" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    
    $tempDir = Join-Path $env:TEMP "zip_${nombreGrupo}_$(Get-Random)"
    New-Item -ItemType Directory -Path $tempDir -Force | Out-Null
    
    try {
        $archivosTotales = @()
        $sizeTotal = 0
        $excluirPatrones = @("node_modules", "build", ".expo", "dist", ".git", "__pycache__", ".cxx", ".gradle", "caches", "jdks", "daemon", "native", "kotlin-profile")
        
        # Agregar archivos específicos
        foreach ($archivo in $archivosIncluir) {
            $rutaCompleta = Join-Path $rutaBase $archivo
            if (Test-Path $rutaCompleta) {
                $fileSize = (Get-Item $rutaCompleta).Length
                if ($sizeTotal + $fileSize -le $maxSizeBytes) {
                    $archivosTotales += $rutaCompleta
                    $sizeTotal += $fileSize
                }
            }
        }
        
        # Agregar directorios
        foreach ($directorio in $directoriosIncluir) {
            $rutaCompleta = Join-Path $rutaBase $directorio
            $archivosDir = Get-ArchivosRecursivo -directorio $rutaCompleta -excluirPatrones $excluirPatrones
            
            foreach ($archivo in $archivosDir) {
                $fileSize = (Get-Item $archivo).Length
                if ($sizeTotal + $fileSize -le $maxSizeBytes) {
                    if (-not ($archivosTotales -contains $archivo)) {
                        $archivosTotales += $archivo
                        $sizeTotal += $fileSize
                    }
                }
            }
        }
        
        Write-Host "Copiando $($archivosTotales.Count) archivos..." -ForegroundColor Yellow
        
        $archivosCopiados = 0
        foreach ($archivo in $archivosTotales) {
            try {
                $rutaRelativa = $archivo.Replace($rutaBase, "").TrimStart('\', '/')
                $rutaDestino = Join-Path $tempDir $rutaRelativa
                $dirDestino = Split-Path $rutaDestino -Parent
                
                if (-not (Test-Path $dirDestino)) {
                    New-Item -ItemType Directory -Path $dirDestino -Force | Out-Null
                }
                
                Copy-Item $archivo $rutaDestino -Force
                $archivosCopiados++
            }
            catch {
                Write-Warning "Error al copiar $archivo : $_"
            }
        }
        
        # Crear ZIP
        $nombreZip = "${nombreGrupo}_${fecha}.zip"
        $rutaZip = Join-Path $rutaBase $nombreZip
        
        Write-Host "Comprimiendo..." -ForegroundColor Yellow
        
        if (Test-Path $rutaZip) {
            Remove-Item $rutaZip -Force
        }
        
        Compress-Archive -Path "$tempDir\*" -DestinationPath $rutaZip -CompressionLevel Optimal -Force
        
        $zipSize = (Get-Item $rutaZip).Length
        $zipSizeMB = [math]::Round($zipSize / 1MB, 2)
        
        Write-Host "`n✅ ZIP creado: $nombreZip" -ForegroundColor Green
        Write-Host "   Archivos: $archivosCopiados" -ForegroundColor Cyan
        Write-Host "   Tamano: $zipSizeMB MB" -ForegroundColor Cyan
        Write-Host "   Ubicacion: $rutaZip" -ForegroundColor Cyan
        
        if ($zipSizeMB -gt $maxSizeMB) {
            Write-Host "   ⚠️  ADVERTENCIA: El archivo excede ${maxSizeMB}MB" -ForegroundColor Red
        }
        
        return @{
            Nombre = $nombreZip
            TamanoMB = $zipSizeMB
            Archivos = $archivosCopiados
        }
    }
    catch {
        Write-Error "Error al crear ZIP para $nombreGrupo : $_"
        return $null
    }
    finally {
        if (Test-Path $tempDir) {
            Remove-Item $tempDir -Recurse -Force -ErrorAction SilentlyContinue
        }
    }
}

# ========================================
# GRUPO 1: ESCUELA VIRTUAL
# ========================================
$archivosEscuelaVirtual = @(
    # Escuela Virtual principal
    "app\(tabs)\SchoolScreen.tsx",
    "SchoolScreen_CORREGIDO.tsx",
    "SchoolScreen_FINAL_CORREGIDO.tsx",
    "app\ProfesorVirtual.tsx",
    "app\ProfesorVirtualIndice.tsx",
    "app\ClasesEspanolScreen.tsx",
    "app\DiplomaScreen.tsx",
    "app\CrucigramaScreen.tsx",
    # Componentes de escuela
    "app\components\ClasesEspanol.tsx",
    "app\components\ComprensionAuditiva.tsx",
    "app\components\EjerciciosInteractivos.tsx",
    "app\components\Crucigrama.tsx",
    "app\components\CrucigramaMejorado.tsx",
    "app\components\ContentCard.tsx",
    "app\components\UnitMeta.tsx",
    "app\components\AudioButton.tsx",
    "app\components\AudioTextSection.tsx",
    "app\components\HouseDiagram.tsx",
    "app\components\HumanBodyDiagram.tsx",
    "app\components\NavigationButton.tsx",
    "app\components\MainLayout.tsx",
    # Componentes de niveles
    "components\LevelCard.tsx",
    "components\LevelLock.tsx",
    "components\UnidadCard.tsx",
    # Contextos y progreso
    "contexts\UserContext.tsx",
    "contexts\UserProgressContext.tsx",
    # Utils de escuela
    "utils\unitProgress.ts",
    "utils\userDatabase.ts",
    "utils\userReference.ts",
    "utils\ejerciciosB1B2.ts",
    # Constantes
    "constants\Colors.ts",
    "constants\LevelColors.ts",
    # Config
    "config.ts"
)

$directoriosEscuelaVirtual = @(
    "app\assets\audio",
    "app\assets\videos"
)

$resultado1 = Crear-ZIP -nombreGrupo "1_EscuelaVirtual" -descripcion "Escuela Virtual - Sistema de aprendizaje" -archivosIncluir $archivosEscuelaVirtual -directoriosIncluir $directoriosEscuelaVirtual

# ========================================
# GRUPO 2: PREFORMACIÓN PROFESIONAL
# ========================================
$archivosPreFormacion = @(
    # PreFormación
    "app\(tabs)\PreFormacionScreen.tsx",
    "app\(tabs)\PagoFormacionScreen.tsx",
    # Componentes de pago formación
    "components\FormacionPayment.tsx",
    "components\PagoFormacionProfesional.tsx",
    "components\ProfesionalTrainingPayment.tsx",
    "components\FormacionAccessCodeInput.tsx",
    "components\CursoIndividualPayment.tsx",
    # Utils de formación
    "utils\cvTemplates.ts",
    "utils\cvTemplatesPro.ts",
    "utils\defaultResumeData.ts",
    "utils\agenda.ts",
    # Screens relacionadas
    "app\AgendaScreen.tsx",
    "app\CafeLiterarioScreen.tsx",
    "app\CafeLiterarioDialogoScreen.tsx",
    "app\LibrosDescargablesScreen.tsx",
    "app\components\LibrosDescargables.tsx",
    # Backend formación
    "academia-backend\server.js",
    "academia-backend\package.json"
)

$resultado2 = Crear-ZIP -nombreGrupo "2_PreFormacion" -descripcion "PreFormación Profesional - Sistema de formación" -archivosIncluir $archivosPreFormacion

# ========================================
# GRUPO 3: CORE E INFRAESTRUCTURA
# ========================================
$archivosCore = @(
    # Core de la app
    "app\_layout.tsx",
    "app\index.tsx",
    "app\(tabs)\_layout.tsx",
    "app\(tabs)\index.tsx",
    "App.js",
    "index.js",
    # Autenticación
    "app\AuthScreen.tsx",
    "app\LoginScreen.tsx",
    "app\RegisterScreen.tsx",
    "app\RegistroScreen.tsx",
    "ForgotPasswordScreen.js",
    # Componentes core
    "components\ProtectedRoute.tsx",
    "components\ScreenshotPrevent.tsx",
    "components\ExternalLink.tsx",
    "components\Collapsible.tsx",
    "components\ThemedText.tsx",
    "components\ThemedView.tsx",
    "components\HapticTab.tsx",
    "components\ParallaxScrollView.tsx",
    # Pagos principales
    "components\StripePayment.tsx",
    "components\AccessCodeInput.tsx",
    "components\CaptchaModal.tsx",
    # Utils core
    "utils\accessCodes.ts",
    "utils\appReference.ts",
    "utils\getAppReferenceForOEPM.ts",
    "utils\asyncSafe.ts",
    "utils\preventScreenshot.ts",
    "utils\requestMicrophonePermission.ts",
    "utils\installationVerification.ts",
    # Servicios
    "app\services\simpleUserService.ts",
    "app\services\userService.ts",
    # Configuración principal
    "package.json",
    "tsconfig.json",
    "babel.config.js",
    "metro.config.js",
    "app.config.js",
    "app.json",
    "eas.json",
    "firebase.json",
    "firestore.rules",
    # Backend API
    "api\stripe\create-checkout-session.js",
    "api\stripe\paid.js",
    "api\stripe\webhook.js",
    "backend-notificaciones.js",
    "enviarNotificacion.js",
    # Hooks
    "hooks\useResumeBuilder.ts",
    "hooks\useCvBuilderPro.ts",
    "hooks\useThemeColor.ts",
    "hooks\useColorScheme.web.ts",
    "hooks\useColorScheme.ts",
    "hooks\usePushNotifications.ts"
)

$directoriosCore = @(
    "config",
    "hooks"
)

$resultado3 = Crear-ZIP -nombreGrupo "3_CoreInfraestructura" -descripcion "Core e Infraestructura - Sistema base" -archivosIncluir $archivosCore -directoriosIncluir $directoriosCore

# Resumen final
Write-Host "`n========================================" -ForegroundColor Magenta
Write-Host "RESUMEN FINAL" -ForegroundColor Magenta
Write-Host "========================================" -ForegroundColor Magenta

$resultados = @($resultado1, $resultado2, $resultado3) | Where-Object { $_ -ne $null }

foreach ($resultado in $resultados) {
    Write-Host "$($resultado.Nombre): $($resultado.TamanoMB) MB ($($resultado.Archivos) archivos)" -ForegroundColor Green
}

Write-Host "`n✅ Proceso completado!" -ForegroundColor Green
