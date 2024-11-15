import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = '@auth_status';

export const authService = {
  async checkBiometricSupport() {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    return compatible && enrolled;
  },

  async authenticate() {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to continue',
        fallbackLabel: 'Use passcode',
      });

      if (result.success) {
        await AsyncStorage.setItem(AUTH_KEY, 'true');
      }

      return {
        isAuthenticated: result.success,
        error: result.success ? undefined : result.error,
      };
    } catch (error) {
      return {
        isAuthenticated: false,
        error,
      };
    }
  },

  async logout() {
    await AsyncStorage.removeItem(AUTH_KEY);
  },

  async checkAuthStatus(): Promise<boolean> {
    const status = await AsyncStorage.getItem(AUTH_KEY);
    return status === 'true';
  },
};