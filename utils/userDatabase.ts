import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

// Tipos de datos
export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'owner';
  createdAt: string;
  lastLogin?: string;
  telefono?: string;
  provincia?: string;
  documento?: string;
  tipoDocumento?: string;
  fechaNacimiento?: string;
  matriculado?: boolean;
  matriculado_escuela_virtual?: boolean;
  nivelMatricula?: string | null;
  progress?: {
    nivelActual: string;
    puntuacionTotal: number;
    unidadesCompletadas: number;
    tiempoEstudio: number;
  };
  preferences?: {
    idioma: 'es' | 'ar';
    notificaciones: boolean;
    tema: 'light' | 'dark';
  };
}

// Función helper para obtener nombre completo
export const getFullName = (user: User): string => {
  return `${user.firstName} ${user.lastName}`.trim();
};

export interface UserProgress {
  id?: number;
  userId: number;
  nivel: string;
  puntuacion: number;
  fecha: string;
  tiempo: number;
  respuestasCorrectas: number;
  totalPreguntas: number;
}

class UserDatabase {
  private usersKey = 'users_data';
  private progressKey = 'user_progress_data';
  private nextUserId = 1;

  async init() {
    try {
      // Inicializar contador de IDs
      const users = await this.getAllUsers();
      if (users.length > 0) {
        this.nextUserId = Math.max(...users.map(u => u.id || 0)) + 1;
      }
      console.log('Base de datos de usuarios inicializada');
    } catch (error) {
      console.error('Error inicializando base de datos:', error);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const userStr = await AsyncStorage.getItem('currentUser');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error obteniendo usuario actual:', error);
      return null;
    }
  }

  // Registrar nuevo usuario
  async registerUser(userData: Omit<User, 'id' | 'createdAt' | 'role'>): Promise<{user: User | null, error: string | null}> {
    try {
      // 1. Primero, verificar si el correo ya existe en Firebase
      try {
        const methods = await auth().fetchSignInMethodsForEmail(userData.email);
        if (methods && methods.length > 0) {
          return { user: null, error: 'El correo electrónico ya está registrado' };
        }
      } catch (firebaseError: any) {
        // Si el error es que el usuario no existe, continuamos con el registro
        if (firebaseError.code !== 'auth/user-not-found') {
          console.error('Error verificando email en Firebase:', firebaseError);
          return { user: null, error: 'Error al verificar el correo electrónico' };
        }
      }

      // 2. Verificar en la base de datos local
      const existingUsers = await this.getAllUsers();
      const emailExistsLocal = existingUsers.some(u => u.email.toLowerCase() === userData.email.toLowerCase());
      
      if (emailExistsLocal) {
        return { user: null, error: 'El correo electrónico ya está registrado' };
      }

      // 3. Crear el usuario en Firebase Auth
      let firebaseUserCredential;
      try {
        firebaseUserCredential = await auth().createUserWithEmailAndPassword(
          userData.email,
          userData.password
        );

        if (!firebaseUserCredential.user) {
          throw new Error('No se pudo crear el usuario en Firebase');
        }
      } catch (error: any) {
        console.error('Error creando usuario en Firebase:', error);
        // Si el error es que el correo ya está en uso, sincronizar la base de datos local
        if (error.code === 'auth/email-already-in-use') {
          // Intentar iniciar sesión para sincronizar
          try {
            const userCredential = await auth().signInWithEmailAndPassword(userData.email, userData.password);
            if (userCredential.user) {
              // Si el inicio de sesión es exitoso, sincronizar el usuario local
              const isFirstUser = existingUsers.length === 0;
              const user: User = {
                ...userData,
                id: this.nextUserId++,
                role: isFirstUser ? 'owner' : 'user',
                createdAt: new Date().toISOString(),
                progress: {
                  nivelActual: 'A1',
                  puntuacionTotal: 0,
                  unidadesCompletadas: 0,
                  tiempoEstudio: 0
                },
                preferences: {
                  idioma: 'es',
                  notificaciones: true,
                  tema: 'light'
                }
              };

              existingUsers.push(user);
              await AsyncStorage.setItem(this.usersKey, JSON.stringify(existingUsers));
              
              return { user, error: null };
            }
          } catch (loginError) {
            console.error('Error sincronizando usuario existente:', loginError);
            return { user: null, error: 'Error al sincronizar la cuenta existente' };
          }
        }
        return { user: null, error: 'Error al crear el usuario: ' + (error.message || 'Error desconocido') };
      }

      // 4. Si se creó en Firebase, crear el usuario en la base de datos local
      const isFirstUser = existingUsers.length === 0;
      const user: User = {
        ...userData,
        id: this.nextUserId++,
        role: isFirstUser ? 'owner' : 'user',
        createdAt: new Date().toISOString(),
        progress: {
          nivelActual: 'A1',
          puntuacionTotal: 0,
          unidadesCompletadas: 0,
          tiempoEstudio: 0
        },
        preferences: {
          idioma: 'es',
          notificaciones: true,
          tema: 'light'
        }
      };

      // Guardar en la base de datos local
      existingUsers.push(user);
      await AsyncStorage.setItem(this.usersKey, JSON.stringify(existingUsers));

      // Actualizar el perfil del usuario en Firebase con el nombre
      if (firebaseUserCredential?.user) {
        await firebaseUserCredential.user.updateProfile({
          displayName: `${userData.firstName} ${userData.lastName}`.trim()
        });
      }

      return { user, error: null };
    } catch (error: any) {
      console.error('Error registrando usuario:', error);
      return { user: null, error: error.message || 'Error desconocido al registrar el usuario' };
    }
  }

  // Iniciar sesión
  async loginUser(email: string, password: string): Promise<User | null> {
    try {
      // Primero intentar autenticar con Firebase
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const firebaseUser = userCredential.user;
      
      if (!firebaseUser) {
        return null;
      }

      // Buscar el usuario en la base de datos local
      const users = await this.getAllUsers();
      const user = users.find(u => u.email === email);
      
      if (user) {
        // Si la contraseña en la base de datos no coincide con la de Firebase,
        // actualizamos la contraseña en la base de datos local
        if (user.password !== password) {
          user.password = password; // Actualizar la contraseña en la base de datos local
          await this.updateUser(user);
        }
        
        // Actualizar último login
        user.lastLogin = new Date().toISOString();
        await this.updateUser(user);
        return user;
      }
      
      return null;
    } catch (error: any) {
      console.error('Error en login:', error);
      // Si hay un error de Firebase, intentar con la base de datos local como respaldo
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        try {
          const users = await this.getAllUsers();
          const user = users.find(u => u.email === email && u.password === password);
          
          if (user) {
            // Actualizar último login
            user.lastLogin = new Date().toISOString();
            await this.updateUser(user);
            return user;
          }
        } catch (localError: any) {
          console.error('Error en login local:', localError);
        }
      }
      return null;
    }
  }
  
  // Restablecer contraseña
  async resetPassword(email: string, newPassword: string): Promise<boolean> {
    try {
      // Actualizar contraseña en Firebase
      const user = auth().currentUser;
      if (user && user.email === email) {
        await user.updatePassword(newPassword);
      }
      
      // Actualizar contraseña en la base de datos local
      const users = await this.getAllUsers();
      const userIndex = users.findIndex(u => u.email === email);
      
      if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        await AsyncStorage.setItem(this.usersKey, JSON.stringify(users));
        return true;
      }
      
      return false;
    } catch (error: any) {
      console.error('Error al restablecer contraseña:', error);
      return false;
    }
  }

  // Verificar si el email ya existe (tanto en Firebase como localmente)
  async emailExists(email: string): Promise<boolean> {
    try {
      // Primero verificar en Firebase
      try {
        const methods = await auth().fetchSignInMethodsForEmail(email);
        if (methods && methods.length > 0) {
          return true; // El email ya está registrado en Firebase
        }
      } catch (firebaseError: any) {
        // Si el error es que el usuario no existe, continuamos con la verificación local
        if (firebaseError.code !== 'auth/user-not-found') {
          console.error('Error verificando email en Firebase:', firebaseError);
          // Continuamos con la verificación local en caso de otros errores
        }
      }
      
      // Luego verificar en la base de datos local
      const users = await this.getAllUsers();
      return users.some(u => u.email.toLowerCase() === email.toLowerCase());
    } catch (error) {
      console.error('Error verificando email:', error);
      return false;
    }
  }

  // Obtener todos los usuarios
  async getAllUsers(): Promise<User[]> {
    try {
      const usersStr = await AsyncStorage.getItem(this.usersKey);
      return usersStr ? JSON.parse(usersStr) : [];
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      return [];
    }
  }

  // Actualizar progreso del usuario
  async updateUserProgress(userId: number, progress: User['progress']): Promise<boolean> {
    try {
      const users = await this.getAllUsers();
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex !== -1) {
        users[userIndex].progress = progress;
        await AsyncStorage.setItem(this.usersKey, JSON.stringify(users));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error actualizando progreso:', error);
      return false;
    }
  }

  // Guardar progreso de una sesión
  async saveSessionProgress(progress: Omit<UserProgress, 'id'>): Promise<boolean> {
    try {
      const progressData = await this.getAllProgress();
      const newProgress: UserProgress = {
        ...progress,
        id: Date.now() // Usar timestamp como ID temporal
      };
      
      progressData.push(newProgress);
      await AsyncStorage.setItem(this.progressKey, JSON.stringify(progressData));
      return true;
    } catch (error) {
      console.error('Error guardando progreso de sesión:', error);
      return false;
    }
  }

  // Obtener historial de progreso
  async getUserProgress(userId: number): Promise<UserProgress[]> {
    try {
      const progressData = await this.getAllProgress();
      return progressData.filter(p => p.userId === userId);
    } catch (error) {
      console.error('Error obteniendo progreso:', error);
      return [];
    }
  }

  // Actualizar preferencias del usuario
  async updateUserPreferences(userId: number, preferences: User['preferences']): Promise<boolean> {
    try {
      const users = await this.getAllUsers();
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex !== -1) {
        users[userIndex].preferences = preferences;
        await AsyncStorage.setItem(this.usersKey, JSON.stringify(users));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error actualizando preferencias:', error);
      return false;
    }
  }

  // Obtener estadísticas del usuario
  async getUserStats(userId: number) {
    try {
      const progressData = await this.getAllProgress();
      const userProgress = progressData.filter(p => p.userId === userId);
      
      if (userProgress.length === 0) return null;

      const totalSesiones = userProgress.length;
      const promedioPuntuacion = userProgress.reduce((sum, p) => sum + p.puntuacion, 0) / totalSesiones;
      const tiempoTotal = userProgress.reduce((sum, p) => sum + p.tiempo, 0);
      const respuestasCorrectas = userProgress.reduce((sum, p) => sum + p.respuestasCorrectas, 0);
      const totalPreguntas = userProgress.reduce((sum, p) => sum + p.totalPreguntas, 0);

      return {
        totalSesiones,
        promedioPuntuacion,
        tiempoTotal,
        respuestasCorrectas,
        totalPreguntas
      };
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      return null;
    }
  }

  // Verificar si el usuario es propietario
  async isOwner(userId: number): Promise<boolean> {
    try {
      const users = await this.getAllUsers();
      const user = users.find(u => u.id === userId);
      return user?.role === 'owner';
    } catch (error) {
      console.error('Error verificando rol de propietario:', error);
      return false;
    }
  }

  // Verificar si el usuario es administrador o propietario
  async isAdminOrOwner(userId: number): Promise<boolean> {
    try {
      const users = await this.getAllUsers();
      const user = users.find(u => u.id === userId);
      return user?.role === 'admin' || user?.role === 'owner';
    } catch (error) {
      console.error('Error verificando permisos administrativos:', error);
      return false;
    }
  }

  // Promover usuario a administrador (solo propietario puede hacerlo)
  async promoteToAdmin(userId: number, ownerId: number): Promise<boolean> {
    try {
      // Verificar que quien promueve es propietario
      const isOwner = await this.isOwner(ownerId);
      if (!isOwner) {
        console.error('Solo el propietario puede promover usuarios');
        return false;
      }

      const users = await this.getAllUsers();
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex !== -1) {
        users[userIndex].role = 'admin';
        await AsyncStorage.setItem(this.usersKey, JSON.stringify(users));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error promoviendo usuario:', error);
      return false;
    }
  }

  // Degradar administrador a usuario (solo propietario puede hacerlo)
  async demoteFromAdmin(userId: number, ownerId: number): Promise<boolean> {
    try {
      // Verificar que quien degrada es propietario
      const isOwner = await this.isOwner(ownerId);
      if (!isOwner) {
        console.error('Solo el propietario puede degradar usuarios');
        return false;
      }

      const users = await this.getAllUsers();
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex !== -1 && users[userIndex].role === 'admin') {
        users[userIndex].role = 'user';
        await AsyncStorage.setItem(this.usersKey, JSON.stringify(users));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error degradando usuario:', error);
      return false;
    }
  }

  // Eliminar usuario (solo administrador puede hacerlo)
  async deleteUser(userId: number): Promise<boolean> {
    try {
      const users = await this.getAllUsers();
      const filteredUsers = users.filter(u => u.id !== userId);
      await AsyncStorage.setItem(this.usersKey, JSON.stringify(filteredUsers));
      
      // También eliminar progreso del usuario
      const progressData = await this.getAllProgress();
      const filteredProgress = progressData.filter(p => p.userId !== userId);
      await AsyncStorage.setItem(this.progressKey, JSON.stringify(filteredProgress));
      
      return true;
    } catch (error) {
      console.error('Error eliminando usuario:', error);
      return false;
    }
  }

  // Métodos auxiliares
  private async updateUser(updatedUser: User): Promise<void> {
    const users = await this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === updatedUser.id);
    
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      await AsyncStorage.setItem(this.usersKey, JSON.stringify(users));
    }
  }

  private async getAllProgress(): Promise<UserProgress[]> {
    try {
      const progressStr = await AsyncStorage.getItem(this.progressKey);
      return progressStr ? JSON.parse(progressStr) : [];
    } catch (error) {
      console.error('Error obteniendo progreso:', error);
      return [];
    }
  }
}

// Instancia singleton
export const userDB = new UserDatabase();

// Funciones de conveniencia para AsyncStorage (compatibilidad)
export const userStorage = {
  // Guardar usuario en AsyncStorage (para sesión actual)
  async saveCurrentUser(user: User): Promise<void> {
    await AsyncStorage.setItem('currentUser', JSON.stringify(user));
  },

  // Obtener usuario actual
  async getCurrentUser(): Promise<User | null> {
    const userStr = await AsyncStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Cerrar sesión
  async logout(): Promise<void> {
    await AsyncStorage.removeItem('currentUser');
  },

  // Verificar si hay usuario logueado
  async isLoggedIn(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user !== null;
  }
}; 