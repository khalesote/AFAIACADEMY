import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, I18nManager, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';

const TEMAS = [
  {
    es: "Un recuerdo especial de tu infancia",
    ar: "ذِكرى خاصة من طفولتك"
  },
  {
    es: "Describe tu lugar favorito y por qué te gusta",
    ar: "صف مكانك المفضل ولماذا تحبه"
  },
  {
    es: "Habla sobre una persona que admiras",
    ar: "تحدث عن شخص تُعجب به"
  },
  {
    es: "Tus planes para el próximo fin de semana",
    ar: "خططك لعطلة نهاية الأسبوع القادمة"
  },
  {
    es: "Una tradición importante en tu país",
    ar: "تقليد مهم في بلدك"
  }
];

// NOTA IMPORTANTE

const NotaWhatsApp = () => (
  <Text style={{
    backgroundColor: '#ffe082',
    color: '#b71c1c',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 18,
    padding: 14,
    borderRadius: 10,
  }}>
    ENVIAR AL واتساب DEL PROFESOR PARA EVALUACIÓN (INDICAR NOMBRE Y APELLIDO)
    {'\n'}
    أرسل إلى واتساب الأستاذ للتقييم (يُرجى ذكر الاسم واللقب)
  </Text>
);

export default function ExpresionEscrita() {
  const router = useRouter();
  const [temaIdx, setTemaIdx] = useState(0);
  const [texto, setTexto] = useState("");

  const cambiarTema = () => {
    let nuevaIdx = temaIdx;
    while (nuevaIdx === temaIdx) {
      nuevaIdx = Math.floor(Math.random() * TEMAS.length);
    }
    setTemaIdx(nuevaIdx);
  };

  const enviarWhatsApp = () => {
    if (!texto.trim()) {
      Alert.alert('Atención', 'Por favor escribe tu texto antes de enviarlo.');
      return;
    }
    const mensaje = `Tema: ${TEMAS[temaIdx].es}\n${texto}`;
    const url = `whatsapp://send?text=${encodeURIComponent(mensaje)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'No se pudo abrir واتساب.');
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/A2_Plataforma')}>
        <Text style={styles.backButtonText}>b05 Volver a unidades</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Expresión Escrita - A2</Text>
      <View style={styles.temaBox}>
        <Text style={styles.temaEs}>{TEMAS[temaIdx].es}</Text>
        <Text style={styles.temaAr}>{TEMAS[temaIdx].ar}</Text>
        <TouchableOpacity style={styles.cambiarTemaBtn} onPress={cambiarTema}>
          <Text style={styles.cambiarTemaTxt}>Cambiar tema</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Tu texto:</Text>
      <TextInput
        style={styles.textInput}
        value={texto}
        onChangeText={setTexto}
        placeholder="Escribe aquí tu texto..."
        multiline
        textAlignVertical="top"
        maxLength={1200}
      />
      <TouchableOpacity style={styles.enviarBtn} onPress={enviarWhatsApp}>
        <Text style={styles.enviarTxt}>Enviar por واتساب</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: 24
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#1976d2',
    textAlign: 'center'
  },
  temaBox: {
    width: '100%',
    backgroundColor: '#e3eafc',
    borderRadius: 10,
    padding: 14,
    marginBottom: 18,
    alignItems: 'flex-start',
    elevation: 1
  },
  temaEs: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
    textAlign: 'left'
  },
  temaAr: {
    fontSize: 16,
    color: '#1976d2',
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 6,
    alignSelf: 'stretch'
  },
  cambiarTemaBtn: {
    backgroundColor: '#fff',
    borderColor: '#1976d2',
    borderWidth: 1,
    borderRadius: 7,
    paddingVertical: 5,
    paddingHorizontal: 12,
    alignSelf: 'flex-end',
    marginTop: 4
  },
  cambiarTemaTxt: {
    color: '#1976d2',
    fontWeight: 'bold',
    fontSize: 14
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
    alignSelf: 'flex-start',
    marginLeft: 2
  },
  textInput: {
    width: '100%',
    minHeight: 120,
    maxHeight: 220,
    borderColor: '#b0bec5',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 18,
    backgroundColor: '#fafcff',
    textAlign: 'left'
  },
  enviarBtn: {
    backgroundColor: '#25D366',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 4
  },
  enviarTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: '#e3eafc',
  },
  backButtonText: {
    color: '#1976d2',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
