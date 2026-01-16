import { Stack } from 'expo-router';
import React from 'react';

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Inicio' }} />
      <Stack.Screen name="UnidadesScreen" options={{ title: 'Unidades' }} />
      <Stack.Screen name="UnidadDetalleScreen" options={{ title: 'Detalle de Unidad' }} />
    </Stack>
  );
}
