/**
 * Project card for the hub grid.
 * Memoized: the grid re-renders only what changed.
 */
import React, {memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import type {Project} from '@/core/types';
import {kindLabel} from '@/core/types';
import {Icon} from '@/ui/Icon';
import {colors, kindTheme, radius, spacing, typography} from '@/theme/tokens';
import {formatDuration, formatRelativeTime} from '@/utils/format';

export interface ProjectCardProps {
  project: Project;
  onPress: (project: Project) => void;
  onMore: (project: Project) => void;
}

function ProjectCardBase({project, onPress, onMore}: ProjectCardProps) {
  const theme = kindTheme[project.kind];

  return (
    <Pressable
      onPress={() => onPress(project)}
      accessibilityRole="button"
      accessibilityLabel={`${project.name}, ${kindLabel(project.kind)}`}
      style={({pressed}) => [styles.wrap, pressed && styles.pressed]}>
      <View style={[styles.thumb, {backgroundColor: theme.from}]}>
        <View style={[styles.glow, {backgroundColor: theme.to}]} />
        <View style={[styles.glow2, {backgroundColor: theme.to}]} />
        <Icon name={theme.icon} size={38} color="#FFFFFF" strokeWidth={1.6} />
        <View style={styles.kindTag}>
          <Text style={styles.kindTagText}>{theme.label}</Text>
        </View>
        {project.kind === 'video' && project.durationSec > 0 ? (
          <View style={styles.duration}>
            <Icon name="play" size={9} color="#FFFFFF" strokeWidth={2.4} />
            <Text style={styles.durationText}>
              {formatDuration(project.durationSec)}
            </Text>
          </View>
        ) : null}
        <Pressable
          onPress={() => onMore(project)}
          hitSlop={10}
          style={styles.more}
          accessibilityRole="button"
          accessibilityLabel={`More actions for ${project.name}`}>
          <Icon name="more" size={16} color="#FFFFFF" strokeWidth={2.4} />
        </Pressable>
      </View>
      <View style={styles.meta}>
        <Text style={styles.title} numberOfLines={1}>
          {project.name}
        </Text>
        <Text style={styles.sub} numberOfLines={1}>
          {formatRelativeTime(project.updatedAt)}
        </Text>
      </View>
    </Pressable>
  );
}

export const ProjectCard = memo(ProjectCardBase);

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    borderRadius: radius.lg,
  },
  pressed: {
    transform: [{scale: 0.975}],
    opacity: 0.9,
  },
  thumb: {
    aspectRatio: 4 / 3,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  glow: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 999,
    top: -46,
    right: -38,
    opacity: 0.28,
  },
  glow2: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 999,
    bottom: -52,
    left: -30,
    opacity: 0.14,
  },
  kindTag: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: 'rgba(8, 8, 16, 0.55)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  kindTagText: {
    ...typography.micro,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  duration: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(8, 8, 16, 0.66)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  durationText: {
    ...typography.micro,
    color: '#FFFFFF',
  },
  more: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
  },
  meta: {
    paddingHorizontal: 2,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  title: {
    ...typography.body,
    color: colors.text,
    fontWeight: '700',
  },
  sub: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
});
