# Animate·LR

**The lite video / 3D / interactive editor** — CapCut's ease-of-use meets
Cinema 4D's power, in one dark & bold cross-platform package.

Built with React Native for **Android (primary)** and **Windows**, with a
custom micro-physics layer and a GLTF-based interactive scene format (`.alr`).

---

## Stack

| Layer | Choice |
|---|---|
| Framework | React Native **0.84.1** (New Architecture / Fabric, Hermes) |
| Windows | react-native-windows **0.84.0** (C++ / WinAppSDK) |
| Language | TypeScript (strict) |
| Navigation | React Navigation 7 (native-stack) |
| State | zustand 5 |
| Icons | Inline SVG set (react-native-svg) — no font/icon deps |
| 3D *(Phase 2)* | three.js via @react-three/fiber · `expo-gl` on Android, WebView2 on Windows |
| Physics *(Phase 2.5)* | Custom micro-engine — see [`docs/physics-spec.md`](docs/physics-spec.md) |

## Getting started

```bash
npm install
npm start          # Metro
npm run android    # Android device / emulator
npm run windows    # Windows 10/11 (needs Visual Studio + WinAppSDK)
```

> **Windows toolchain:** Visual Studio 2022 with *Desktop development with C++*
> and *Windows App SDK* workloads. First `run-windows` autolinks native modules
> and opens the `.sln` for you.

## CI artifacts (GitHub Actions)

Both workflows upload build artifacts that are **kept for 7 days**:

| Workflow | Artifact | Install |
|---|---|---|
| `Android Build` | `animatelr-android-apk` | Copy to device → install (debug-signed) |
| `Windows Build` | `animatelr-windows-msix` | Enable Developer Mode → `Add-AppxPackage` |

## Project structure

```
├── .github/workflows/     # Android + Windows CI (7-day artifacts)
├── android/               # Android native project
├── windows/               # Windows native project (RNW C++ template)
├── docs/
│   ├── PHASES.md          # Phase plan + status
│   └── physics-spec.md    # Micro-physics design (bounce/solid/magnetic/cursor)
└── src/
    ├── core/              # Domain types (Project, kinds, aspects)
    ├── theme/             # Design tokens — dark & bold
    ├── ui/                # Icon, Button, Badge, SheetModal
    ├── store/             # zustand stores (projects)
    ├── navigation/        # Root navigator
    ├── hub/               # Home screen, grid, sheets
    └── editor/            # Editor screens (placeholder → Phase 1/2)
```

## Roadmap

Phase 0 ✅ (foundation + hub) → **Phase 1** (video timeline) →
**Phase 2** (3D editor) → **Phase 2.5** (rigged body + micro-physics) →
**Phase 3** (interactive `.alr` + web runner + npm package) →
**Phase 4** (polish, Windows parity, launch).

Full detail: [`docs/PHASES.md`](docs/PHASES.md).

## License

MIT — see [LICENSE](LICENSE).
