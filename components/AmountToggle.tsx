import React from 'react';
import { Pressable, TouchableOpacity } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { useHideAmountStore } from '@/hooks/stores/useHideAmountStore';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useBiometric } from '@/hooks/useBiometric';

export const AmountToggle = ({
    size = 24
}) => {
    const { isAmountVisible, toggleVisibility } = useHideAmountStore();
    const { authenticate } = useBiometric();
    const theme = useAppTheme();

    const handlePress = async () => {
        if (isAmountVisible) {
            toggleVisibility();
            return;
        }

        const sucess = await authenticate();

        if (sucess) {
            toggleVisibility();
        }
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            hitSlop={theme.spacing.sm}
            style={{ padding: theme.spacing.sm, marginRight: theme.spacing.sm }}
        >
            {isAmountVisible ? (
                <Eye size={size} color={theme.colors.neutral[900]} />
            ) : (
                <EyeOff size={size} color={theme.colors.neutral[900]} />
            )}
        </TouchableOpacity>
    );
};