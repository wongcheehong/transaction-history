import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { useAppTheme, Theme } from '@/hooks/useAppTheme';

type NamedStyles<T> = {[P in keyof T]: ViewStyle | TextStyle | ImageStyle};

export function useStyles<T extends NamedStyles<T>>(
  styleCreator: (theme: Theme) => T
): T {
  const theme = useAppTheme();
  return styleCreator(theme);  
}