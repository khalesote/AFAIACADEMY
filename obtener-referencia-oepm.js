/**
 * Script simple para obtener la referencia alfanumérica de la aplicación para OEPM
 * 
 * Ejecutar con: node obtener-referencia-oepm.js
 */

// Simulación de AsyncStorage para Node.js
const fs = require('fs');
const path = require('path');

const STORAGE_FILE = path.join(__dirname, '.app_reference_storage.json');

// Función para leer de "AsyncStorage" simulado
function getStoredReference() {
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      const data = JSON.parse(fs.readFileSync(STORAGE_FILE, 'utf8'));
      return data.app_reference_oepm || null;
    }
  } catch (error) {
    // Si no existe, retornar null
  }
  return null;
}

// Función para guardar en "AsyncStorage" simulado
function saveReference(reference) {
  try {
    const data = { app_reference_oepm: reference };
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error guardando referencia:', error);
  }
}

// Generar referencia alfanumérica
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
  
  return `ACAD-${timestamp}-${random1}-${random2}-${random3}`;
}

// Función principal
function getAppReference() {
  console.log('\n🔍 Buscando referencia de la aplicación para OEPM...\n');
  
  // Intentar obtener referencia existente
  let reference = getStoredReference();
  
  if (reference) {
    console.log('✅ Referencia encontrada:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`   ${reference}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    return reference;
  }
  
  // Si no existe, generar una nueva
  console.log('📝 Generando nueva referencia...\n');
  reference = generateAppReference();
  saveReference(reference);
  
  console.log('✅ Nueva referencia generada:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`   ${reference}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  console.log('📋 Información para OEPM:');
  console.log(`   Nombre: Academia de Inmigrantes`);
  console.log(`   Versión: 1.0.0`);
  console.log(`   Plataformas: Android e iOS`);
  console.log(`   Referencia: ${reference}\n`);
  
  console.log('💾 Referencia guardada en: .app_reference_storage.json\n');
  
  return reference;
}

// Ejecutar si se llama directamente
if (require.main === module) {
  getAppReference();
}

module.exports = { getAppReference, generateAppReference };


















































