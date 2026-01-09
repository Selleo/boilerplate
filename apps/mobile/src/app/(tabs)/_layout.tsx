import { Tabs } from 'expo-router';
import React from 'react';

import { useCurrentUser } from '@/api/queries/useCurrentUser';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { data: user } = useCurrentUser();
  const isLoggedIn = !!user;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          href: isLoggedIn ? '/(tabs)/explore' : null,
        }}
      />
      <Tabs.Screen
        name="components"
        options={{
          title: 'Components',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="square.grid.2x2" color={color} />,
        }}
      />
    </Tabs>
  );
}
