import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Oculta el header de navegación para que la flecha personalizada sea visible
export const options = { headerShown: false };

// Si usas React Navigation o Expo Router, oculta el header para esta pantalla:
// export const navigationOptions = { headerShown: false };
// o en el stack: options={{ headerShown: false }}
import { SafeAreaView } from 'react-native-safe-area-context';

// Estructura del script con tiempos (aproximados - ¡necesitarán ajuste fino!)
const script = [
  { time: 0, es: 'Hola,', ar: 'مرحبًا،' },
  { time: 1.5, es: 'soy khaled,', ar: 'أنا خالد،' },
  { time: 3.0, es: 'tu profesor virtual de inteligencia artificial.', ar: 'أستاذك الافتراضي في الذكاء الاصطناعي.' },
  { time: 6.0, es: 'Bienvenidos a la unidad uno: el alfabeto español.', ar: 'مرحبًا بكم في الوحدة الأولى: الأبجدية الإسبانية.' },
  { time: 9.0, es: 'Vamos a aprender las letras del alfabeto español.', ar: 'سنتعلم حروف الأبجدية الإسبانية.' },
  { time: 12.0, es: 'Para cada letra te daré una palabra, un ejemplo.', ar: 'سأعطيك كلمة مثال لكل حرف.' },
  // --- Alfabeto ---
  { time: 15.0, es: 'A. amigo.', ar: 'أ. أمِيجو.' },
  { time: 16.5, es: 'Ejemplo: Mi amigo es muy simpático.', ar: 'مثال: صديقي لطيف جدًا.' },
  { time: 19.0, es: 'B. barco.', ar: 'ب. باركو.' },
  { time: 20.5, es: 'Ejemplo: El barco navega en el mar.', ar: 'مثال: يبحر القارب في البحر.' },
  { time: 23.0, es: 'C. casa.', ar: 'ث. كاسا.' },
  { time: 24.5, es: 'Ejemplo: Vivo en una casa blanca.', ar: 'مثال: أعيش في منزل أبيض.' },
  { time: 27.0, es: 'D. dado.', ar: 'د. دادو.' },
  { time: 28.5, es: 'Ejemplo: El dado tiene seis caras.', ar: 'مثال: النرد له ستة أوجه.' },
  { time: 31.0, es: 'E. elefante.', ar: 'هـ. إليفانتي.' },
  { time: 32.5, es: 'Ejemplo: El elefante es un animal grande.', ar: 'مثال: الفيل حيوان كبير.' },
  { time: 35.0, es: 'F. fuego.', ar: 'ف. فويغو.' },
  { time: 36.5, es: 'Ejemplo: El fuego calienta la habitación.', ar: 'مثال: النار تدفئ الغرفة.' },
  { time: 39.0, es: 'G. gato.', ar: 'ج. جاتو.' },
  { time: 40.5, es: 'Ejemplo: El gato duerme en el sofá.', ar: 'مثال: القط ينام على الأريكة.' },
  { time: 43.0, es: 'H. helado.', ar: 'هـ. هيلادو.' },
  { time: 44.5, es: 'Ejemplo: Me gusta el helado de chocolate.', ar: 'مثال: أحب آيس كريم الشوكولاتة.' },
  { time: 47.0, es: 'I. isla.', ar: 'إي. إيسلا.' },
  { time: 48.5, es: 'Ejemplo: La isla está en el océano.', ar: 'مثال: الجزيرة في المحيط.' },
  { time: 51.0, es: 'J. jugo.', ar: 'خ. خوغو.' },
  { time: 52.5, es: 'Ejemplo: Bebo jugo de naranja.', ar: 'مثال: أشرب عصير البرتقال.' },
  { time: 55.0, es: 'K. kilo.', ar: 'كا. كيلو.' },
  { time: 56.5, es: 'Ejemplo: Un kilo de manzanas.', ar: 'مثال: كيلو من التفاح.' },
  { time: 59.0, es: 'L. luz.', ar: 'إل. لوز.' },
  { time: 60.5, es: 'Ejemplo: La luz está encendida.', ar: 'مثال: الضوء مشتعل.' },
  { time: 63.0, es: 'M. mesa.', ar: 'إم. ميسا.' },
  { time: 64.5, es: 'Ejemplo: La mesa es redonda.', ar: 'مثال: الطاولة مستديرة.' },
  { time: 67.0, es: 'N. niño.', ar: 'إن. نينيو.' },
  { time: 68.5, es: 'Ejemplo: El niño juega en el parque.', ar: 'مثال: الطفل يلعب في الحديقة.' },
  { time: 71.0, es: 'Ñ. ñu.', ar: 'نيي. نيو.' },
  { time: 72.5, es: 'Ejemplo: El ñu vive en África.', ar: 'مثال: النو يعيش في أفريقيا.' },
  { time: 75.0, es: 'O. ojo.', ar: 'أو. أوخو.' },
  { time: 76.5, es: 'Ejemplo: Tengo un ojo marrón y otro azul.', ar: 'مثال: لدي عين بنية وأخرى زرقاء.' },
  { time: 79.0, es: 'P. perro.', ar: 'بِه. بيرّو.' },
  { time: 80.5, es: 'Ejemplo: El perro ladra mucho.', ar: 'مثال: الكلب ينبح كثيرًا.' },
  { time: 83.0, es: 'Q. queso.', ar: 'كو. كيسو.' },
  { time: 84.5, es: 'Ejemplo: Me gusta el queso español.', ar: 'مثال: أحب الجبن الإسباني.' },
  { time: 87.0, es: 'R. rosa.', ar: 'إرِه. روزا.' },
  { time: 88.5, es: 'Ejemplo: La rosa es una flor bonita.', ar: 'مثال: الوردة زهرة جميلة.' },
  { time: 91.0, es: 'S. sol.', ar: 'إس. سول.' },
  { time: 92.5, es: 'Ejemplo: El sol brilla en el cielo.', ar: 'مثال: الشمس تشرق في السماء.' },
  { time: 95.0, es: 'T. taza.', ar: 'تي. تاسا.' },
  { time: 96.5, es: 'Ejemplo: La taza está llena de café.', ar: 'مثال: الكوب مليء بالقهوة.' },
  { time: 99.0, es: 'U. uva.', ar: 'أو. أوفا.' },
  { time: 100.5, es: 'Ejemplo: La uva es una fruta dulce.', ar: 'مثال: العنب فاكهة حلوة.' },
  { time: 103.0, es: 'V. vaso.', ar: 'في. فاسو.' },
  { time: 104.5, es: 'Ejemplo: El vaso está vacío.', ar: 'مثال: الكأس فارغ.' },
  { time: 107.0, es: 'W. wifi.', ar: 'دوبل في. واي فاي.' },
  { time: 108.5, es: 'Ejemplo: Tengo wifi en casa.', ar: 'مثال: لدي واي فاي في المنزل.' },
  { time: 111.0, es: 'X. xilófono.', ar: 'إكس. كسيلوفونو.' },
  { time: 112.5, es: 'Ejemplo: El xilófono es un instrumento musical.', ar: 'مثال: الإكسيلوفون آلة موسيقية.' },
  { time: 115.0, es: 'Y. yate.', ar: 'إي جريغا. ياتي.' },
  { time: 116.5, es: 'Ejemplo: El yate es muy grande.', ar: 'مثال: اليخت كبير جدًا.' },
  { time: 119.0, es: 'Z. zapato.', ar: 'ثيتا. ثاباتو.' },
  { time: 120.5, es: 'Ejemplo: El zapato es nuevo.', ar: 'مثال: الحذاء جديد.' },
  // Add more script lines here if needed
];

export default function FoneticaPronunciacionScreen() {
  const router = useRouter();
  const videoRef = useRef<Video>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [videoStatus, setVideoStatus] = useState<AVPlaybackStatus | null>(null);
  const [isBuffering, setIsBuffering] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1.0);

  // Function to update current line based on video position
  const updateCurrentLine = (playbackStatus: AVPlaybackStatus) => {
    if (!playbackStatus.isLoaded || playbackStatus.isBuffering) return;

    const positionMillis = playbackStatus.positionMillis;
    let newIndex = 0;
    for (let i = 0; i < script.length; i++) {
      if ((script[i].time * 1000) <= positionMillis) {
        newIndex = i;
      } else {
        break;
      }
    }
    if (newIndex !== currentLineIndex) {
      setCurrentLineIndex(newIndex);
    }
  };

  // Handle video status updates
  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    setVideoStatus(status);
    if (status.isLoaded) {
      updateCurrentLine(status);
      setIsBuffering(status.isBuffering);
    } else if (status.error) {
      console.error(`Error loading video: ${status.error}`);
      setIsBuffering(false);
    } else if (!status.isLoaded) {
      setIsBuffering(true);
    }
  };

  // Auto-scroll to the active line (simple version)
  useEffect(() => {
    if (scrollViewRef.current && script[currentLineIndex]) {
      const estimatedLineHeight = 45;
      const scrollToY = currentLineIndex * estimatedLineHeight;
      scrollViewRef.current.scrollTo({ y: scrollToY, animated: true });
    }
  }, [currentLineIndex]);

  // Function to change playback rate
  const changePlaybackRate = async (rate: number) => {
    if (videoRef.current) {
      try {
        await videoRef.current.setStatusAsync({ rate: rate, shouldCorrectPitch: true });
        setPlaybackRate(rate);
      } catch (error) {
        console.error("Error setting playback rate: ", error);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 16,
            top: 48,
            zIndex: 100,
            backgroundColor: 'rgba(255,255,255,0.85)',
            borderRadius: 20,
            padding: 2,
          }}
          onPress={() => router.replace('/A1_Acceso')}
          accessibilityRole="button"
          accessibilityLabel="Volver al menú de fonética"
        >
          <Ionicons name="arrow-back" size={28} color="#79A890" />
        </TouchableOpacity>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 18, marginBottom: 2, zIndex: 100 }}>
            <Text style={styles.title}>Fonética y Pronunciación</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', paddingTop: 18 }}>
            <Text style={styles.titleAr}>علم الأصوات والنطق</Text>
            <View style={styles.cardVideo}>
              <Video
                ref={videoRef}
                source={require('../assets/avatar_khaled.mp4')}
                style={styles.video}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                shouldPlay={false}
              />
              {isBuffering && (
                <ActivityIndicator style={StyleSheet.absoluteFill} size="large" color="#9DC3AA" />
              )}
            </View>

            {/* Playback Rate Controls */}
            <View style={styles.rateControlsContainer}>
              <Text style={styles.rateLabel}>Velocidad / السرعة:</Text>
              <TouchableOpacity style={styles.rateButton} onPress={() => changePlaybackRate(0.75)} activeOpacity={0.8}>
                <LinearGradient
                  colors={playbackRate === 0.75 ? ['#9DC3AA', '#79A890'] : ['#e0e0e0', '#d0d0d0']}
                  style={styles.rateButtonGradient}
                >
                  <Text style={[styles.rateButtonText, playbackRate === 0.75 && { color: '#fff' }]}>0.75x</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rateButton} onPress={() => changePlaybackRate(1.0)} activeOpacity={0.8}>
                <LinearGradient
                  colors={playbackRate === 1.0 ? ['#9DC3AA', '#79A890'] : ['#e0e0e0', '#d0d0d0']}
                  style={styles.rateButtonGradient}
                >
                  <Text style={[styles.rateButtonText, playbackRate === 1.0 && { color: '#fff' }]}>1.0x</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rateButton} onPress={() => changePlaybackRate(1.25)} activeOpacity={0.8}>
                <LinearGradient
                  colors={playbackRate === 1.25 ? ['#9DC3AA', '#79A890'] : ['#e0e0e0', '#d0d0d0']}
                  style={styles.rateButtonGradient}
                >
                  <Text style={[styles.rateButtonText, playbackRate === 1.25 && { color: '#fff' }]}>1.25x</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.cardKaraoke}>
              <Text style={styles.karaokeTitle}>Texto de la Lección / نص الدرس</Text>
              <ScrollView style={styles.karaokeScroll} ref={scrollViewRef}>
                {script.map((line, idx) => (
                  <View key={idx} style={styles.lineContainer}>
                    <Text
                      style={[
                        styles.karaokeText,
                        currentLineIndex === idx && styles.karaokeActive,
                        currentLineIndex > idx && styles.karaokePast,
                      ]}
                    >
                      {line.es}
                    </Text>
                    <Text
                      style={[
                        styles.karaokeTextAr,
                        currentLineIndex === idx && styles.karaokeActiveAr,
                        currentLineIndex > idx && styles.karaokePastAr,
                      ]}
                    >
                      {line.ar}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gradientBg: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 2,
    textAlign: 'center',
    letterSpacing: 1,
  },
  titleAr: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 14,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  cardVideo: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 14,
    marginTop: 18,
    marginBottom: 18,
    shadowColor: '#79A890',
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 12,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: 340,
    height: 192,
    backgroundColor: '#000',
    borderRadius: 16,
    alignSelf: 'center',
    elevation: 3,
  },
  cardKaraoke: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginTop: 6,
    marginBottom: 18,
    shadowColor: '#79A890',
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
  },
  karaokeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#79A890',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  karaokeScroll: {
    maxHeight: 220,
    minHeight: 80,
    paddingHorizontal: 2,
  },
  lineContainer: {
    marginBottom: 7,
  },
  karaokeText: {
    fontSize: 20,
    color: '#bdbdbd',
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.5,
    lineHeight: 28,
  },
  karaokeTextAr: {
    fontSize: 18,
    color: '#bdbdbd',
    textAlign: 'center',
    fontWeight: '500',
    writingDirection: 'rtl',
    fontFamily: 'System',
    marginTop: 2,
    lineHeight: 26,
  },
  karaokeActive: {
    color: '#79A890',
    fontWeight: 'bold',
  },
  karaokeActiveAr: {
    color: '#79A890',
    fontWeight: 'bold',
  },
  karaokePast: {
    color: '#9DC3AA',
  },
  karaokePastAr: {
    color: '#9DC3AA',
  },
  rateControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  rateLabel: {
    fontSize: 16,
    marginRight: 10,
    color: '#333',
    fontWeight: 'bold',
  },
  rateButton: {
    borderRadius: 8,
    marginHorizontal: 4,
    overflow: 'hidden',
  },
  rateButtonGradient: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  rateButtonText: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
  },
});
