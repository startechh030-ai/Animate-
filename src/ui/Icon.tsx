/**
 * Inline SVG icon set (feather-style, stroke based).
 *
 * Zero external font/icon dependencies — every glyph is a handful of paths,
 * which keeps the bundle tiny and renders identically on Android & Windows.
 * Stroke props are applied per-primitive via spread (no cloneElement tricks).
 */
import React, {memo} from 'react';
import Svg, {Circle, Line, Path, Rect} from 'react-native-svg';
import {colors} from '@/theme/tokens';

export type IconName =
  | 'search'
  | 'plus'
  | 'film'
  | 'cube'
  | 'sparkle'
  | 'more'
  | 'trash'
  | 'pencil'
  | 'copy'
  | 'export'
  | 'clock'
  | 'x'
  | 'check'
  | 'grid'
  | 'bookmark'
  | 'play'
  | 'user'
  | 'chevronLeft';

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

interface Stroke {
  stroke: string;
  strokeWidth: number;
  strokeLinecap: 'round';
  strokeLinejoin: 'round';
}

const glyph: Record<IconName, (s: Stroke) => React.ReactElement> = {
  search: s => (
    <>
      <Circle cx="11" cy="11" r="7.5" fill="none" {...s} />
      <Line x1="21" y1="21" x2="16.2" y2="16.2" {...s} />
    </>
  ),
  plus: s => (
    <>
      <Line x1="12" y1="4.5" x2="12" y2="19.5" {...s} />
      <Line x1="4.5" y1="12" x2="19.5" y2="12" {...s} />
    </>
  ),
  film: s => (
    <>
      <Rect x="2.5" y="2.5" width="19" height="19" rx="2.5" fill="none" {...s} />
      <Line x1="7" y1="2.5" x2="7" y2="21.5" {...s} />
      <Line x1="17" y1="2.5" x2="17" y2="21.5" {...s} />
      <Line x1="2.5" y1="12" x2="21.5" y2="12" {...s} />
      <Line x1="2.5" y1="7" x2="7" y2="7" {...s} />
      <Line x1="2.5" y1="17" x2="7" y2="17" {...s} />
      <Line x1="17" y1="7" x2="21.5" y2="7" {...s} />
      <Line x1="17" y1="17" x2="21.5" y2="17" {...s} />
    </>
  ),
  cube: s => (
    <>
      <Path d="M12 2.5 21 7v10l-9 4.5L3 17V7l9-4.5z" fill="none" {...s} />
      <Path d="M3 7l9 4.5L21 7" fill="none" {...s} />
      <Path d="M12 11.5v10" fill="none" {...s} />
      <Path d="M7.5 4.75l9 4.5" fill="none" {...s} />
    </>
  ),
  sparkle: s => (
    <Path
      d="M12 2.5l2.1 6.4 6.4 2.1-6.4 2.1L12 19.5l-2.1-6.4-6.4-2.1 6.4-2.1L12 2.5z"
      fill="none"
      {...s}
    />
  ),
  more: s => (
    <>
      <Circle cx="12" cy="5" r="1.4" fill={s.stroke} />
      <Circle cx="12" cy="12" r="1.4" fill={s.stroke} />
      <Circle cx="12" cy="19" r="1.4" fill={s.stroke} />
    </>
  ),
  trash: s => (
    <>
      <Path d="M3.5 6h17" fill="none" {...s} />
      <Path d="M8.5 6V4.5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2V6" fill="none" {...s} />
      <Path
        d="M19 6v13.5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"
        fill="none"
        {...s}
      />
      <Line x1="10" y1="10" x2="10" y2="18" {...s} />
      <Line x1="14" y1="10" x2="14" y2="18" {...s} />
    </>
  ),
  pencil: s => (
    <Path
      d="M16.8 3.2a2.6 2.6 0 0 1 3.7 3.7L7.5 19.9 2.5 21l1.1-5L16.8 3.2z"
      fill="none"
      {...s}
    />
  ),
  copy: s => (
    <>
      <Rect x="9" y="9" width="12.5" height="12.5" rx="2" fill="none" {...s} />
      <Path
        d="M5.5 15H4.5a2 2 0 0 1-2-2V4.5a2 2 0 0 1 2-2H13a2 2 0 0 1 2 2v1"
        fill="none"
        {...s}
      />
    </>
  ),
  export: s => (
    <>
      <Path
        d="M4 12.5V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6.5"
        fill="none"
        {...s}
      />
      <Path d="M16 6l-4-4-4 4" fill="none" {...s} />
      <Line x1="12" y1="2" x2="12" y2="14.5" {...s} />
    </>
  ),
  clock: s => (
    <>
      <Circle cx="12" cy="12" r="9.5" fill="none" {...s} />
      <Path d="M12 6.5V12l3.5 2" fill="none" {...s} />
    </>
  ),
  x: s => (
    <>
      <Line x1="18" y1="6" x2="6" y2="18" {...s} />
      <Line x1="6" y1="6" x2="18" y2="18" {...s} />
    </>
  ),
  check: s => <Path d="M20 6.5L9.5 17 4 11.5" fill="none" {...s} />,
  grid: s => (
    <>
      <Rect x="3" y="3" width="7.5" height="7.5" rx="1.5" fill="none" {...s} />
      <Rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" fill="none" {...s} />
      <Rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" fill="none" {...s} />
      <Rect
        x="13.5"
        y="13.5"
        width="7.5"
        height="7.5"
        rx="1.5"
        fill="none"
        {...s}
      />
    </>
  ),
  bookmark: s => (
    <Path
      d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"
      fill="none"
      {...s}
    />
  ),
  play: s => <Path d="M6.5 4l13 8-13 8V4z" fill="none" {...s} />,
  user: s => (
    <>
      <Circle cx="12" cy="8" r="4" fill="none" {...s} />
      <Path d="M4.5 21a7.5 7.5 0 0 1 15 0" fill="none" {...s} />
    </>
  ),
  chevronLeft: s => <Path d="M15 4.5L7.5 12l7.5 7.5" fill="none" {...s} />,
};

function IconBase({
  name,
  size = 22,
  color = colors.text,
  strokeWidth = 2,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {glyph[name]({
        stroke: color,
        strokeWidth,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      })}
    </Svg>
  );
}

export const Icon = memo(IconBase);
