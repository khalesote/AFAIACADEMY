
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function VideoPresentationScreen() {
  const videoRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const router = useRouter();

  const handlePlayPause = async () => {
    if (videoRef.current) {
      const status = await videoRef.current.getStatusAsync();
      if (status.isPlaying) {
        await videoRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await videoRef.current.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000', '#1a1a1a']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Presentación</Text>
            <Text style={styles.headerTitleAr}>عرض تقديمي</Text>
          </View>
        </View>

        {/* Video Container */}
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={require('../assets/introapp.mp4')}
            style={styles.video}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls={false}
            isLooping={false}
            onPlaybackStatusUpdate={(status) => {
              if (status.isLoaded && (status as any).didJustFinish) {
                handleVideoEnd();
              }
              if (status.isLoaded) {
                setIsPlaying(status.isPlaying);
              }
            }}
            onLoadStart={handleLoadStart}
            onLoad={handleLoad}
          />

          {/* Play/Pause Overlay */}
          <TouchableOpacity
            style={styles.playOverlay}
            onPress={handlePlayPause}
            activeOpacity={0.8}
          >
            {!isPlaying && (
              <View style={styles.playButton}>
                <Ionicons name="play" size={48} color="#fff" />
              </View>
            )}
          </TouchableOpacity>

          {/* Loading Indicator */}
          {isLoading && (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Cargando...</Text>
              <Text style={styles.loadingTextAr}>جاري التحميل...</Text>
            </View>
          )}
        </View>

        {/* Video Controls */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={handlePlayPause}
          >
            <LinearGradient
              colors={['#FF6B6B', '#FF5252']}
              style={styles.controlButtonGradient}
            >
              <Ionicons 
                name={isPlaying ? "pause" : "play"} 
                size={24} 
                color="#fff" 
              />
              <Text style={styles.controlButtonText}>
                {isPlaying ? "Pausar" : "Reproducir"}
              </Text>
              <Text style={styles.controlButtonTextAr}>
                {isPlaying ? "إيقاف مؤقت" : "تشغيل"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Bienvenido a la Academia</Text>
          <Text style={styles.descriptionTitleAr}>مرحباً بك في الأكاديمية</Text>
          <Text style={styles.descriptionText}>
            Conoce más sobre nuestra academia y los servicios que ofrecemos para ayudarte en tu proceso de integración.
          </Text>
          <Text style={styles.descriptionTextAr}>
            تعرف على المزيد حول أكاديميتنا والخدمات التي نقدمها لمساعدتك في عملية الاندماج.
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitleContainer: {
    flexDirection: 'column',
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerTitleAr: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    opacity: 0.9,
    writingDirection: 'rtl',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  video: {
    width: screenWidth - 40,
    height: (screenWidth - 40) * 0.6,
    borderRadius: 16,
    backgroundColor: '#000',
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  loadingTextAr: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    writingDirection: 'rtl',
  },
  controlsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  controlButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  controlButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  controlButtonTextAr: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    opacity: 0.9,
    marginLeft: 8,
    writingDirection: 'rtl',
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  descriptionTitleAr: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    opacity: 0.9,
    marginBottom: 16,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  descriptionText: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 8,
  },
  descriptionTextAr: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.7,
    lineHeight: 18,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
}); 