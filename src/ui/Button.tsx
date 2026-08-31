/**
 * Buttons — primary / secondary / danger / ghost, two sizes.
 * Press feedback is done with Pressable style functions (no animation lib
 * needed, fully native on both platforms).
 */
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import {colors, radius, spacing, typography} from '@/theme/tokens';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';
type Size = 'md' | 'sm';

export interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

const HEIGHTS: Record<Size, number> = {md: 50, sm: 40};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  style,
}: ButtonProps) {
  const height = HEIGHTS[size];
  const isPrimary = variant === 'primary';

  const variantStyle = isPrimary
    ? styles.primary
    : variant === 'secondary'
      ? styles.secondary
      : variant === 'danger'
        ? styles.danger
        : styles.ghost;

  const labelColor = isPrimary
    ? '#FFFFFF'
    : variant === 'danger'
      ? colors.danger
      : variant === 'ghost'
        ? colors.textMuted
        : colors.text;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{disabled, busy: loading}}
      style={({pressed}) => [
        styles.base,
        {height},
        variantStyle,
        style,
        (disabled || loading) && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}>
      {loading ? (
        <ActivityIndicator color={labelColor} size="small" />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.label,
              {color: labelColor},
              size === 'sm' && styles.labelSm,
            ]}>
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderRadius: radius.md,
    paddingHorizontal: spacing.xl,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  danger: {
    backgroundColor: 'rgba(244, 63, 94, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.35)',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    transform: [{scale: 0.97}],
    opacity: 0.85,
  },
  label: {
    ...typography.body,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  labelSm: {
    fontSize: 14,
  },
});
