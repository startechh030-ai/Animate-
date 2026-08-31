/**
 * Phase 0 smoke test — the hub renders and store actions behave.
 */
import React from 'react';
import TestRenderer from 'react-test-renderer';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Icon glyphs are pure SVG paths — stub them so tests stay light.
jest.mock('react-native-svg', () => {
  const {View} = require('react-native');
  const Stub = (props: object) => <View {...props} testID="svg-stub" />;
  return {
    __esModule: true,
    default: Stub,
    Svg: Stub,
    Path: Stub,
    Circle: Stub,
    Line: Stub,
    Rect: Stub,
    G: Stub,
  };
});

import {HubScreen} from '@/hub/HubScreen';
import {useProjects} from '@/store/projects';
import {formatDuration, formatRelativeTime, untitledName} from '@/utils/format';

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT =
  true;

type TestStack = {Hub: undefined};

async function renderHub(): Promise<string> {
  const Stack = createNativeStackNavigator<TestStack>();
  let renderer: TestRenderer.ReactTestRenderer;
  await TestRenderer.act(async () => {
    renderer = TestRenderer.create(
      <SafeAreaProvider
        initialMetrics={{
          frame: {x: 0, y: 0, width: 390, height: 844},
          insets: {top: 47, left: 0, right: 0, bottom: 34},
        }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Hub" component={HubScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>,
    );
  });
  return JSON.stringify(renderer!.toJSON());
}

describe('HubScreen', () => {
  it('renders the wordmark, tabs and the create CTA', async () => {
    const flat = await renderHub();
    expect(flat).toContain('Animate');
    expect(flat).toContain('Templates');
    expect(flat).toContain('Projects');
    expect(flat).toContain('Saved');
    expect(flat).toContain('Create New Project');
    expect(flat).toContain('New Project');
  });

  it('renders the seeded mock projects', async () => {
    const flat = await renderHub();
    expect(flat).toContain('Trip montage');
    expect(flat).toContain('Product spin');
    expect(flat).toContain('Reel — new drop');
  });
});

describe('projects store', () => {
  beforeEach(() => {
    useProjects.setState({projects: []});
  });

  it('adds projects at the top', () => {
    const {addProject} = useProjects.getState();
    const p = addProject({name: 'My scene', kind: 'scene3d', aspect: '16:9'});
    expect(p.name).toBe('My scene');
    expect(useProjects.getState().projects[0].id).toBe(p.id);
  });

  it('renames projects and trims whitespace', () => {
    const {addProject, renameProject} = useProjects.getState();
    const p = addProject({name: 'A', kind: 'video', aspect: '9:16'});
    renameProject(p.id, '  Renamed  ');
    expect(useProjects.getState().projects[0].name).toBe('Renamed');
  });

  it('duplicates with a unique name', () => {
    const {addProject, duplicateProject} = useProjects.getState();
    const p = addProject({name: 'Original', kind: 'video', aspect: '16:9'});
    duplicateProject(p.id);
    const projects = useProjects.getState().projects;
    expect(projects).toHaveLength(2);
    expect(projects[1].name).toBe('Original (copy)');
  });

  it('deletes projects', () => {
    const {addProject, deleteProject} = useProjects.getState();
    const p = addProject({name: 'Doomed', kind: 'video', aspect: '16:9'});
    deleteProject(p.id);
    expect(useProjects.getState().projects).toHaveLength(0);
  });
});

describe('format utils', () => {
  it('formats durations', () => {
    expect(formatDuration(0)).toBe('0:00');
    expect(formatDuration(45)).toBe('0:45');
    expect(formatDuration(125)).toBe('2:05');
    expect(formatDuration(754)).toBe('12:34');
  });

  it('formats relative times', () => {
    const now = Date.now();
    expect(formatRelativeTime(now - 20_000, now)).toBe('just now');
    expect(formatRelativeTime(now - 5 * 60_000, now)).toBe('5m ago');
    expect(formatRelativeTime(now - 3 * 3_600_000, now)).toBe('3h ago');
    expect(formatRelativeTime(now - 2 * 86_400_000, now)).toBe('2d ago');
  });

  it('builds untitled names without collisions', () => {
    expect(untitledName('Untitled', new Set(['Untitled']))).toBe('Untitled 2');
    expect(untitledName('Untitled', new Set(['Untitled', 'Untitled 2']))).toBe(
      'Untitled 3',
    );
  });
});
