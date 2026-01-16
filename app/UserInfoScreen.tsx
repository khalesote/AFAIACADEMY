import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '../contexts/UserContext';
import SimpleUserService from './services/simpleUserService';

export default function UserInfoScreen() {
  const router = useRouter();
  const { user, firebaseUser, isAuthenticated, loading, logout } = useUser();
  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente');
      router.replace('/');
    } catch (error) {
      Alert.alert('Error', 'Error al cerrar sesión');
    }
  };

  const handleRefreshUser = async () => {
    try {
      // Esto debería recargar los datos del usuario
      const currentUser = await SimpleUserService.getCurrentUser();
      if (currentUser) {
        Alert.alert('Usuario actualizado', `Usuario: ${currentUser.displayName || currentUser.email}`);
      } else {
        Alert.alert('No hay usuario', 'No se encontró usuario autenticado');
      }
    } catch (error) {
      Alert.alert('Error', 'Error al obtener usuario actual');
    }
  };

  if (loading) {
    return (
      <LinearGradient colors={['#1976d2', '#42a5f5']} style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.loadingText}>Cargando información...</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#1976d2', '#42a5f5']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.replace('/')}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Información de Usuario</Text>
        </View>

        <View style={styles.infoContainer}>
          {/* Estado de autenticación */}
          <View style={styles.infoCard}>
            <Ionicons name="shield-checkmark" size={24} color={isAuthenticated ? "#4CAF50" : "#f44336"} />
            <Text style={styles.cardTitle}>Estado de Autenticación</Text>
            <Text style={[styles.cardValue, { color: isAuthenticated ? "#4CAF50" : "#f44336" }]}>
              {isAuthenticated ? "Autenticado" : "No autenticado"}
            </Text>
          </View>

          {/* Usuario Firebase */}
          <View style={styles.infoCard}>
            <Ionicons name="person" size={24} color="#2196F3" />
            <Text style={styles.cardTitle}>Usuario Firebase</Text>
            <Text style={styles.cardValue}>
              {firebaseUser ? firebaseUser.email : "No hay usuario Firebase"}
            </Text>
            {firebaseUser && (
              <Text style={styles.cardSubtitle}>
                UID: {firebaseUser.uid}
              </Text>
            )}
          </View>

          {/* Datos del usuario */}
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={24} color="#FF9800" />
            <Text style={styles.cardTitle}>Datos de Usuario</Text>
            {user ? (
              <>
                <Text style={styles.cardValue}>
                  {user.firstName} {user.lastName}
                </Text>
                <Text style={styles.cardSubtitle}>
                  Email: {user.email}
                </Text>
                <Text style={styles.cardSubtitle}>
                  Nivel: {user.progress?.nivelActual || 'A1'}
                </Text>
                <Text style={styles.cardSubtitle}>
                  Puntuación: {user.progress?.puntuacionTotal || 0}
                </Text>
              </>
            ) : (
              <Text style={styles.cardValue}>
                No hay datos de usuario
              </Text>
            )}
          </View>

          {/* Acciones */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={handleRefreshUser}>
              <Ionicons name="refresh" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>Actualizar Datos</Text>
            </TouchableOpacity>

            {isAuthenticated && (
              <TouchableOpacity style={[styles.actionButton, styles.logoutButton]} onPress={handleLogout}>
                <Ionicons name="log-out" size={20} color="#fff" />
                <Text style={styles.actionButtonText}>Cerrar Sesión</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.actionButton, styles.testButton]}
              onPress={() => router.push('/TestFirebaseScreen')}
            >
              <Ionicons name="construct" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>Probar Firebase</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    padding: 10,
    marginRight: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoContainer: {
    flex: 1,
  },
  infoCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 10,
  },
  cardValue: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 5,
  },
  actionsContainer: {
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#1976d2',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#f44336',
  },
  testButton: {
    backgroundColor: '#FF9800',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});
