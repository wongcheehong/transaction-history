import { createContext, useContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { authService } from '@/services/auth-service';

type AuthContextType = {
    isLoggedIn: boolean;
    authenticate: () => Promise<boolean>;
    logout: () => Promise<void>;
    biometricTypes: BiometricType[];
    isEnrolled: boolean;
    checkBiometricSupport: () => Promise<boolean>;
};

export type BiometricType = 'fingerprint' | 'facial' | 'iris';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [biometricTypes, setBiometricTypes] = useState<BiometricType[]>([]);
    const [isEnrolled, setIsEnrolled] = useState(false);

    const checkBiometricSupport = useCallback(async () => {
        const isSupported = await authService.checkBiometricSupport();
        setIsEnrolled(isSupported);
        return isSupported;
    }, []);

    const authenticate = useCallback(async () => {
        const result = await authService.authenticate();
        setIsAuthenticated(result.isAuthenticated);
        return result.isAuthenticated;
    }, []);

    const logout = useCallback(async () => {
        await authService.logout();
        setIsAuthenticated(false);
    }, []);

    // Check authentication status on app start
    useEffect(() => {
        const checkAuth = async () => {
            const isAuth = await authService.checkAuthStatus();
            setIsAuthenticated(isAuth);
            await checkBiometricSupport();
        };

        checkAuth();
    }, [checkBiometricSupport]);

    const value = {
        isLoggedIn: isAuthenticated,
        authenticate,
        logout,
        biometricTypes,
        isEnrolled,
        checkBiometricSupport,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}