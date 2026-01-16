@echo off
echo ============================================
echo    CARTEL PUBLICITARIO - ACADEMIA DE INMIGRANTES
echo ============================================
echo.
echo Selecciona el cartel que quieres ver:
echo.
echo 1. Cartel Profesional Completo (A4)
echo 2. Cartel Vertical para Redes Sociales
echo 3. Cartel SVG Vectorial
echo 4. Cartel Fisico para Pared (NUEVO)
echo 5. Ver todos los carteles
echo 6. Abrir README con instrucciones
echo 0. Salir
echo.
set /p choice="Elige una opcion (0-6): "

if "%choice%"=="1" goto cartel1
if "%choice%"=="2" goto cartel2
if "%choice%"=="3" goto cartel3
if "%choice%"=="4" goto cartel4
if "%choice%"=="5" goto todos
if "%choice%"=="6" goto readme
if "%choice%"=="0" goto exit

echo Opcion no valida. Presiona cualquier tecla para continuar...
pause >nul
goto menu

:cartel1
echo Abriendo cartel profesional...
start cartel_profesional.html
goto menu

:cartel2
echo Abriendo cartel vertical...
start cartel_vertical.html
goto menu

:cartel3
echo Abriendo cartel SVG...
start cartel_afai.svg
goto menu

:cartel4
echo Abriendo cartel fisico para pared...
start cartel_fisico.html
goto menu

:todos
echo Abriendo todos los carteles...
start cartel_profesional.html
timeout /t 2 /nobreak >nul
start cartel_vertical.html
timeout /t 2 /nobreak >nul
start cartel_afai.svg
timeout /t 2 /nobreak >nul
start cartel_fisico.html
goto menu

:readme
echo Abriendo instrucciones...
start README_carteles.md
start GUIA_IMPRESION_CARTEL.md
goto menu

:exit
echo Gracias por usar los carteles de Academia de Inmigrantes!
pause
exit
