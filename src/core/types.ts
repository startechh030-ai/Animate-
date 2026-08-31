/**
 * Animate-LR core domain types.
 *
 * Shared across the hub, the editors and (later) the .alr scene format.
 * Keep this file dependency-free — it is the contract for the whole app.
 */

/** The three flavors of project the suite supports. */
export type ProjectKind = 'video' | 'scene3d' | 'interactive';

/** Aspect ratios available to video / interactive projects. */
export type AspectRatio = '16:9' | '9:16' | '1:1';

export interface Project {
  id: string;
  name: string;
  kind: ProjectKind;
  /** Total duration in seconds. 0 while uncomputed (3D / interactive scenes). */
  durationSec: number;
  aspect: AspectRatio;
  createdAt: number;
  updatedAt: number;
  /** True once a real thumbnail has been captured (Phase 1). */
  hasThumbnail: boolean;
}

export interface NewProjectInput {
  name: string;
  kind: ProjectKind;
  aspect: AspectRatio;
}

export const PROJECT_KINDS: ReadonlyArray<ProjectKind> = [
  'video',
  'scene3d',
  'interactive',
];

export const ASPECT_RATIOS: ReadonlyArray<AspectRatio> = [
  '16:9',
  '9:16',
  '1:1',
];

export function kindLabel(kind: ProjectKind): string {
  switch (kind) {
    case 'video':
      return 'Video';
    case 'scene3d':
      return '3D Scene';
    case 'interactive':
      return 'Interactive';
  }
}
