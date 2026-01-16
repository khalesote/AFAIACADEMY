# Script para compilar Android en modo release con NODE_ENV correctamente establecido
$env:NODE_ENV = "production"
cd android
./gradlew assembleRelease
cd ..
