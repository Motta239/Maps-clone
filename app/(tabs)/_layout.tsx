import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'expo-router';
import AnimatedIcon, { ICONS } from '~/components/AnimatedIcon';

export default function TabLayout() {
  const screenOptions = (name: keyof typeof ICONS) => ({
    title: name.charAt(0).toUpperCase() + name.slice(1),
    tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
      <View style={{ alignItems: 'center' }}>
        <AnimatedIcon name={name} color={color} focused={focused} />
      </View>
    ),
    headerShown: false,
  });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          borderTopWidth: 0.4,
          borderTopColor: 'gray',
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
      }}>
      <Tabs.Screen name="(explore)" options={screenOptions('explore')} />
      <Tabs.Screen name="go" options={screenOptions('go')} />
      <Tabs.Screen name="saved" options={screenOptions('saved')} />
      <Tabs.Screen name="contribute" options={screenOptions('contribute')} />
      <Tabs.Screen name="updates" options={screenOptions('updates')} />
    </Tabs>
  );
}
