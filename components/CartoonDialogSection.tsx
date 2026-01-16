import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Speech from 'expo-speech';

type CartoonDialogLine = {
  id: string;
  side: 'left' | 'right';
  es: string;
  ar: string;
  avatarLabel: string;
};

type CartoonDialogTheme = {
  id: string;
  titleEs: string;
  titleAr: string;
  lines: CartoonDialogLine[];
};

type CartoonDialogSectionProps = {
  titleEs?: string;
  titleAr?: string;
  themes?: CartoonDialogTheme[];
};

const defaultThemes: CartoonDialogTheme[] = [
  {
    id: 'saludo',
    titleEs: 'Saludo',
    titleAr: 'تحية',
    lines: [
      {
        id: 'saludo-1',
        side: 'left',
        avatarLabel: 'A',
        es: 'Hola, ¿cómo estás?',
        ar: 'مرحباً، كيف حالك؟',
      },
      {
        id: 'saludo-2',
        side: 'right',
        avatarLabel: 'B',
        es: 'Muy bien, gracias. ¿Y tú?',
        ar: 'أنا بخير، شكراً. وأنت؟',
      },
      {
        id: 'saludo-3',
        side: 'left',
        avatarLabel: 'A',
        es: 'Estoy aprendiendo español en la Academia.',
        ar: 'أنا أتعلم الإسبانية في الأكاديمية.',
      },
      {
        id: 'saludo-4',
        side: 'right',
        avatarLabel: 'B',
        es: '¡Genial! Vamos a practicar todos los días.',
        ar: 'رائع! لنتدرّب كل يوم.',
      },
    ],
  },
  {
    id: 'caperucita',
    titleEs: 'Cuento: Caperucita',
    titleAr: 'قصة: ليلى والذئب',
    lines: [
      {
        id: 'caperucita-1',
        side: 'left',
        avatarLabel: 'L',
        es: 'Mamá, voy a llevar comida a la abuela.',
        ar: 'أمي، سأحمل الطعام إلى الجدة.',
      },
      {
        id: 'caperucita-2',
        side: 'right',
        avatarLabel: 'M',
        es: 'Muy bien. No hables con desconocidos en el bosque.',
        ar: 'حسناً. لا تتكلمي مع الغرباء في الغابة.',
      },
      {
        id: 'caperucita-3',
        side: 'right',
        avatarLabel: 'W',
        es: 'Hola, ¿a dónde vas tan rápido?',
        ar: 'مرحباً، إلى أين تذهبين بسرعة؟',
      },
      {
        id: 'caperucita-4',
        side: 'left',
        avatarLabel: 'L',
        es: 'Voy a casa de mi abuela.',
        ar: 'أنا ذاهبة إلى بيت جدتي.',
      },
    ],
  },
];

export const CartoonDialogSection: React.FC<CartoonDialogSectionProps> = ({
  titleEs = 'Diálogos animados',
  titleAr = 'حوارات',
  themes = defaultThemes,
}) => {
  const safeThemes = useMemo(() => (themes && themes.length > 0 ? themes : defaultThemes), [themes]);
  const [selectedThemeId, setSelectedThemeId] = useState<string>(safeThemes[0]?.id ?? 'saludo');
  const selectedTheme = useMemo(
    () => safeThemes.find((t) => t.id === selectedThemeId) ?? safeThemes[0],
    [safeThemes, selectedThemeId]
  );

  const [activeLineId, setActiveLineId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
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

  const playFromIndex = useCallback((startIndex: number) => {
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
        return;
      }

      const line = lines[i];
      setIsPlaying(true);
      setActiveLineId(line.id);
      startAvatarAnim();

      Speech.stop();
      Speech.speak(line.es, {
        language: 'es-ES',
        rate: 0.95,
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
  }, [selectedTheme, startAvatarAnim, stopAvatarAnim, stopPlayback]);

  useEffect(() => {
    stopPlayback();
    if (selectedTheme?.lines?.length) {
      playFromIndex(0);
    }
    return () => {
      stopPlayback();
    };
  }, [playFromIndex, selectedTheme?.lines?.length, selectedThemeId, stopPlayback]);

  const avatarAnimatedStyle = {
    transform: [
      {
        scale: speakAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.08],
        }),
      },
      {
        rotate: speakAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '-6deg'],
        }),
      },
    ],
  };

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.titleEs}>{titleEs}</Text>
        <Text style={styles.titleAr}>{titleAr}</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.themeRow}
      >
        {safeThemes.map((t) => {
          const active = t.id === selectedThemeId;
          return (
            <TouchableOpacity
              key={t.id}
              style={[styles.themeChip, active ? styles.themeChipActive : null]}
              onPress={() => setSelectedThemeId(t.id)}
              activeOpacity={0.85}
            >
              <Text style={[styles.themeChipTextEs, active ? styles.themeChipTextEsActive : null]}>
                {t.titleEs}
              </Text>
              <Text style={[styles.themeChipTextAr, active ? styles.themeChipTextArActive : null]}>
                {t.titleAr}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.card}>
        <View style={styles.dialogTitleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.dialogTitleEs}>{selectedTheme?.titleEs ?? ''}</Text>
            <Text style={styles.dialogTitleAr}>{selectedTheme?.titleAr ?? ''}</Text>
          </View>
          <TouchableOpacity
            style={[styles.controlButton, isPlaying ? styles.controlButtonStop : styles.controlButtonPlay]}
            onPress={() => {
              if (isPlaying) stopPlayback();
              else playFromIndex(0);
            }}
            activeOpacity={0.85}
          >
            <Text style={styles.controlButtonText}>{isPlaying ? 'Detener' : 'Reproducir'}</Text>
          </TouchableOpacity>
        </View>

        {(selectedTheme?.lines ?? []).map((line) => {
          const isLeft = line.side === 'left';
          const isActive = activeLineId === line.id;
          return (
            <View
              key={line.id}
              style={[styles.row, isLeft ? styles.rowLeft : styles.rowRight]}
            >
              {isLeft && (
                <Animated.View style={isActive ? avatarAnimatedStyle : undefined}>
                  <View style={[styles.avatar, styles.avatarLeft, isActive ? styles.avatarActive : null]}>
                    <Text style={styles.avatarText}>{line.avatarLabel}</Text>
                  </View>
                </Animated.View>
              )}

              <View
                style={[
                  styles.bubble,
                  isLeft ? styles.bubbleLeft : styles.bubbleRight,
                  isActive ? styles.bubbleActive : null,
                ]}
              >
                <View
                  style={[
                    styles.tail,
                    isLeft ? styles.tailLeft : styles.tailRight,
                    isActive ? styles.tailActive : null,
                  ]}
                />
                <Text style={styles.esText}>{line.es}</Text>
                <Text style={styles.arText}>{line.ar}</Text>
              </View>

              {!isLeft && (
                <Animated.View style={isActive ? avatarAnimatedStyle : undefined}>
                  <View style={[styles.avatar, styles.avatarRight, isActive ? styles.avatarActive : null]}>
                    <Text style={styles.avatarText}>{line.avatarLabel}</Text>
                  </View>
                </Animated.View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: 14,
    marginBottom: 16,
  },
  header: {
    marginBottom: 10,
    paddingHorizontal: 18,
  },
  titleEs: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f4f8b',
  },
  titleAr: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: '600',
    color: '#388e3c',
    textAlign: 'right',
    writingDirection: 'rtl',
    fontFamily: 'Arial',
  },
  card: {
    marginHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  themeRow: {
    paddingHorizontal: 14,
    paddingBottom: 10,
  },
  themeChip: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e9ecef',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    marginHorizontal: 6,
  },
  themeChipActive: {
    borderColor: '#79A890',
    backgroundColor: '#f3f7f5',
  },
  themeChipTextEs: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1f4f8b',
  },
  themeChipTextEsActive: {
    color: '#1f4f8b',
  },
  themeChipTextAr: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: '700',
    color: '#388e3c',
    textAlign: 'right',
    writingDirection: 'rtl',
    fontFamily: 'Arial',
  },
  themeChipTextArActive: {
    color: '#388e3c',
  },
  dialogTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dialogTitleEs: {
    fontSize: 15,
    fontWeight: '800',
    color: '#333',
  },
  dialogTitleAr: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: '700',
    color: '#388e3c',
    textAlign: 'right',
    writingDirection: 'rtl',
    fontFamily: 'Arial',
  },
  controlButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  controlButtonPlay: {
    backgroundColor: '#1976d2',
    borderColor: '#1565c0',
  },
  controlButtonStop: {
    backgroundColor: '#d32f2f',
    borderColor: '#c62828',
  },
  controlButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 13,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  rowLeft: {
    justifyContent: 'flex-start',
  },
  rowRight: {
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
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
  avatarText: {
    color: '#fff',
    fontWeight: '800',
  },
  avatarActive: {
    borderWidth: 2,
    borderColor: '#ff9800',
  },
  bubble: {
    maxWidth: '78%',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    position: 'relative',
  },
  bubbleActive: {
    borderColor: '#ff9800',
  },
  bubbleLeft: {
    backgroundColor: '#f3f7f5',
    borderWidth: 1,
    borderColor: '#d8e6df',
  },
  bubbleRight: {
    backgroundColor: '#eef4ff',
    borderWidth: 1,
    borderColor: '#d6e6ff',
  },
  tail: {
    position: 'absolute',
    width: 12,
    height: 12,
    transform: [{ rotate: '45deg' }],
    top: 14,
  },
  tailLeft: {
    left: -6,
    backgroundColor: '#f3f7f5',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#d8e6df',
  },
  tailRight: {
    right: -6,
    backgroundColor: '#eef4ff',
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: '#d6e6ff',
  },
  tailActive: {
    borderColor: '#ff9800',
  },
  esText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
  },
  arText: {
    marginTop: 6,
    fontSize: 14,
    color: '#d32f2f',
    fontWeight: '700',
    textAlign: 'right',
    writingDirection: 'rtl',
    fontFamily: 'Arial',
  },
});
