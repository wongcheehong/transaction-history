import { View, Text, TouchableOpacity, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Fingerprint, ScanFace } from 'lucide-react-native';
import { useAuthContext } from '@/context/AuthContext';
import { useStyles } from '@/hooks/useStyles';
import { Theme } from '@/hooks/useAppTheme';

export default function LoginScreen() {
    const { authenticate, biometricTypes } = useAuthContext();
    const router = useRouter();
    const styles = useStyles(createStyles);

    const handleAuth = async () => {
        const success = await authenticate();
        if (success) {
            router.replace('/(tabs)');
        }
    };

    const BiometricIcon = biometricTypes.includes('facial') ? ScanFace : Fingerprint;

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>
                    Use biometric authentication to access your account
                </Text>

                <TouchableOpacity
                    style={styles.authButton}
                    onPress={handleAuth}
                >
                    <BiometricIcon size={32} color={styles.buttonIcon.color} />
                    <Text style={styles.buttonText}>
                        {biometricTypes.includes('facial')
                            ? 'Use Face ID'
                            : 'Use Fingerprint'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}



const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.xl,
    },
    title: {
        ...theme.typography.h1,
        marginBottom: theme.spacing.sm,
        textAlign: 'center',
    },
    subtitle: {
        ...theme.typography.body1,
        color: theme.colors.neutral[600],
        textAlign: 'center',
        marginBottom: theme.spacing.xl,
    },
    authButton: {
        backgroundColor: theme.colors.primary.main,
        padding: theme.spacing.lg,
        borderRadius: theme.radius.xl,
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
    },
    buttonText: {
        color: theme.colors.primary.contrast,
        ...theme.typography.body1,
        fontWeight: '600',
    },
    buttonIcon: {
        color: theme.colors.primary.contrast,
    },
});