import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ExpresionNivel1Screen() {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Expresión Oral y Escrita - Nivel A1</Text>
      <Text style={styles.subtitulo}>Selecciona una actividad:</Text>
      <TouchableOpacity style={styles.boton} onPress={() => router.push('/ExpresionOralNivel1')}>
        <Ionicons name="mic" size={28} color="#fff" style={{ marginRight: 10 }} />
        <Text style={styles.botonTexto}>Expresión Oral</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boton} onPress={() => router.push('/ExpresionEscritaNivel1')}>
        <Ionicons name="create" size={28} color="#fff" style={{ marginRight: 10 }} />
        <Text style={styles.botonTexto}>Expresión Escrita</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 18,
    color: '#222',
    marginBottom: 24,
    textAlign: 'center',
  },
  boton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1976d2',
    padding: 18,
    borderRadius: 12,
    marginBottom: 20,
    width: 260,
    justifyContent: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
  },
});
