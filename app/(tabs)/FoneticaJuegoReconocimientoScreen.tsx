import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import * as Sharing from 'expo-sharing';
import * as Linking from 'expo-linking';
import { LinearGradient } from 'expo-linear-gradient';

const PALABRAS_Y_FRASES = [
  'Tres tristes tigres tragan trigo en un trigal',
  'Pedro Pérez pintor pinta preciosos paisajes por poca plata para poder partir para París',
  'El cielo está enladrillado, ¿quién lo desenladrillará?',
  'Erre con erre guitarra, erre con erre barril',
  'Pablito clavó un clavito, ¿qué clavito clavó Pablito?',
  'Mi mamá me mima, mi mamá me ama',
  'Rápido ruedan los carros cargados de azúcar al ferrocarril',
  'Juan junta juncos junto a la zanja',
  'Compadre, cómprame un coco, compadre, coco no compro',
  'El perro de San Roque no tiene rabo porque Ramón Ramírez se lo ha cortado',
  'El amor todo lo puede',
  'La rana rema en el río',
  'Parangaricutirimícuaro',
  'Otorrinolaringólogo',
  'Supercalifragilisticoespialidoso',
  'Hoy es un buen día para aprender español',
  'El rey de Constantinopla se quiere descontantinopolizar',
  'El que poco coco come, poco coco compra',
  'Si el caracol tuviera cara como tiene el caracol',
  'Me han dicho que has dicho un dicho, un dicho que he dicho yo',
  'El hipopótamo Hipo está con hipo, ¿quién le quita el hipo al hipopótamo Hipo?',
  'Pancha plancha con cuatro planchas, ¿con cuántas planchas Pancha plancha?',
  'El vino vino, pero el vino no vino vino, el vino vino vinagre',
  'Cómo quieres que te quiera si el que quiero que me quiera no me quiere como quiero que me quiera',
  'Cuando cuentes cuentos, cuenta cuántos cuentos cuentas',
  'Si tu gusto gustara del gusto que gusta mi gusto, mi gusto gustaría del gusto que gusta tu gusto',
  'El perro de Rita me irrita, dile a Rita que cambie el perro de Rita por una perrita',
  'La bruja piruja prepara un brebaje en un frasco',
  'El otorrinolaringólogo de Parangaricutirimícuaro no pudo con el supercalifragilisticoespialidoso',
];

const profesorWhatsApp = '5491123456789'; // Cambia este número por el del profesor

const recordingOptions = {
  android: {
    extension: '.m4a',
    outputFormat: 2, // MPEG_4
    audioEncoder: 3, // AAC
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: '.caf',
    audioQuality: 0, // AVAudioQualityMax
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
  web: {
    mimeType: 'audio/webm',
    bitsPerSecond: 128000,
  },
};

import { useRouter } from 'expo-router';

const FoneticaJuegoReconocimientoScreen = () => {
  const router = useRouter();
  
  const [grabandoIndex, setGrabandoIndex] = useState<number | null>(null);
  const [audioUris, setAudioUris] = useState<(string | null)[]>(Array(PALABRAS_Y_FRASES.length).fill(null));
  const recordingRef = useRef<Audio.Recording | null>(null);

  const iniciarGrabacion = async (index: number) => {
    try {
      setGrabandoIndex(index);
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Debes permitir el acceso al micrófono.');
        setGrabandoIndex(null);
        return;
      }
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(recordingOptions);
      await recording.startAsync();
      recordingRef.current = recording;
    } catch (error) {
      Alert.alert('Error', 'No se pudo iniciar la grabación.');
      setGrabandoIndex(null);
    }
  };

  const detenerGrabacion = async (index: number) => {
    try {
      const recording = recordingRef.current;
      if (!recording) return;
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      if (uri) {
        const nuevosUris = [...audioUris];
        nuevosUris[index] = uri;
        setAudioUris(nuevosUris);
      }
      recordingRef.current = null;
      setGrabandoIndex(null);
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la grabación.');
      setGrabandoIndex(null);
    }
  };

  const compartirWhatsApp = async (index: number) => {
    const uri = audioUris[index];
    if (!uri) {
      Alert.alert('Primero graba tu pronunciación.');
      return;
    }
    if (Platform.OS === 'web') {
      Alert.alert('Función no disponible en web. Usa un dispositivo móvil.');
      return;
    }
    try {
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        const mensaje = `Hola profesor, adjunto mi grabación de: "${PALABRAS_Y_FRASES[index]}".`;
        const url = `https://wa.me/${profesorWhatsApp}?text=${encodeURIComponent(mensaje)}`;
        Linking.openURL(url);
        Alert.alert('Adjunta el audio', 'Recuerda adjuntar manualmente el archivo de audio en WhatsApp.');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo compartir el audio.');
    }
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.text}>{item}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.boton}
          onPress={grabandoIndex === index ? () => detenerGrabacion(index) : () => iniciarGrabacion(index)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={grabandoIndex === index ? ['#d32f2f', '#b71c1c'] : ['#9DC3AA', '#79A890']}
            style={styles.botonGradient}
          >
            <Text style={styles.botonTexto}>{grabandoIndex === index ? 'Detener' : 'Grabar'}</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.boton}
          onPress={() => compartirWhatsApp(index)}
          disabled={!audioUris[index]}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={audioUris[index] ? ['#25D366', '#128C7E'] : ['#9e9e9e', '#757575']}
            style={styles.botonGradient}
          >
            <Text style={styles.botonTexto}>WhatsApp</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {audioUris[index] && <Text style={styles.estadoGrabado}>✓ Grabado</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Flecha de regreso */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/(tabs)/FoneticaMenuScreen')}
      >
        <Text style={{ fontSize: 28 }}>←</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>Practica tu pronunciación</Text>
      <Text style={styles.tituloAr}>تدرب على نطقك</Text>
      <FlatList
        data={PALABRAS_Y_FRASES}
        renderItem={renderItem}
        keyExtractor={(_, idx) => idx.toString()}
      />
      <Text style={styles.instruccion}>
        Graba tu pronunciación y compártela con tu profesor por WhatsApp para recibir corrección.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 36 : 60,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 36 : 60,
    left: 16,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
    color: '#79A890',
  },
  tituloAr: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#79A890',
    writingDirection: 'rtl',
  },
  itemContainer: {
    padding: 12,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#f3f3f3',
    elevation: 2,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: '#222',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boton: {
    borderRadius: 8,
    marginRight: 10,
    overflow: 'hidden',
    flex: 1,
  },
  botonGradient: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  estadoGrabado: {
    color: '#79A890',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  instruccion: {
    marginTop: 24,
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
  },
});

export default FoneticaJuegoReconocimientoScreen;
