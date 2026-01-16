import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Image, RefreshControl } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const REVISTA_URL = "https://raw.githubusercontent.com/khalesote/revista-inmigrantes/refs/heads/main/revista.json"; // URL pública de la revista automatizada

import { useRouter } from "expo-router";

export default function RevistaScreen() {
  type Articulo = {
    imagen?: string;
    tituloES: string;
    tituloAR: string;
    fecha: string;
    categoria: string;
    contenidoES: string;
    contenidoAR: string;
  };

  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [online, setOnline] = useState(true);

  // Solo suscribirse/desuscribirse a NetInfo una vez
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setOnline(!!state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  // Cargar artículos cada vez que cambie el estado de conexión
  useEffect(() => {
    loadArticulos();
  }, [online]);

  const loadArticulos = async () => {
    setLoading(true);
    try {
      let data;
      if (online) {
        const resp = await fetch(REVISTA_URL);
        data = await resp.json();
        await AsyncStorage.setItem('revista_cache', JSON.stringify(data));
      } else {
        const cached = await AsyncStorage.getItem('revista_cache');
        data = cached ? JSON.parse(cached) : [];
      }
      setArticulos(data);
    } catch (e) {
      const cached = await AsyncStorage.getItem('revista_cache');
      setArticulos(cached ? JSON.parse(cached) : []);
    }
    setLoading(false);
    setRefreshing(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadArticulos();
  };


  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      {/* Flecha de regreso */}
      <TouchableOpacity
        onPress={() => router.replace('/')}
        style={{ position: 'absolute', left: 16, top: 44, zIndex: 10 }}
      >
        <Ionicons name="arrow-back" size={40} color="#1976d2" />
      </TouchableOpacity>
      <View style={styles.header}>
        <MaterialCommunityIcons name="newspaper-variant-outline" size={32} color="#1565c0" style={{ marginRight: 10 }} />
        <Text style={styles.headerTitle}>Revista Inmigrantes</Text>
        <Text style={styles.headerTitleAr}>مجلة المهاجرين</Text>
        <Text style={styles.headerSubtitle}>Papeles y Extranjería</Text>
        <Text style={styles.headerSubtitleAr}>أوراق وإجراءات الهجرة</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#1565c0" style={{ marginTop: 32 }} />
      ) : (
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={{ padding: 18 }}
        >
          {articulos.length === 0 ? (
            <Text style={{ color: '#888', textAlign: 'center', marginTop: 32 }}>
              No hay artículos disponibles.
            </Text>
          ) : (
            articulos.map((art, idx) => (
              <View key={idx} style={styles.articuloBox}>
                {art.imagen && (
                  <Image source={{ uri: art.imagen }} style={styles.articuloImg} />
                )}
                <Text style={styles.titulo}>{art.tituloES}</Text>
                <Text style={styles.tituloAr}>{art.tituloAR}</Text>
                <Text style={styles.fecha}>{art.fecha}</Text>
                <Text style={styles.categoria}>{art.categoria}</Text>
                <Text style={styles.texto}>{art.contenidoES}</Text>
                <Text style={styles.textoAr}>{art.contenidoAR}</Text>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 36,
    paddingBottom: 12,
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#bbdefb',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1565c0',
    marginTop: 2,
  },
  headerTitleAr: {
    fontSize: 20,
    color: '#1565c0',
    fontFamily: 'System',
    writingDirection: 'rtl',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#1976d2',
    marginBottom: 2,
  },
  headerSubtitleAr: {
    fontSize: 13,
    color: '#1976d2',
    fontFamily: 'System',
    writingDirection: 'rtl',
    marginBottom: 2,
  },
  articuloBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 22,
    shadowColor: '#000',
    shadowOpacity: 0.09,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  articuloImg: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  tituloAr: {
    fontSize: 16,
    color: '#222',
    fontFamily: 'System',
    writingDirection: 'rtl',
    marginBottom: 2,
  },
  fecha: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  categoria: {
    fontSize: 13,
    color: '#1565c0',
    marginBottom: 6,
  },
  texto: {
    fontSize: 15,
    color: '#444',
    marginBottom: 4,
  },
  textoAr: {
    fontSize: 15,
    color: '#444',
    fontFamily: 'System',
    writingDirection: 'rtl',
    marginBottom: 4,
  },
});
