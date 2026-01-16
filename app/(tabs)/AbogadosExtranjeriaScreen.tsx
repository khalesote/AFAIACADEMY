import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AbogadosExtranjeriaScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Abogados de Extranjería</Text>
      <Text style={styles.subtitle}>Encuentra asesoría legal para inmigrantes</Text>

      <View style={styles.card}>
        <Text style={styles.lawyerName}>Legalteam</Text>
        <Text style={styles.lawyerDesc}>Especialistas en extranjería y nacionalidad española.</Text>
        <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('https://legalteam.es')}>
          <Ionicons name="globe-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>Visitar web</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.lawyerName}>Parainmigrantes.info</Text>
        <Text style={styles.lawyerDesc}>Información y asesoría legal para extranjeros en España.</Text>
        <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('https://www.parainmigrantes.info')}>
          <Ionicons name="globe-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>Visitar web</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.lawyerName}>Ilustre Colegio de Abogados de Madrid</Text>
        <Text style={styles.lawyerDesc}>Búsqueda de abogados colegiados en Madrid.</Text>
        <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('https://www.icam.es/turno-de-oficio/')}>
          <Ionicons name="globe-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>Visitar web</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.lawyerName}>Abogados365.com</Text>
        <Text style={styles.lawyerDesc}>Directorio de abogados de extranjería en toda España.</Text>
        <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('https://www.abogados365.com/extranjeria')}>
          <Ionicons name="globe-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>Visitar web</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.disclaimer}>
        * Esta información es orientativa. Contacta directamente con los profesionales para confirmar servicios y tarifas.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#c62828',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  lawyerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 4,
  },
  lawyerDesc: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#c62828',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 8,
  },
  disclaimer: {
    fontSize: 12,
    color: '#888',
    marginTop: 24,
    textAlign: 'center',
  },
});
