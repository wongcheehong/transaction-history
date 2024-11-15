import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/Text';

interface DetailRowProps {
    label: string;
    value: string;
}

export function DetailRow({ label, value }: DetailRowProps) {
    return (
        <View className="flex-row justify-between items-center py-2">
            <Text className="text-gray-500">{label}</Text>
            <Text className="text-gray-800 font-medium">{value}</Text>
        </View>
    );
}