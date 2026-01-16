import React from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// Importar las unidades temáticas
const FiestasTradiciones = require('./FiestasTradiciones').default;
const LiteraturaExpresiones = require('./LiteraturaExpresiones').default;
const GastronomiaHispana = require('./GastronomiaHispana').default;

// Importar componentes comunes
const ExamenFinal = require('./ExamenFinal').default;

const CLASES = {
  // Unidades temáticas
  FiestasTradiciones,
  LiteraturaExpresiones,
  GastronomiaHispana,
  
  // Componentes comunes
  ExamenFinal,
};
type ClaseId = keyof typeof CLASES;

export default function ClaseB1Screen() {
  const { id } = useLocalSearchParams();
  const isClaseId = (val: any): val is ClaseId => typeof val === 'string' && val in CLASES;
  const ClaseComponent = isClaseId(id) ? CLASES[id] : null;

  if (!ClaseComponent) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 12 }}>Clase no encontrada</Text>
        <Text style={{ fontSize: 16, color: '#555', textAlign: 'center' }}>
          La clase solicitada no existe o el identificador es incorrecto.
        </Text>
      </View>
    );
  }

  return <ClaseComponent />;
}
