import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { UserService, type User } from '../services/userService';

export default function PublicProfileScreen() {
  const { userId, returnTo } = useLocalSearchParams<{ userId?: string; returnTo?: string | string[] }>();
  const router = useRouter();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      const fallback = Array.isArray(returnTo) ? returnTo[0] : returnTo;
      router.replace(fallback || '/');
    }
  };

  useEffect(() => {
    const load = async () => {
      if (!userId) {
        Alert.alert('Perfil no disponible', 'No se proporcionó un identificador de usuario.');
        setLoading(false);
        return;
      }
      try {
        const userProfile = await UserService.getUserProfile(userId);
        setProfile(userProfile);
      } catch (error) {
        console.error('Error cargando perfil público:', error);
        Alert.alert('Error', 'No se pudo cargar el perfil.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.centeredText}>Cargando perfil...</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.centered}>
        <Ionicons name="person-circle-outline" size={64} color="#666" />
        <Text style={styles.centeredText}>Perfil no disponible</Text>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const fullName = profile.firstName || profile.lastName
    ? `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim()
    : profile.name;

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1a1a1a', '#000']} style={styles.header}>
        <TouchableOpacity style={styles.headerBack} onPress={handleBack}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.avatarWrapper}>
          {profile.photoURL ? (
            <Image source={{ uri: profile.photoURL }} style={styles.avatar} />
          ) : (
            <Ionicons name="person" size={64} color="#fff" />
          )}
        </View>
        <Text style={styles.nameText}>{fullName || 'Usuario'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0c0c',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBack: {
    marginRight: 12,
    padding: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  avatarWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#1f1f1f',
    borderWidth: 2,
    borderColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  nameText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0c0c0c',
    paddingHorizontal: 24,
  },
  centeredText: {
    marginTop: 12,
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  backButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#FFD700',
  },
  backButtonText: {
    color: '#000',
    fontWeight: '600',
  },
});
