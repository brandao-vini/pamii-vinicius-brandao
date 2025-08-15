import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function DetailsScreen() {
  return (
    <View style={styles.container}>
      {/* Este componente do Expo Router configura o cabeçalho da página */}
      <Stack.Screen options={{ title: 'Página de Detalhes' }} />
      <Text style={styles.title}>VPN ATIVADO!</Text>
      <Text style={styles.subtitle}>Você está conectado.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
  },
});