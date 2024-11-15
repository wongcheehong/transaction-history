// app/hooks/useStyles.ts
import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { useAppTheme, Theme } from '@/hooks/useAppTheme';

// Define types for nested styles
type NamedStylesProp<T> = ViewStyle | TextStyle | ImageStyle | { [K in keyof T]: T[K] };
type NamedStyles<T> = { [P in keyof T]: NamedStylesProp<T[P]> };

export function useStyles<T extends NamedStyles<T>>(
  styleCreator: (theme: Theme) => T
): T {
  const theme = useAppTheme();
  const styles = styleCreator(theme);

  // Process styles recursively
  const processStyles = (obj: any): any => {
    const processed: any = {};
    
    for (const key in obj) {
      const value = obj[key];
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        // Check if it's a style object (has numeric properties)
        const hasNumericKeys = Object.keys(value).some(k => !isNaN(Number(k)));
        if (hasNumericKeys) {
          processed[key] = StyleSheet.create({ temp: value }).temp;
        } else {
          processed[key] = processStyles(value);
        }
      } else {
        processed[key] = value;
      }
    }
    
    return processed;
  };

  return processStyles(styles);
}