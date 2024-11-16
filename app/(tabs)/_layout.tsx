import { AmountToggle } from '@/components/AmountToggle';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Tabs } from 'expo-router';
import { Home, User } from 'lucide-react-native';

export default function TabLayout() {
    const theme = useAppTheme();
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme.colors.primary.main,
                tabBarInactiveTintColor: theme.colors.neutral[500],
                tabBarStyle: {
                    borderTopWidth: 1,
                    borderTopColor: theme.colors.neutral[200],
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Home size={24} color={color} />,
                    headerRight: () => <AmountToggle />
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <User size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}