/**
 * Root navigation — Hub + Editor.
 */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HubScreen} from '@/hub/HubScreen';
import {EditorScreen} from '@/editor/EditorScreen';

export type RootStackParamList = {
  Hub: undefined;
  Editor: {projectId: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: '#0B0B12'},
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Hub" component={HubScreen} />
      <Stack.Screen
        name="Editor"
        component={EditorScreen}
        options={{animation: 'slide_from_bottom'}}
      />
    </Stack.Navigator>
  );
}
