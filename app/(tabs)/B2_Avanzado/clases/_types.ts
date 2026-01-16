import { ColorValue } from 'react-native';

export type Pregunta = {
  tipo: 'opcion' | 'texto';
  pregunta: string;
  opciones?: string[];
  respuesta?: number;
  color: [ColorValue, ColorValue];
  icono: string;
};

// Export default para cumplir con el warning de rutas
export default {};
