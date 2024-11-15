import { Href, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuthContext } from '@/context/AuthContext';
import { AmountToggle } from '@/components/AmountToggle';

function RootLayoutNav() {
    const { isLoggedIn } = useAuthContext();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        const inAuthGroup = ['(tabs)', 'transactions'].findIndex((s) => segments[0] === s) !== -1;

        if (!isLoggedIn && inAuthGroup) {
            router.replace('/login' as Href);
        } else if (isLoggedIn && !inAuthGroup) {
            router.replace('/(tabs)');
        }
    }, [isLoggedIn, segments]);

    return (
        <Stack>
            <Stack.Screen
                name="login"
                options={{
                    headerShown: false,
                    gestureEnabled: false
                }}
            />
            <Stack.Screen
                name="(tabs)"
                options={{
                    headerShown: false,
                    gestureEnabled: false
                }}
            />
            <Stack.Screen
                name="transactions/index"
                options={{
                    headerShown: true,
                    headerTitle: 'Transactions',
                }}
            />
            <Stack.Screen
                name="transactions/[id]"
                options={{
                    headerShown: true,
                    headerTitle: 'Transaction Details',
                }}
            />
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <RootLayoutNav />
        </AuthProvider>
    );
}