import { useStyles } from '@/hooks/useStyles';
import { useAppTheme } from '@/hooks/useAppTheme';
import React from 'react';
import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    TouchableOpacityProps
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    variant?: 'primary' | 'secondary' | 'outlined';
    size?: 'small' | 'medium' | 'large';
    loading?: boolean;
    children: string;
}

export const Button = ({
    variant = 'primary',
    size = 'medium',
    loading = false,
    children,
    style,
    disabled,
    ...props
}: ButtonProps) => {
    const theme = useAppTheme();
    const styles = useStyles(theme => ({
        button: {
            borderRadius: theme.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            // Size variations
            ...(size === 'small' && {
                paddingHorizontal: theme.spacing.md,
                paddingVertical: theme.spacing.xs,
                minHeight: 32,
            }),
            ...(size === 'medium' && {
                paddingHorizontal: theme.spacing.lg,
                paddingVertical: theme.spacing.sm,
                minHeight: 40,
            }),
            ...(size === 'large' && {
                paddingHorizontal: theme.spacing.xl,
                paddingVertical: theme.spacing.md,
                minHeight: 48,
            }),
            // Variant styles
            ...(variant === 'primary' && {
                backgroundColor: theme.colors.primary.main,
            }),
            ...(variant === 'secondary' && {
                backgroundColor: theme.colors.secondary.main,
            }),
            ...(variant === 'outlined' && {
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: theme.colors.primary.main,
            }),
            // Disabled state
            ...(disabled && {
                opacity: 0.5,
            }),
        },
        text: {
            ...theme.typography.body1,
            fontWeight: '600',
            color: variant === 'outlined'
                ? theme.colors.primary.main
                : theme.colors.primary.contrast,
            marginLeft: loading ? theme.spacing.sm : 0,
        },
    }));

    return (
        <TouchableOpacity
            style={[styles.button, style]}
            disabled={disabled || loading}
            {...props}
        >
            {loading && (
                <ActivityIndicator
                    color={variant === 'outlined'
                        ? styles.text.color
                        : theme.colors.primary.contrast}
                    size="small"
                />
            )}
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    );
};