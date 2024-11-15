import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useStyles } from '@/hooks/useStyles';
import { Theme } from '@/hooks/useAppTheme';

interface DetailRowProps {
    label: string;
    value: string;
}

export function DetailRow({ label, value }: DetailRowProps) {
    const styles = useStyles(createStyles);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: theme.spacing.sm
    },
    label: {
        color: theme.colors.gray[500]
    },
    value: {
        ...theme.typography.body1,
        color: theme.colors.gray[800],
        fontWeight: '500'
    }
});