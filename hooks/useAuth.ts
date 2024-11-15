import * as LocalAuthentication from 'expo-local-authentication';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

export type BiometricType = 'fingerprint' | 'facial' | 'iris';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [biometricTypes, setBiometricTypes] = useState<BiometricType[]>([]);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const checkBiometricSupport = useCallback(async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      Alert.alert(
        'Incompatible Device',
        'Your device doesn\'t support biometric authentication.'
      );
      return false;
    }

    const enrolled = await LocalAuthentication.isEnrolledAsync();
    setIsEnrolled(enrolled);

    if (!enrolled) {
      Alert.alert(
        'No Biometrics Found',
        'Please set up biometric authentication in your device settings.'
      );
      return false;
    }

    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    const mappedTypes: BiometricType[] = types.map(type => {
      switch (type) {
        case LocalAuthentication.AuthenticationType.FINGERPRINT:
          return 'fingerprint';
        case LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION:
          return 'facial';
        case LocalAuthentication.AuthenticationType.IRIS:
          return 'iris';
        default:
          return 'fingerprint';
      }
    });
    
    setBiometricTypes(mappedTypes);
    return true;
  }, []);

  const authenticate = useCallback(async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access your account',
        fallbackLabel: 'Use passcode',
        cancelLabel: 'Cancel',
        disableDeviceFallback: false,
      });

      setIsAuthenticated(result.success);
      return result.success;
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    checkBiometricSupport();
  }, [checkBiometricSupport]);

  return {
    isAuthenticated,
    authenticate,
    logout,
    biometricTypes,
    isEnrolled,
    checkBiometricSupport,
  };
};