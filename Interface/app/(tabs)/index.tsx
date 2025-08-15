import React from 'react';
import { View, StyleSheet, Text, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router'; // Importamos useRouter para navegação programática
import InfoCard from '../../components/Welcome'; // O caminho agora aponta para o nosso InfoCard

export default function HomeScreen() {
  const router = useRouter(); // Hook para controlar a navegação

  const handleActivatePress = () => {
    // Navega para a segunda aba (onde está a tela de conexão da VPN)
    router.push('/profile'); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Proteja sua Conexão</Text>
        <Text style={styles.headerSubtitle}>
          Uma VPN cria um túnel seguro para sua navegação, garantindo privacidade e liberdade online.
        </Text>

        {/* Usando nosso novo componente InfoCard várias vezes */}
        <InfoCard
          iconName="lock-closed-outline"
          title="Privacidade Total"
          description="Navegue sem deixar rastros. Sua atividade online é criptografada."
        />
        <InfoCard
          iconName="earth-outline"
          title="Acesso Global"
          description="Acesse conteúdos e serviços de qualquer lugar do mundo."
        />
        <InfoCard
          iconName="wifi-outline"
          title="Segurança em Wi-Fi Público"
          description="Proteja-se contra hackers em redes de cafés, aeroportos e hotéis."
        />
        
        {/* Espaçador para empurrar o botão para baixo */}
        <View style={styles.spacer} />

        <Pressable style={styles.button} onPress={handleActivatePress}>
          <Text style={styles.buttonText}>ATIVAR PROTEÇÃO</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  spacer: {
    flex: 1, // Ocupa todo o espaço vertical disponível
  },
  button: {
    width: '100%',
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});