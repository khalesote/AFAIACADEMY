# Script para crear ZIP optimizado del código fuente (máximo 800 MB)
# Excluye videos grandes y otros archivos pesados

$ErrorActionPreference = "Stop"

$fecha = Get-Date -Format "yyyyMMdd"
$nombreZip = "CodigoFuente_AcademiaInmigrantes_${fecha}.zip"
$rutaZip = Join-Path $PSScriptRoot $nombreZip
$maxSizeMB = 800
$maxSizeBytes = $maxSizeMB * 1024 * 1024

Write-Host "========================================" -ForegroundColor Magenta
Write-Host "Creando ZIP OPTIMIZADO del código fuente" -ForegroundColor Green
Write-Host "Máximo ${maxSizeMB}MB para registro" -ForegroundColor Green
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

# Extensiones de archivos grandes a excluir (videos, modelos 3D grandes)
$excluirArchivosGrandes = @(
    ".mp4",
    ".mov",
    ".avi",
    ".mkv",
    ".webm",
    ".glb"  # Modelos 3D grandes
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
    
    # Excluir videos y archivos grandes (excepto algunos pequeños)
    if ($excluirArchivosGrandes -contains $extension) {
        # Permitir solo archivos de audio pequeños (no videos)
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

# Crear directorio temporal
$tempDir = Join-Path $env:TEMP "codigo_fuente_optimizado_$(Get-Random)"
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

try {
    $rutaBase = $PSScriptRoot
    $archivosIncluidos = 0
    $archivosExcluidos = 0
    $sizeTotal = 0
    
    Write-Host "`nRecopilando archivos (excluyendo videos grandes)..." -ForegroundColor Yellow
    
    # Obtener todos los archivos del directorio
    $archivos = Get-ChildItem -Path $rutaBase -Recurse -File | Where-Object {
        -not $_.PSIsContainer
    }
    
    foreach ($archivo in $archivos) {
        $rutaCompleta = $archivo.FullName
        
        if (-not (DebeExcluirse -rutaArchivo $rutaCompleta -rutaBase $rutaBase)) {
            $fileSize = (Get-Item $rutaCompleta).Length
            
            # Verificar que no exceda el límite
            if ($sizeTotal + $fileSize -le $maxSizeBytes) {
                try {
                    $rutaRelativa = $rutaCompleta.Replace($rutaBase, "").TrimStart('\', '/')
                    $rutaDestino = Join-Path $tempDir $rutaRelativa
                    $dirDestino = Split-Path $rutaDestino -Parent
                    
                    if (-not (Test-Path $dirDestino)) {
                        New-Item -ItemType Directory -Path $dirDestino -Force | Out-Null
                    }
                    
                    Copy-Item $rutaCompleta $rutaDestino -Force
                    $archivosIncluidos++
                    $sizeTotal += $fileSize
                    
                    if ($archivosIncluidos % 200 -eq 0) {
                        $sizeMB = [math]::Round($sizeTotal / 1MB, 2)
                        Write-Host "  Procesados $archivosIncluidos archivos ($sizeMB MB)..." -ForegroundColor Yellow
                    }
                }
                catch {
                    Write-Warning "Error al copiar archivo $rutaCompleta : $_"
                }
            }
            else {
                $archivosExcluidos++
                if ($archivosExcluidos -le 10) {
                    Write-Host "  ⚠️  Archivo omitido por tamaño: $($archivo.Name)" -ForegroundColor Yellow
                }
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
    Write-Host "✅ ZIP OPTIMIZADO creado exitosamente!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "Archivos incluidos: $archivosIncluidos" -ForegroundColor Cyan
    Write-Host "Archivos excluidos: $archivosExcluidos" -ForegroundColor Yellow
    Write-Host "Tamaño del archivo: $zipSizeMB MB" -ForegroundColor Cyan
    Write-Host "`nUbicación: $rutaZip" -ForegroundColor Green
    
    if ($zipSizeMB -gt $maxSizeMB) {
        Write-Host "`n⚠️  ADVERTENCIA: El archivo excede ${maxSizeMB}MB" -ForegroundColor Red
    } else {
        Write-Host "`n✅ El archivo cumple con el límite de ${maxSizeMB}MB" -ForegroundColor Green
    }
    
    Write-Host "`nNOTA: Se excluyeron videos (.mp4) y archivos grandes" -ForegroundColor Yellow
    Write-Host "para cumplir con el límite de tamaño." -ForegroundColor Yellow
}
catch {
    Write-Error "Error al crear el ZIP: $_"
    exit 1
}
finally {
    if (Test-Path $tempDir) {
        Remove-Item $tempDir -Recurse -Force -ErrorAction SilentlyContinue
    }
}

























