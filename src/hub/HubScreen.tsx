/**
 * Hub — the launcher/home screen (CapCut-style).
 *
 * Performance notes:
 * - FlatList with 2 columns and memoized cells.
 * - zustand selector subscriptions keep re-renders surgical.
 * - All styling is static StyleSheet IDs (no inline object churn in render).
 */
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {NewProjectInput, Project} from '@/core/types';
import {byRecent, useProjects} from '@/store/projects';
import {EmptyState} from '@/hub/EmptyState';
import {NewProjectSheet} from '@/hub/NewProjectSheet';
import {ProjectCard} from '@/hub/ProjectCard';
import {QuickActionsSheet} from '@/hub/QuickActionsSheet';
import {Button} from '@/ui/Button';
import {Icon} from '@/ui/Icon';
import {colors, radius, spacing, typography} from '@/theme/tokens';
import type {RootStackParamList} from '@/navigation/RootNavigator';

type HubNav = NativeStackNavigationProp<RootStackParamList, 'Hub'>;

type TabId = 'templates' | 'projects' | 'saved';

const TABS: ReadonlyArray<{id: TabId; label: string}> = [
  {id: 'templates', label: 'Templates'},
  {id: 'projects', label: 'Projects'},
  {id: 'saved', label: 'Saved'},
];

type GridItem =
  | {type: 'new'}
  | {type: 'project'; project: Project};

export function HubScreen() {
  const navigation = useNavigation<HubNav>();
  const insets = useSafeAreaInsets();

  const projects = useProjects(s => s.projects);
  const addProject = useProjects(s => s.addProject);
  const renameProject = useProjects(s => s.renameProject);
  const duplicateProject = useProjects(s => s.duplicateProject);
  const deleteProject = useProjects(s => s.deleteProject);

  const [tab, setTab] = useState<TabId>('projects');
  const [newSheetVisible, setNewSheetVisible] = useState(false);
  const [actionsFor, setActionsFor] = useState<Project | null>(null);
  const listRef = useRef<FlatList<GridItem>>(null);

  const data = useMemo<GridItem[]>(
    () => [
      {type: 'new'},
      ...byRecent(projects).map(
        (p): GridItem => ({type: 'project', project: p}),
      ),
    ],
    [projects],
  );

  const openProject = useCallback(
    (project: Project) => {
      navigation.navigate('Editor', {projectId: project.id});
    },
    [navigation],
  );

  const createProject = useCallback(
    (input: NewProjectInput) => {
      const project = addProject(input);
      setTab('projects');
      requestAnimationFrame(() => listRef.current?.scrollToOffset({offset: 0}));
      navigation.navigate('Editor', {projectId: project.id});
    },
    [addProject, navigation],
  );

  const renderItem = useCallback(
    ({item}: {item: GridItem}) => {
      if (item.type === 'new') {
        return (
          <Pressable
            onPress={() => setNewSheetVisible(true)}
            accessibilityRole="button"
            accessibilityLabel="Create new project"
            style={({pressed}) => [styles.newTile, pressed && {opacity: 0.7}]}>
            <View style={styles.newTileIcon}>
              <Icon name="plus" size={26} color={colors.primary} strokeWidth={2.4} />
            </View>
            <Text style={styles.newTileTitle}>New Project</Text>
            <Text style={styles.newTileSub}>Video · 3D · Interactive</Text>
          </Pressable>
        );
      }
      return (
        <ProjectCard
          project={item.project}
          onPress={openProject}
          onMore={setActionsFor}
        />
      );
    },
    [openProject],
  );

  return (
    <View style={styles.screen}>
      <View
        style={[
          styles.header,
          {paddingTop: insets.top + spacing.md},
        ]}>
        <View style={styles.headerRow}>
          <Text style={styles.wordmark}>
            Animate
            <Text style={{color: colors.primary}}>·LR</Text>
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Profile"
            style={({pressed}) => [
              styles.avatar,
              pressed && {opacity: 0.8},
            ]}>
            <Icon name="user" size={20} color={colors.text} strokeWidth={1.9} />
          </Pressable>
        </View>

        <Pressable
          accessibilityRole="search"
          style={({pressed}) => [
            styles.searchPill,
            pressed && {opacity: 0.8},
          ]}>
          <Icon name="search" size={18} color={colors.textMuted} strokeWidth={2} />
          <Text style={styles.searchText}>Search projects</Text>
        </Pressable>

        <View style={styles.tabs}>
          {TABS.map(t => {
            const active = tab === t.id;
            return (
              <Pressable
                key={t.id}
                onPress={() => setTab(t.id)}
                accessibilityRole="tab"
                accessibilityState={{selected: active}}
                style={styles.tab}>
                <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
                  {t.label}
                </Text>
                {active ? <View style={styles.tabUnderline} /> : null}
              </Pressable>
            );
          })}
        </View>
      </View>

      {tab === 'projects' ? (
        <FlatList
          ref={listRef}
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.column}
          contentContainerStyle={styles.grid}
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      ) : tab === 'templates' ? (
        <EmptyState
          icon="grid"
          title="Templates coming soon"
          subtitle="Start-from-scratch templates for reels, 3D spins and interactive scenes land in Phase 3."
        />
      ) : (
        <EmptyState
          icon="bookmark"
          title="Nothing saved yet"
          subtitle="Save templates and assets here to reuse them across projects. Unlocks in Phase 3."
        />
      )}

      {tab === 'projects' ? (
        <View
          style={[styles.ctaWrap, {paddingBottom: insets.bottom + spacing.md}]}>
          <Button
            label="Create New Project"
            onPress={() => setNewSheetVisible(true)}
            icon={<Icon name="plus" size={19} color="#FFFFFF" strokeWidth={2.6} />}
          />
        </View>
      ) : null}

      <NewProjectSheet
        visible={newSheetVisible}
        onClose={() => setNewSheetVisible(false)}
        onCreate={createProject}
      />

      <QuickActionsSheet
        project={actionsFor}
        onClose={() => setActionsFor(null)}
        onRename={renameProject}
        onDuplicate={duplicateProject}
        onDelete={deleteProject}
      />
    </View>
  );
}

function keyExtractor(item: GridItem): string {
  return item.type === 'new' ? 'new-tile' : item.project.id;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wordmark: {
    ...typography.display,
    color: colors.text,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: radius.pill,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    height: 42,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: spacing.md,
  },
  searchText: {
    ...typography.body,
    color: colors.textFaint,
  },
  tabs: {
    flexDirection: 'row',
    marginTop: spacing.lg,
    gap: spacing.xl,
  },
  tab: {
    alignItems: 'center',
    paddingBottom: spacing.md,
  },
  tabLabel: {
    ...typography.body,
    color: colors.textMuted,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: colors.text,
    fontWeight: '800',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  grid: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: 150,
  },
  column: {
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  newTile: {
    flex: 1,
    aspectRatio: 4 / 3,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.borderStrong,
    backgroundColor: 'rgba(124, 92, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  newTileIcon: {
    width: 54,
    height: 54,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(124, 92, 255, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newTileTitle: {
    ...typography.body,
    color: colors.text,
    fontWeight: '700',
  },
  newTileSub: {
    ...typography.caption,
    color: colors.textFaint,
  },
  ctaWrap: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: 0,
    paddingTop: spacing.md,
    backgroundColor: colors.bg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
