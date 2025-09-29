# pamii-vinicius-brandao
Aulas de Programação de Aplicativos Mobile II ministradas pelo prof João Siles

-------------------------

# Documentação do Projeto React Native - Expo-Api-Routes

Este documento descreve as principais funcionalidades e a estrutura técnica do projeto de aplicativo móvel desenvolvido em React Native com Expo. O projeto consiste em uma tela de login simples que se comunica com uma API externa para autenticação de usuários.

## 1. Tecnologias Utilizadas

-   **React Native**: Framework para desenvolvimento de aplicativos móveis multiplataforma.
    
-   **Expo**: Plataforma e conjunto de ferramentas para simplificar o desenvolvimento em React Native.
    
-   **Expo Router**: Biblioteca para navegação baseada em arquivos, gerenciando as rotas do aplicativo.
    
-   **Axios**: Cliente HTTP para fazer requisições à API.
    
-   **React (`useState`)**: Gerenciamento de estado para os campos do formulário e o estado de carregamento.
    

----------

## 2. Estrutura do Projeto

A estrutura principal do projeto segue a convenção de rotas do Expo Router.

```
/
├── app/
│   ├── index.tsx         # Tela principal de login.
│   └── home.tsx          # Tela de destino após o login.
├── src/
│   └── server/
│       └── api.ts        # Configuração do cliente Axios para a API.
├── package.json          # Lista de dependências e scripts do projeto.
├── babel.config.js       # Configuração do Babel.
└── ...

```

----------

## 3. Principais Funcionalidades

### 3.1. Tela de Login (`app/index.tsx`)

Esta é a tela inicial do aplicativo, responsável por capturar as credenciais do usuário e iniciar o processo de autenticação.

-   **Componentes UI**: Utiliza componentes nativos do React Native como `View`, `TextInput`, `TouchableOpacity` e `Text` para a construção da interface.
    
-   **Gerenciamento de Estado**: As credenciais do usuário (`email`, `password`) são gerenciadas por `useState`. Um estado adicional (`isLoading`) controla o estado de carregamento do botão "Entrar", desativando-o para evitar múltiplos cliques e exibindo um `ActivityIndicator`.
    
-   **Validação de Formulário**: Uma validação básica verifica se os campos de email e senha estão preenchidos antes de enviar a requisição.
    

### 3.2. Comunicação com a API

A comunicação com o backend é feita através da função assíncrona `handleSignIn`.

-   **Função `handleSignIn`**:
    
    -   Faz uma requisição `POST` para a rota `/user` da API.
        
    -   O corpo da requisição envia o email e a senha do formulário.
        
    -   O bloco `try...catch` trata o sucesso e a falha da requisição.
        
-   **Configuração do Axios (`src/server/api.ts`)**:
    
    -   É crucial configurar a `baseURL` do Axios para o endereço correto da API.
        
    -   **Importante**: Emuladores e dispositivos físicos não podem acessar `localhost`. A URL deve ser o endereço IP da sua máquina na rede local (ex: `http://192.168.1.10:3000`).
        

### 3.3. Navegação (`expo-router`)

Após a autenticação bem-sucedida, o aplicativo navega para a tela `home.tsx`.

-   **Hook `useRouter`**: O hook `useRouter` do Expo Router é importado para permitir a navegação programática.
    
-   **Método `router.push()`**: Após a resposta de sucesso da API, a função `router.push("/home")` é chamada para redirecionar o usuário para a rota `/home`, que corresponde ao arquivo `app/home.tsx`.
    

----------

## 4. Instruções para Execução

Siga os passos abaixo para rodar o projeto em sua máquina.

### 4.1. Pré-requisitos

-   **Node.js** e **npm** instalados.
    
-   **Expo CLI** instalado. Se não tiver, use: `npm install -g expo-cli`.
    
-   **Android Studio** instalado e o Android SDK configurado.
    

### 4.2. Configuração do Ambiente

1.  **Configure o Android SDK**: Garanta que as variáveis de ambiente `ANDROID_HOME` e o `Path` (incluindo a pasta `platform-tools`) estejam configuradas corretamente no seu sistema operacional.
    
2.  **Instale as dependências**: Na raiz do projeto, execute:
    
    Bash
    
    ```
    npm install
    
    ```
    
3.  **Configure a API**: No arquivo `src/server/api.ts`, altere o `baseURL` com o endereço IP da sua máquina e a porta do seu backend.
    
    JavaScript
    
    ```
    baseURL: 'http://<SEU_IP_AQUI>:<PORTA_DO_BACKEND>',
    
    ```
    

### 4.3. Como Rodar o Projeto

Execute o comando abaixo na raiz do projeto:

Bash

```
npx expo start

```

Isso iniciará o servidor de desenvolvimento. Você pode então escolher entre as seguintes opções:

-   Aperte `a` para abrir no emulador Android.
    
-   Aperte `w` para abrir no navegador (modo web).
    
-   Escaneie o QR Code com o aplicativo Expo Go no seu celular físico.
    

----------

## 5. Notas de Depuração

Se você encontrar problemas, verifique os seguintes pontos que foram identificados e corrigidos durante o desenvolvimento:

-   **Erro `adb` não encontrado**: Significa que as variáveis de ambiente do SDK Android não estão configuradas. Revise a seção de configuração do ambiente.
    
-   **Botão carrega mas não navega**: A requisição à API está falhando. Verifique o console de depuração (abra com `Debug Remote JS`) para ver a mensagem de erro da API. O problema mais comum é a URL da API estar incorreta.
    
-   **`Invalid prop 'style' supplied to 'React.Fragment'`**: Este erro indica que a propriedade `style` foi aplicada a um `<React.Fragment>`. Lembre-se de que Fragments não aceitam estilos; use um `<View>` em vez disso.
  