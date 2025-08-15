import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const APP_VERSION = '1.0.0';
const LAST_UPDATE = '15 de Agosto de 2025';

const UPDATES = [
  { id: '1', text: 'Interface de conexão de VPN redesenhada.' },
  { id: '2', text: 'Adicionada lista de servidores internacionais.' },
  { id: '3', text: 'Nova tela inicial com benefícios da VPN.' },
  { id: '4', text: 'Correções de performance e estabilidade.' },
];

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Ionicons name="shield-checkmark-outline" size={60} color="#007AFF" />
          <Text style={styles.headerTitle}>VPN Segura</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Versão do Aplicativo</Text>
          <Text style={styles.versionText}>
            Versão {APP_VERSION}
          </Text>
          <Text style={styles.updateDate}>
            Última atualização: {LAST_UPDATE}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Novidades da Versão</Text>
          {UPDATES.map((update) => (
            <View key={update.id} style={styles.updateItem}>
              <Ionicons name="checkmark-circle-outline" size={20} color="#4CAF50" />
              <Text style={styles.updateItemText}>{update.text}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footerText}>
          Desenvolvido com ❤️ por vinizinhoo e anna.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  container: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  versionText: {
    fontSize: 16,
    color: '#333',
  },
  updateDate: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  updateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  updateItemText: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1, 
  },
  footerText: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
});