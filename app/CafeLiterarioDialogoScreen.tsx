import React, { useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useLocalSearchParams, useRouter } from 'expo-router';
import dialogoAutores from './dialogoAutores.json';
import dialogoEncuentroCafe from './dialogoEncuentroCafe.json';
import dialogoUnidad3 from './dialogoUnidad3.json';
import dialogoUnidad4 from './dialogoUnidad4.json';
import dialogoUnidad5 from './dialogoUnidad5.json';

const videoMap: Record<string, any> = {
  '1.mp4': require('../assets/conocerse/1.mp4'),
  '2.mp4': require('../assets/conocerse/2.mp4'),
  '3.mp4': require('../assets/conocerse/3.mp4'),
  '4.mp4': require('../assets/conocerse/4.mp4'),
  '5.mp4': require('../assets/conocerse/5.mp4'),
  '6.mp4': require('../assets/conocerse/6.mp4'),
  '7.mp4': require('../assets/conocerse/7.mp4'),
  '8.mp4': require('../assets/conocerse/8.mp4'),
  '9.mp4': require('../assets/conocerse/9.mp4'),
  'garcilaso1.mp4': require('../assets/conocerse/garcilaso1.mp4'),
  'garcilaso2.mp4': require('../assets/conocerse/garcilaso2.mp4'),
  'lorca1.mp4': require('../assets/conocerse/lorca1.mp4'),
  'lorca2.mp4': require('../assets/conocerse/lorca2.mp4'),
  'cervantes1.mp4': require('../assets/conocerse/cervantes1.mp4'),
  // Variantes para unidades 3/4/5
  'lorca_001.mp4': require('../assets/conocerse/lorca_001.mp4'),
  'lorca_002.mp4': require('../assets/conocerse/lorca_002.mp4'),
  'lorca_01.mp4': require('../assets/conocerse/lorca_01.mp4'),
  'lorca_1.mp4': require('../assets/conocerse/lorca_1.mp4'),
  'lorca_2.mp4': require('../assets/conocerse/lorca_2.mp4'),
  'garcilaso_001.mp4': require('../assets/conocerse/garcilaso_001.mp4'),
  'garcilaso_002.mp4': require('../assets/conocerse/garcilaso_002.mp4'),
  'garcilaso_01.mp4': require('../assets/conocerse/garcilaso_01.mp4'),
  'garcilaso_1.mp4': require('../assets/conocerse/garcilaso_1.mp4'),

  'cervantes_001.mp4': require('../assets/conocerse/cervantes_001.mp4'),
  'cervantes_002.mp4': require('../assets/conocerse/cervantes_002.mp4'),
  'cervantes_01.mp4': require('../assets/conocerse/cervantes_01.mp4'),
  'cervantes_02.mp4': require('../assets/conocerse/cervantes_02.mp4'),
  'cervantes_1.mp4': require('../assets/conocerse/cervantes_1.mp4'),
  'cervantes_2.mp4': require('../assets/conocerse/cervantes_2.mp4'),
};

const CafeLiterarioDialogoScreen = () => {
  const { idx, unidad } = useLocalSearchParams();
  const router = useRouter();
  const index = parseInt(idx as string, 10);
  const unidadNum = unidad ? parseInt(unidad as string, 10) : 1;

  // Selecciona el array de diálogos según la unidad
  let dialogos;
  switch (unidadNum) {
    case 1:
      dialogos = dialogoAutores;
      break;
    case 2:
      dialogos = dialogoEncuentroCafe;
      break;
    case 3:
      dialogos = dialogoUnidad3;
      break;
    case 4:
      dialogos = dialogoUnidad4;
      break;
    case 5:
      dialogos = dialogoUnidad5;
      break;
    default:
      dialogos = dialogoAutores;
  }
  const item = dialogos[index];

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.texto}>Diálogo no encontrado.</Text>
      </View>
    );
  }

  const videoRef = useRef<any>(null);

  const handleNavigate = (newIdx: number) => {
    if (videoRef.current) {
      videoRef.current.pauseAsync();
    }
    router.replace(`/CafeLiterarioDialogoScreen?unidad=${unidadNum}&idx=${newIdx}`);
  };

  // Definir color de fondo según el autor
  let bgColor = '#fff';
  let fondoImg = null;
  if (item.autor) {
    const autorLower = item.autor.toLowerCase();
    if (autorLower.includes('lorca')) {
      bgColor = '#fce4ec';
      fondoImg = require('../assets/fondos/lorca.jpg');
    } else if (autorLower.includes('cervantes')) {
      bgColor = '#e3f2fd';
      fondoImg = require('../assets/fondos/cervantes.jpg');
    } else if (autorLower.includes('garcilaso')) {
      bgColor = '#f3e5ab';
      fondoImg = require('../assets/fondos/garcilaso.jpg');
    }
  }

  const InnerContent = (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: fondoImg ? 'transparent' : bgColor, minHeight: '100%' }]}
      keyboardShouldPersistTaps="handled">
      <Video
        ref={videoRef}
        source={videoMap[item.video]}
        style={styles.video}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        shouldPlay
      />
      <View style={styles.textBubble}><Text style={styles.autor}>{item.autor}</Text></View>
      <View style={styles.textBubble}><Text style={styles.texto}>{item.texto}</Text></View>
      <View style={styles.textBubble}><Text style={styles.arabe}>{item.arabe}</Text></View>
      <View style={styles.navigation}>
        {index > 0 && (
          <Text style={styles.navButton} onPress={() => handleNavigate(index - 1)}>
            Anterior
          </Text>
        )}
        {index < dialogos.length - 1 && (
          <Text style={styles.navButton} onPress={() => handleNavigate(index + 1)}>
            Siguiente
          </Text>
        )}
      </View>
    </ScrollView>
  );

  return fondoImg ? (
    <ImageBackground source={fondoImg} style={{ flex: 1 }} resizeMode="cover">
      {InnerContent}
    </ImageBackground>
  ) : (
    InnerContent
  );
};

const styles = StyleSheet.create({
  textBubble: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 10,
    alignSelf: 'stretch',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  container: {
    flex: 1,
    // backgroundColor se asignará dinámicamente
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  video: {
    width: 300,
    height: 300,
    backgroundColor: '#000',
    borderRadius: 150,
    overflow: 'hidden',
    marginBottom: 24,
  },
  autor: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#4e342e',
    marginBottom: 16,
    textAlign: 'center',
  },
  texto: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  arabe: {
    fontSize: 16,
    color: 'red',
    marginBottom: 24,
    textAlign: 'right',
    fontFamily: 'Arial',
    writingDirection: 'rtl',
    fontWeight: 'bold',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 4,
  },
  navButton: {
    fontSize: 18,
    color: '#1976d2',
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default CafeLiterarioDialogoScreen;
