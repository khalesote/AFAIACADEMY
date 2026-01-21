import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { useUser } from '@/contexts/UserContext';
import { validateAccessCode, markAccessCodeAsUsed } from '../../utils/accessCodes';

export default function SchoolScreen() {
  const router = useRouter();
  const { progress, isLoading, unlockLevel, reloadProgress } = useUserProgress();
  const { user, firebaseUser, isAuthenticated } = useUser();
  const params = useLocalSearchParams<{ refresh?: string; matriculado?: string }>();

  const [matriculadoA1, setMatriculadoA1] = React.useState(false);
  const [matriculadoA2, setMatriculadoA2] = React.useState(false);
  const [matriculadoB1, setMatriculadoB1] = React.useState(false);
  const [matriculadoB2, setMatriculadoB2] = React.useState(false);

  const userId = firebaseUser?.uid || null;

  const getMatriculaKey = (level: string, oderId: string | null): string => {
    if (!userId) return `matricula_${level}_completada_guest`;
    return `matricula_${level}_completada_${userId}`;
  };

  React.useEffect(() => {
    const loadMatriculas = async () => {
      try {
        console.log('🔄 Cargando matrículas para usuario:', userId || 'invitado');
        
        const [a1, a2, b1, b2] = await Promise.all([
          AsyncStorage.getItem(getMatriculaKey('A1', userId)),
          AsyncStorage.getItem(getMatriculaKey('A2', userId)),
          AsyncStorage.getItem(getMatriculaKey('B1', userId)),
          AsyncStorage.getItem(getMatriculaKey('B2', userId)),
        ]);
        
        setMatriculadoA1(a1 === 'true');
        setMatriculadoA2(a2 === 'true');
        setMatriculadoB1(b1 === 'true');
        setMatriculadoB2(b2 === 'true');
        
        console.log('📋 Matrículas cargadas:', { A1: a1, A2: a2, B1: b1, B2: b2 });
      } catch (error) {
        console.error('Error cargando matrículas:', error);
      }
    };
    
    loadMatriculas();
  }, [params?.refresh, userId]);

  React.useEffect(() => {
    if (isLoading) return;
    
    if (matriculadoA1 && !progress.A1?.unlocked) {
      console.log('🔓 Desbloqueando A1 por matrícula');
      unlockLevel('A1');
    }
    if (matriculadoA2 && !progress.A2?.unlocked) {
      console.log('🔓 Desbloqueando A2 por matrícula');
      unlockLevel('A2');
    }
    if (matriculadoB1 && !progress.B1?.unlocked) {
      console.log('🔓 Desbloqueando B1 por matrícula');
      unlockLevel('B1');
    }
    if (matriculadoB2 && !progress.B2?.unlocked) {
      console.log('🔓 Desbloqueando B2 por matrícula');
      unlockLevel('B2');
    }
  }, [matriculadoA1, matriculadoA2, matriculadoB1, matriculadoB2, isLoading]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9DC3AA" />
      </View>
    );
  }

  const nivelesDesbloqueados = {
    A1: progress.A1?.unlocked || false,
    A2: progress.A2?.unlocked || false,
    B1: progress.B1?.unlocked || false,
    B2: progress.B2?.unlocked || false
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerActions}>
        <TouchableOpacity
          style={{ padding: 8 }}
          onPress={() => router.replace('/')}
        >
          <Ionicons name="arrow-back" size={28} color="#9DC3AA" />
        </TouchableOpacity>
      </View>

      <View style={{ width: '100%', alignItems: 'center', marginBottom: 24, marginTop: 60 }}>
        <Ionicons name="school" size={64} color="#FFD700" style={{ marginBottom: 16 }} />
        <Text style={styles.title}>Escuela Virtual</Text>
        <Text style={styles.subtitle}>
          Bienvenido/a a la escuela virtual de la Academia de Inmigrantes.
        </Text>
      </View>

      <View style={styles.progressWidget}>
        <TouchableOpacity
          style={styles.standardButton}
          onPress={() => {
            if (isAuthenticated && firebaseUser && user) {
              router.push({
                pathname: '/MatriculaScreen',
                params: {
                  nombre: user.firstName || '',
                  apellido1: user.lastName || '',
                  email: user.email || '',
                  documento: user.documento || '',
                }
              });
            } else {
              router.push('/MatriculaScreen');
            }
          }}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#000', '#000']}
            style={styles.standardButtonGradient}
          >
            <Ionicons name="person-add" color="#FFD700" size={24} style={{ marginRight: 12 }} />
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
                Matricúlate
              </Text>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500', textAlign: 'center' }}>
                سجل الآن
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {(matriculadoA1 || matriculadoA2 || matriculadoB1 || matriculadoB2) && (
          <View style={{ marginTop: 10, alignItems: 'center' }}>
            <Text style={{ color: '#79A890', fontWeight: '500' }}>
              {matriculadoA1 && '✓ Nivel A1 desbloqueado\n'}
              {matriculadoA2 && '✓ Nivel A2 desbloqueado\n'}
              {matriculadoB1 && '✓ Nivel B1 desbloqueado\n'}
              {matriculadoB2 && '✓ Nivel B2 desbloqueado'}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.progressWidget}>
        <TouchableOpacity
          style={styles.nivelButton}
          onPress={() => router.push('/(tabs)/A1_Acceso')}
          disabled={!nivelesDesbloqueados.A1}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={nivelesDesbloqueados.A1 ? ['#000', '#000'] : ['#333', '#333']}
            style={styles.nivelButtonGradient}
          >
            <Ionicons 
              name={nivelesDesbloqueados.A1 ? 'lock-open' : 'lock-closed'} 
              size={20} 
              color="#FFD700" 
              style={{ marginRight: 8 }} 
            />
            <Text style={styles.buttonText}>
              {nivelesDesbloqueados.A1 ? 'Nivel A1 Acceso' : 'Nivel A1 Bloqueado'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nivelButton}
          onPress={() => router.push('/(tabs)/A2_Plataforma')}
          disabled={!nivelesDesbloqueados.A2}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={nivelesDesbloqueados.A2 ? ['#000', '#000'] : ['#333', '#333']}
            style={styles.nivelButtonGradient}
          >
            <Ionicons 
              name={nivelesDesbloqueados.A2 ? 'lock-open' : 'lock-closed'} 
              size={20} 
              color="#FFD700" 
              style={{ marginRight: 8 }} 
            />
            <Text style={styles.buttonText}>
              {nivelesDesbloqueados.A2 ? 'Nivel A2 Plataforma' : 'Nivel A2 Bloqueado'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nivelButton}
          onPress={() => router.push('/(tabs)/B1_Umbral')}
          disabled={!nivelesDesbloqueados.B1}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={nivelesDesbloqueados.B1 ? ['#000', '#000'] : ['#333', '#333']}
            style={styles.nivelButtonGradient}
          >
            <Ionicons 
              name={nivelesDesbloqueados.B1 ? 'lock-open' : 'lock-closed'} 
              size={20} 
              color="#FFD700" 
              style={{ marginRight: 8 }} 
            />
            <Text style={styles.buttonText}>
              {nivelesDesbloqueados.B1 ? 'Nivel B1 Umbral' : 'Nivel B1 Bloqueado'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nivelButton}
          onPress={() => router.push('/(tabs)/B2_Avanzado')}
          disabled={!nivelesDesbloqueados.B2}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={nivelesDesbloqueados.B2 ? ['#000', '#000'] : ['#333', '#333']}
            style={styles.nivelButtonGradient}
          >
            <Ionicons 
              name={nivelesDesbloqueados.B2 ? 'lock-open' : 'lock-closed'} 
              size={20} 
              color="#FFD700" 
              style={{ marginRight: 8 }} 
            />
            <Text style={styles.buttonText}>
              {nivelesDesbloqueados.B2 ? 'Nivel B2 Avanzado' : 'Nivel B2 Bloqueado'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  headerActions: {
    position: 'absolute',
    top: 44,
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  container: { flexGrow: 1, backgroundColor: '#fff', padding: 24 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#000', marginBottom: 6, textAlign: 'center' },
  subtitle: { fontSize: 18, color: '#333', textAlign: 'center', marginBottom: 20 },
  progressWidget: {
    width: '100%', backgroundColor: '#fff', borderRadius: 16, padding: 16,
    elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, marginBottom: 24
  },
  standardButton: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  standardButtonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nivelButton: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  nivelButtonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { 
    color: '#FFD700', 
    fontWeight: 'bold', 
    fontSize: 16,
    textAlign: 'center',
  },
});
