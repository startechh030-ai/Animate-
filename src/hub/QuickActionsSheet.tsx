/**
 * Per-project quick actions: rename, duplicate, export, delete.
 * Rename is inline; delete uses a two-tap confirm (no native dialogs —
 * identical behaviour on Android & Windows).
 */
import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import type {Project} from '@/core/types';
import {Button} from '@/ui/Button';
import {SheetModal, SheetRow} from '@/ui/SheetModal';
import {Icon} from '@/ui/Icon';
import {colors, radius, spacing, typography} from '@/theme/tokens';

export interface QuickActionsSheetProps {
  project: Project | null;
  onClose: () => void;
  onRename: (id: string, name: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

export function QuickActionsSheet({
  project,
  onClose,
  onRename,
  onDuplicate,
  onDelete,
}: QuickActionsSheetProps) {
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState('');
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  useEffect(() => {
    if (project) {
      setRenaming(false);
      setName(project.name);
      setConfirmingDelete(false);
    }
  }, [project]);

  if (!project) {
    return null;
  }

  function close() {
    setRenaming(false);
    setConfirmingDelete(false);
    onClose();
  }

  return (
    <SheetModal visible={project !== null} onClose={close} title={project.name}>
      {renaming ? (
        <View style={styles.renameWrap}>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            autoFocus
            selectTextOnFocus
            returnKeyType="done"
            onSubmitEditing={() => {
              onRename(project.id, name);
              setRenaming(false);
            }}
          />
          <View style={styles.renameActions}>
            <Button
              label="Cancel"
              variant="secondary"
              size="sm"
              onPress={() => setRenaming(false)}
              style={styles.renameBtn}
            />
            <Button
              label="Save"
              size="sm"
              onPress={() => {
                onRename(project.id, name);
                setRenaming(false);
              }}
              style={styles.renameBtn}
            />
          </View>
        </View>
      ) : (
        <View>
          <SheetRow
            icon={<Icon name="pencil" size={19} color={colors.text} strokeWidth={1.9} />}
            label="Rename"
            onPress={() => setRenaming(true)}
          />
          <SheetRow
            icon={<Icon name="copy" size={19} color={colors.text} strokeWidth={1.9} />}
            label="Duplicate"
            onPress={() => {
              onDuplicate(project.id);
              close();
            }}
          />
          <SheetRow
            icon={<Icon name="export" size={19} color={colors.textMuted} strokeWidth={1.9} />}
            label="Export"
            hint="MP4 · ALR · GLB — unlocks in Phase 3"
          />
          <View style={styles.divider} />
          <SheetRow
            icon={
              <Icon
                name="trash"
                size={19}
                color={confirmingDelete ? colors.danger : colors.danger}
                strokeWidth={1.9}
              />
            }
            label={confirmingDelete ? 'Tap again to confirm' : 'Delete project'}
            hint={confirmingDelete ? undefined : 'This cannot be undone'}
            danger
            onPress={() => {
              if (confirmingDelete) {
                onDelete(project.id);
                close();
              } else {
                setConfirmingDelete(true);
              }
            }}
          />
        </View>
      )}
    </SheetModal>
  );
}

const styles = StyleSheet.create({
  renameWrap: {
    gap: spacing.md,
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
  renameActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  renameBtn: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
});
