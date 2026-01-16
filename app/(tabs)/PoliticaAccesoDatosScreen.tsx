import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PoliticaAccesoDatosScreen() {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.replace('/(tabs)/SchoolScreen')}>
        <Ionicons name="arrow-back" size={24} color="#1976d2" style={{ marginRight: 5 }} />
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Política de Acceso a Datos</Text>
      <Text style={styles.date}>Última actualización: 14 de mayo de 2025</Text>
      <Text style={styles.text}>
        En Academia de Inmigrantes, valoramos la privacidad y el control de tus datos. Nuestra política es clara:
      </Text>
      <Text style={styles.sectionTitle}>1. Finalidad Exclusiva</Text>
      <Text style={styles.text}>
        Los datos personales que se recopilan en la aplicación (nombre, apellido, documento de identidad, datos de contacto, etc.) se utilizan exclusivamente para la generación y gestión de diplomas y certificados académicos. No se usan para ningún otro fin.
      </Text>
      <Text style={styles.sectionTitle}>2. No Compartimos Datos con Terceros</Text>
      <Text style={styles.text}>
        No vendemos ni compartimos tus datos personales con terceros sin tu consentimiento explícito, salvo obligación legal.
      </Text>
      <Text style={styles.sectionTitle}>3. Acceso Interno Restringido</Text>
      <Text style={styles.text}>
        Solo el personal autorizado puede acceder a los datos almacenados, y únicamente para la gestión de diplomas o soporte académico.
      </Text>
      <Text style={styles.sectionTitle}>4. Derechos del Usuario</Text>
      <Text style={styles.text}>
        Puedes solicitar en cualquier momento la revisión, actualización o eliminación de tus datos personales contactando a nuestro equipo de soporte.
      </Text>
      <Text style={styles.sectionTitle}>5. Almacenamiento y Retención</Text>
      <Text style={styles.text}>
        Los datos se almacenan de forma segura y solo durante el tiempo necesario para cumplir el fin de generar y gestionar diplomas.
      </Text>
      <Text style={styles.sectionTitle}>6. Grabaciones de voz en Expresión Oral y Fonética</Text>
      <Text style={styles.text}>
        Las grabaciones de voz realizadas en las actividades de Expresión Oral y Prácticas de Fonética se utilizan exclusivamente para la evaluación académica del estudiante. Estas grabaciones serán eliminadas una vez finalizado el proceso de evaluación y no se usarán para ningún otro fin.
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
