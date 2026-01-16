import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ActivityIndicator, Image, Share, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { getRemainingTrialTime } from '../../utils/installationVerification';
import { LinearGradient } from 'expo-linear-gradient';

interface TikTokVerificationProps {
  onVerificationComplete: () => void;
}

export default function TikTokVerification({ onVerificationComplete }: TikTokVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [remainingMinutes, setRemainingMinutes] = useState<number | null>(null);
  const TIKTOK_URL = 'https://www.tiktok.com/@academiadeinmigrantes';

  useEffect(() => {
    const checkRemainingTime = async () => {
      const hours = await getRemainingTrialTime();
      setRemainingMinutes(Math.round(hours * 60));
    };
    checkRemainingTime();

    // Actualizar el tiempo cada minuto
    const interval = setInterval(checkRemainingTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleVerification = async () => {
    setIsVerifying(true);
    try {
      await Linking.openURL(TIKTOK_URL);
      await AsyncStorage.setItem('tiktokVerified', 'true');
      onVerificationComplete();
    } catch (error) {
      console.error('Error durante la verificación:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: '¡Descubre la Academia de Inmigrantes! Aprende español de forma divertida y efectiva. Descarga la app desde تيك توك: https://www.tiktok.com/@academiadeinmigrantes',
        url: TIKTOK_URL,
      });
    } catch (error) {
      console.error('Error al compartir:', error);
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <LinearGradient
      colors={['#000000', '#1a1a1a']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image 
          source={require('../../assets/tiktok-logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>Academia de Inmigrantes</Text>
        
        {remainingMinutes !== null && remainingMinutes > 0 ? (
          <View style={styles.timerContainer}>
            <Text style={styles.timerLabel}>Tiempo restante de prueba:</Text>
            <Text style={styles.timer}>{formatTime(remainingMinutes)}</Text>
          </View>
        ) : (
          <Text style={styles.subtitle}>
            Para continuar usando la app, descárgala desde nuestro canal oficial de تيك توك
          </Text>
        )}
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.verifyButton}
            onPress={handleVerification}
            disabled={isVerifying}
          >
            {isVerifying ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="logo-tiktok" size={24} color="#fff" />
                <Text style={styles.verifyButtonText}>Ir a تيك توك</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.shareButton}
            onPress={handleShare}
          >
            <Ionicons name="share-social" size={24} color="#fff" />
            <Text style={styles.shareButtonText}>Compartir</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>
          Descarga la versión completa para acceder a todo el contenido
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
    color: '#fff',
    lineHeight: 24,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  timerLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  timer: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ff0050',
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  verifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff0050',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  footerText: {
    position: 'absolute',
    bottom: 20,
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
}); 