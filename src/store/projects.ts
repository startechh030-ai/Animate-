/**
 * Project store (zustand).
 *
 * Phase 0 keeps data in memory with mock projects. Phase 1 swaps the
 * persistence layer (MMKV/SQLite) behind the same actions — the hub code
 * won't change.
 */
import {create} from 'zustand';
import type {NewProjectInput, Project} from '@/core/types';
import {untitledName} from '@/utils/format';

interface ProjectsState {
  projects: Project[];
  addProject: (input: NewProjectInput) => Project;
  renameProject: (id: string, name: string) => void;
  duplicateProject: (id: string) => void;
  deleteProject: (id: string) => void;
}

let nextId = 100;

const HOUR = 3_600_000;
const DAY = 24 * HOUR;

function makeProject(
  id: string,
  name: string,
  kind: Project['kind'],
  durationSec: number,
  aspect: Project['aspect'],
  updatedAgo: number,
): Project {
  const now = Date.now();
  return {
    id,
    name,
    kind,
    durationSec,
    aspect,
    createdAt: now - updatedAgo - 5 * DAY,
    updatedAt: now - updatedAgo,
    hasThumbnail: false,
  };
}

const initialProjects: Project[] = [
  makeProject('p1', 'Trip montage', 'video', 150, '16:9', 2 * HOUR),
  makeProject('p2', 'Product spin', 'scene3d', 0, '1:1', 5 * HOUR),
  makeProject('p3', 'Reel — new drop', 'video', 45, '9:16', 26 * HOUR),
  makeProject('p4', 'Portfolio hero', 'interactive', 0, '16:9', 3 * DAY),
  makeProject('p5', 'Logo sting', 'scene3d', 0, '16:9', 6 * DAY),
];

export const useProjects = create<ProjectsState>(set => ({
  projects: initialProjects,

  addProject: input => {
    const project: Project = {
      id: `p${nextId++}`,
      name: input.name.trim() || 'Untitled',
      kind: input.kind,
      durationSec: input.kind === 'video' ? 0 : 0,
      aspect: input.aspect,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      hasThumbnail: false,
    };
    set(state => ({projects: [project, ...state.projects]}));
    return project;
  },

  renameProject: (id, name) =>
    set(state => ({
      projects: state.projects.map(p =>
        p.id === id ? {...p, name: name.trim() || p.name, updatedAt: Date.now()} : p,
      ),
    })),

  duplicateProject: id =>
    set(state => {
      const source = state.projects.find(p => p.id === id);
      if (!source) {
        return state;
      }
      const existing = new Set(state.projects.map(p => p.name));
      const copy: Project = {
        ...source,
        id: `p${nextId++}`,
        name: untitledName(`${source.name} (copy)`, existing),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      const index = state.projects.findIndex(p => p.id === id);
      const projects = [...state.projects];
      projects.splice(index + 1, 0, copy);
      return {projects};
    }),

  deleteProject: id =>
    set(state => ({
      projects: state.projects.filter(p => p.id !== id),
    })),
}));

/** Sorted-by-recent view helper (store stays insertion-ordered for cheap writes). */
export function byRecent(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => b.updatedAt - a.updatedAt);
}
