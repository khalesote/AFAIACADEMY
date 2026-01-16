import type { LoginResponse, RegisterResponse, UserProfile } from '../../services/userService';
import { UserService } from '../../services/userService';

export interface SimpleRegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const SimpleUserService = {
  async loginUser(email: string, password: string): Promise<LoginResponse> {
    return UserService.loginUser(email, password);
  },

  async registerUser(params: SimpleRegisterParams): Promise<RegisterResponse> {
    return UserService.registerUser(params);
  },

  async getCurrentUser(): Promise<UserProfile | null> {
    return UserService.getCurrentUser();
  }
};

export default SimpleUserService;
