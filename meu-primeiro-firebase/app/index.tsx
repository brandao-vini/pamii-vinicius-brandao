import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, Platform, ActivityIndicator } from 'react-native';

// Seus detalhes de configuração do Firebase (Inalterados)
const firebaseConfig = {
  apiKey: "AIzaSyDnr-GMj1fBAc50U7ANMLDhHqhPaZAd7SE",
  authDomain: "meu-primeiro-firebase-3f0f2.firebaseapp.com",
  projectId: "meu-primeiro-firebase-3f0f2",
  storageBucket: "meu-primeiro-firebase-3f0f2.firebasestorage.app",
  messagingSenderId: "768029100921",
  appId: "1:768029100921:web:93e1804f05b0bf125a7da8"
};

// Inicialização única e correta
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// ------------------------------------
// DEFINIÇÃO DA PALETA DE CORES (Movida para o topo, é opcional, mas ajuda na leitura)
// ------------------------------------
const COLORS = {
    ROXO_ESCURO: '#4B0082',    // Roxo Sólido (Fundo)
    VERDE_AGUA: '#00FFFF',     // Ciano/Verde Água (Acento/Destaque)
    ROSA_BEBE: '#FFC0CB',      // Rosa Bebê (Detalhes)
    BRANCO_CLARO: '#F8F8FF',   // Para textos em fundo escuro
};


// Componente principal
export default function App() {
  const [nomes, setNomes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nomesCollection = firebase.firestore().collection('Nomes');
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

  // Componente para renderizar o item da lista (Layout Linear e Limpo)
  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      
      {/* Indicador de Ordem Numerada */}
      <Text style={styles.itemIndex}>{index + 1}.</Text>

      <View style={styles.textWrapper}>
        <Text style={styles.nomeCompleto}>
          {item.Nome} <Text style={styles.sobrenome}>{item.Sobrenome}</Text>
        </Text>
        
        <Text style={styles.detalhe}>ID: {item.id.substring(0, 8)}</Text>
      </View>
      
      {/* Acento Simples */}
      <View style={styles.separatorLine} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.tituloLista}>Lista Ordenadaa</Text>
      
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
// ## Folha de Estilos (Minimalista e Limpa)
// ------------------------------------
const styles = StyleSheet.create({
  // Fundo e Estrutura
  container: {
    flex: 1, 
    backgroundColor: COLORS.ROXO_ESCURO,
    paddingTop: Platform.OS === 'android' ? 30 : 50,
  },

  // Carregamento
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.ROXO_ESCURO,
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.VERDE_AGUA,
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Título
  tituloLista: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 3,
    color: COLORS.VERDE_AGUA, // Destaque Verde Água
    textAlign: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BRANCO_CLARO, // Linha de separação discreta
    marginHorizontal: 20,
  },

  // FlatList
  flatList: {
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 20, // Padding lateral maior
    paddingBottom: 30,
  },
  
  // Item da Lista (Sem Fundo/Sombra)
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1, // Acento de Linha para separar itens
    borderBottomColor: 'rgba(255, 255, 255, 0.1)', // Linha muito sutil
  },

  // Número de Ordem (Novo)
  itemIndex: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.VERDE_AGUA, // Número em Verde Água
    width: 30, // Largura fixa para alinhamento
    textAlign: 'left',
    marginRight: 15,
  },

  // Textos
  textWrapper: {
    flex: 1,
  },
  nomeCompleto: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.BRANCO_CLARO, // Texto principal Branco
  },
  sobrenome: {
    fontWeight: '300', 
    color: COLORS.ROSA_BEBE, // Sobrenome em Rosa Bebê (Suave)
  },
  detalhe: {
    fontSize: 12,
    color: COLORS.ROSA_BEBE, // Detalhe em Rosa Bebê
    opacity: 0.8,
    marginTop: 2,
  },
  
  // Lista Vazia
  emptyList: {
    padding: 50,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.BRANCO_CLARO,
    fontSize: 16,
    textAlign: 'center',
  }
});