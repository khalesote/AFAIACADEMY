# Script para agregar la portada al ZIP completo

$ErrorActionPreference = "Stop"

$fecha = "20251202"
$rutaBase = $PSScriptRoot
$nombreZip = "CodigoFuente_Completo_AcademiaInmigrantes_${fecha}.zip"
$rutaZip = Join-Path $rutaBase $nombreZip
$rutaPortada = Join-Path $rutaBase "PORTADA_CodigoFuente_Completo.txt"

Write-Host "Agregando portada al ZIP completo..." -ForegroundColor Green

if (-not (Test-Path $rutaZip)) {
    Write-Error "No se encuentra el archivo ZIP: $nombreZip"
    exit 1
}

if (-not (Test-Path $rutaPortada)) {
    Write-Error "No se encuentra la portada: PORTADA_CodigoFuente_Completo.txt"
    exit 1
}

Write-Host "Procesando: $nombreZip" -ForegroundColor Cyan

# Crear directorio temporal
$tempDir = Join-Path $env:TEMP "zip_completo_temp_$(Get-Random)"
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

try {
    # Extraer contenido del ZIP
    Write-Host "Extrayendo contenido del ZIP..." -ForegroundColor Yellow
    Expand-Archive -Path $rutaZip -DestinationPath $tempDir -Force
    
    # Copiar la portada
    $nombrePortada = Split-Path $rutaPortada -Leaf
    Copy-Item $rutaPortada (Join-Path $tempDir $nombrePortada) -Force
    
    Write-Host "Portada agregada. Recreando ZIP..." -ForegroundColor Yellow
    
    # Recrear el ZIP
    Remove-Item $rutaZip -Force
    Compress-Archive -Path "$tempDir\*" -DestinationPath $rutaZip -CompressionLevel Optimal -Force
    
    $zipSize = (Get-Item $rutaZip).Length
    $zipSizeMB = [math]::Round($zipSize / 1MB, 2)
    
    Write-Host "`n✅ Portada agregada correctamente" -ForegroundColor Green
    Write-Host "Tamaño final: $zipSizeMB MB" -ForegroundColor Cyan
    Write-Host "Ubicación: $rutaZip" -ForegroundColor Cyan
}
catch {
    Write-Error "Error al procesar: $_"
    exit 1
}
finally {
    if (Test-Path $tempDir) {
        Remove-Item $tempDir -Recurse -Force -ErrorAction SilentlyContinue
    }
}

Write-Host "`nIMPORTANTE: Recuerde completar la portada con su nombre y apellidos" -ForegroundColor Yellow
Write-Host "antes de ejecutar este script o antes de subir el archivo." -ForegroundColor Yellow

























