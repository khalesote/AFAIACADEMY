import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const vocales = [
  {
    letra: 'A',
    videoLetra: require('../../assets/videos/vocal_a_letra.mp4'),
    videoPalabra: require('../../assets/videos/vocal_a_palabra.mp4'),
    ejemploPalabra: 'Arma',
  },
  {
    letra: 'E',
    videoLetra: require('../../assets/videos/vocal_e_letra.mp4'),
    videoPalabra: require('../../assets/videos/vocal_e_palabra.mp4'),
    ejemploPalabra: 'Eco',
  },
  {
    letra: 'I',
    videoLetra: require('../../assets/videos/vocal_i_letra.mp4'),
    videoPalabra: require('../../assets/videos/vocal_i_palabra.mp4'),
    ejemploPalabra: 'Ipo',
  },
  {
    letra: 'O',
    videoLetra: require('../../assets/videos/vocal_o_letra.mp4'),
    videoPalabra: require('../../assets/videos/vocal_o_palabra.mp4'),
    ejemploPalabra: 'Ojo',
  },
  {
    letra: 'U',
    videoLetra: require('../../assets/videos/vocal_u_letra.mp4'),
    videoPalabra: require('../../assets/videos/vocal_u_palabra.mp4'),
    ejemploPalabra: 'Uña',
  },
];

export default function FoneticaVocalesScreen() {
  // Refs para cada video
  const letraRefs = useRef<(Video | null)[]>([]);
  const palabraRefs = useRef<(Video | null)[]>([]);
  // Estados para controlar la reproducción
  const [playingLetra, setPlayingLetra] = useState<boolean[]>(Array(vocales.length).fill(false));
  const [playingPalabra, setPlayingPalabra] = useState<boolean[]>(Array(vocales.length).fill(false));

  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Botón de regreso */}
      <TouchableOpacity
        style={{ marginBottom: 16, alignSelf: 'flex-start', padding: 8 }}
        onPress={() => router.replace('/(tabs)/FoneticaMenuScreen')}
        accessibilityLabel="Volver al menú de fonética"
      >
        <Ionicons name="arrow-back" size={28} color="#79A890" />
      </TouchableOpacity>
      <Text style={styles.title}>Fonética de las Vocales</Text>
      <Text style={styles.titleAr}>صوتيات الحروف المتحركة</Text>
      {vocales.map((v, idx) => (
        <View key={v.letra} style={styles.vocalBlock}>
          <Text style={styles.letra}>{v.letra}</Text>
          <Text style={styles.label}>Pronunciación de la letra:</Text>
          <Video
            ref={el => { letraRefs.current[idx] = el; }}
            source={v.videoLetra}
            style={styles.video}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls={false}
            shouldPlay={playingLetra[idx]}
            onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
              if ('didJustFinish' in status && status.didJustFinish) {
                setPlayingLetra(pl => {
                  const arr = [...pl];
                  arr[idx] = false;
                  return arr;
                });
              }
            }}
          />
          <TouchableOpacity
            style={styles.playButton}
            onPress={async () => {
              if (letraRefs.current[idx]) {
                await letraRefs.current[idx].replayAsync();
                setPlayingLetra(pl => {
                  const arr = [...pl];
                  arr[idx] = true;
                  return arr;
                });
              }
            }}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#9DC3AA', '#79A890']}
              style={styles.playButtonGradient}
            >
              <Text style={styles.playButtonText}>Reproducir letra</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.label}>Ejemplo: {v.ejemploPalabra}</Text>
          <Video
            ref={el => { palabraRefs.current[idx] = el; }}
            source={v.videoPalabra}
            style={styles.video}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls={false}
            shouldPlay={playingPalabra[idx]}
            onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
              if ('didJustFinish' in status && status.didJustFinish) {
                setPlayingPalabra(pl => {
                  const arr = [...pl];
                  arr[idx] = false;
                  return arr;
                });
              }
            }}
          />
          <TouchableOpacity
            style={styles.playButton}
            onPress={async () => {
              if (palabraRefs.current[idx]) {
                await palabraRefs.current[idx].replayAsync();
                setPlayingPalabra(pl => {
                  const arr = [...pl];
                  arr[idx] = true;
                  return arr;
                });
              }
            }}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#9DC3AA', '#79A890']}
              style={styles.playButtonGradient}
            >
              <Text style={styles.playButtonText}>Reproducir palabra</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#79A890',
    textAlign: 'center',
  },
  titleAr: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 28,
    color: '#79A890',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  vocalBlock: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 28,
    width: 320,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  letra: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    marginBottom: 4,
  },
  video: {
    width: 220,
    height: 120,
    backgroundColor: '#000',
    borderRadius: 10,
    marginBottom: 8,
  },
  playButton: {
    borderRadius: 16,
    marginBottom: 8,
    marginTop: 2,
    alignSelf: 'center',
    elevation: 1,
    overflow: 'hidden',
  },
  playButtonGradient: {
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
