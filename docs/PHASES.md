# Animate-LR — Build Phases

Phase-by-phase build log. Each phase must be reviewed before the next starts.

## ✅ Phase 0 — Foundation (current)

Scaffold, design system, hub shell, CI.

- [x] React Native 0.84.1 (New Architecture / Fabric, Hermes)
- [x] react-native-windows 0.84.0 — C++/WinAppSDK template via `init-windows`
- [x] TypeScript strict + `@/` path alias
- [x] Dark & bold design tokens (`src/theme/tokens.ts`)
- [x] UI kit: Icon (inline SVG set), Button, Badge, SheetModal
- [x] Hub screen: wordmark, search pill, tabs (Templates / Projects / Saved),
      project grid with quick actions, create-project sheet
- [x] Project store (zustand) — create / rename / duplicate / delete
- [x] Editor placeholder screen (navigation pipeline proven)
- [x] GitHub Actions: Android APK + Windows MSIX artifacts, 7-day retention
- [x] Unit tests (store + formatters) that run anywhere Node runs

## 🔜 Phase 1 — Core Foundation

- [ ] Persistent storage (MMKV or SQLite) behind the store actions
- [ ] Video import via picker (+ duration probing, thumbnail generation)
- [ ] Thumbnail cache in the project grid (real frames instead of icons)
- [ ] Simple timeline: clip strip, playhead, trim handles
- [ ] Playback with react-native-video (Android native first)
- [ ] MP4 export stub / pipeline decision (ffmpeg-kit vs platform encoders)

## 🔜 Phase 2 — 3D Editor

- [ ] Render surface abstraction: `expo-gl` (Android native) vs WebView2 (Windows)
- [ ] Three.js scene bootstrap via @react-three/fiber native
- [ ] GLTF/GLB loader + scene graph panel
- [ ] Transform gizmos (position / rotation / scale) with snap-to-grid
- [ ] Keyframe timeline + easing curves (linear, ease-in/out, bezier)
- [ ] GLB export

## 🔜 Phase 2.5 — Rigged body + light physics

- [ ] GLTF skeleton support + pose mode
- [ ] Micro-physics core (see `docs/physics-spec.md`): bodies, gravity, bounce
- [ ] Material props UI: bounce / solid / magnetic / mass
- [ ] Cursor/touch force field interactions
- [ ] Spring bones for secondary motion on rigs

## 🔜 Phase 3 — Interactive features

- [ ] Gesture system (tap / swipe / drag) on scene objects
- [ ] `.alr` format (GLTF-based) read/write
- [ ] Web runner + `@helion/animatelr` npm package

## 🔜 Phase 4 — Polish & launch

- [ ] Windows parity pass (WebView2 render surface, video)
- [ ] Performance audit: startup, lists, 3D frame budget
- [ ] Docs, tutorials, store listings
