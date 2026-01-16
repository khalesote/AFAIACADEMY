# Script para crear ZIP completo del código fuente para registro de propiedad intelectual
# Sin límite de tamaño - incluye todo el código fuente relevante

$ErrorActionPreference = "Stop"

$fecha = Get-Date -Format "yyyyMMdd"
$nombreZip = "CodigoFuente_Completo_AcademiaInmigrantes_${fecha}.zip"
$rutaZip = Join-Path $PSScriptRoot $nombreZip

Write-Host "========================================" -ForegroundColor Magenta
Write-Host "Creando ZIP COMPLETO del código fuente" -ForegroundColor Green
Write-Host "Para registro de propiedad intelectual" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Magenta
Write-Host "Archivo de salida: $rutaZip" -ForegroundColor Cyan

# Directorios y archivos a excluir
$excluir = @(
    "node_modules",
    "build",
    "caches",
    ".expo",
    "dist",
    "web-build",
    "coverage",
    "jdks",
    "daemon",
    "native",
    "kotlin-profile",
    ".gradle",
    ".idea",
    ".vscode",
    "__pycache__",
    ".git",
    "android\build",
    "android\.gradle",
    "android\.idea",
    "android\app\build",
    "android\app\.cxx",
    "academia-backend\node_modules"
)

# Extensiones de archivos a excluir
$excluirExtensiones = @(
    ".log",
    ".tmp",
    ".bak",
    ".pyc",
    ".lock",
    ".bin",
    ".dll",
    ".jar",
    ".jks",
    ".p8",
    ".p12",
    ".key",
    ".mobileprovision",
    ".pem",
    ".orig",
    ".iml",
    ".tsbuildinfo",
    ".TAG",
    ".o",
    ".a",
    ".so",
    ".apk",
    ".aab",
    ".d"
)

# Archivos específicos a excluir
$excluirArchivos = @(
    "local.properties",
    ".DS_Store",
    "Thumbs.db",
    ".env",
    ".env.*",
    "expo-env.d.ts",
    "metro-health-check*",
    "npm-debug.*",
    "yarn-debug.*",
    "yarn-error.*"
)

# Función para verificar si un archivo debe ser excluido
function DebeExcluirse {
    param(
        [string]$rutaArchivo,
        [string]$rutaBase
    )
    
    $rutaRelativa = $rutaArchivo.Replace($rutaBase, "").TrimStart('\', '/')
    
    # Verificar directorios excluidos
    foreach ($dir in $excluir) {
        $dirNormalizado = $dir.Replace('\', '/')
        $rutaNormalizada = $rutaRelativa.Replace('\', '/')
        
        if ($rutaNormalizada -like "$dirNormalizado*" -or $rutaNormalizada -like "*/$dirNormalizado/*") {
            return $true
        }
    }
    
    # Verificar extensiones excluidas
    $extension = [System.IO.Path]::GetExtension($rutaArchivo)
    if ($excluirExtensiones -contains $extension) {
        return $true
    }
    
    # Verificar archivos específicos
    $nombreArchivo = [System.IO.Path]::GetFileName($rutaArchivo)
    foreach ($patron in $excluirArchivos) {
        if ($nombreArchivo -like $patron) {
            return $true
        }
    }
    
    return $false
}

# Crear directorio temporal para archivos a incluir
$tempDir = Join-Path $env:TEMP "codigo_fuente_completo_$(Get-Random)"
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

try {
    $rutaBase = $PSScriptRoot
    $archivosIncluidos = 0
    $archivosExcluidos = 0
    
    Write-Host "`nRecopilando archivos..." -ForegroundColor Yellow
    
    # Obtener todos los archivos del directorio
    $archivos = Get-ChildItem -Path $rutaBase -Recurse -File | Where-Object {
        -not $_.PSIsContainer
    }
    
    foreach ($archivo in $archivos) {
        $rutaCompleta = $archivo.FullName
        
        if (-not (DebeExcluirse -rutaArchivo $rutaCompleta -rutaBase $rutaBase)) {
            try {
                $rutaRelativa = $rutaCompleta.Replace($rutaBase, "").TrimStart('\', '/')
                $rutaDestino = Join-Path $tempDir $rutaRelativa
                $dirDestino = Split-Path $rutaDestino -Parent
                
                if (-not (Test-Path $dirDestino)) {
                    New-Item -ItemType Directory -Path $dirDestino -Force | Out-Null
                }
                
                Copy-Item $rutaCompleta $rutaDestino -Force
                $archivosIncluidos++
                
                if ($archivosIncluidos % 200 -eq 0) {
                    Write-Host "  Procesados $archivosIncluidos archivos..." -ForegroundColor Yellow
                }
            }
            catch {
                Write-Warning "Error al copiar archivo $rutaCompleta : $_"
            }
        }
        else {
            $archivosExcluidos++
        }
    }
    
    Write-Host "`nComprimiendo archivos..." -ForegroundColor Yellow
    
    # Eliminar ZIP existente si existe
    if (Test-Path $rutaZip) {
        Remove-Item $rutaZip -Force
    }
    
    # Crear el ZIP
    Compress-Archive -Path "$tempDir\*" -DestinationPath $rutaZip -CompressionLevel Optimal -Force
    
    $zipSize = (Get-Item $rutaZip).Length
    $zipSizeMB = [math]::Round($zipSize / 1MB, 2)
    
    Write-Host "`n========================================" -ForegroundColor Green
    Write-Host "✅ ZIP COMPLETO creado exitosamente!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "Archivos incluidos: $archivosIncluidos" -ForegroundColor Cyan
    Write-Host "Archivos excluidos: $archivosExcluidos" -ForegroundColor Yellow
    Write-Host "Tamaño del archivo: $zipSizeMB MB" -ForegroundColor Cyan
    Write-Host "`nUbicación: $rutaZip" -ForegroundColor Green
    Write-Host "`nEste archivo contiene TODO el código fuente de la aplicación" -ForegroundColor Magenta
    Write-Host "listo para el registro de propiedad intelectual." -ForegroundColor Magenta
}
catch {
    Write-Error "Error al crear el ZIP: $_"
    exit 1
}
finally {
    # Limpiar directorio temporal
    if (Test-Path $tempDir) {
        Remove-Item $tempDir -Recurse -Force -ErrorAction SilentlyContinue
    }
}

























