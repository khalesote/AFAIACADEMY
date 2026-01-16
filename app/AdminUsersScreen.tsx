import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { userDB, userStorage, type User, type UserProgress, getFullName } from '../utils/userDatabase';

export default function AdminUsersScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [userStats, setUserStats] = useState<any>(null);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    checkAccessAndLoadUsers();
  }, []);

  const checkAccessAndLoadUsers = async () => {
    try {
      // Verificar usuario actual
      const user = await userStorage.getCurrentUser();
      setCurrentUser(user);
      
      if (!user) {
        setAccessDenied(true);
        setLoading(false);
        return;
      }
      
      // Verificar si es el administrador específico
      const adminStatus = user.email === 'admin@academiadeinmigrantes.es';
      setIsAdmin(adminStatus);
      
      if (!adminStatus) {
        setAccessDenied(true);
        setLoading(false);
        return;
      }
      
      // Si es administrador, cargar usuarios
      await loadUsers();
    } catch (error) {
      console.error('Error verificando acceso:', error);
      setAccessDenied(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Filtrar usuarios basado en el término de búsqueda
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        getFullName(user).toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const allUsers = await userDB.getAllUsers();
      setUsers(allUsers);
      setFilteredUsers(allUsers);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
      Alert.alert('Error', 'No se pudieron cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const viewUserDetails = async (user: User) => {
    try {
      setSelectedUser(user);
      
      // Cargar estadísticas del usuario
      if (user.id) {
        const stats = await userDB.getUserStats(user.id);
        setUserStats(stats);
        
        // Cargar progreso del usuario
        const progress = await userDB.getUserProgress(user.id);
        setUserProgress(progress);
      }
      
      setShowUserModal(true);
    } catch (error) {
      console.error('Error cargando detalles del usuario:', error);
    }
  };

  const deleteUser = async (userId: number, userName: string) => {
    if (!isAdmin) {
      Alert.alert('Error', 'No tienes permisos para realizar esta acción');
      return;
    }

    Alert.alert(
      'Eliminar Usuario',
      `¿Estás seguro de que quieres eliminar a ${userName}? Esta acción no se puede deshacer.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const success = await userDB.deleteUser(userId);
              if (success) {
                Alert.alert('Éxito', 'Usuario eliminado correctamente');
                loadUsers(); // Recargar lista
              } else {
                Alert.alert('Error', 'No se pudo eliminar el usuario.');
              }
            } catch (error) {
              console.error('Error eliminando usuario:', error);
              Alert.alert('Error', 'Ocurrió un error al eliminar el usuario');
            }
          }
        }
      ]
    );
  };

  const exportUsersData = () => {
    const data = users.map(user => ({
      id: user.id,
      nombre: getFullName(user),
      email: user.email,
      fechaRegistro: user.createdAt,
      ultimoLogin: user.lastLogin,
      nivelActual: user.progress?.nivelActual || 'A1',
      puntuacionTotal: user.progress?.puntuacionTotal || 0,
      unidadesCompletadas: user.progress?.unidadesCompletadas || 0,
      tiempoEstudio: user.progress?.tiempoEstudio || 0
    }));

    // Crear texto CSV
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(user => Object.values(user).join(',')).join('\n');
    const csvContent = `${headers}\n${rows}`;

    // Aquí podrías implementar la exportación real
    // Por ahora solo mostramos un alert con la información
    Alert.alert(
      'Datos de Usuarios',
      `Total de usuarios: ${users.length}\n\nDatos preparados para exportar:\n${csvContent.substring(0, 200)}...`,
      [
        { text: 'OK' },
        { text: 'Copiar al Portapapeles', onPress: () => {
          // Aquí implementarías la copia al portapapeles
          Alert.alert('Info', 'Función de copia en desarrollo');
        }}
      ]
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Cargando usuarios...</Text>
      </View>
    );
  }

  if (accessDenied) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#FF3B30', '#D70015']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>Acceso Denegado</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.accessDeniedContainer}>
          <Ionicons name="lock-closed" size={80} color="#FF3B30" />
          <Text style={styles.accessDeniedTitle}>Acceso Restringido</Text>
          <Text style={styles.accessDeniedText}>
            Solo el administrador con el correo admin@academiadeinmigrantes.es puede acceder a la administración de usuarios.
          </Text>
          <Text style={styles.accessDeniedSubtext}>
            Si crees que esto es un error, contacta al administrador.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#4CAF50', '#388E3C']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Administración de Usuarios</Text>
            <Text style={styles.headerSubtitle}>
              {users.length} usuarios registrados
            </Text>
          </View>

          <TouchableOpacity
            style={styles.exportButton}
            onPress={exportUsersData}
          >
            <Ionicons name="download" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre o email..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholderTextColor="#999"
        />
        {searchTerm.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setSearchTerm('')}
          >
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Users List */}
      <ScrollView style={styles.usersList}>
        {filteredUsers.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>
              {searchTerm ? 'No se encontraron usuarios' : 'No hay usuarios registrados'}
            </Text>
          </View>
        ) : (
          filteredUsers.map((user) => (
            <View key={user.id} style={styles.userCard}>
              <View style={styles.userInfo}>
                <View style={styles.userAvatar}>
                  <Ionicons name="person" size={24} color="#4CAF50" />
                </View>
                
                                 <View style={styles.userDetails}>
                   <Text style={styles.userName}>{getFullName(user)}</Text>
                   <Text style={styles.userEmail}>{user.email}</Text>
                  <Text style={styles.userDate}>
                    Registrado: {formatDate(user.createdAt)}
                  </Text>
                  {user.lastLogin && (
                    <Text style={styles.userLastLogin}>
                      Último login: {formatDate(user.lastLogin)}
                    </Text>
                  )}
                </View>
              </View>

              <View style={styles.userStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Nivel</Text>
                  <Text style={styles.statValue}>
                    {user.progress?.nivelActual || 'A1'}
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Puntos</Text>
                  <Text style={styles.statValue}>
                    {user.progress?.puntuacionTotal || 0}
                  </Text>
                </View>
              </View>

              <View style={styles.userActions}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.viewButton]}
                  onPress={() => viewUserDetails(user)}
                >
                  <Ionicons name="eye" size={16} color="#2196F3" />
                  <Text style={[styles.actionButtonText, styles.viewButtonText]}>
                    Ver
                  </Text>
                </TouchableOpacity>
                
                                 <TouchableOpacity
                   style={[styles.actionButton, styles.deleteButton]}
                   onPress={() => deleteUser(user.id!, getFullName(user))}
                 >
                  <Ionicons name="trash" size={16} color="#f44336" />
                  <Text style={[styles.actionButtonText, styles.deleteButtonText]}>
                    Eliminar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* User Details Modal */}
      <Modal
        visible={showUserModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowUserModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Detalles del Usuario</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowUserModal(false)}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {selectedUser && (
              <ScrollView style={styles.modalBody}>
                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>📋 Información Personal</Text>
                                     <View style={styles.detailRow}>
                     <Text style={styles.detailLabel}>Nombre:</Text>
                     <Text style={styles.detailValue}>{getFullName(selectedUser)}</Text>
                   </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Email:</Text>
                    <Text style={styles.detailValue}>{selectedUser.email}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Fecha de Registro:</Text>
                    <Text style={styles.detailValue}>
                      {formatDate(selectedUser.createdAt)}
                    </Text>
                  </View>
                  {selectedUser.lastLogin && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Último Login:</Text>
                      <Text style={styles.detailValue}>
                        {formatDate(selectedUser.lastLogin)}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>📊 Progreso Actual</Text>
                  <View style={styles.progressGrid}>
                    <View style={styles.progressItem}>
                      <Text style={styles.progressLabel}>Nivel</Text>
                      <Text style={styles.progressValue}>
                        {selectedUser.progress?.nivelActual || 'A1'}
                      </Text>
                    </View>
                    <View style={styles.progressItem}>
                      <Text style={styles.progressLabel}>Puntuación</Text>
                      <Text style={styles.progressValue}>
                        {selectedUser.progress?.puntuacionTotal || 0}
                      </Text>
                    </View>
                    <View style={styles.progressItem}>
                      <Text style={styles.progressLabel}>Unidades</Text>
                      <Text style={styles.progressValue}>
                        {selectedUser.progress?.unidadesCompletadas || 0}
                      </Text>
                    </View>
                    <View style={styles.progressItem}>
                      <Text style={styles.progressLabel}>Tiempo</Text>
                      <Text style={styles.progressValue}>
                        {Math.round((selectedUser.progress?.tiempoEstudio || 0) / 60)}m
                      </Text>
                    </View>
                  </View>
                </View>

                {userStats && (
                  <View style={styles.detailSection}>
                    <Text style={styles.sectionTitle}>📈 Estadísticas Generales</Text>
                    <View style={styles.statsList}>
                      <View style={styles.statRow}>
                        <Text style={styles.statLabel}>Total de Sesiones:</Text>
                        <Text style={styles.statValue}>{userStats.totalSesiones || 0}</Text>
                      </View>
                      <View style={styles.statRow}>
                        <Text style={styles.statLabel}>Promedio de Puntuación:</Text>
                        <Text style={styles.statValue}>
                          {userStats.promedioPuntuacion ? Math.round(userStats.promedioPuntuacion) : 0}%
                        </Text>
                      </View>
                      <View style={styles.statRow}>
                        <Text style={styles.statLabel}>Tiempo Total:</Text>
                        <Text style={styles.statValue}>
                          {userStats.tiempoTotal ? Math.round(userStats.tiempoTotal / 60) : 0} minutos
                        </Text>
                      </View>
                    </View>
                  </View>
                )}

                {userProgress.length > 0 && (
                  <View style={styles.detailSection}>
                    <Text style={styles.sectionTitle}>📚 Historial de Actividad</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      {userProgress.slice(0, 5).map((session, index) => (
                        <View key={index} style={styles.activityCard}>
                          <Text style={styles.activityDate}>
                            {formatDate(session.fecha)}
                          </Text>
                          <Text style={styles.activityNivel}>{session.nivel}</Text>
                          <Text style={styles.activityScore}>{session.puntuacion}%</Text>
                          <Text style={styles.activityTime}>
                            {Math.round(session.tiempo / 60)}m
                          </Text>
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
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
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  exportButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  usersList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  userDate: {
    fontSize: 12,
    color: '#999',
  },
  userLastLogin: {
    fontSize: 12,
    color: '#999',
  },
  userStats: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  statItem: {
    marginRight: 20,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  userActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  viewButton: {
    backgroundColor: '#E3F2FD',
  },
  deleteButton: {
    backgroundColor: '#FFEBEE',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  viewButtonText: {
    color: '#2196F3',
  },
  deleteButtonText: {
    color: '#f44336',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 20,
  },
  detailSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  progressGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  progressItem: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  progressValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statsList: {
    gap: 8,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  activityDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  activityNivel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  activityScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
  },
  accessDeniedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#fff',
  },
  accessDeniedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginTop: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  accessDeniedText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 12,
  },
  accessDeniedSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
}); 