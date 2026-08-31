/**
 * Small pill badge (durations, kind tags, chips).
 */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, radius, typography} from '@/theme/tokens';

export interface BadgeProps {
  label: string;
  color?: string;
  background?: string;
}

export function Badge({
  label,
  color = colors.text,
  background = 'rgba(10, 10, 20, 0.75)',
}: BadgeProps) {
  return (
    <View style={[styles.badge, {backgroundColor: background}]}>
      <Text style={[styles.text, {color}]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  text: {
    ...typography.micro,
    color: colors.text,
  },
});
