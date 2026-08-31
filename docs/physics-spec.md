# Animate-LR Micro-Physics — Design Spec

**Decided (Phase 0):** a tiny, custom, zero-dependency physics layer.
Simple, fast, **not** Jolt-scale 😄 — just enough to make solid objects feel
alive in interactive scenes.

## Goals

- Solid primitives: **balls** (spheres) and **cubes** (boxes)
- User-settable material properties per object
- **Cursor-based** interaction (touch / mouse acts as a force field)
- Deterministic, fixed-timestep, cheap enough for mid-range Android
- No external engine dependency — pure TypeScript module in `src/physics/`

## Body model

```ts
type BodyShape = 'sphere' | 'box';

interface Body {
  id: string;
  shape: BodyShape;
  halfExtents: Vec3;        // box: half-size; sphere: x = radius
  position: Vec3;
  velocity: Vec3;
  mass: number;             // 0 = static (immovable)
  material: MaterialProps;
  sleeping: boolean;        // skip until touched (perf)
}

interface MaterialProps {
  bounce: number;           // restitution 0..1  (ball on floor: ~0.8)
  friction: number;         // 0..1, dampens sliding
  magnetic: number;         // -1..1  attract(+)/repel(-) strength
  solid: boolean;           // collides & blocks others
}
```

## Solver loop (per fixed step, 60 Hz target)

1. Integrate gravity (`v += g * dt`, `x += v * dt`)
2. Apply cursor forces (see below)
3. Apply magnetic forces between magnetized bodies (squared-falloff, capped)
4. Collide vs. world bounds (floor/walls) — reflect with `bounce` & `friction`
5. Collide sphere↔sphere and sphere↔box (box↔box via AABB approximation)
6. Sleep bodies under a velocity epsilon

## Cursor interaction

The pointer is a configurable force field:

```ts
interface CursorField {
  position: Vec3;   // ray-cast onto the scene plane
  radius: number;   // influence radius
  mode: 'attract' | 'repel' | 'drag';
  strength: number;
}
```

- **attract / repel:** radial impulse inside radius, smooth falloff
- **drag:** nearest body inside radius follows the cursor (spring-damped)

## Integration points

- Runs inside the 3D editor's frame loop (Phase 2.5), never on the JS bridge
  more than once per frame; state lives in refs, not React state
- Physics results drive Three.js object transforms directly
- Material props are saved into `.alr` scene files

## Non-goals (explicitly)

- No mesh-mesh collision
- No constraint solver beyond simple joints (a later phase may add spring
  bones for rigged bodies — separate, lighter system)
- No Jolt/Rapier/cannon dependency unless profiling proves we need it
