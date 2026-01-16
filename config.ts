// config.ts

// Cargar la clave de la API de D-ID desde el archivo .env
const DID_API_KEY = process.env.DID_API_KEY;

// Verificación para asegurar que la clave existe
if (!DID_API_KEY) {
  throw new Error("API Key de D-ID no encontrada. Por favor, asegúrate de definirla en tu archivo .env");
}

// Exportar la clave para que se pueda usar en otras partes del proyecto
export const config = {
  DID_API_KEY,
};
