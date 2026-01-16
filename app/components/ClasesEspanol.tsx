import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface NivelClase {
  nivel: string;
  nivelAr: string;
  descripcion: string;
  descripcionAr: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
}

const NIVELES: NivelClase[] = [
  {
    nivel: "A1 - Principiante",
    nivelAr: "A1 - المبتدئ",
    descripcion: "Puedes entender y usar expresiones cotidianas y frases básicas. Puedes presentarte y hacer preguntas simples sobre información personal.",
    descripcionAr: "يمكنك فهم واستخدام التعبيرات اليومية والعبارات الأساسية. يمكنك تقديم نفسك وطرح أسئلة بسيطة حول المعلومات الشخصية.",
    icon: "alpha-a-circle",
    color: "#4CAF50"
  },
  {
    nivel: "A2 - Básico",
    nivelAr: "A2 - الأساسي",
    descripcion: "Puedes comunicarte en situaciones simples y rutinarias. Puedes describir aspectos de tu entorno y necesidades inmediatas.",
    descripcionAr: "يمكنك التواصل في المواقف البسيطة والروتينية. يمكنك وصف جوانب من محيطك واحتياجاتك المباشرة.",
    icon: "alpha-a-box",
    color: "#2196F3"
  },
  {
    nivel: "B1 - Intermedio",
    nivelAr: "B1 - المتوسط",
    descripcion: "Puedes manejar la mayoría de las situaciones que surgen durante viajes. Puedes producir textos simples sobre temas familiares.",
    descripcionAr: "يمكنك التعامل مع معظم المواقف التي تنشأ أثناء السفر. يمكنك إنتاج نصوص بسيطة حول المواضيع المألوفة.",
    icon: "alpha-b-circle",
    color: "#FF9800"
  },
  {
    nivel: "B2 - Intermedio Alto",
    nivelAr: "B2 - فوق المتوسط",
    descripcion: "Puedes interactuar con fluidez con hablantes nativos. Puedes producir textos claros sobre diversos temas.",
    descripcionAr: "يمكنك التفاعل بطلاقة مع المتحدثين الأصليين. يمكنك إنتاج نصوص واضحة حول مواضيع متنوعة.",
    icon: "alpha-b-box",
    color: "#9C27B0"
  },
  {
    nivel: "C1 - Avanzado",
    nivelAr: "C1 - المتقدم",
    descripcion: "Puedes expresarte espontáneamente y con fluidez. Puedes usar el idioma de manera flexible y efectiva.",
    descripcionAr: "يمكنك التعبير عن نفسك بشكل تلقائي وطلاقة. يمكنك استخدام اللغة بشكل مرن وفعال.",
    icon: "alpha-c-circle",
    color: "#F44336"
  },
  {
    nivel: "C2 - Maestría",
    nivelAr: "C2 - الإتقان",
    descripcion: "Puedes entender con facilidad prácticamente todo lo que oyes o lees. Puedes expresarte espontáneamente con gran precisión.",
    descripcionAr: "يمكنك فهم كل ما تسمعه أو تقرأه بسهولة. يمكنك التعبير عن نفسك بشكل تلقائي بدقة عالية.",
    icon: "alpha-c-box",
    color: "#795548"
  }
];

const ClasesEspanol: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Niveles de Español</Text>
        <Text style={styles.subtitle}>مستويات اللغة الإسبانية</Text>
      </View>
      
      {NIVELES.map((nivel, index) => (
        <TouchableOpacity key={index} style={styles.nivelContainer}>
          <LinearGradient
            colors={[nivel.color, `${nivel.color}80`]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.nivelContent}>
              <MaterialCommunityIcons name={nivel.icon} size={32} color="#fff" />
              <View style={styles.textContainer}>
                <Text style={styles.nivelTitle}>{nivel.nivel}</Text>
                <Text style={styles.nivelTitleAr}>{nivel.nivelAr}</Text>
                <Text style={styles.descripcion}>{nivel.descripcion}</Text>
                <Text style={styles.descripcionAr}>{nivel.descripcionAr}</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default ClasesEspanol;

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
  nivelContainer: {
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
  nivelContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  nivelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  nivelTitleAr: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
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
  },
}); 