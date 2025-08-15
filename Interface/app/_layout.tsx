import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    // O Stack principal vai gerenciar as abas e as telas modais/de detalhes
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="details" options={{ presentation: 'modal' }} />
    </Stack>
  );
}