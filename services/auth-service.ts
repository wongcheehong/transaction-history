import { AuthenticationState } from '@/types/types';
import * as LocalAuthentication from 'expo-local-authentication';

class AuthenticationService {
  async checkBiometricSupport(): Promise<boolean> {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    return compatible && enrolled;
  }

  async authenticate(): Promise<AuthenticationState> {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to view sensitive data',
        fallbackLabel: 'Use passcode',
      });

      return {
        isAuthenticated: result.success,
        error: result.success ? undefined : 'Failed to authenticate',
      };
    } catch (error) {
      return {
        isAuthenticated: false,
        error: 'Authentication failed',
      };
    }
  }
}

export const authService = new AuthenticationService();