import { Stack } from 'expo-router';
import "../global.css";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{
                headerShown: false,
            }} />
            <Stack.Screen name="transactions/index" options={{
                headerShown: true,
                headerTitle: 'Transactions',
            }} />
            <Stack.Screen name="transactions/[id]" options={{
                headerShown: true,
                headerTitle: 'Transaction Details',
            }} />
        </Stack>
    );
}