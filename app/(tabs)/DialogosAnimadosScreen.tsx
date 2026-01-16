import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Speech from 'expo-speech';

type DialogLine = {
  id: string;
  side: 'left' | 'right';
  es: string;
  ar: string;
  avatarLabel: string;
};

type DialogTheme = {
  id: string;
  titleEs: string;
  titleAr: string;
  icon: string;
  lines: DialogLine[];
};

const DIALOG_THEMES: DialogTheme[] = [
  {
    id: 'saludo',
    titleEs: 'Saludo básico',
    titleAr: 'تحية أساسية',
    icon: 'hand-left',
    lines: [
      { id: 's1', side: 'left', avatarLabel: 'A', es: 'Hola, ¿cómo estás?', ar: 'مرحباً، كيف حالك؟' },
      { id: 's2', side: 'right', avatarLabel: 'B', es: 'Muy bien, gracias. ¿Y tú?', ar: 'أنا بخير، شكراً. وأنت؟' },
      { id: 's3', side: 'left', avatarLabel: 'A', es: 'Estoy aprendiendo español.', ar: 'أنا أتعلم الإسبانية.' },
      { id: 's4', side: 'right', avatarLabel: 'B', es: '¡Qué bien! Yo te puedo ayudar.', ar: 'رائع! أستطيع مساعدتك.' },
    ],
  },
  {
    id: 'tienda',
    titleEs: 'En la tienda',
    titleAr: 'في المتجر',
    icon: 'cart',
    lines: [
      { id: 't1', side: 'left', avatarLabel: 'C', es: 'Buenos días, ¿cuánto cuesta esto?', ar: 'صباح الخير، كم سعر هذا؟' },
      { id: 't2', side: 'right', avatarLabel: 'V', es: 'Cuesta cinco euros.', ar: 'سعره خمسة يورو.' },
      { id: 't3', side: 'left', avatarLabel: 'C', es: '¿Tiene uno más barato?', ar: 'هل لديك واحد أرخص؟' },
      { id: 't4', side: 'right', avatarLabel: 'V', es: 'Sí, este cuesta tres euros.', ar: 'نعم، هذا بثلاثة يورو.' },
      { id: 't5', side: 'left', avatarLabel: 'C', es: 'Perfecto, me lo llevo.', ar: 'ممتاز، سآخذه.' },
    ],
  },
  {
    id: 'medico',
    titleEs: 'En el médico',
    titleAr: 'عند الطبيب',
    icon: 'medkit',
    lines: [
      { id: 'm1', side: 'right', avatarLabel: 'D', es: 'Buenos días, ¿qué le pasa?', ar: 'صباح الخير، ما المشكلة؟' },
      { id: 'm2', side: 'left', avatarLabel: 'P', es: 'Me duele la cabeza mucho.', ar: 'رأسي يؤلمني كثيراً.' },
      { id: 'm3', side: 'right', avatarLabel: 'D', es: '¿Desde cuándo le duele?', ar: 'منذ متى يؤلمك؟' },
      { id: 'm4', side: 'left', avatarLabel: 'P', es: 'Desde ayer por la noche.', ar: 'منذ البارحة ليلاً.' },
      { id: 'm5', side: 'right', avatarLabel: 'D', es: 'Le voy a recetar unas pastillas.', ar: 'سأصف لك بعض الحبوب.' },
    ],
  },
  {
    id: 'trabajo',
    titleEs: 'Buscando trabajo',
    titleAr: 'البحث عن عمل',
    icon: 'briefcase',
    lines: [
      { id: 'w1', side: 'left', avatarLabel: 'J', es: 'Buenos días, busco trabajo.', ar: 'صباح الخير، أبحث عن عمل.' },
      { id: 'w2', side: 'right', avatarLabel: 'E', es: '¿Tiene experiencia?', ar: 'هل لديك خبرة؟' },
      { id: 'w3', side: 'left', avatarLabel: 'J', es: 'Sí, trabajé dos años en un restaurante.', ar: 'نعم، عملت سنتين في مطعم.' },
      { id: 'w4', side: 'right', avatarLabel: 'E', es: '¿Puede empezar mañana?', ar: 'هل يمكنك البدء غداً؟' },
      { id: 'w5', side: 'left', avatarLabel: 'J', es: 'Sí, claro. ¡Muchas gracias!', ar: 'نعم، بالطبع. شكراً جزيلاً!' },
    ],
  },
  {
    id: 'transporte',
    titleEs: 'Transporte público',
    titleAr: 'المواصلات العامة',
    icon: 'bus',
    lines: [
      { id: 'b1', side: 'left', avatarLabel: 'P', es: 'Perdone, ¿qué autobús va al centro?', ar: 'عفواً، أي حافلة تذهب للمركز؟' },
      { id: 'b2', side: 'right', avatarLabel: 'I', es: 'El número 5 o el 12.', ar: 'رقم 5 أو 12.' },
      { id: 'b3', side: 'left', avatarLabel: 'P', es: '¿Cuánto cuesta el billete?', ar: 'كم سعر التذكرة؟' },
      { id: 'b4', side: 'right', avatarLabel: 'I', es: 'Un euro con cincuenta.', ar: 'يورو ونصف.' },
      { id: 'b5', side: 'left', avatarLabel: 'P', es: 'Gracias por la información.', ar: 'شكراً على المعلومات.' },
    ],
  },
  {
    id: 'restaurante',
    titleEs: 'En el restaurante',
    titleAr: 'في المطعم',
    icon: 'restaurant',
    lines: [
      { id: 'r1', side: 'right', avatarLabel: 'C', es: 'Buenas tardes, ¿tienen mesa libre?', ar: 'مساء الخير، هل لديكم طاولة فارغة؟' },
      { id: 'r2', side: 'left', avatarLabel: 'M', es: 'Sí, ¿para cuántas personas?', ar: 'نعم، لكم شخص؟' },
      { id: 'r3', side: 'right', avatarLabel: 'C', es: 'Para dos, por favor.', ar: 'لشخصين، من فضلك.' },
      { id: 'r4', side: 'left', avatarLabel: 'M', es: 'Síganme, por aquí.', ar: 'اتبعوني، من هنا.' },
      { id: 'r5', side: 'right', avatarLabel: 'C', es: '¿Nos trae la carta?', ar: 'هل تحضر لنا القائمة؟' },
    ],
  },
];

export default function DialogosAnimadosScreen() {
  const router = useRouter();
  const [selectedThemeId, setSelectedThemeId] = useState<string>(DIALOG_THEMES[0].id);
  const selectedTheme = useMemo(
    () => DIALOG_THEMES.find((t) => t.id === selectedThemeId) ?? DIALOG_THEMES[0],
    [selectedThemeId]
  );

  const [activeLineId, setActiveLineId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const playbackTokenRef = useRef(0);

  const speakAnim = useRef(new Animated.Value(0)).current;
  const speakAnimLoopRef = useRef<Animated.CompositeAnimation | null>(null);

  const startAvatarAnim = useCallback(() => {
    speakAnim.setValue(0);
    if (speakAnimLoopRef.current) {
      speakAnimLoopRef.current.stop();
      speakAnimLoopRef.current = null;
    }
    speakAnimLoopRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(speakAnim, {
          toValue: 1,
          duration: 160,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(speakAnim, {
          toValue: 0,
          duration: 160,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    speakAnimLoopRef.current.start();
  }, [speakAnim]);

  const stopAvatarAnim = useCallback(() => {
    if (speakAnimLoopRef.current) {
      speakAnimLoopRef.current.stop();
      speakAnimLoopRef.current = null;
    }
    speakAnim.setValue(0);
  }, [speakAnim]);

  const stopPlayback = useCallback(() => {
    playbackTokenRef.current += 1;
    Speech.stop();
    stopAvatarAnim();
    setIsPlaying(false);
    setActiveLineId(null);
  }, [stopAvatarAnim]);

  const playFromIndex = useCallback(
    (startIndex: number) => {
      const token = playbackTokenRef.current + 1;
      playbackTokenRef.current = token;

      const lines = selectedTheme?.lines ?? [];
      if (lines.length === 0) {
        stopPlayback();
        return;
      }

      const playLine = (i: number) => {
        if (playbackTokenRef.current !== token) return;
        if (i >= lines.length) {
          stopAvatarAnim();
          setActiveLineId(null);
          setIsPlaying(false);
          setCurrentLineIndex(0);
          return;
        }

        const line = lines[i];
        setIsPlaying(true);
        setActiveLineId(line.id);
        setCurrentLineIndex(i);
        startAvatarAnim();

        Speech.stop();
        Speech.speak(line.es, {
          language: 'es-ES',
          rate: 0.9,
          onDone: () => {
            if (playbackTokenRef.current !== token) return;
            playLine(i + 1);
          },
          onStopped: () => {
            if (playbackTokenRef.current !== token) return;
            stopPlayback();
          },
          onError: () => {
            if (playbackTokenRef.current !== token) return;
            stopPlayback();
          },
        });
      };

      playLine(startIndex);
    },
    [selectedTheme, startAvatarAnim, stopAvatarAnim, stopPlayback]
  );

  useEffect(() => {
    stopPlayback();
    setCurrentLineIndex(0);
  }, [selectedThemeId, stopPlayback]);

  useEffect(() => {
    return () => {
      Speech.stop();
      stopPlayback();
    };
  }, [stopPlayback]);

  const avatarAnimatedStyle = {
    transform: [
      {
        scale: speakAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.12],
        }),
      },
      {
        rotate: speakAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '-8deg'],
        }),
      },
    ],
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      playFromIndex(0);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#1976d2" />
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>Diálogos Animados</Text>
          <Text style={styles.headerTitleAr}>حوارات متحركة</Text>
        </View>
      </View>

      {/* Selector de temas */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.themesContainer}
      >
        {DIALOG_THEMES.map((theme) => {
          const isActive = theme.id === selectedThemeId;
          return (
            <TouchableOpacity
              key={theme.id}
              style={[styles.themeCard, isActive && styles.themeCardActive]}
              onPress={() => setSelectedThemeId(theme.id)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={theme.icon as any}
                size={24}
                color={isActive ? '#fff' : '#1976d2'}
              />
              <Text style={[styles.themeTextEs, isActive && styles.themeTextEsActive]}>
                {theme.titleEs}
              </Text>
              <Text style={[styles.themeTextAr, isActive && styles.themeTextArActive]}>
                {theme.titleAr}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Área de diálogo */}
      <ScrollView style={styles.dialogArea} contentContainerStyle={styles.dialogContent}>
        <View style={styles.dialogHeader}>
          <View>
            <Text style={styles.dialogTitleEs}>{selectedTheme.titleEs}</Text>
            <Text style={styles.dialogTitleAr}>{selectedTheme.titleAr}</Text>
          </View>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              {currentLineIndex + 1} / {selectedTheme.lines.length}
            </Text>
          </View>
        </View>

        {selectedTheme.lines.map((line, index) => {
          const isLeft = line.side === 'left';
          const isActive = activeLineId === line.id;
          const isPast = index < currentLineIndex;

          return (
            <Animated.View
              key={line.id}
              style={[
                styles.lineRow,
                isLeft ? styles.lineRowLeft : styles.lineRowRight,
                isPast && styles.lineRowPast,
              ]}
            >
              {isLeft && (
                <Animated.View style={isActive ? avatarAnimatedStyle : undefined}>
                  <View
                    style={[
                      styles.avatar,
                      styles.avatarLeft,
                      isActive && styles.avatarActive,
                    ]}
                  >
                    <Text style={styles.avatarText}>{line.avatarLabel}</Text>
                  </View>
                </Animated.View>
              )}

              <View
                style={[
                  styles.bubble,
                  isLeft ? styles.bubbleLeft : styles.bubbleRight,
                  isActive && styles.bubbleActive,
                ]}
              >
                <Text style={[styles.bubbleTextEs, isActive && styles.bubbleTextEsActive]}>
                  {line.es}
                </Text>
                <Text style={styles.bubbleTextAr}>{line.ar}</Text>
              </View>

              {!isLeft && (
                <Animated.View style={isActive ? avatarAnimatedStyle : undefined}>
                  <View
                    style={[
                      styles.avatar,
                      styles.avatarRight,
                      isActive && styles.avatarActive,
                    ]}
                  >
                    <Text style={styles.avatarText}>{line.avatarLabel}</Text>
                  </View>
                </Animated.View>
              )}
            </Animated.View>
          );
        })}
      </ScrollView>

      {/* Botón de reproducción */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.playButton, isPlaying && styles.playButtonStop]}
          onPress={handlePlayPause}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={isPlaying ? ['#d32f2f', '#c62828'] : ['#1976d2', '#1565c0']}
            style={styles.playButtonGradient}
          >
            <Ionicons
              name={isPlaying ? 'stop' : 'play'}
              size={32}
              color="#fff"
            />
            <Text style={styles.playButtonText}>
              {isPlaying ? 'Detener' : 'Reproducir Diálogo'}
            </Text>
            <Text style={styles.playButtonTextAr}>
              {isPlaying ? 'إيقاف' : 'تشغيل الحوار'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backBtn: {
    padding: 8,
  },
  headerTitles: {
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  headerTitleAr: {
    fontSize: 16,
    color: '#388e3c',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  themesContainer: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  themeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 6,
    alignItems: 'center',
    minWidth: 100,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  themeCardActive: {
    backgroundColor: '#1976d2',
    borderColor: '#1565c0',
  },
  themeTextEs: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333',
    marginTop: 6,
    textAlign: 'center',
  },
  themeTextEsActive: {
    color: '#fff',
  },
  themeTextAr: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    writingDirection: 'rtl',
    marginTop: 2,
  },
  themeTextArActive: {
    color: '#e3f2fd',
  },
  dialogArea: {
    flex: 1,
  },
  dialogContent: {
    padding: 16,
    paddingBottom: 24,
  },
  dialogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
  },
  dialogTitleEs: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  dialogTitleAr: {
    fontSize: 15,
    color: '#388e3c',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  progressContainer: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1976d2',
  },
  lineRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 14,
  },
  lineRowLeft: {
    justifyContent: 'flex-start',
  },
  lineRowRight: {
    justifyContent: 'flex-end',
  },
  lineRowPast: {
    opacity: 0.6,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLeft: {
    backgroundColor: '#9DC3AA',
    marginRight: 10,
  },
  avatarRight: {
    backgroundColor: '#1976d2',
    marginLeft: 10,
  },
  avatarActive: {
    borderWidth: 3,
    borderColor: '#ff9800',
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bubble: {
    maxWidth: '75%',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  bubbleLeft: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d8e6df',
  },
  bubbleRight: {
    backgroundColor: '#e3f2fd',
    borderWidth: 1,
    borderColor: '#bbdefb',
  },
  bubbleActive: {
    borderColor: '#ff9800',
    borderWidth: 2,
  },
  bubbleTextEs: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  bubbleTextEsActive: {
    color: '#1976d2',
  },
  bubbleTextAr: {
    marginTop: 6,
    fontSize: 14,
    color: '#d32f2f',
    fontWeight: '600',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  controlsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  playButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  playButtonStop: {},
  playButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 12,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  playButtonTextAr: {
    color: '#e3f2fd',
    fontSize: 14,
    writingDirection: 'rtl',
  },
});
