// test-backend.js - Script para probar el backend
const testBackend = async () => {
  try {
    console.log('🧪 Probando conexión al backend...');

    // Probar endpoint básico
    const response1 = await fetch('https://academia-backend-1.onrender.com/');
    console.log('📄 Endpoint /:', response1.status, response1.statusText);
    const text1 = await response1.text();
    console.log('📄 Respuesta /:', text1.substring(0, 200) + '...');

    // Probar endpoint de test
    const response2 = await fetch('https://academia-backend-1.onrender.com/api/test-simple');
    console.log('🧪 Endpoint /api/test-simple:', response2.status, response2.statusText);
    const text2 = await response2.text();
    console.log('🧪 Respuesta /api/test-simple:', text2);

  } catch (error) {
    console.error('❌ Error en prueba:', error);
  }
};

testBackend();
