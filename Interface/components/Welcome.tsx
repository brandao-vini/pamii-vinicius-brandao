import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Definindo as propriedades que o componente aceitará (props)
type InfoCardProps = {
  iconName: keyof typeof Ionicons.glyphMap; // Garante que o nome do ícone seja válido
  title: string;
  description: string;
};

// Renomeamos o componente para InfoCard para refletir sua nova função
export default function InfoCard({ iconName, title, description }: InfoCardProps) {
  return (
    <View style={styles.cardContainer}>
      <Ionicons name={iconName} size={32} color="#007AFF" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 20,
  },
  textContainer: {
    flex: 1, // Garante que o texto ocupe o espaço restante
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});