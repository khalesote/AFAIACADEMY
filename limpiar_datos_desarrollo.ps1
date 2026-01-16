# Script para limpiar datos de desarrollo antes de recompilar
# Ejecuta este script antes de recompilar para empezar desde cero

Write-Host "🧹 Limpiando datos de desarrollo..." -ForegroundColor Yellow

# Limpiar cache de Metro bundler
Write-Host "📦 Limpiando cache de Metro..." -ForegroundColor Cyan
npm start -- --reset-cache 2>$null

Write-Host ""
Write-Host "✅ Para limpiar completamente los datos:" -ForegroundColor Green
Write-Host "   1. Cierra la sesión desde la app (botón 'Cerrar Sesión' en el perfil)" -ForegroundColor White
Write-Host "   2. O ejecuta el comando de limpieza desde la app" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  NOTA: Firebase Authentication mantiene la sesión persistente." -ForegroundColor Yellow
Write-Host "   Para empezar desde cero, necesitas cerrar sesión manualmente" -ForegroundColor Yellow
Write-Host "   desde la app o usar la función 'Limpiar Datos de Desarrollo'." -ForegroundColor Yellow

