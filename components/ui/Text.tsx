import { cn } from '@/lib/utils';
import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

interface TextProps extends RNTextProps {
    className?: string;
}

export function Text({ className, ...props }: TextProps) {
    return (
        <RNText
            className={cn(
                "text-base text-gray-900 font-normal",
                className
            )}
            {...props}
        />
    );
}