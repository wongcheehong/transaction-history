import React from 'react';
import { View, TouchableOpacity, Switch, Text } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useStyles } from '@/hooks/useStyles';
import { Theme } from '@/hooks/useAppTheme';

interface SettingItemProps {
    icon: React.ReactNode;
    title: string;
    onPress?: () => void;
    hasToggle?: boolean;
    isToggled?: boolean;
    onToggle?: (value: boolean) => void;
}

export function SettingItem({
    icon,
    title,
    onPress,
    hasToggle,
    isToggled,
    onToggle
}: SettingItemProps) {
    const styles = useStyles((theme: Theme) => ({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: theme.spacing.md,
            backgroundColor: theme.colors.background,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.neutral[100]
        },
        iconContainer: {
            width: 32,
            height: 32,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: theme.spacing.sm
        },
        title: {
            flex: 1,
            color: theme.colors.neutral[800],
            ...theme.typography.body1
        },
        switch: {
            trackColor: {
                false: theme.colors.neutral[200],
                true: theme.colors.primary.light
            },
            thumbColor: isToggled ? theme.colors.primary.main : theme.colors.neutral[100]
        }
    }));

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.iconContainer}>{icon}</View>
            <Text style={styles.title}>{title}</Text>
            {hasToggle ? (
                <Switch
                    value={isToggled}
                    onValueChange={onToggle}
                    {...styles.switch}
                />
            ) : (
                <ChevronRight size={20} color={styles.title.color} />
            )}
        </TouchableOpacity>
    );
}