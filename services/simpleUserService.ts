import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SimpleUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  // Add other user properties as needed
}

export interface LoginResponse {
  user?: SimpleUser;
  error?: string;
}

export interface RegisterResponse {
  user?: SimpleUser;
  error?: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default class SimpleUserService {
  private static readonly USERS_KEY = 'firebase_test_users';
  private static readonly CURRENT_USER_KEY = 'current_firebase_user';

  /**
   * Login user with email and password
   */
  static async loginUser(email: string, password: string): Promise<LoginResponse> {
    try {
      // Get registered users from storage
      const usersJson = await AsyncStorage.getItem(this.USERS_KEY);
      const users: Array<{ email: string; password: string; firstName: string; lastName: string; id: string }> =
        usersJson ? JSON.parse(usersJson) : [];

      // Find user with matching email and password
      const userData = users.find(u =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!userData) {
        return { error: 'Credenciales incorrectas. Verifica tu email y contraseña.' };
      }

      // Create user object
      const user: SimpleUser = {
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email
      };

      // Store current user
      await AsyncStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));

      return { user };
    } catch (error) {
      console.error('Login error:', error);
      return { error: 'Error interno del servidor. Inténtalo de nuevo.' };
    }
  }

  /**
   * Register a new user
   */
  static async registerUser(userData: RegisterData): Promise<RegisterResponse> {
    try {
      // Validate input
      if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
        return { error: 'Todos los campos son requeridos.' };
      }

      if (userData.password.length < 6) {
        return { error: 'La contraseña debe tener al menos 6 caracteres.' };
      }

      // Get existing users
      const usersJson = await AsyncStorage.getItem(this.USERS_KEY);
      const users: Array<{ email: string; password: string; firstName: string; lastName: string; id: string }> =
        usersJson ? JSON.parse(usersJson) : [];

      // Check if user already exists
      const existingUser = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
      if (existingUser) {
        return { error: 'Ya existe una cuenta con este correo electrónico.' };
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email: userData.email.toLowerCase(),
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName
      };

      // Add to users array
      users.push(newUser);

      // Save to storage
      await AsyncStorage.setItem(this.USERS_KEY, JSON.stringify(users));

      // Create user object for response
      const user: SimpleUser = {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
      };

      return { user };
    } catch (error) {
      console.error('Register error:', error);
      return { error: 'Error creando la cuenta. Inténtalo de nuevo.' };
    }
  }

  /**
   * Get current logged in user
   */
  static async getCurrentUser(): Promise<SimpleUser | null> {
    try {
      const userJson = await AsyncStorage.getItem(this.CURRENT_USER_KEY);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.CURRENT_USER_KEY);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  /**
   * Check if user is logged in
   */
  static async isLoggedIn(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user !== null;
  }

  /**
   * Get all registered users (for testing purposes)
   */
  static async getAllUsers(): Promise<Array<{ email: string; firstName: string; lastName: string; id: string }>> {
    try {
      const usersJson = await AsyncStorage.getItem(this.USERS_KEY);
      return usersJson ? JSON.parse(usersJson) : [];
    } catch (error) {
      console.error('Get all users error:', error);
      return [];
    }
  }

  /**
   * Clear all users (for testing purposes)
   */
  static async clearAllUsers(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.USERS_KEY);
      await AsyncStorage.removeItem(this.CURRENT_USER_KEY);
    } catch (error) {
      console.error('Clear all users error:', error);
    }
  }
}
