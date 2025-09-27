import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Image, // 1. Importa o componente Image
} from 'react-native';
// Importa a biblioteca de ícones
import { Ionicons } from '@expo/vector-icons';

// --- Tipos de Dados ---
// Define a estrutura de um item de servidor
type Server = {
  id: string;
  country: string;
  city: string;
};

// --- Dados dos Servidores ---
// Lista de servidores a ser exibida na tela
const SERVERS_DATA: Server[] = [
  { id: '1', country: 'Brasil', city: 'São Paulo' },
  { id: '2', country: 'EUA', city: 'New York' },
  { id: '3', country: 'Japão', city: 'Tóquio' },
  { id: '4', country: 'Alemanha', city: 'Frankfurt' },
  { id: '5', country: 'Reino Unido', city: 'Londres' },
];

// --- Componente Principal ---
const VpnScreen = () => {
  // Estado para controlar qual servidor está selecionado
  const [selectedServer, setSelectedServer] = useState<string>('1'); // ID '1' é o Brasil, pré-selecionado

  // Componente para renderizar cada item da lista de servidores
  const ServerItem = ({ item }: { item: Server }) => {
    const isSelected = item.id === selectedServer;
    return (
      <TouchableOpacity
        style={[styles.serverItem, isSelected && styles.serverItemSelected]}
        onPress={() => setSelectedServer(item.id)}
        accessibilityLabel={`Selecionar servidor. País: ${item.country}. Cidade: ${item.city}.`}
        accessibilityState={{ selected: isSelected }}
      >
        <View>
          <Text style={styles.serverCountry}>{item.country}</Text>
          <Text style={styles.serverCity}>{item.city}</Text>
        </View>
        {isSelected && (
          <Ionicons name="checkmark-circle" size={24} color="#007AFF" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* 1. Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Servidores</Text>
      </View>

      {/* 2. Status da Conexão */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>Desconectado</Text>
        
        {/* 2. Adiciona a imagem do escudo com o caminho corrigido */}
        <Image
          source={require('../assets/images/pngwing.com.png')}
          style={styles.shieldIcon}
        />

        <TouchableOpacity style={styles.connectButton} accessibilityLabel="Conectar VPN">
          <Text style={styles.connectButtonText}>CONECTAR</Text>
        </TouchableOpacity>
      </View>

      {/* 3. Seleção de Servidor */}
      <View style={styles.serverListContainer}>
        <Text style={styles.sectionTitle}>Selecionar Servidor</Text>
        <FlatList
          data={SERVERS_DATA}
          renderItem={({ item }) => <ServerItem item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        />
      </View>

      {/* 4. Menu de Navegação Inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} accessibilityLabel="Ir para tela VPN">
          <Ionicons name="shield-outline" size={24} color="#8E8E93" />
          <Text style={styles.navText}>VPN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.navButton, styles.navButtonActive]} accessibilityLabel="Tela atual: Servidores">
          <Ionicons name="server" size={24} color="#007AFF" />
          <Text style={[styles.navText, styles.navTextActive]}>Servidores</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton} accessibilityLabel="Ir para tela Sobre">
          <Ionicons name="information-circle-outline" size={24} color="#8E8E93" />
          <Text style={styles.navText}>Sobre</Text>
        </TouchableOpacity>
      </View>

      {/* 5. Informação de Ambiente de Desenvolvimento */}
      <View style={styles.devInfoContainer}>
        <Text style={styles.devInfoText}>localhost:8001/profile</Text>
      </View>
    </SafeAreaView>
  );
};

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Um cinza bem claro para o fundo
  },
  header: {
    padding: 20,
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  statusContainer: {
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#D93B3B', // Vermelho para status desconectado
  },
  // 3. Adiciona o estilo para a imagem
  shieldIcon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginVertical: 20, // Espaçamento vertical
  },
  connectButton: {
    backgroundColor: '#34C759', // Verde para o botão de conectar
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 50,
  },
  connectButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  serverListContainer: {
    flex: 1,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6C6C70',
    paddingHorizontal: 20,
    marginBottom: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E5EA',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF'
  },
  serverItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#E5E5EA',
  },
  serverItemSelected: {
    backgroundColor: '#EBF5FF', // Azul claro para o item selecionado
  },
  serverCountry: {
    fontSize: 17,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  serverCity: {
    fontSize: 15,
    color: '#8E8E93',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#C6C6C8',
    backgroundColor: '#F8F9FA',
  },
  navButton: {
    alignItems: 'center',
    paddingBottom: 5,
  },
  navButtonActive: {
    // Estilos para o botão ativo, se necessário
  },
  navText: {
    fontSize: 10,
    color: '#8E8E93',
  },
  navTextActive: {
    color: '#007AFF', // Azul para o texto do ícone ativo
  },
  devInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderTopRightRadius: 4,
  },
  devInfoText: {
    color: '#FFFFFF',
    fontSize: 9,
  },
});

export default VpnScreen;