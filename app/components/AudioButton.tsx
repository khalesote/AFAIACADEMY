import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

interface AudioButtonProps {
  text: string;
  language?: string;
  style?: any;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  showText?: boolean;
}

export default function AudioButton({ 
  text, 
  language = 'es-ES', 
  style, 
  size = 'medium',
  color = '#1976d2',
  showText = true 
}: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const iconSizes = {
    small: 16,
    medium: 20,
    large: 24
  };

  const buttonSizes = {
    small: { paddingHorizontal: 8, paddingVertical: 4 },
    medium: { paddingHorizontal: 12, paddingVertical: 8 },
    large: { paddingHorizontal: 16, paddingVertical: 12 }
  };

  const textSizes = {
    small: 12,
    medium: 14,
    large: 16
  };

  const playAudio = async () => {
    try {
      setIsPlaying(true);
      
      // Detener cualquier audio que esté reproduciéndose
      await Speech.stop();
      
      // Configurar opciones de voz
      const options = {
        language: language,
        pitch: 1.0,
        rate: 0.8, // Velocidad un poco más lenta para aprendizaje
        volume: 1.0,
        onStart: () => setIsPlaying(true),
        onDone: () => setIsPlaying(false),
        onStopped: () => setIsPlaying(false),
        onError: () => setIsPlaying(false),
      };

      // Reproducir el texto
      Speech.speak(text, options);
      
    } catch (error) {
      console.log('Error al reproducir audio:', error);
      setIsPlaying(false);
    }
  };

  const stopAudio = async () => {
    try {
      await Speech.stop();
      setIsPlaying(false);
    } catch (error) {
      console.log('Error al detener audio:', error);
      setIsPlaying(false);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.audioButton,
        buttonSizes[size],
        { borderColor: color },
        style
      ]}
      onPress={isPlaying ? stopAudio : playAudio}
      activeOpacity={0.7}
    >
      {isPlaying ? (
        <ActivityIndicator size="small" color={color} />
      ) : (
        <Ionicons 
          name="volume-high" 
          size={iconSizes[size]} 
          color={color} 
        />
      )}
      {showText && (
        <Text style={[
          styles.audioButtonText, 
          { color: color, fontSize: textSizes[size] }
        ]}>
          {isPlaying ? 'Detener' : 'Escuchar'}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#f8f9fa',
    marginLeft: 8,
  },
  audioButtonText: {
    marginLeft: 4,
    fontWeight: '500',
  },
});


