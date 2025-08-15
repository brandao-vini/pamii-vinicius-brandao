import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
      }}>
      <Tabs.Screen
        name="index" 
        options={{
          title: 'VPN',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="shield-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile" // Refere-se ao arquivo profile.tsx
        options={{
    title: 'Servidores',
    tabBarIcon: ({ color }) => <Ionicons size={28} name="server-outline" color={color} />,
      }}
    />

      <Tabs.Screen
        name="explore" 
        options={{
          title: 'Sobre', 
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="information-circle-outline" color={color} /> 
          ),
        }}
      />
    </Tabs>
  );
}