import React, { useState } from 'react';
import { View, TouchableOpacity, Switch, Alert } from 'react-native';
import { Text } from '@/components/ui/Text';
import { LogOut, Shield, Bell, Lock, ChevronRight } from 'lucide-react-native';
import { authService } from '@/services/auth-service';

interface SettingItemProps {
    icon: React.ReactNode;
    title: string;
    onPress?: () => void;
    hasToggle?: boolean;
    isToggled?: boolean;
    onToggle?: (value: boolean) => void;
}

function SettingItem({
    icon,
    title,
    onPress,
    hasToggle,
    isToggled,
    onToggle
}: SettingItemProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex-row items-center p-4 bg-white border-b border-gray-100"
        >
            <View className="w-8 h-8 justify-center items-center mr-3">
                {icon}
            </View>
            <Text className="flex-1 text-gray-800">{title}</Text>
            {hasToggle ? (
                <Switch
                    value={isToggled}
                    onValueChange={onToggle}
                    trackColor={{ false: '#cbd5e1', true: '#93c5fd' }}
                    thumbColor={isToggled ? '#3b82f6' : '#f4f4f5'}
                />
            ) : (
                <ChevronRight size={20} color="#6b7280" />
            )}
        </TouchableOpacity>
    );
}

export default function ProfileScreen() {
    const [isBiometricEnabled, setIsBiometricEnabled] = useState(true);
    const [isPushNotificationsEnabled, setIsPushNotificationsEnabled] = useState(true);

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
        <View className="flex-1 bg-gray-50">
            {/* Profile Header */}
            <View className="bg-white p-6 items-center border-b border-gray-200">
                <View className="w-20 h-20 rounded-full bg-blue-100 items-center justify-center mb-3">
                    <Text className="text-2xl text-blue-500 font-semibold">JD</Text>
                </View>
                <Text className="text-xl font-semibold text-gray-800">John Doe</Text>
                <Text className="text-gray-500 mt-1">john.doe@example.com</Text>
            </View>

            {/* Settings Section */}
            <View className="mt-6">
                <Text className="px-4 pb-2 text-sm text-gray-500 uppercase">Settings</Text>

                <SettingItem
                    icon={<Shield size={24} color="#3b82f6" />}
                    title="Security Settings"
                    onPress={handleSecuritySettings}
                />

                <SettingItem
                    icon={<Lock size={24} color="#3b82f6" />}
                    title="Biometric Authentication"
                    hasToggle
                    isToggled={isBiometricEnabled}
                    onToggle={handleBiometricToggle}
                />

                <SettingItem
                    icon={<Bell size={24} color="#3b82f6" />}
                    title="Push Notifications"
                    hasToggle
                    isToggled={isPushNotificationsEnabled}
                    onToggle={setIsPushNotificationsEnabled}
                />
            </View>

            {/* Logout Button */}
            <TouchableOpacity
                onPress={handleLogout}
                className="mt-6 mx-4 p-4 bg-red-50 rounded-lg flex-row items-center justify-center"
            >
                <LogOut size={20} color="#ef4444" className="mr-2" />
                <Text className="text-red-500 font-medium">Logout</Text>
            </TouchableOpacity>
        </View>
    );
}