import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import dialogoAutores from './dialogoAutores.json';



import { TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const CafeLiterarioScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Café literario</Text>
      <TouchableOpacity style={styles.unitButton} onPress={() => router.push('/CafeLiterarioDialogoScreen?unidad=1&idx=0')}>
        <Text style={styles.unitButtonText}>Presentación de autores</Text>
        <Text style={styles.unitButtonTextAr}>تقديم المؤلفين</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.unitButton} onPress={() => router.push('/CafeLiterarioDialogoScreen?unidad=2&idx=0')}>
        <Text style={styles.unitButtonText}>Encuentro en el café</Text>
        <Text style={styles.unitButtonTextAr}>لقاء في المقهى</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.unitButton} onPress={() => router.push('/CafeLiterarioDialogoScreen?unidad=3&idx=0')}>
        <Text style={styles.unitButtonText}>Diálogo poético</Text>
        <Text style={styles.unitButtonTextAr}>حوار شعري</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.unitButton} onPress={() => router.push('/CafeLiterarioDialogoScreen?unidad=4&idx=0')}>
        <Text style={styles.unitButtonText}>Lecturas cruzadas</Text>
        <Text style={styles.unitButtonTextAr}>قراءات متبادلة</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.unitButton} onPress={() => router.push('/CafeLiterarioDialogoScreen?unidad=5&idx=0')}>
        <Text style={styles.unitButtonText}>Despedida literaria</Text>
        <Text style={styles.unitButtonTextAr}>وداع أدبي</Text>
      </TouchableOpacity>

      {/* Botón para acceder a la Prueba de Voz */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#795548',
    marginBottom: 32,
    textAlign: 'center',
  },
  unitButton: {
    width: '80%',
    backgroundColor: '#795548',
    borderRadius: 12,
    paddingVertical: 18,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  unitButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  unitButtonTextAr: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 2,
    marginBottom: -6,
    writingDirection: 'rtl',
  },
});

export default CafeLiterarioScreen;
