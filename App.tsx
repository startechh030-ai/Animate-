/**
 * Animate-LR — the lite video / 3D / interactive editor.
 * Phase 0: hub shell, navigation, design system, CI.
 */
import React from 'react';
import {StatusBar} from 'react-native';
import {
  DarkTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootNavigator} from '@/navigation/RootNavigator';
import {colors} from '@/theme/tokens';

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.bg,
    card: colors.surface,
    border: colors.border,
    text: colors.text,
    primary: colors.primary,
    notification: colors.primary,
  },
};

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={theme}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.bg}
        />
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
