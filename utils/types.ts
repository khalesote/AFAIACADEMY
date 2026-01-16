// Tipos de navegación para React Navigation
export type RootStackParamList = {
  ProfesorVirtualScreen: { nivel: string };
  UnidadesScreen: { nivel: string };
  UnidadesProfesorVirtualScreen: { nivel: string };
  UnidadDetalleScreen: { nivel: string; unidad: any };
  UnidadDetalleProfesorVirtualScreen: { nivel: string; unidad: any };
  Level1MenuScreen: undefined;
  "clase/[id]": { id: number };
  "examen-nivel1": undefined;
  "examen-nivel4": undefined;
  // Add other screens as needed
  // Puedes agregar más rutas aquí si es necesario
};
