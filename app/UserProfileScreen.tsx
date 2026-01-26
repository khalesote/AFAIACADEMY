import React, { useEffect, useState, useCallback } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Platform,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../contexts/UserContext';

type AgendaEntry = {
  id: string;
  unidad: string;
  ejercicio: string;
  pendiente: string;
  fecha: string;
};

const AGENDA_STORAGE_KEY = '@student_agenda';

const formatDate = (date: Date | string | undefined | null | any) => {
  if (!date) {
    return 'Fecha no disponible';
  }
  
  let value: Date;
  
  // Si es un Timestamp de Firestore
  if (date && typeof date.toDate === 'function') {
    value = date.toDate();
  } else if (typeof date === 'string') {
    value = new Date(date);
  } else if (date instanceof Date) {
    value = date;
  } else {
    // Intentar crear una fecha desde cualquier otro formato
    value = new Date(date);
  }
  
  if (!value || Number.isNaN(value.getTime())) {
    return 'Fecha no disponible';
  }
  
  return value.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function UserProfileScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  const { user, firebaseUser, loading: userLoading, refreshUser, logout, isAuthenticated, profileImage, updateProfileImage } = useUser();
  const [agenda, setAgenda] = useState<AgendaEntry[]>([]);
  const [unidad, setUnidad] = useState('');
  const [ejercicio, setEjercicio] = useState('');
  const [pendiente, setPendiente] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showIOSDatePicker, setShowIOSDatePicker] = useState(false);

  const loadAgenda = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(AGENDA_STORAGE_KEY);
      if (raw) {
        const parsed: AgendaEntry[] = JSON.parse(raw);
        setAgenda(parsed);
      } else {
        setAgenda([]);
      }
    } catch (error) {
      console.error('Error cargando agenda:', error);
    }
  }, []);

  const persistAgenda = async (entries: AgendaEntry[]) => {
    try {
      await AsyncStorage.setItem(AGENDA_STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
      console.error('Error guardando agenda:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      refreshUser();
      loadAgenda();
    }, []) // Remove dependencies to prevent infinite loop
  );

  const openDatePicker = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: selectedDate,
        mode: 'date',
        onChange: (_, date) => {
          if (date) setSelectedDate(date);
        },
      });
    } else {
      setShowIOSDatePicker(true);
    }
  };

  const handleAddAgendaEntry = () => {
    if (!unidad.trim() || !ejercicio.trim() || !pendiente.trim()) {
      Alert.alert('Campos incompletos', 'Completa unidad, ejercicio y pendiente antes de guardar.');
      return;
    }

    const newEntry: AgendaEntry = {
      id: `${Date.now()}`,
      unidad: unidad.trim(),
      ejercicio: ejercicio.trim(),
      pendiente: pendiente.trim(),
      fecha: selectedDate.toISOString(),
    };

    const updated = [newEntry, ...agenda];
    setAgenda(updated);
    persistAgenda(updated);
    setUnidad('');
    setEjercicio('');
    setPendiente('');
  };

  const handleRemoveEntry = (id: string) => {
    Alert.alert('Eliminar registro', '¿Quieres eliminar este elemento de la agenda?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => {
          const updated = agenda.filter((item) => item.id !== id);
          setAgenda(updated);
          persistAgenda(updated);
        },
      },
    ]);
  };

  const handleGoToSchool = () => {
    router.push('/(tabs)/SchoolScreen');
  };

  const handleGoToFormacion = () => {
    router.push('/(tabs)/PreFormacionScreen');
  };

  const pickImage = async () => {
    try {
      // Request permissions
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert('Permisos requeridos', 'Necesitamos permisos para acceder a tu galería de fotos.');
        return;
      }

      // Pick image from library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        await updateProfileImage(imageUri);
        Alert.alert('¡Éxito!', 'Tu foto de perfil ha sido actualizada.');
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      Alert.alert('Error', 'No se pudo seleccionar la imagen. Inténtalo de nuevo.');
    }
  };

  const takePhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert('Permisos requeridos', 'Necesitamos permisos para acceder a tu cámara.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        await updateProfileImage(imageUri);
        Alert.alert('¡Éxito!', 'Tu foto de perfil ha sido actualizada.');
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'No se pudo tomar la foto. Inténtalo de nuevo.');
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      'Cambiar foto de perfil',
      '¿Cómo quieres actualizar tu foto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Tomar foto', onPress: takePhoto },
        { text: 'Elegir de galería', onPress: pickImage },
      ]
    );
  };

  if (userLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  if (!isAuthenticated || !user || !firebaseUser) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="person-circle-outline" size={64} color="#666" />
        <Text style={styles.errorTitle}>¿Todavía no te has registrado?</Text>
        <Text style={styles.errorSubtitle}>
          Crea tu cuenta para guardar tu progreso y llevar un registro de tus unidades.
        </Text>
        <TouchableOpacity style={styles.errorButton} onPress={() => navigation.navigate('RegisterScreen' as never)}> 
          <Text style={styles.errorButtonText}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.errorButton, { marginTop: 10, backgroundColor: '#666' }]} onPress={() => navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' as never }] })}> 
          <Text style={styles.errorButtonText}>Ir a la página principal</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <LinearGradient colors={['#1a1a1a', '#000000']} style={styles.header}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={handleGoToSchool}>
            <Ionicons name="school" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.userInfo}>
          <TouchableOpacity style={styles.avatarContainer} onPress={showImagePickerOptions}>
            <View style={styles.avatar}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.avatarImage} />
              ) : (
                <Ionicons name="person" size={40} color="#1b5e20" />
              )}
            </View>
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={16} color="#fff" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={showImagePickerOptions}>
            <Text style={styles.changePhotoText}>Cambiar foto</Text>
          </TouchableOpacity>
          <Text style={styles.userName}>{user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Usuario'}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.userMeta}>Miembro desde {user.createdAt ? formatDate(user.createdAt) : 'Fecha no disponible'}</Text>
          <View style={styles.badgeRow}>
            <View style={[styles.badge, user.matriculado ? styles.badgeActive : styles.badgeInactive]}>
              <Ionicons name={user.matriculado ? 'checkmark-circle' : 'alert-circle'} size={16} color="#fff" />
              <Text style={styles.badgeText}>
                {user.matriculado ? 'Matriculado' : 'Sin matrícula'}
              </Text>
            </View>
            <View style={[styles.badge, user.matriculado_escuela_virtual ? styles.badgeActive : styles.badgeInactive]}>
              <Ionicons name={user.matriculado_escuela_virtual ? 'school' : 'lock-closed'} size={16} color="#fff" />
              <Text style={styles.badgeText}>
                {user.matriculado_escuela_virtual ? 'Escuela virtual activa' : 'Escuela pendiente'}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.sectionsContainer}>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Información personal</Text>
          <InfoRow icon="mail" label="Correo" value={user.email} />
          <InfoRow icon="call" label="Teléfono" value={user.telefono || 'No registrado'} />
          <InfoRow icon="location" label="Provincia" value={user.provincia || 'No registrada'} />
          <InfoRow icon="id-card" label="Documento" value={`${user.tipoDocumento || ''} ${user.documento || ''}`.trim() || 'No registrado'} />
          <InfoRow icon="calendar" label="Fecha de nacimiento" value={user.fechaNacimiento ? user.fechaNacimiento : 'No registrada'} />
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Accesos rápidos</Text>
          <TouchableOpacity style={styles.quickAction} onPress={handleGoToSchool}>
            <Ionicons name="book" size={20} color="#205941" />
            <View style={styles.quickActionText}>
              <Text style={styles.quickActionTitle}>Escuela virtual</Text>
              <Text style={styles.quickActionSubtitle}>Continúa tus unidades A1/A2/B1/B2</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#205941" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAction} onPress={handleGoToFormacion}>
            <Ionicons name="briefcase" size={20} color="#205941" />
            <View style={styles.quickActionText}>
              <Text style={styles.quickActionTitle}>Formación profesional</Text>
              <Text style={styles.quickActionSubtitle}>Accede a los cursos profesionales</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#205941" />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Agenda del estudiante</Text>
          <View style={styles.formRow}>
            <View style={styles.formField}>
              <Text style={styles.formLabel}>Unidad</Text>
              <TextInput
                style={styles.input}
                value={unidad}
                onChangeText={setUnidad}
                placeholder="Ej. A1 - Unidad 3"
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.formLabel}>Ejercicio</Text>
              <TextInput
                style={styles.input}
                value={ejercicio}
                onChangeText={setEjercicio}
                placeholder="Ej. Ejercicio 5"
              />
            </View>
          </View>
          <View style={styles.formField}>
            <Text style={styles.formLabel}>Pendiente</Text>
            <TextInput
              style={[styles.input, styles.inputMultiline]}
              value={pendiente}
              onChangeText={setPendiente}
              placeholder="Notas o tareas pendientes"
              multiline
            />
          </View>
          <View style={styles.dateRow}>
            <View>
              <Text style={styles.formLabel}>Fecha objetivo</Text>
              <TouchableOpacity style={styles.dateButton} onPress={openDatePicker}>
                <Ionicons name="calendar" size={18} color="#1b5e20" />
                <Text style={styles.dateButtonText}>{formatDate(selectedDate)}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={handleAddAgendaEntry}>
              <Ionicons name="add" size={18} color="#fff" />
              <Text style={styles.addButtonText}>Añadir a la agenda</Text>
            </TouchableOpacity>
          </View>
          {showIOSDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="inline"
              onChange={(_, date) => {
                if (date) setSelectedDate(date);
                setShowIOSDatePicker(false);
              }}
            />
          )}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Mis apuntes</Text>
          {agenda.length === 0 ? (
            <Text style={styles.emptyAgenda}>No tienes recordatorios guardados todavía.</Text>
          ) : (
            agenda.map((item) => (
              <View key={item.id} style={styles.agendaItem}>
                <View style={styles.agendaIcon}>
                  <Ionicons name="bookmark" size={22} color="#fff" />
                </View>
                <View style={styles.agendaContent}>
                  <Text style={styles.agendaTitle}>{item.unidad} / {item.ejercicio}</Text>
                  <Text style={styles.agendaSubtitle}>{item.pendiente}</Text>
                  <Text style={styles.agendaDate}>Fecha objetivo: {formatDate(item.fecha)}</Text>
                </View>
                <TouchableOpacity style={styles.agendaDelete} onPress={() => handleRemoveEntry(item.id)}>
                  <Ionicons name="trash" size={20} color="#d32f2f" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        <View style={styles.sectionCard}>
          <TouchableOpacity style={[styles.logoutButton, { backgroundColor: '#d32f2f' }]} onPress={async () => {
            await logout();
            navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' as never }] });
          }}>
            <Ionicons name="log-out" size={20} color="#fff" />
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

type InfoRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
};

const InfoRow = ({ icon, label, value }: InfoRowProps) => (
  <View style={styles.infoRow}>
    <Ionicons name={icon} size={18} color="#1b5e20" />
    <View style={styles.infoRowText}>
      <Text style={styles.infoRowLabel}>{label}</Text>
      <Text style={styles.infoRowValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7f6',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  loadingText: {
    marginTop: 12,
    color: '#4d4d4d',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f4f7f6',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    color: '#333',
  },
  errorSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginTop: 8,
    marginBottom: 20,
  },
  errorButton: {
    backgroundColor: '#1b5e20',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  errorButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
  },
  userInfo: {
    alignItems: 'center',
    marginTop: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#e8f5e9',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 45,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  changePhotoText: {
    color: '#e0f2f1',
    fontSize: 14,
    marginTop: 4,
    textDecorationLine: 'underline',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginTop: 16,
  },
  userEmail: {
    color: '#e0f2f1',
    marginTop: 6,
  },
  userMeta: {
    color: '#c8e6c9',
    marginTop: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeActive: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  badgeInactive: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  badgeText: {
    color: '#fff',
    fontWeight: '500',
  },
  sectionsContainer: {
    padding: 20,
    gap: 16,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoRowText: {
    marginLeft: 12,
  },
  infoRowLabel: {
    fontSize: 13,
    color: '#4d4d4d',
  },
  infoRowValue: {
    fontSize: 15,
    color: '#000000',
    fontWeight: '600',
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F3EE',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    gap: 12,
  },
  quickActionText: {
    flex: 1,
  },
  quickActionTitle: {
    fontWeight: '600',
    color: '#FFD700',
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#5d766a',
    marginTop: 2,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
  },
  formField: {
    flex: 1,
    marginBottom: 12,
  },
  formLabel: {
    fontSize: 12,
    color: '#446654',
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f3f8f6',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#cfe3d7',
    fontSize: 14,
    color: '#333',
  },
  inputMultiline: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#d8ece3',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 4,
  },
  dateButtonText: {
    color: '#1b5e20',
    fontWeight: '600',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#205941',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  emptyAgenda: {
    textAlign: 'center',
    color: '#7a7a7a',
    fontSize: 14,
    paddingVertical: 12,
  },
  agendaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  agendaIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1b5e20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  agendaContent: {
    flex: 1,
    marginHorizontal: 12,
  },
  agendaTitle: {
    fontWeight: '600',
    color: '#FFD700',
  },
  agendaSubtitle: {
    color: '#4d4d4d',
    marginTop: 2,
  },
  agendaDate: {
    color: '#7a7a7a',
    fontSize: 12,
    marginTop: 4,
  },
  agendaDelete: {
    padding: 6,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
});