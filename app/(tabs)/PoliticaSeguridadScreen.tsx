import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PoliticaSeguridadScreen() {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.replace('/(tabs)/SchoolScreen')}>
        <Ionicons name="arrow-back" size={24} color="#1976d2" style={{ marginRight: 5 }} />
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Política de Seguridad</Text>
      <Text style={styles.date}>Última actualización: 14 de mayo de 2025</Text>
      <Text style={styles.text}>
        En Academia de Inmigrantes, la seguridad de nuestros usuarios es una prioridad fundamental. Por ello, implementamos las siguientes medidas para proteger la información y la experiencia dentro de la aplicación:
      </Text>
      <Text style={styles.sectionTitle}>1. Protección de Datos Personales</Text>
      <Text style={styles.text}>
        Todos los datos personales almacenados (nombre, apellido, documento de identidad, etc.) se guardan de forma segura y solo se utilizan para la gestión y generación de diplomas y certificados académicos.
      </Text>
      <Text style={styles.text}>
        Las grabaciones de voz realizadas en las actividades de Expresión Oral y Prácticas de Fonética se emplean únicamente para la evaluación académica y se eliminan tras la evaluación.
      </Text>
      <Text style={styles.sectionTitle}>2. Acceso Autenticado</Text>
      <Text style={styles.text}>
        El acceso a funcionalidades sensibles de la aplicación requiere autenticación del usuario. No compartas tus credenciales con terceros.
      </Text>
      <Text style={styles.sectionTitle}>3. Actualizaciones de Seguridad</Text>
      <Text style={styles.text}>
        La app se actualiza periódicamente para corregir vulnerabilidades y mejorar la protección frente a amenazas emergentes.
      </Text>
      <Text style={styles.sectionTitle}>4. Gestión de Incidentes</Text>
      <Text style={styles.text}>
        Ante cualquier sospecha de brecha de seguridad, el usuario puede contactar al equipo de soporte y se tomarán medidas inmediatas para mitigar riesgos.
      </Text>
      <Text style={styles.sectionTitle}>5. Permisos de la Aplicación</Text>
      <Text style={styles.text}>
        La app solo solicita permisos estrictamente necesarios para su funcionamiento, como acceso al micrófono para actividades de pronunciación o acceso a archivos para descargar diplomas.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 6,
  },
  backText: {
    color: '#1976d2',
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1976d2',
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 4,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#222',
    marginBottom: 8,
    textAlign: 'justify',
  },
});
