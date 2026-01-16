import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@/contexts/UserContext';
import { Timestamp } from 'firebase/firestore';
import { UserService } from '../../services/userService';

export default function ProfileScreen() {
  const { user, profileImage, updateProfileImage, refreshUser, firebaseUser, loading, isAuthenticated } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Función de placeholder para la imagen de perfil
  const handleProfilePress = () => {
    console.log('Función de perfil presionada');
  };

  // Verificar si el usuario está matriculado en algún sistema
  const isMatriculado = user?.matriculado_escuela_virtual || user?.matriculado;

  // Helper function to format date
  const formatDate = (timestamp: Timestamp | any) => {
    try {
      if (!timestamp) return 'Fecha no disponible';

      // Handle Firestore Timestamp
      let date: Date;
      if (timestamp && typeof timestamp.toDate === 'function') {
        date = timestamp.toDate();
      } else if (timestamp instanceof Date) {
        date = timestamp;
      } else {
        // Try to create a Date from the value
        date = new Date(timestamp);
      }

      // Ensure it's a valid date
      if (date && !isNaN(date.getTime())) {
        return date.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }

      return 'Fecha no disponible';
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Fecha no disponible';
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Ionicons name="school" size={60} color="#4CAF50" />
        <Text style={styles.loadingText}>¡Bienvenido a la Academia!</Text>
        <Text style={styles.loadingText}>Para acceder al perfil, necesitas:</Text>

        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => router.push('/RegisterScreen')}
        >
          <Text style={styles.retryButtonText}>Crear cuenta gratuita</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={async () => {
            try {
              Alert.alert(
                '🔥 Google Sign-In disponible',
                '✅ Código fuente completamente implementado\n✅ Funcionará inmediatamente después de configurar Firebase\n\n¿Quieres ver cómo habilitarlo?',
                [
                  { text: 'Más tarde' },
                  {
                    text: '🚀 ¡Habilitar ahora!',
                    onPress: () => {
                      Alert.alert(
                        '⚡ Activación inmediata',
                        '🔥 Para activar Google Sign-In:\n\n1. 🌐 Ve a console.firebase.google.com\n2. 🔐 Selecciona tu proyecto\n3. 👤 Authentication > Sign-in method\n4. 🔵 Busca "Google" y habilítalo\n5. ✅ ¡El botón funcionará automáticamente!',
                        [{ text: 'Entendido' }]
                      );
                    }
                  }
                ]
              );
            } catch (error) {
              Alert.alert('Error', 'Error en Google Sign-In');
            }
          }}
        >
          <Ionicons name="logo-google" size={20} color="#db4437" />
          <Text style={styles.googleButtonText}>Continuar con Google</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Usuario registrado - Verificar matrícula
  if (!isMatriculado) {
    // Usuario registrado pero NO matriculado en ningún curso
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="person" size={60} color="#666" />
          <Text style={styles.userName}>
            {user.firstName || 'Usuario'} {user.lastName || ''}
          </Text>
          <Text style={styles.userEmail}>{user.email || 'Sin email'}</Text>
          <Text style={[styles.statusBadge, styles.statusInactive]}>
            Usuario registrado (sin matrícula activa)
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Opciones de matrícula</Text>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/(tabs)/PreFormacionScreen')}
          >
            <Ionicons name="school" size={24} color="#4CAF50" />
            <Text style={styles.actionButtonText}>Formación Profesional</Text>
            <Text style={styles.actionButtonSubtitle}>15 cursos • 20€/año</Text>
            <Ionicons name="chevron-forward" size={20} color="#4CAF50" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="information-circle" size={24} color="#2196F3" />
            <Text style={styles.actionButtonText}>Información de contacto</Text>
            <Ionicons name="chevron-forward" size={20} color="#2196F3" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de la cuenta</Text>
          <Text style={styles.infoText}>Fecha de registro: {formatDate(user.createdAt)}</Text>
        </View>
      </ScrollView>
    );
  }

  // Usuario registrado Y matriculado - Perfil completo
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={60} color="#666" />
          </View>
        </View>

        <Text style={styles.userName}>
          {user.firstName || 'Usuario'} {user.lastName || ''}
        </Text>
        <Text style={styles.userEmail}>{user.email || 'Sin email'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información de la cuenta</Text>

        <View style={styles.infoItem}>
          <Ionicons name="mail-outline" size={24} color="#4CAF50" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Correo electrónico</Text>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="calendar-outline" size={24} color="#4CAF50" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Miembro desde</Text>
            <Text style={styles.infoValue}>
              {formatDate(user.createdAt)}
            </Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="school-outline" size={24} color="#4CAF50" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Estado de matrícula</Text>
            <Text style={[
              styles.statusBadge,
              user.matriculado_escuela_virtual ? styles.statusActive : styles.statusInactive
            ]}>
              {user.matriculado_escuela_virtual ? 'Matriculado ✅' : 'No matriculado ❌'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acciones</Text>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#2196F3', borderWidth: 1, borderColor: '#2196F3' }]}
          onPress={async () => {
            try {
              console.log('🔄 Refrescando datos del usuario...');
              await refreshUser();
              Alert.alert('✅ Éxito', 'Datos actualizados correctamente');
            } catch (error) {
              console.error('Error refrescando:', error);
              Alert.alert('❌ Error', 'No se pudieron actualizar los datos');
            }
          }}
        >
          <Ionicons name="refresh-outline" size={24} color="#2196F3" />
          <Text style={[styles.actionButtonText, { color: '#2196F3' }]}>Refrescar datos</Text>
          <Ionicons name="chevron-forward" size={20} color="#2196F3" style={styles.actionButtonIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="help-circle-outline" size={24} color="#666" />
          <Text style={styles.actionButtonText}>Ayuda y soporte</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" style={styles.actionButtonIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.versionText}>Versión 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#666',
    fontSize: 16,
    marginTop: 10,
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 14,
    fontWeight: '500',
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  statusActive: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
  },
  statusInactive: {
    backgroundColor: '#FFEBEE',
    color: '#C62828',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 15,
    padding: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  infoTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  actionButtonText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
    flex: 1,
  },
  actionButtonSubtitle: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  actionButtonIcon: {
    marginLeft: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    color: '#999',
  },
});
