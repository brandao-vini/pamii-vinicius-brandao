import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, Platform, ActivityIndicator } from 'react-native';

// Seus detalhes de configuração do Firebase (Inalterados)
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};


// Inicializações (Inalteradas)
const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

// Componente principal
export default function App() {
  const [nomes, setNomes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nomesCollection = firebase.firestore().collection('Nomes');
        // Mantendo a ordenação pelo Nome em ordem alfabética (A-Z)
        const query = nomesCollection.orderBy('Nome', 'asc'); 
        const snapshot = await query.get();
        
        const data = [];
        snapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });

        setNomes(data);
      } catch (error) {
        console.error("Erro ao buscar dados do Firebase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.VERDE_AGUA} />
        <Text style={styles.loadingText}>Carregando Nomes...</Text>
      </View>
    );
  }

  // Componente para renderizar o item da lista
  const renderItem = ({ item, index }) => (
    <View style={[
      styles.itemContainer, 
      // Alternando entre dois tons de rosa bebê para contraste sutil
      index % 2 === 0 ? styles.itemEven : styles.itemOdd
    ]}>
      
      {/* Ícone ou Emoticon para simular o avatar/perfil */}
      <View style={styles.iconCircle}>
        <Text style={styles.iconText}>🌸</Text> {/* Mudei para uma flor para combinar com o tema fofo */}
      </View>

      <View style={styles.textWrapper}>
        <Text style={styles.nomeCompleto}>
          {item.Nome} <Text style={styles.sobrenome}>{item.Sobrenome}</Text>
        </Text>
        
        <Text style={styles.detalhe}>ID: {item.id.substring(0, 5)}...</Text>
      </View>
      
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.tituloLista}>{'< Lista Rosa & Roxo />'}</Text>
      
      {nomes.length === 0 ? (
        <View style={styles.emptyList}>
          <Text style={styles.emptyText}>Nenhuma pessoa encontrada no Firestore.</Text>
        </View>
      ) : (
        <FlatList
          data={nomes}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          style={styles.flatList}
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </View>
  );
}

// ------------------------------------
// DEFINIÇÃO DA NOVA PALETA DE CORES
// ------------------------------------
const COLORS = {
    ROXO_ESCURO: '#6A5ACD', // Slate Blue (Roxo Suave)
    ROXO_CLARO: '#9370DB',  // Medium Purple
    VERDE_AGUA: '#7FFFD4',  // Aquamarine (Acento Brilhante)
    ROSA_BEBE_CLARO: '#FBEFF8', // Quase Branco com toque rosa
    ROSA_BEBE_ESCURO: '#FFC0CB', // Pink (Rosa mais forte para contraste)
    TEXTO_ESCURO: '#333333',
};


// ------------------------------------
// ## Folha de Estilos (StyleSheet)
// ------------------------------------
const styles = StyleSheet.create({
  // Fundo e Estrutura
  container: {
    flex: 1, 
    backgroundColor: COLORS.ROXO_ESCURO, // Roxo Principal
    paddingTop: Platform.OS === 'android' ? 30 : 50,
  },

  // Indicador de Carregamento
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.ROXO_ESCURO,
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.VERDE_AGUA, // Verde Água para destaque
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Título
  tituloLista: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.VERDE_AGUA, // Verde Água (Acento Principal)
    textAlign: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.ROXO_CLARO, 
    marginHorizontal: 10,
  },

  // FlatList
  flatList: {
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  
  // Item da Lista (Card - Rosa Bebê)
  itemContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    padding: 15,
    borderRadius: 12, 
    marginBottom: 12,
    
    // Sombra para dar profundidade
    ...Platform.select({
      ios: {
        shadowColor: COLORS.TEXTO_ESCURO,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  itemEven: {
    backgroundColor: COLORS.ROSA_BEBE_CLARO, // Rosa Bebê mais claro
  },
  itemOdd: {
    backgroundColor: COLORS.ROSA_BEBE_ESCURO, // Rosa Bebê mais escuro (para contraste)
  },

  // Ícone/Avatar
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: COLORS.VERDE_AGUA, // Círculo Verde Água
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: {
    fontSize: 28, // Emoji um pouco maior
    lineHeight: 30,
    color: COLORS.ROXO_ESCURO, // Cor do ícone (Roxo)
  },

  // Textos
  textWrapper: {
    flex: 1,
  },
  nomeCompleto: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.TEXTO_ESCURO, // Texto principal escuro para contraste com o rosa
  },
  sobrenome: {
    fontWeight: '400', 
    color: COLORS.ROXO_ESCURO, // Sobrenome em Roxo para destaque
  },
  detalhe: {
    fontSize: 12,
    color: COLORS.ROXO_CLARO, // Detalhe em Roxo Claro
    marginTop: 2,
  },

  // Lista Vazia
  emptyList: {
    padding: 50,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.ROSA_BEBE_CLARO,
    fontSize: 16,
    textAlign: 'center',
  }
});