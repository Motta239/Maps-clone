import React from 'react';
import { Stack } from 'expo-router';

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: 'Profile' }} />
      <Stack.Screen
        name="account-settings"
        options={{
          headerShown: true,
          title: 'Account Settings',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="privacy"
        options={{
          headerShown: true,
          title: 'Privacy',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          headerShown: true,
          title: 'Notifications',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="help"
        options={{
          headerShown: true,
          title: 'Help',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          headerShown: true,
          title: 'About',
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
