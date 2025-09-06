import { useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    Alert, 
    ActivityIndicator 
} from "react-native";
import { isAxiosError } from "axios";
import { useRouter } from "expo-router"; // Importando o hook de navegação

import { api } from "@/server/api";

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Inicialize o hook de navegação do Expo Router
    const router = useRouter(); 

    async function handleSignIn() {
        // 1. Verificação inicial: Valida se os campos não estão vazios
        if (!email.trim() || !password.trim()) {
            return Alert.alert("Atenção", "Por favor, preencha todos os campos.");
        }

        // 2. Controle de carregamento: Evita múltiplos cliques
        if (isLoading) return;
        setIsLoading(true);

        try {
            // 3. Requisição à API para login
            const response = await api.post("/user", { email, password });
            
            // 4. Sucesso: Limpa os campos e navega para a próxima tela
            setEmail("");
            setPassword("");

            Alert.alert("Sucesso!", "Olá " + response.data.name);

            // 5. Navegação: Redireciona o usuário para a tela /home
            // Certifique-se de que você tem um arquivo chamado home.tsx dentro da pasta app/
            router.push("/home"); 

        } catch (error) {
            // 6. Tratamento de erro: Exibe um alerta com base na resposta da API
            console.error("Erro na requisição:", error); // Adicionei console.error para melhor visibilidade

            if (isAxiosError(error)) {
                return Alert.alert("Erro", error.response?.data?.message || "Ocorreu um erro no servidor.");
            }
            Alert.alert("Erro", "Não foi possível entrar. Verifique sua conexão.");

        } finally {
            // 7. Finalização: Oculta o indicador de carregamento, com sucesso ou falha
            setIsLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                onChangeText={setEmail}
                value={email}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#ddd"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
                placeholderTextColor="#ddd"
            />
            <TouchableOpacity 
                style={styles.button} 
                onPress={handleSignIn}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.text}>Entrar</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
        gap: 16,
        backgroundColor: '#000000ff' // Exemplo de cor de fundo
    },
    input: {
        height: 54,
        width: "100%",
        backgroundColor: "#b319daff",
        borderRadius: 5,
        padding: 16,
        color: "#000000ff",
    },
    button: {
        height: 54,
        width: "100%",
        backgroundColor: "#1e0436ff",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000000ff",
    },
});