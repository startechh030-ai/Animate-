/**
 * Animate-LR design tokens — "dark & bold".
 *
 * Single source of truth for the visual language. Components must pull from
 * here (never hard-code hex values) so theming stays consistent and cheap.
 */
import type {ProjectKind} from '@/core/types';

export const colors = {
  /** App background. */
  bg: '#0B0B12',
  /** Card / sheet background. */
  surface: '#14141F',
  /** Raised surface (inputs, chips, hovered cards). */
  surface2: '#1C1C2E',
  /** Hairline borders. */
  border: '#27273F',
  borderStrong: '#343452',

  /** Primary text. */
  text: '#F2F2F9',
  /** Secondary text. */
  textMuted: '#8E90AC',
  textFaint: '#5A5C74',

  /** Brand — electric violet. */
  primary: '#7C5CFF',
  primaryDeep: '#5B3FE8',
  /** Secondary accent — cyan. */
  accent: '#22D3EE',
  pink: '#FF3D81',

  success: '#34D399',
  warning: '#FBBF24',
  danger: '#F43F5E',

  /** Overlay behind sheets. */
  scrim: 'rgba(5, 5, 12, 0.72)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 22,
  pill: 999,
} as const;

export const typography = {
  display: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  h1: {fontSize: 20, fontWeight: '700', letterSpacing: -0.3},
  h2: {fontSize: 17, fontWeight: '700'},
  body: {fontSize: 15, fontWeight: '500'},
  caption: {fontSize: 12.5, fontWeight: '500'},
  micro: {fontSize: 11, fontWeight: '700', letterSpacing: 0.4},
} as const;

/** Per-kind visual identity used by thumbnails, badges and empty states. */
export interface KindTheme {
  from: string;
  to: string;
  icon: 'film' | 'cube' | 'sparkle';
  label: string;
}

export const kindTheme: Record<ProjectKind, KindTheme> = {
  video: {
    from: '#2A1B54',
    to: '#FF3D81',
    icon: 'film',
    label: 'Video',
  },
  scene3d: {
    from: '#1E2A5E',
    to: '#22D3EE',
    icon: 'cube',
    label: '3D Scene',
  },
  interactive: {
    from: '#14324A',
    to: '#34D399',
    icon: 'sparkle',
    label: 'Interactive',
  },
};
