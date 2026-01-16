import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const unidades = [
  { nombre: 'Unidad 1 - Diálogo', ruta: '/Unidad1Screen' },
  { nombre: 'Unidad 2 - Pronunciación', ruta: '/Unidad2Screen' },
  { nombre: 'Unidad 3', ruta: '/Unidad3Screen' },
  { nombre: 'Unidad 4', ruta: '/Unidad4Screen' },
  { nombre: 'Unidad 5', ruta: '/Unidad5Screen' },
];

const ProfesorVirtualIndice = () => {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Índice de Unidades</Text>
      {unidades.map((unidad, idx) => (
        <TouchableOpacity
          key={unidad.nombre}
          style={styles.botonUnidad}
          onPress={() => router.push(unidad.ruta as any)}
        >
          <Text style={styles.textoBoton}>{unidad.nombre}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 40,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#1976d2',
  },
  botonUnidad: {
    backgroundColor: '#1976d2',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 22,
    width: 260,
    alignItems: 'center',
    elevation: 2,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ProfesorVirtualIndice;
