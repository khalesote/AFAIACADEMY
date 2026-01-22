import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User as FirebaseUser } from '@firebase/auth';
import { UserService } from '../services/userService';
import type { User } from '../services/userService';
import { auth, firestore } from '../config/firebase';
import { View, Text, ActivityIndicator, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

interface UserContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  profileImage: string | null;
  updateProfileImage: (imageUri: string) => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<boolean>;
  refreshUser: () => Promise<User | null>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pushTokenRegistered, setPushTokenRegistered] = useState(false);

  const adminEmails = ['admin@academiadeinmigrantes.es', 'somos@afaiacademiadeinmigrantes.com'];

  const registerForPushNotificationsAsync = async () => {
    try {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
          sound: 'default',
        });
      }

      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.warn('⚠️ UserContext: Permiso de notificaciones no concedido', { finalStatus });
        return null;
      }

      const projectId = Constants.easConfig?.projectId ?? Constants.expoConfig?.extra?.eas?.projectId;
      if (!projectId) {
        console.warn('⚠️ UserContext: projectId no encontrado; usando fallback sin projectId');
      }

      const response = await Notifications.getExpoPushTokenAsync(projectId ? { projectId } : undefined);
      console.log('🔑 UserContext: Push token obtenido', response?.data);
      return response?.data ?? null;
    } catch (error) {
      console.error('❌ UserContext: Error obteniendo push token', error);
      return null;
    }
  };

  const syncPushToken = async (token: string, userId: string) => {
    const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
    if (backendUrl) {
      try {
        const response = await fetch(`${backendUrl}/api/user/push-token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, pushToken: token }),
        });
        if (response.ok) {
          console.log('✅ UserContext: Push token enviado al backend');
        } else {
          console.error('❌ UserContext: Error enviando push token al backend', response.status);
        }
      } catch (error) {
        console.error('❌ UserContext: Error enviando push token al backend', error);
      }
    } else {
      console.warn('⚠️ UserContext: EXPO_PUBLIC_BACKEND_URL no está definido; se omite envío al backend');
    }

    try {
      await setDoc(doc(firestore, 'users', userId), {
        pushToken: token,
        pushTokenUpdatedAt: serverTimestamp(),
      }, { merge: true });
      console.log('✅ UserContext: Push token guardado en Firestore');
    } catch (error) {
      console.error('❌ UserContext: Error guardando push token en Firestore', error);
    }
  };

  const loadUserData = async () => {
    try {
      setLoading(true);
      console.log('🔄 Iniciando carga de datos del usuario...');
      
      // Verificar que auth esté disponible
      if (!auth) {
        console.error('❌ Firebase Auth no está disponible');
        setLoading(false);
        setFirebaseUser(null);
        setUser(null);
        setIsAuthenticated(false);
        return null;
      }

      // Verificar el estado actual de autenticación antes de configurar el listener
      const currentUser = auth.currentUser;
      if (currentUser) {
        console.log('✅ Usuario autenticado encontrado al inicializar:', {
          uid: currentUser.uid,
          email: currentUser.email
        });
      } else {
        console.log('ℹ️ No hay usuario autenticado al inicializar (sesión persistida no encontrada)');
      }

      const unsubscribe = auth.onAuthStateChanged(async (firebaseUser: FirebaseUser | null) => {
        console.log('🔐 Estado de autenticación cambiado:', firebaseUser ? 'Usuario autenticado' : 'Usuario no autenticado');

        if (firebaseUser) {
          console.log('👤 Usuario Firebase:', {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            emailVerified: firebaseUser.emailVerified
          });

          setFirebaseUser(firebaseUser);
          setIsAuthenticated(true);

          console.log('🔍 Buscando perfil en Firestore con UID:', firebaseUser.uid);
          const userProfile = await UserService.getUserProfile(firebaseUser.uid);

          if (userProfile) {
            console.log('✅ Perfil encontrado:', {
              email: userProfile.email,
              firstName: userProfile.firstName,
              lastName: userProfile.lastName,
              matriculado_escuela_virtual: userProfile.matriculado_escuela_virtual
            });
            setUser(userProfile);
          } else {
            console.log('❌ No se encontró perfil en Firestore');
            console.log('💡 Posibles causas:');
            console.log('   - El documento no existe en la colección "users"');
            console.log('   - Problemas de permisos de lectura');
            console.log('   - Error de conexión con Firebase');
          }

          const savedImage = await AsyncStorage.getItem('@profile_image');
          if (savedImage) {
            console.log('🖼️ Imagen de perfil encontrada en almacenamiento local');
            setProfileImage(savedImage);
          } else if (userProfile) {
            console.log('🖼️ Usando imagen de perfil desde Firestore');
            // Note: profileImage is stored separately in AsyncStorage, not on User object
          } else {
            console.log('🖼️ No hay imagen de perfil disponible');
          }
        } else {
          console.log('🚪 Usuario no autenticado, limpiando datos...');
          setFirebaseUser(null);
          setUser(null);
          setIsAuthenticated(false);
          setProfileImage(null);
          setPushTokenRegistered(false);
        }

        setLoading(false);
        console.log('✅ Carga de datos del usuario completada');
      });

      return unsubscribe;
    } catch (error) {
      console.error('❌ Error crítico al cargar datos del usuario:', error);
      setLoading(false);
      setFirebaseUser(null);
      setUser(null);
      setIsAuthenticated(false);
      return null;
    }
  };

  const updateProfileImage = async (imageUri: string) => {
    try {
      if (!firebaseUser) {
        throw new Error('Usuario no autenticado');
      }

      await AsyncStorage.setItem('@profile_image', imageUri);
      setProfileImage(imageUri);

      const firebaseUrl = await UserService.uploadProfileImage(firebaseUser.uid, imageUri);
      if (firebaseUrl) {
        setProfileImage(firebaseUrl);
      }
    } catch (error) {
      console.error('Error al actualizar la imagen de perfil:', error);
      throw error;
    }
  };

  const updateUser = async (updates: Partial<User>): Promise<boolean> => {
    try {
      if (!firebaseUser) {
        console.error('No se puede actualizar: usuario no autenticado');
        return false;
      }

      const result = await UserService.updateUserProfile(updates);
      if (result.success) {
        await refreshUser();
      }
      return result.success;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      return false;
    }
  };

  const refreshUser = async () => {
    try {
      if (firebaseUser) {
        console.log('🔄 UserContext: Refrescando datos del usuario...');
        const userProfile = await UserService.getUserProfile(firebaseUser.uid);
        if (userProfile) {
          console.log('✅ UserContext: Datos del usuario refrescados:', {
            matriculado_escuela_virtual: userProfile.matriculado_escuela_virtual,
            email: userProfile.email
          });
          setUser(userProfile);
          return userProfile;
        } else {
          console.log('❌ UserContext: No se pudieron refrescar los datos del usuario');
        }
      } else {
        console.log('⚠️ UserContext: No hay usuario Firebase autenticado para refrescar');
      }
    } catch (error) {
      console.error('❌ UserContext: Error al refrescar usuario:', error);
    }
    return null;
  };

  const logout = async () => {
    try {
      await UserService.logout();
      setFirebaseUser(null);
      setUser(null);
      setIsAuthenticated(false);
      setProfileImage(null);

      await AsyncStorage.removeItem('@profile_image');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  };

  useEffect(() => {
    console.log('🔄 UserContext: Inicializando listener de autenticación...');
    const unsubscribe = loadUserData();
    console.log('✅ UserContext: Listener de autenticación inicializado');

    return () => {
      console.log('🛑 UserContext: Limpiando listener de autenticación...');
      unsubscribe?.then(unsub => unsub?.());
    };
  }, []);

  useEffect(() => {
    if (!firebaseUser || pushTokenRegistered) {
      return;
    }

    let isActive = true;
    const registerAndSync = async () => {
      console.log('🔔 UserContext: Registrando push token global', { uid: firebaseUser.uid });
      const token = await registerForPushNotificationsAsync();
      if (!token) {
        console.warn('⚠️ UserContext: No se obtuvo push token; se omite registro');
        return;
      }
      if (!isActive) return;
      await syncPushToken(token, firebaseUser.uid);
      if (isActive) {
        setPushTokenRegistered(true);
      }
    };

    registerAndSync();

    return () => {
      isActive = false;
    };
  }, [firebaseUser, pushTokenRegistered]);

  return (
    <UserContext.Provider value={{
      user,
      firebaseUser,
      loading,
      profileImage,
      updateProfileImage,
      updateUser,
      refreshUser,
      logout,
      isAuthenticated,
      isAdmin: user ? adminEmails.includes(user.email) : false
    }}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
          <ActivityIndicator size="large" color="#9DC3AA" />
          <Text style={{ marginTop: 16, color: '#666' }}>Cargando...</Text>
        </View>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe usarse dentro de un UserProvider');
  }
  return context;
};
