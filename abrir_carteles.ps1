# Script para abrir carteles publicitarios de Academia de Inmigrantes
# Creado el: Octubre 2025

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   CARTEL PUBLICITARIO - ACADEMIA DE INMIGRANTES" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

$opciones = @(
    "Cartel Profesional Completo (A4)",
    "Cartel Vertical para Redes Sociales",
    "Cartel SVG Vectorial",
    "Cartel Fisico para Pared (NUEVO)",
    "Ver todos los carteles",
    "Abrir README con instrucciones"
)

for ($i = 0; $i -lt $opciones.Length; $i++) {
    Write-Host "$($i + 1). $($opciones[$i])" -ForegroundColor White
}

Write-Host "0. Salir" -ForegroundColor Yellow
Write-Host ""

do {
    $choice = Read-Host "Elige una opcion (0-6)"

    switch ($choice) {
        "1" {
            Write-Host "Abriendo cartel profesional..." -ForegroundColor Green
            Start-Process "cartel_profesional.html"
        }
        "2" {
            Write-Host "Abriendo cartel vertical..." -ForegroundColor Green
            Start-Process "cartel_vertical.html"
        }
        "3" {
            Write-Host "Abriendo cartel SVG..." -ForegroundColor Green
            Start-Process "cartel_afai.svg"
        }
        "4" {
            Write-Host "Abriendo cartel fisico para pared..." -ForegroundColor Green
            Start-Process "cartel_fisico.html"
        }
        "5" {
            Write-Host "Abriendo todos los carteles..." -ForegroundColor Green
            Start-Process "cartel_profesional.html"
            Start-Sleep -Seconds 2
            Start-Process "cartel_vertical.html"
            Start-Sleep -Seconds 2
            Start-Process "cartel_afai.svg"
            Start-Sleep -Seconds 2
            Start-Process "cartel_fisico.html"
        }
        "6" {
            Write-Host "Abriendo instrucciones..." -ForegroundColor Green
            Start-Process "README_carteles.md"
            Start-Process "GUIA_IMPRESION_CARTEL.md"
        }
        "0" {
            Write-Host "Gracias por usar los carteles de Academia de Inmigrantes!" -ForegroundColor Magenta
            exit
        }
        default {
            Write-Host "Opcion no valida. Intenta de nuevo." -ForegroundColor Red
        }
    }

    Write-Host ""
} while ($true)
