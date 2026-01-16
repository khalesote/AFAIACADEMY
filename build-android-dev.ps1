# Script para compilar Android con NODE_ENV correctamente establecido
$env:NODE_ENV = "development"
cd android
./gradlew assembleDebug
cd ..
