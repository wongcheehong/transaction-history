import { TextStyle } from "react-native";

export const AppColors = {
    // Primary palette
    primary: {
      main: '#007AFF',
      light: '#4DA3FF',
      dark: '#0055B3',
      contrast: '#FFFFFF'
    },
    // Secondary palette
    secondary: {
      main: '#5856D6',
      light: '#7A79E0',
      dark: '#3E3BA3',
      contrast: '#FFFFFF'
    },
    // Semantic colors
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    // Grayscale
    gray: {
      50: '#F9F9F9',
      100: '#EFEFEF',
      200: '#E4E4E4',
      300: '#D3D3D3',
      400: '#B8B8B8',
      500: '#999999',
      600: '#666666',
      700: '#444444',
      800: '#2D2D2D',
      900: '#1A1A1A'
    },
    // Common
    background: '#FFFFFF',
    text: '#000000',
    border: '#E4E4E4'
  } as const;
  
  export const AppSpacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
  } as const;
  
  export const AppRadius = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 9999
  } as const;
  
  export const AppTypography = {
    h1: {
      fontSize: 32,
      lineHeight: 40,
      fontWeight: '700'
    },
    h2: {
      fontSize: 28,
      lineHeight: 36,
      fontWeight: '700'
    },
    h3: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: '600'
    },
    body1: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '400',
    },
    body2: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '400'
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '400'
    }
  } as const;