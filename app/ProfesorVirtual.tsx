import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useRouter } from 'expo-router';

export default function ProfesorVirtual() {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const router = useRouter();

  // Texto de ejemplo (puedes cambiarlo luego)
  const textoEspanol = 'Bienvenidos al curso de español nivel A1. Hoy aprenderemos el alfabeto.';
  const textoArabe = 'مرحبًا بكم في دورة اللغة الإسبانية المستوى A1. اليوم سنتعلم الأبجدية.';

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Profesor Virtual</Text>
      <View style={{position: 'relative', width: '100%'}}>
        <Video
          ref={videoRef}
          source={require('../assets/intro.mp4')}
          rate={0.85}
          volume={1.0}
          isMuted={false}
          resizeMode={ResizeMode.COVER}
          useNativeControls={false}
          shouldPlay={isPlaying}
          style={styles.video}
          onPlaybackStatusUpdate={status => {
            if (!status.isLoaded) return;
            // type guard para AVPlaybackStatusSuccess
            if ('isPlaying' in status && status.isPlaying !== isPlaying) setIsPlaying(status.isPlaying);
          }}
        />
        <TouchableOpacity
          style={{position: 'absolute', left: '50%', top: '50%', width: 60, height: 60, marginLeft: -30, marginTop: -30, backgroundColor: 'transparent', zIndex: 2}}
          activeOpacity={0.1}
          onPress={async () => {
            if (videoRef.current) {
              const status = await videoRef.current.getStatusAsync();
              if ('isPlaying' in status && status.isPlaying) {
                await videoRef.current.pauseAsync();
                setIsPlaying(false);
              } else if ('didJustFinish' in status && status.didJustFinish) {
                await videoRef.current.setPositionAsync(0);
                await videoRef.current.playAsync();
                setIsPlaying(true);
              } else {
                await videoRef.current.playAsync();
                setIsPlaying(true);
              }
            }
          }}
        />
      </View>
      <View style={styles.textos}>
        <Text style={styles.textoEspanol}>{textoEspanol}</Text>
        <Text style={styles.textoArabe}>{textoArabe}</Text>
      </View>
      <TouchableOpacity style={styles.boton} onPress={async () => {
  if (videoRef.current) await videoRef.current.pauseAsync();
  router.push('/ProfesorVirtualVideo2');
}}>
        <Text style={styles.botonTexto}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1976d2',
    textAlign: 'center',
  },
  video: {
    width: '100%',
    height: 340,
    backgroundColor: '#000',
    borderRadius: 12,
    marginBottom: 24,
  },
  textos: {
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  textoEspanol: {
    fontSize: 16,
    color: '#222',
    marginBottom: 8,
    textAlign: 'center',
  },
  textoArabe: {
    fontSize: 18,
    color: '#388e3c',
    fontWeight: 'bold',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  boton: {
    backgroundColor: '#1976d2',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 24,
    marginTop: 10,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
