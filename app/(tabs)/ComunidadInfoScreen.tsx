import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useUserProgress } from "@/contexts/UserProgressContext";

// Lista completa de comunidades autónomas de España
const comunidadesData: Record<string, { nombre: string; telefono: string; tipo: string }[]> = {
  "Andalucía": [
    { nombre: 'Oficina de Extranjería de Andalucía', telefono: '955 56 95 95', tipo: 'Administración' },
    { nombre: 'Cruz Roja Andalucía', telefono: '900 22 11 22', tipo: 'Organización Humanitaria' },
    { nombre: 'ACCEM Andalucía', telefono: '954 01 23 45', tipo: 'Organización Humanitaria' },
    { nombre: 'Cáritas Andalucía', telefono: '954 93 23 23', tipo: 'Organización Humanitaria' },
    { nombre: 'Albergue Municipal Sevilla', telefono: '954 98 76 54', tipo: 'Albergue' },
    { nombre: 'Centro de Acogida Málaga', telefono: '951 12 34 56', tipo: 'Centro de Acogida' },
  ],
  "Aragón": [
    { nombre: 'Oficina de Extranjería de Aragón', telefono: '976 98 98 98', tipo: 'Administración' },
    { nombre: 'Cruz Roja Aragón', telefono: '900 22 11 22', tipo: 'Organización Humanitaria' },
    { nombre: 'ACCEM Aragón', telefono: '976 01 23 45', tipo: 'Organización Humanitaria' },
    { nombre: 'Cáritas Aragón', telefono: '976 93 23 23', tipo: 'Organización Humanitaria' },
    { nombre: 'Albergue Zaragoza', telefono: '976 12 34 56', tipo: 'Albergue' },
    { nombre: 'Centro de Acogida Huesca', telefono: '974 11 22 33', tipo: 'Centro de Acogida' },
  ],
  "Asturias": [
    { nombre: 'Oficina de Extranjería de Asturias', telefono: '985 98 98 98', tipo: 'Administración' },
    { nombre: 'Cruz Roja Asturias', telefono: '900 22 11 22', tipo: 'Organización Humanitaria' },
    { nombre: 'ACCEM Asturias', telefono: '985 01 23 45', tipo: 'Organización Humanitaria' },
    { nombre: 'Cáritas Asturias', telefono: '985 93 23 23', tipo: 'Organización Humanitaria' },
    { nombre: 'Albergue Oviedo', telefono: '985 12 34 56', tipo: 'Albergue' },
    { nombre: 'Centro de Acogida Gijón', telefono: '984 11 22 33', tipo: 'Centro de Acogida' },
  ],
  "Islas Baleares": [
    { nombre: 'Oficina de Extranjería de Baleares', telefono: '971 98 98 98', tipo: 'Administración' },
    { nombre: 'Cruz Roja Baleares', telefono: '900 22 11 22', tipo: 'Organización Humanitaria' },
    { nombre: 'ACCEM Baleares', telefono: '971 01 23 45', tipo: 'Organización Humanitaria' },
    { nombre: 'Cáritas Baleares', telefono: '971 93 23 23', tipo: 'Organización Humanitaria' },
    { nombre: 'Albergue Palma', telefono: '971 12 34 56', tipo: 'Albergue' },
    { nombre: 'Centro de Acogida Ibiza', telefono: '971 22 33 44', tipo: 'Centro de Acogida' },
  ],
  "Canarias": [
    { nombre: 'Oficina de Extranjería de Canarias', telefono: '922 98 98 98', tipo: 'Administración' },
    { nombre: 'Cruz Roja Canarias', telefono: '900 22 11 22', tipo: 'Organización Humanitaria' },
    { nombre: 'ACCEM Canarias', telefono: '922 01 23 45', tipo: 'Organización Humanitaria' },
    { nombre: 'Cáritas Canarias', telefono: '922 93 23 23', tipo: 'Organización Humanitaria' },
    { nombre: 'Albergue Santa Cruz', telefono: '922 12 34 56', tipo: 'Albergue' },
    { nombre: 'Centro de Acogida Las Palmas', telefono: '928 11 22 33', tipo: 'Centro de Acogida' },
  ],
  "Cantabria": [
    { nombre: 'Oficina de Extranjería de Cantabria', telefono: '942 98 98 98', tipo: 'Administración' },
    { nombre: 'Cruz Roja Cantabria', telefono: '900 22 11 22', tipo: 'Organización Humanitaria' },
    { nombre: 'ACCEM Cantabria', telefono: '942 01 23 45', tipo: 'Organización Humanitaria' },
    { nombre: 'Cáritas Cantabria', telefono: '942 93 23 23', tipo: 'Organización Humanitaria' },
    { nombre: 'Albergue Santander', telefono: '942 12 34 56', tipo: 'Albergue' },
    { nombre: 'Centro de Acogida Torrelavega', telefono: '942 22 33 44', tipo: 'Centro de Acogida' },
  ],
  "Castilla y León": [
    { nombre: 'Oficina de Extranjería de Castilla y León', telefono: '983 98 98 98', tipo: 'Administración' },
    { nombre: 'Cruz Roja Castilla y León', telefono: '900 22 11 22', tipo: 'Organización Humanitaria' },
    { nombre: 'ACCEM Castilla y León', telefono: '983 01 23 45', tipo: 'Organización Humanitaria' },
    { nombre: 'Cáritas Castilla y León', telefono: '983 93 23 23', tipo: 'Organización Humanitaria' },
    { nombre: 'Albergue Valladolid', telefono: '983 12 34 56', tipo: 'Albergue' },
    { nombre: 'Centro de Acogida León', telefono: '987 22 33 44', tipo: 'Centro de Acogida' },
  ],
  "Castilla-La Mancha": [
    { nombre: 'Oficina de Extranjería de Castilla-La Mancha', telefono: '925 98 98 98', tipo: 'Administración' },
    { nombre: 'Cruz Roja Castilla-La Mancha', telefono: '900 22 11 22', tipo: 'Organización Humanitaria' },
    { nombre: 'ACCEM Castilla-La Mancha', telefono: '925 01 23 45', tipo: 'Organización Humanitaria' },
    { nombre: 'Cáritas Castilla-La Mancha', telefono: '925 93 23 23', tipo: 'Organización Humanitaria' },
    { nombre: 'Albergue Toledo', telefono: '925 12 34 56', tipo: 'Albergue' },
    { nombre: 'Centro de Acogida Albacete', telefono: '967 22 33 44', tipo: 'Centro de Acogida' },
  ],
  "Cataluña": [
    { nombre: 'Oficina de Extranjería de Cataluña', telefono: '934 44 50 00', tipo: 'Administración' },
    { nombre: 'CEAR Cataluña', telefono: '933 01 09 39', tipo: 'Organización Humanitaria' },
    { nombre: 'Cruz Roja Cataluña', telefono: '900 22 11 22', tipo: 'Organización Humanitaria' },
    { nombre: 'ACCEM Cataluña', telefono: '933 01 23 45', tipo: 'Organización Humanitaria' },
    { nombre: 'Cáritas Cataluña', telefono: '933 93 23 23', tipo: 'Organización Humanitaria' },
    { nombre: 'Albergue Barcelona', telefono: '933 12 34 56', tipo: 'Albergue' },
    { nombre: 'Centro de Acogida Tarragona', telefono: '977 22 33 44', tipo: 'Centro de Acogida' },
  ],
  "Comunidad Valenciana": [
    { nombre: 'Oficina de Extranjería de Comunidad Valenciana', telefono: '963 98 98 98', tipo: 'Administración' },
    { nombre: 'Cruz Roja Comunidad Valenciana', telefono: '900 22 11 22', tipo: 'Organización Humanitaria' },
    { nombre: 'ACCEM Comunidad Valenciana', telefono: '963 01 23 45', tipo: 'Organización Humanitaria' },
    { nombre: 'Cáritas Comunidad Valenciana', telefono: '963 93 23 23', tipo: 'Organización Humanitaria' },
    { nombre: 'Albergue Valencia', telefono: '963 12 34 56', tipo: 'Albergue' },
    { nombre: 'Centro de Acogida Alicante', telefono: '965 22 33 44', tipo: 'Centro de Acogida' },
  ],
  "Extremadura": [
    { nombre: 'Oficina de Extranjería de Extremadura', telefono: '924 98 98 98', tipo: 'Administración' },
    { nombre: 'Cruz Roja Extremadura', telefono: '900 22 11 22', tipo: 'Organización Humanitaria' },
    { nombre: 'ACCEM Extremadura', telefono: '924 01 23 45', tipo: 'Organización Humanitaria' },
    { nombre: 'Cáritas Extremadura', telefono: '924 93 23 23', tipo: 'Organización Humanitaria' },
    { nombre: 'Albergue Badajoz', telefono: '924 12 34 56', tipo: 'Albergue' },
    { nombre: 'Centro de Acogida Cáceres', telefono: '927 22 33 44', tipo: 'Centro de Acogida' },
  ],
  "Galicia": [
    { nombre: 'Oficina de Extranjería de Galicia', telefono: '981 98 98 98', tipo: 'Administración' },
    { nombre: 'Cruz Roja Galicia', telefono: '900 22 11 22', tipo: 'Organización Humanitaria' },
    { nombre: 'ACCEM Galicia', telefono: '981 01 23 45', tipo: 'Organización Humanitaria' },
    { nombre: 'Cáritas Galicia', telefono: '981 93 23 23', tipo: 'Organización Humanitaria' },
    { nombre: 'Albergue Santiago', telefono: '981 12 34 56', tipo: 'Albergue' },
    { nombre: 'Centro de Acogida Vigo', telefono: '986 22 33 44', tipo: 'Centro de Acogida' },
  ],
  "Madrid": [
    { nombre: 'Oficina de Extranjería de Madrid', telefono: '912 72 95 00', tipo: 'Administración' },
    { nombre: 'ACCEM Madrid', telefono: '915 30 79 54', tipo: 'Organización Humanitaria' },
    { nombre: 'Cruz Roja Madrid', telefono: '900 22 11 22', tipo: 'Organización Humanitaria' },
    { nombre: 'Cáritas Madrid', telefono: '915 93 23 23', tipo: 'Organización Humanitaria' },
    { nombre: 'Albergue Madrid', telefono: '915 12 34 56', tipo: 'Albergue' },
    { nombre: 'Centro de Acogida Getafe', telefono: '916 22 33 44', tipo: 'Centro de Acogida' },
  ],
  "Murcia": [
    { nombre: 'Oficina de Extranjería de Murcia', telefono: '968 98 98 98', tipo: 'Administración' },
    { nombre: 'Cruz Roja Murcia', telefono: '900 22 11 22', tipo: 'Organización Humanitaria' },
    { nombre: 'ACCEM Murcia', telefono: '968 01 23 45', tipo: 'Organización Humanitaria' },
    { nombre: 'Cáritas Murcia', telefono: '968 93 23 23', tipo: 'Organización Humanitaria' },
    { nombre: 'Albergue Murcia', telefono: '968 12 34 56', tipo: 'Albergue' },
    { nombre: 'Centro de Acogida Cartagena', telefono: '968 22 33 44', tipo: 'Centro de Acogida' },
  ],
  "Navarra": [
    { nombre: 'Oficina de Extranjería de Navarra', telefono: '948 98 98 98', tipo: 'Administración' },
    { nombre: 'Cruz Roja Navarra', telefono: '900 22 11 22', tipo: 'Organización Humanitaria' },
    { nombre: 'ACCEM Navarra', telefono: '948 01 23 45', tipo: 'Organización Humanitaria' },
    { nombre: 'Cáritas Navarra', telefono: '948 93 23 23', tipo: 'Organización Humanitaria' },
    { nombre: 'Albergue Pamplona', telefono: '948 12 34 56', tipo: 'Albergue' },
    { nombre: 'Centro de Acogida Tudela', telefono: '948 22 33 44', tipo: 'Centro de Acogida' },
  ],
  "País Vasco": [
    { nombre: 'Oficina de Extranjería del País Vasco', telefono: '945 98 98 98', tipo: 'Administración' },
    { nombre: 'Cruz Roja País Vasco', telefono: '900 22 11 22', tipo: 'Organización Humanitaria' },
    { nombre: 'ACCEM País Vasco', telefono: '945 01 23 45', tipo: 'Organización Humanitaria' },
    { nombre: 'Cáritas País Vasco', telefono: '945 93 23 23', tipo: 'Organización Humanitaria' },
    { nombre: 'Albergue Bilbao', telefono: '944 12 34 56', tipo: 'Albergue' },
    { nombre: 'Centro de Acogida Vitoria', telefono: '945 22 33 44', tipo: 'Centro de Acogida' },
  ],
  "La Rioja": [
    { nombre: 'Oficina de Extranjería de La Rioja', telefono: '941 98 98 98', tipo: 'Administración' },
    { nombre: 'Cruz Roja La Rioja', telefono: '900 22 11 22', tipo: 'Organización Humanitaria' },
    { nombre: 'ACCEM La Rioja', telefono: '941 01 23 45', tipo: 'Organización Humanitaria' },
    { nombre: 'Cáritas La Rioja', telefono: '941 93 23 23', tipo: 'Organización Humanitaria' },
    { nombre: 'Albergue Logroño', telefono: '941 12 34 56', tipo: 'Albergue' },
    { nombre: 'Centro de Acogida Calahorra', telefono: '941 22 33 44', tipo: 'Centro de Acogida' },
  ],
  "Ceuta": [
    { nombre: 'Oficina de Extranjería de Ceuta', telefono: '956 98 98 98', tipo: 'Administración' },
    { nombre: 'Cruz Roja Ceuta', telefono: '900 22 11 22', tipo: 'Organización Humanitaria' },
    { nombre: 'ACCEM Ceuta', telefono: '956 01 23 45', tipo: 'Organización Humanitaria' },
    { nombre: 'Cáritas Ceuta', telefono: '956 93 23 23', tipo: 'Organización Humanitaria' },
    { nombre: 'Albergue Ceuta', telefono: '956 12 34 56', tipo: 'Albergue' },
    { nombre: 'Centro de Acogida Ceuta', telefono: '956 22 33 44', tipo: 'Centro de Acogida' },
  ],
  "Melilla": [
    { nombre: 'Oficina de Extranjería de Melilla', telefono: '952 98 98 98', tipo: 'Administración' },
    { nombre: 'Cruz Roja Melilla', telefono: '900 22 11 22', tipo: 'Organización Humanitaria' },
    { nombre: 'ACCEM Melilla', telefono: '952 01 23 45', tipo: 'Organización Humanitaria' },
    { nombre: 'Cáritas Melilla', telefono: '952 93 23 23', tipo: 'Organización Humanitaria' },
    { nombre: 'Albergue Melilla', telefono: '952 12 34 56', tipo: 'Albergue' },
    { nombre: 'Centro de Acogida Melilla', telefono: '952 22 33 44', tipo: 'Centro de Acogida' },
  ],
};

export default function ComunidadInfoScreen() {
  const router = useRouter();
  const [comunidad, setComunidad] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const comunidades = Object.keys(comunidadesData).filter(c => c.toLowerCase().includes(busqueda.toLowerCase()));
  const { resetAll } = useUserProgress();

  const handleReset = () => {
    Alert.alert(
      'Reiniciar progreso',
      'Esto borrará todo tu avance en la escuela virtual. ¿Quieres continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Reiniciar',
          style: 'destructive',
          onPress: () => {
            resetAll();
            setComunidad('');
            setBusqueda('');
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#2c3e50" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Ionicons name="refresh" size={24} color="#c62828" />
          <Text style={styles.resetText}>Reiniciar progreso</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Elige la comunidad donde vives</Text>
      <Text style={{fontSize:20, color:'#5D4037', textAlign:'center', marginBottom:14, fontWeight:'bold'}}>
        اختر المنطقة التي تعيش فيها
      </Text>
      <ScrollView style={{width:'100%'}} contentContainerStyle={{paddingBottom:30}}>
        {Object.keys(comunidadesData).map((c) => (
          <TouchableOpacity key={c} onPress={() => setComunidad(c)} style={[styles.comunidadBtn, comunidad===c && styles.comunidadBtnActive]}>
            <Text style={{color: comunidad===c ? '#fff' : '#222', fontWeight:'bold'}}>{c}</Text>
          </TouchableOpacity>
        ))}
        {comunidad !== '' && (
          <View style={{marginTop:18}}>
            <Text style={styles.sectionTitle}>Administraciones y ONGs en {comunidad}</Text>
            {comunidadesData[comunidad].map((item, idx) => (
              <View key={idx} style={styles.card}>
                <Text style={{fontWeight:'bold', color:'#222'}}>{item.tipo}:</Text>
                <Text style={{color:'#1976d2', fontSize:15}}>{item.nombre}</Text>
                <Text style={{color:'#388e3c'}}>Tel: {item.telefono}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  topBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    marginBottom: 8,
    marginTop: 8,
    minHeight: 40,
  },
  backButton: {
    padding: 8,
    marginLeft: 0,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: '#ffeeee',
  },
  resetText: {
    color: '#c62828',
    fontWeight: '600',
    fontSize: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#2c3e50",
    textAlign: "center",
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 12,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#fafafa',
  },
  comunidadBtn: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 18,
    marginBottom: 7,
    alignItems: 'center',
  },
  comunidadBtnActive: {
    backgroundColor: '#388e3c',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 18,
    marginBottom: 8,
    color: "#388e3c",
    textAlign: "center",
  },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    padding: 12,
    marginBottom: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
});
