import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TEMAS = [
  'Actualidad Internacional',
  'Ciencia y Tecnología',
  'Cultura y Arte',
  'Debates Sociales',
  'Economía y Consumo',
  'Estudios Superiores',
  'Liderazgo',
  'Mundo Laboral',
  'Relaciones Interculturales',
  'Salud Mental',
  'Viajes Largos',
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
    ENVIAR AL WHATSAPP DEL PROFESOR PARA EVALUACIÓN (INDICAR NOMBRE Y APELLIDO)
    {'\n'}
    أرسل إلى واتساب الأستاذ للتقييم (يُرجى ذكر الاسم واللقب)
  </Text>
);

export default function ExpresionEscrita() {
  const router = useRouter();
  const [tema, setTema] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [telefono, setTelefono] = useState('');
  const [inputTelefono, setInputTelefono] = useState('');
  const [showTelefonoInput, setShowTelefonoInput] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('telefonoProfesor').then(tel => {
      if (tel) setTelefono(tel);
      else setShowTelefonoInput(true);
    });
  }, []);

  const guardarTelefono = async () => {
    if (/^\d{9,15}$/.test(inputTelefono.replace(/[^\d]/g, ""))) {
      const limpio = inputTelefono.replace(/[^\d]/g, "");
      await AsyncStorage.setItem('telefonoProfesor', limpio);
      setTelefono(limpio);
      setShowTelefonoInput(false);
    } else {
      Alert.alert('Número inválido', 'Introduce un número de واتساب válido (solo dígitos, sin espacios).');
    }
  };

  const enviarWhatsApp = () => {
    if (!tema) {
      Alert.alert('Tema no seleccionado', 'Por favor, elige un tema antes de enviar.');
      return;
    }
    if (!respuesta.trim()) {
      Alert.alert('Campo vacío', 'Por favor, escribe tu redacción antes de enviar.');
      return;
    }
    if (!telefono) {
      setShowTelefonoInput(true);
      return;
    }
    const mensaje = `Hola, soy estudiante de la Academia.\nTema: ${tema}\n\nRedacción:\n${respuesta}`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'No se pudo abrir واتساب.');
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.arrowBack} onPress={() => router.replace('/B2_Avanzado')} accessibilityLabel="Volver al menú B2: Avanzado">
        <Ionicons name="arrow-back" size={28} color="#79A890" />
      </TouchableOpacity>
      <Text style={styles.title}>Expresión Escrita - B2</Text>
      <Text style={styles.text}>Elige un tema de las unidades vistas en el nivel y escribe tu texto. Luego, envíalo al profesor por واتساب para su corrección.</Text>
      <View style={styles.dropdownBox}>
        <Text style={styles.dropdownLabel}>Tema:</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => Alert.alert('Temas', '', TEMAS.map(t => ({ text: t, onPress: () => setTema(t) })))}
        >
          <Text style={{ color: tema ? '#222' : '#999', fontSize: 16 }}>
            {tema || 'Selecciona un tema...'}
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu redacción aquí..."
        value={respuesta}
        onChangeText={setRespuesta}
        multiline
        textAlignVertical="top"
      />
      <TouchableOpacity style={styles.button} onPress={enviarWhatsApp}>
        <Text style={styles.buttonText}>Enviar para corrección</Text>
      </TouchableOpacity>
      {showTelefonoInput && (
        <View style={styles.telefonoModal}>
          <Text style={{ marginBottom: 8, fontWeight: 'bold' }}>Introduce tu número de واتساب para enviar las redacciones al profesor:</Text>
          <TextInput
            style={styles.inputTelefono}
            placeholder="Ej: 34612345678"
            keyboardType="phone-pad"
            value={inputTelefono}
            onChangeText={setInputTelefono}
            maxLength={15}
          />
          <TouchableOpacity style={styles.button} onPress={guardarTelefono}>
            <Text style={styles.buttonText}>Guardar número</Text>
          </TouchableOpacity>
        </View>
      )}
      <Text style={{ marginTop: 18, color: '#888', fontSize: 13, textAlign: 'center' }}>
        Tu respuesta será enviada por واتساب al profesor para su corrección.
      </Text>
      <TouchableOpacity style={{ marginTop: 18 }} onPress={() => router.replace('/B2_Avanzado')}>
        <Text style={{ color: '#1976d2', fontWeight: 'bold', fontSize: 16 }}>Volver al menú B2: Avanzado</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#fff', padding: 24 },
  arrowBack: {
    position: 'absolute',
    top: 24,
    left: 16,
    zIndex: 10,
    backgroundColor: '#e3eafc',
    borderRadius: 20,
    padding: 6,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  text: { fontSize: 16, marginBottom: 18, textAlign: 'center' },
  dropdownBox: { width: '100%', marginBottom: 12 },
  dropdownLabel: { fontSize: 15, fontWeight: '500', marginBottom: 4, color: '#1976d2' },
  dropdown: { borderWidth: 1, borderColor: '#bbb', borderRadius: 8, padding: 12, backgroundColor: '#fafafa', minHeight: 44, justifyContent: 'center' },
  input: {
    width: '100%',
    minHeight: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    marginBottom: 14,
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: '#79A890',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 8,
    alignSelf: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  telefonoModal: {
    marginTop: 18,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    borderColor: '#1976d2',
    borderWidth: 1,
  },
  inputTelefono: {
    width: '100%',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    fontSize: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
});
