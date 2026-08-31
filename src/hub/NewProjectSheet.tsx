/**
 * "Create new project" sheet — pick type, name and aspect ratio.
 */
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import type {AspectRatio, NewProjectInput, ProjectKind} from '@/core/types';
import {kindLabel} from '@/core/types';
import {Button} from '@/ui/Button';
import {SheetModal} from '@/ui/SheetModal';
import {Icon} from '@/ui/Icon';
import {colors, kindTheme, radius, spacing, typography} from '@/theme/tokens';

const KIND_DESCRIPTIONS: Record<ProjectKind, string> = {
  video: 'Timeline editing, cuts, effects & export to MP4',
  scene3d: 'Build & animate 3D scenes with keyframes',
  interactive: 'Reactive scenes with tap, swipe & physics',
};

export function NewProjectSheet({
  visible,
  onClose,
  onCreate,
}: {
  visible: boolean;
  onClose: () => void;
  onCreate: (input: NewProjectInput) => void;
}) {
  const [kind, setKind] = useState<ProjectKind>('video');
  const [aspect, setAspect] = useState<AspectRatio>('16:9');
  const [name, setName] = useState('');

  function reset() {
    setKind('video');
    setAspect('16:9');
    setName('');
  }

  function handleCreate() {
    onCreate({name: name.trim(), kind, aspect});
    reset();
    onClose();
  }

  return (
    <SheetModal visible={visible} onClose={onClose} title="New Project">
      <Text style={styles.sectionLabel}>TYPE</Text>
      <View style={styles.kindRow}>
        {(['video', 'scene3d', 'interactive'] as const).map(k => {
          const theme = kindTheme[k];
          const selected = kind === k;
          return (
            <Pressable
              key={k}
              onPress={() => setKind(k)}
              accessibilityRole="button"
              accessibilityLabel={kindLabel(k)}
              style={[styles.kindCard, selected && styles.kindCardActive]}>
              <Icon name={theme.icon} size={24} color={selected ? colors.primary : colors.textMuted} strokeWidth={1.8} />
              <Text style={[styles.kindLabel, selected && styles.kindLabelActive]}>
                {theme.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.kindDesc}>{KIND_DESCRIPTIONS[kind]}</Text>

      <Text style={styles.sectionLabel}>NAME</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder={`${kindLabel(kind)} — untitled`}
        placeholderTextColor={colors.textFaint}
        style={styles.input}
        returnKeyType="done"
        onSubmitEditing={handleCreate}
      />

      <Text style={styles.sectionLabel}>
        {kind === 'video' ? 'ASPECT RATIO' : 'CANVAS'}
      </Text>
      <View style={styles.chipRow}>
        {(['16:9', '9:16', '1:1'] as const).map(a => {
          const selected = aspect === a;
          return (
            <Pressable
              key={a}
              onPress={() => setAspect(a)}
              accessibilityRole="button"
              accessibilityLabel={`Aspect ratio ${a}`}
              style={[styles.chip, selected && styles.chipActive]}>
              <Text style={[styles.chipText, selected && styles.chipTextActive]}>
                {a}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Button label="Create Project" onPress={handleCreate} style={{marginTop: spacing.lg}} />
    </SheetModal>
  );
}

const styles = StyleSheet.create({
  sectionLabel: {
    ...typography.micro,
    color: colors.textFaint,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  kindRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  kindCard: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  kindCardActive: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(124, 92, 255, 0.12)',
  },
  kindLabel: {
    ...typography.micro,
    color: colors.textMuted,
  },
  kindLabelActive: {
    color: colors.text,
  },
  kindDesc: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  input: {
    ...typography.body,
    color: colors.text,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    height: 48,
  },
  chipRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  chip: {
    flex: 1,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(124, 92, 255, 0.12)',
  },
  chipText: {
    ...typography.body,
    color: colors.textMuted,
    fontWeight: '700',
    fontSize: 14,
  },
  chipTextActive: {
    color: colors.text,
  },
});
