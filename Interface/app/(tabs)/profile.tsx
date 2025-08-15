import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


type Server = {
  id: number;
  name: string;
  location: string;
  ip: string;
};


const SERVERS: Server[] = [
  { id: 1, name: 'Brasil', location: 'São Paulo', ip: '192.168.1.1' },
  { id: 2, name: 'EUA', location: 'New York', ip: '10.0.0.1' },
  { id: 3, name: 'Japão', location: 'Tóquio', ip: '172.16.0.1' },
  { id: 4, name: 'Alemanha', location: 'Frankfurt', ip: '203.0.113.1' },
  { id: 5, name: 'Reino Unido', location: 'Londres', ip: '198.51.100.1' },
];

export default function ProfileScreen() {
 
  const [isConnected, setIsConnected] = useState(false);
  const [selectedServer, setSelectedServer] = useState<Server>(SERVERS[0]);

  const handleConnectToggle = () => {
    setIsConnected(!isConnected);
  };

  const handleSelectServer = (server: Server) => {
    setSelectedServer(server);
    if (isConnected) {
      setIsConnected(false); 
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* -- Seção de Status e Botão Principal -- */}
        <View style={styles.statusContainer}>
          <Text style={[styles.statusText, { color: isConnected ? '#4CAF50' : '#F44336' }]}>
            {isConnected ? 'Conectado' : 'Desconectado'}
          </Text>
          <Ionicons name={isConnected ? "shield-checkmark" : "shield-outline"} size={80} color={isConnected ? '#4CAF50' : '#333'} />
          <Pressable
            onPress={handleConnectToggle}
            style={[styles.connectButton, { backgroundColor: isConnected ? '#F44336' : '#4CAF50' }]}
          >
            <Text style={styles.connectButtonText}>{isConnected ? 'DESCONECTAR' : 'CONECTAR'}</Text>
          </Pressable>
        </View>

        
        <View style={styles.serverListContainer}>
          <Text style={styles.serverListTitle}>Selecionar Servidor</Text>
          <ScrollView>
            {SERVERS.map((server) => (
              <Pressable
                key={server.id}
                onPress={() => handleSelectServer(server)}
                style={[
                  styles.serverItem,
                  selectedServer.id === server.id && styles.selectedServerItem
                ]}
              >
                <View style={styles.serverInfo}>
                  <Text style={styles.serverName}>{server.name}</Text>
                  <Text style={styles.serverLocation}>{server.location}</Text>
                </View>
                {selectedServer.id === server.id && (
                  <Ionicons name="checkmark-circle" size={24} color="#007AFF" />
                )}
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  statusContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  connectButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  serverListContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
  },
  serverListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    padding: 10,
    textAlign: 'center',
  },
  serverItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedServerItem: {
    backgroundColor: '#e6f2ff',
    borderRadius: 8,
  },
  serverInfo: {},
  serverName: {
    fontSize: 16,
    fontWeight: '500',
  },
  serverLocation: {
    fontSize: 14,
    color: 'gray',
  },
});