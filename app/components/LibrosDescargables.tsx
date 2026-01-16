import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Libro {
  titulo: string;
  tituloAr: string;
  descripcion: string;
  descripcionAr: string;
  nivel: string;
  nivelAr: string;
  url: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
}

const LIBROS: Libro[] = [
  {
    titulo: "Libro 1 - Español Básico",
    tituloAr: "الكتاب 1 - الإسبانية الأساسية",
    descripcion: "Tu primer libro de español (PDF)",
    descripcionAr: "كتابك الأول في اللغة الإسبانية (PDF)",
    nivel: "Nivel A1",
    nivelAr: "المستوى A1",
    url: "https://drive.google.com/file/d/1VA6l4kVkysvIfRZzmIVJHme_SBJW5Rdl/view?usp=drive_link",
    icon: "file-pdf-box",
    color: "#4CAF50"
  },
  {
    titulo: "Libro 2 - Gramática",
    tituloAr: "الكتاب 2 - القواعد",
    descripcion: "Tu libro de gramática (PDF)",
    descripcionAr: "كتاب القواعد الخاص بك (PDF)",
    nivel: "Niveles A1-B2",
    nivelAr: "المستويات A1-B2",
    url: "https://drive.google.com/file/d/1LH7rczNwGr0VdkAV8jws8NDle2o0eLwB/view?usp=drive_link",
    icon: "file-pdf-box",
    color: "#2196F3"
  },
  {
    titulo: "Libro 3 - Vocabulario",
    tituloAr: "الكتاب 3 - المفردات",
    descripcion: "Tu libro de vocabulario (PDF)",
    descripcionAr: "كتاب المفردات الخاص بك (PDF)",
    nivel: "Niveles A1-B1",
    nivelAr: "المستويات A1-B1",
    url: "https://drive.google.com/file/d/11WIhB_ya5VsMgjWm2EHy_WnLzKGTWLL3/view?usp=drive_link",
    icon: "file-pdf-box",
    color: "#FF9800"
  },
  {
    titulo: "Libro 4 - Ejercicios",
    tituloAr: "الكتاب 4 - التمارين",
    descripcion: "Libro de ejercicios prácticos (PDF)",
    descripcionAr: "كتاب التمارين العملية (PDF)",
    nivel: "Niveles A1-B2",
    nivelAr: "المستويات A1-B2",
    url: "https://drive.google.com/file/d/1f8M6_I4IKGEvbyhIlOhyobz6WvV-2c5B/view?usp=drive_link",
    icon: "file-pdf-box",
    color: "#9C27B0"
  },
  {
    titulo: "Ejercicios de Pronunciación",
    tituloAr: "تمارين النطق",
    descripcion: "Guía práctica para mejorar la pronunciación del español",
    descripcionAr: "دليل عملي لتحسين نطق اللغة الإسبانية",
    nivel: "Todos los niveles",
    nivelAr: "جميع المستويات",
    url: "https://drive.google.com/file/d/ejemplo4/view",
    icon: "microphone",
    color: "#9C27B0"
  },
  {
    titulo: "Cultura Española",
    tituloAr: "الثقافة الإسبانية",
    descripcion: "Introducción a la cultura, tradiciones y costumbres españolas",
    descripcionAr: "مقدمة في الثقافة والتقاليد والعادات الإسبانية",
    nivel: "Niveles B1-C1",
    nivelAr: "المستويات B1-C1",
    url: "https://drive.google.com/file/d/ejemplo5/view",
    icon: "book-multiple",
    color: "#F44336"
  }
];

const LibrosDescargables: React.FC = () => {
  const handleDownload = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Libros Descargables</Text>
        <Text style={styles.subtitle}>كتب قابلة للتحميل</Text>
      </View>
      
      {LIBROS.map((libro, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.libroContainer}
          onPress={() => handleDownload(libro.url)}
        >
          <LinearGradient
            colors={[libro.color, `${libro.color}80`]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.libroContent}>
              <MaterialCommunityIcons name={libro.icon} size={32} color="#fff" />
              <View style={styles.textContainer}>
                <Text style={styles.libroTitle}>{libro.titulo}</Text>
                <Text style={styles.libroTitleAr}>{libro.tituloAr}</Text>
                <Text style={styles.nivel}>{libro.nivel}</Text>
                <Text style={styles.nivelAr}>{libro.nivelAr}</Text>
                <Text style={styles.descripcion}>{libro.descripcion}</Text>
                <Text style={styles.descripcionAr}>{libro.descripcionAr}</Text>
                <View style={styles.downloadButton}>
                  <MaterialCommunityIcons name="download" size={20} color="#fff" />
                  <Text style={styles.downloadText}>Descargar</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default LibrosDescargables;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 16,
  },
  libroContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradient: {
    padding: 16,
  },
  libroContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  libroTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  libroTitleAr: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
  },
  nivel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 2,
  },
  nivelAr: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
    textAlign: 'right',
  },
  descripcion: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
    lineHeight: 20,
  },
  descripcionAr: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 20,
    textAlign: 'right',
    marginBottom: 12,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  downloadText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
}); 