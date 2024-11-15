import { AppColors, AppSpacing, AppRadius, AppTypography } from '@/constants/AppTheme';

export type Theme = {
  colors: typeof AppColors;
  spacing: typeof AppSpacing;
  radius: typeof AppRadius;
  typography: typeof AppTypography;
};

export const theme: Theme = {
  colors: AppColors,
  spacing: AppSpacing,
  radius: AppRadius,
  typography: AppTypography,
} as const;

export const useAppTheme = () => {
  return theme;
};