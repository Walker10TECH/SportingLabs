# SportingLabs W3Labs - Painel de Dados Esportivos

##  Visão Geral

O SportingLabs é uma aplicação web de página única (SPA - Single Page Application) projetada para exibir dados esportivos de forma dinâmica e interativa. Construído com HTML, CSS e JavaScript puros, o projeto consome múltiplas APIs para fornecer informações em tempo real sobre partidas de futebol e Fórmula 1, classificações, artilheiros, notícias e muito mais.

A interface é moderna, utilizando o conceito de "glassmorphism", e é totalmente responsiva, adaptando-se desde telas de smartphones ultrapequenos até monitores ultrawide.

## ✨ Funcionalidades Principais

-   **Dois Esportes Suportados:** Futebol e Fórmula 1, com navegação e visualizações específicas para cada um.
-   **Tematização Dinâmica:**
    -   **Modo Claro e Escuro:** Alternância de tema com persistência no `localStorage`.
    -   **Temas por Liga:** Cada liga de futebol possui um placar com design único, inspirado em sua identidade visual (Brasileirão, Premier League, La Liga, Champions League, etc.).
-   **Responsividade Avançada:** Layout otimizado para mais de 6 breakpoints diferentes, incluindo ajustes para modo paisagem em dispositivos móveis.
-   **Navegação Completa:**
    -   **Desktop:** Header com menus dropdown e uma barra lateral (sidebar) para navegação entre as visualizações.
    -   **Mobile:** Menu de navegação inferior fixo para acesso rápido às principais seções.
-   **Visualizações de Dados (Futebol):**
    -   **Jogos:** Exibe as partidas do dia (com um seletor de data) e um indicador de "AO VIVO".
    -   **Classificação:** Tabela de classificação completa com zonas coloridas (ex: Libertadores, Rebaixamento) e legenda.
    -   **Artilharia:** Lista dos maiores artilheiros da temporada (com seletor de ano), consumindo uma API externa.
    -   **Notícias:** Grade com as últimas notícias relacionadas à liga selecionada.
    -   **Clubes:** Grade com todos os clubes da liga e uma funcionalidade de busca na Wikipedia para ver detalhes.
-   **Visualizações de Dados (Fórmula 1):**
    -   **Calendário:** Exibe todas as corridas da temporada.
    -   **Mundial de Pilotos:** Tabela de classificação dos pilotos.
    -   **Mundial de Construtores:** Tabela de classificação das equipes.
    -   **Pilotos Históricos:** Grade de pilotos lendários com busca na Wikipedia.
-   **Interatividade:**
    -   **Modal de Partida:** Ao clicar em um jogo, um modal exibe placar, estatísticas detalhadas e uma linha do tempo com os principais eventos.
    -   **Modal de Corrida (F1):** Exibe detalhes da corrida, incluindo resultados de diferentes sessões (Treino, Qualificação, Corrida) em abas.
    -   **Busca Global:** Campo de busca no header que pesquisa jogadores e clubes em tempo real.

## 🛠️ Tecnologias e Ferramentas

-   **Frontend:**
    -   `HTML5`: Estrutura semântica do conteúdo.
    -   `CSS3`: Estilização avançada com **Variáveis CSS** para fácil tematização.
    -   `JavaScript (ES6+)`: Toda a lógica da aplicação, manipulação do DOM e requisições a APIs.
-   **Bibliotecas e Frameworks:**
    -   **Tailwind CSS (via CDN):** Utilizado para estilização rápida e responsiva através de classes utilitárias.
    -   **Lucide Icons:** Biblioteca de ícones SVG.
    -   **Flatpickr:** Componente de calendário (datepicker) leve e personalizável.
    -   **Google Fonts:** Para as fontes `Outfit`, `Chakra Petch` e `Teko`.
-   **APIs e Fontes de Dados:**
    -   **ESPN API:** Fonte principal para placares, classificações, notícias e dados de equipes de futebol e Fórmula 1.
    -   **API-SPORTS (APIFOOTBALL):** Utilizada especificamente para a busca de artilheiros.
    -   **OpenF1 API:** Utilizada para classificações de pilotos e construtores de F1.
    -   **Wikipedia API:** Utilizada para buscar e exibir informações detalhadas sobre clubes e pilotos.
    -   **Base de Dados Interna:** O objeto `PLAYER_DB_DATA` no JavaScript serve como um banco de dados local para acelerar a busca por jogadores famosos.

## 📂 Estrutura do Código (Dentro de `index.html`)

O projeto está contido em um único arquivo, dividido em três partes principais:

1.  **`<head>`:**
    -   Importação de todas as bibliotecas externas (Tailwind, Fonts, Lucide, Flatpickr).
    -   Definição de metatags para responsividade.

2.  **`<style>`:**
    -   **CSS com Variáveis (`:root`)**: O coração do sistema de temas. Define cores, fontes e outros valores para o modo escuro (padrão) e os sobrescreve na classe `.light-mode`.
    -   **Estilos Globais:** Estilos base para `body`, scrollbar, etc.
    -   **Componentes de UI:** Estilos para os componentes reutilizáveis como `.glass-panel`, `.nav-pill`, modais e loaders.
    -   **Temas de Placar (`.theme-*`)**: Classes que estilizam os placares de acordo com cada liga.
    -   **Responsividade (`@media`)**: Media queries detalhadas que ajustam o layout para diferentes tamanhos de tela.

3.  **`<body>`:**
    -   **Estrutura HTML:** Contém os elementos principais da interface, como o header, a sidebar, o feed principal e o menu de navegação inferior.
    -   **Views (`#view-*`)**: Cada seção principal (Jogos, Tabela, etc.) é um contêiner com um ID específico. A lógica JavaScript alterna a visibilidade desses contêineres.
    -   **Modais (`#match-modal`, `#f1-race-modal`)**: Estruturas HTML para os modais, que são preenchidos e exibidos dinamicamente.

4.  **`<script>`:**
    -   **`APIFOOTBALL_KEY`**: Chave de API hardcoded para o serviço de artilheiros.
    -   **`PLAYER_DB_DATA`**: Objeto JavaScript que funciona como um banco de dados local de jogadores.
    -   **`SPORTS_DB`**: Objeto de configuração central. Define os esportes, ligas, visualizações, temas, logos e IDs de API para cada um. É a "fonte da verdade" para a navegação e busca de dados.
    -   **`API_CONFIG`**: Objeto que centraliza a construção de todas as URLs de API.
    -   **`app` (Objeto Principal):**
        -   `state`: Mantém o estado atual da aplicação (esporte, liga, data, tema, etc.).
        -   `init()`: Função de inicialização que configura os eventos, o tema e carrega os dados iniciais.
        -   `fetch...()`: Funções assíncronas (`async/await`) responsáveis por buscar dados das APIs.
        -   `render...()`: Funções que recebem os dados das APIs e os transformam em HTML, atualizando a interface.
        -   **Manipuladores de Eventos:** Funções como `setView()`, `openMatch()`, `toggleTheme()`, `changeSport()` que respondem às interações do usuário.
        -   **Cache:** Implementa um cache simples em `state` (ex: `scorersCache`, `espnTeamsCache`) para evitar requisições repetidas à API.

## 🚀 Como Executar

1.  Certifique-se de ter uma chave válida para a **APIFOOTBALL** e a insira na variável `APIFOOTBALL_KEY` dentro da tag `<script>`.
2.  Abra o arquivo `index.html` em qualquer navegador web moderno (Chrome, Firefox, Edge).
3.  A aplicação carregará os dados da liga padrão (Brasileirão) e estará pronta para uso.