/**
 * Editor placeholder — proves the navigation pipeline end-to-end.
 * The real dual-mode editor (video timeline + 3D scene) lands in Phase 1/2.
 */
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {kindLabel} from '@/core/types';
import {useProjects} from '@/store/projects';
import {Badge} from '@/ui/Badge';
import {Icon} from '@/ui/Icon';
import {colors, kindTheme, radius, spacing, typography} from '@/theme/tokens';
import type {RootStackParamList} from '@/navigation/RootNavigator';

type EditorProps = NativeStackScreenProps<RootStackParamList, 'Editor'>;

const PHASE_NOTE = {
  video: 'The timeline editor arrives in Phase 1 — import, trim, effects & MP4 export.',
  scene3d: 'The 3D editor arrives in Phase 2 — viewport, keyframes & GLB export.',
  interactive: 'Interactive scenes arrive in Phase 3 — gestures, physics & the .alr format.',
} as const;

export function EditorScreen({navigation}: EditorProps) {
  const route = useRoute<EditorProps['route']>();
  const insets = useSafeAreaInsets();
  const project = useProjects(
    s => s.projects.find(p => p.id === route.params.projectId) ?? null,
  );

  const theme = project ? kindTheme[project.kind] : kindTheme.video;

  return (
    <View style={styles.screen}>
      <View style={[styles.topBar, {paddingTop: insets.top + spacing.md}]}>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Back to hub"
          style={({pressed}) => [styles.backBtn, pressed && {opacity: 0.7}]}>
          <Icon name="chevronLeft" size={20} color={colors.text} strokeWidth={2.2} />
          <Text style={styles.backLabel}>Hub</Text>
        </Pressable>
        <Text style={styles.title} numberOfLines={1}>
          {project?.name ?? 'Project'}
        </Text>
        <View style={styles.backBtn} />
      </View>

      <View style={styles.body}>
        <View style={[styles.heroIcon, {backgroundColor: theme.from, borderColor: theme.to}]}>
          <Icon name={theme.icon} size={44} color="#FFFFFF" strokeWidth={1.6} />
        </View>
        {project ? (
          <View style={styles.badgeRow}>
            <Badge
              label={kindLabel(project.kind)}
              color={colors.text}
              background={colors.surface2}
            />
            <Badge
              label={project.aspect}
              color={colors.textMuted}
              background={colors.surface2}
            />
          </View>
        ) : null}
        <Text style={styles.heading}>
          {project ? `${kindLabel(project.kind)} editor` : 'Editor'}
        </Text>
        <Text style={styles.note}>
          {project ? PHASE_NOTE[project.kind] : 'This project no longer exists.'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    minHeight: 38,
  },
  backLabel: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  title: {
    ...typography.h2,
    color: colors.text,
    flex: 1,
    textAlign: 'center',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
    gap: spacing.md,
  },
  heroIcon: {
    width: 96,
    height: 96,
    borderRadius: radius.xl,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  heading: {
    ...typography.h1,
    color: colors.text,
  },
  note: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
});
