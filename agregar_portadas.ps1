# Script para agregar las portadas a los archivos ZIP

$ErrorActionPreference = "Stop"

Write-Host "Agregando portadas a los archivos ZIP..." -ForegroundColor Green

$fecha = "20251202"
$rutaBase = $PSScriptRoot

# Verificar que existen las portadas
$portadas = @(
    @{ Zip = "1_EscuelaVirtual_${fecha}.zip"; Portada = "PORTADA_1_EscuelaVirtual.txt" },
    @{ Zip = "2_PreFormacion_${fecha}.zip"; Portada = "PORTADA_2_PreFormacion.txt" },
    @{ Zip = "3_CoreInfraestructura_${fecha}.zip"; Portada = "PORTADA_3_CoreInfraestructura.txt" }
)

foreach ($item in $portadas) {
    $rutaZip = Join-Path $rutaBase $item.Zip
    $rutaPortada = Join-Path $rutaBase $item.Portada
    
    if (-not (Test-Path $rutaZip)) {
        Write-Warning "No se encuentra el archivo: $($item.Zip)"
        continue
    }
    
    if (-not (Test-Path $rutaPortada)) {
        Write-Warning "No se encuentra la portada: $($item.Portada)"
        continue
    }
    
    Write-Host "`nProcesando: $($item.Zip)" -ForegroundColor Cyan
    
    # Crear directorio temporal
    $tempDir = Join-Path $env:TEMP "zip_temp_$(Get-Random)"
    New-Item -ItemType Directory -Path $tempDir -Force | Out-Null
    
    try {
        # Extraer contenido del ZIP
        Expand-Archive -Path $rutaZip -DestinationPath $tempDir -Force
        
        # Copiar la portada
        $nombrePortada = Split-Path $rutaPortada -Leaf
        Copy-Item $rutaPortada (Join-Path $tempDir $nombrePortada) -Force
        
        # Recrear el ZIP
        Remove-Item $rutaZip -Force
        Compress-Archive -Path "$tempDir\*" -DestinationPath $rutaZip -CompressionLevel Optimal -Force
        
        Write-Host "  ✅ Portada agregada correctamente" -ForegroundColor Green
    }
    catch {
        Write-Error "Error al procesar $($item.Zip): $_"
    }
    finally {
        if (Test-Path $tempDir) {
            Remove-Item $tempDir -Recurse -Force -ErrorAction SilentlyContinue
        }
    }
}

Write-Host "`n✅ Proceso completado!" -ForegroundColor Green
Write-Host "`nIMPORTANTE: Recuerde completar las portadas con su nombre y apellidos" -ForegroundColor Yellow
Write-Host "antes de ejecutar este script o antes de subir los archivos." -ForegroundColor Yellow

























