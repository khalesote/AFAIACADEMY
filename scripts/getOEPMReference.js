/**
 * Script para obtener la referencia alfanumérica de la aplicación para OEPM
 * 
 * Ejecutar con: node scripts/getOEPMReference.js
 * 
 * O desde la consola de Node.js:
 * require('./scripts/getOEPMReference.js')
 */

const AsyncStorage = require('@react-native-async-storage/async-storage').default;

const APP_REFERENCE_KEY = 'app_reference_oepm';
const APP_REFERENCE_PREFIX = 'ACAD';

function generateAppReference() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
  const randomSegment = () => {
    let segment = '';
    for (let i = 0; i < 4; i++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return segment;
  };
  
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  const random1 = randomSegment();
  const random2 = randomSegment();
  const random3 = randomSegment();
  
  return `${APP_REFERENCE_PREFIX}-${timestamp}-${random1}-${random2}-${random3}`;
}

async function getAppReference() {
  try {
    // En un entorno Node.js, simulamos AsyncStorage
    // En la app real, usar AsyncStorage de React Native
    console.log('📱 Obteniendo referencia de la aplicación para OEPM...\n');
    
    // Para desarrollo, generamos una referencia
    const reference = generateAppReference();
    
    console.log('✅ Referencia generada:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`   ${reference}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    console.log('📋 Información para OEPM:');
    console.log(`   Nombre de la aplicación: Academia de Inmigrantes`);
    console.log(`   Versión: 1.0.0`);
    console.log(`   Plataformas: Android e iOS`);
    console.log(`   Referencia: ${reference}\n`);
    
    console.log('💡 NOTA: En la aplicación móvil, esta referencia se guarda');
    console.log('   automáticamente en AsyncStorage y puedes obtenerla');
    console.log('   desde la pantalla de información de usuario.\n');
    
    return reference;
  } catch (error) {
    console.error('❌ Error:', error);
    return null;
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  getAppReference().then((ref) => {
    if (ref) {
      console.log('✅ Referencia lista para usar en OEPM');
    }
  });
}

module.exports = { getAppReference, generateAppReference };


















































