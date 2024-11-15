// app/(app)/profile.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Alert, Text } from 'react-native';
import { LogOut, Shield, Bell, Lock } from 'lucide-react-native';
import { useStyles } from '@/hooks/useStyles';
import { authService } from '@/services/auth-service';

export default function ProfileScreen() {
    const [isBiometricEnabled, setIsBiometricEnabled] = useState(true);
    const [isPushNotificationsEnabled, setIsPushNotificationsEnabled] = useState(true);
    const styles = useStyles(createProfileScreenStyles);
    const theme = useAppTheme();

    const handleBiometricToggle = async (value: boolean) => {
        if (value) {
            try {
                const isSupported = await authService.checkBiometricSupport();
                if (!isSupported) {
                    Alert.alert(
                        'Not Available',
                        'Biometric authentication is not available on your device.'
                    );
                    return;
                }
                const result = await authService.authenticate();
                if (result.isAuthenticated) {
                    setIsBiometricEnabled(true);
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to enable biometric authentication');
            }
        } else {
            setIsBiometricEnabled(false);
        }
    };

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: () => {
                        // Implement logout logic here
                        console.log('User logged out');
                    },
                },
            ]
        );
    };

    const handleSecuritySettings = () => {
        // Navigate to security settings
        console.log('Navigate to security settings');
    };

    return (
        <View style={styles.container}>
            {/* Profile Header */}
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>JD</Text>
                </View>
                <Text style={styles.userName}>John Doe</Text>
                <Text style={styles.userEmail}>john.doe@example.com</Text>
            </View>

            {/* Settings Section */}
            <View style={styles.settingsContainer}>
                <Text style={styles.sectionTitle}>Settings</Text>

                <SettingItem
                    icon={<Shield size={24} color={theme.colors.primary.main} />}
                    title="Security Settings"
                    onPress={handleSecuritySettings}
                />

                <SettingItem
                    icon={<Lock size={24} color={theme.colors.primary.main} />}
                    title="Biometric Authentication"
                    hasToggle
                    isToggled={isBiometricEnabled}
                    onToggle={handleBiometricToggle}
                />

                <SettingItem
                    icon={<Bell size={24} color={theme.colors.primary.main} />}
                    title="Push Notifications"
                    hasToggle
                    isToggled={isPushNotificationsEnabled}
                    onToggle={setIsPushNotificationsEnabled}
                />
            </View>

            {/* Logout Button */}
            <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}
            >
                <LogOut size={20} color={theme.colors.error} />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

// app/styles/profile-screen.ts
import { Theme, useAppTheme } from '@/hooks/useAppTheme';
import { StyleSheet } from 'react-native';
import { SettingItem } from '@/components/Profile/SettingItem';

export const createProfileScreenStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.neutral[50]
    },
    header: {
        backgroundColor: theme.colors.background,
        padding: theme.spacing.xl,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.neutral[200]
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: theme.colors.primary.light,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.sm
    },
    avatarText: {
        fontSize: theme.typography.h2.fontSize,
        color: theme.colors.primary.main,
        fontWeight: theme.typography.h2.fontWeight
    },
    userName: {
        ...theme.typography.h3,
        color: theme.colors.neutral[800]
    },
    userEmail: {
        ...theme.typography.body2,
        color: theme.colors.neutral[500],
        marginTop: theme.spacing.xs
    },
    sectionTitle: {
        ...theme.typography.caption,
        color: theme.colors.neutral[500],
        textTransform: 'uppercase',
        paddingHorizontal: theme.spacing.md,
        paddingBottom: theme.spacing.sm
    },
    settingsContainer: {
        marginTop: theme.spacing.xl
    },
    logoutButton: {
        marginTop: theme.spacing.xl,
        marginHorizontal: theme.spacing.md,
        padding: theme.spacing.md,
        backgroundColor: theme.colors.error + '10',
        borderRadius: theme.radius.lg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoutText: {
        ...theme.typography.body1,
        color: theme.colors.error,
        fontWeight: '500',
        marginLeft: theme.spacing.sm
    }
});