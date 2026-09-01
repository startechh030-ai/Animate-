/**
 * React Native CLI configuration.
 *
 * Registers React Native for Windows CLI commands (init-windows,
 * autolink-windows, run-windows) with the community CLI.
 *
 * IMPORTANT: only loaded on Windows. The RNW CLI requires PowerShell at
 * import time, which does not exist on Linux/macOS CI runners — importing
 * it there crashes `npx @react-native-community/cli config`, which is what
 * Gradle's settings plugin runs during Android builds (exit code 1).
 */
module.exports =
  process.platform === 'win32'
    ? {commands: [require('@react-native-windows/cli')]}
    : {};
