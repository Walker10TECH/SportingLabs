# SportingLabs W3Labs - Painel de Dados Esportivos

##  Visão Geral

O SportingLabs é uma aplicação web de página única (SPA - Single Page Application) projetada para exibir dados esportivos de forma dinâmica e interativa. Construído com HTML, CSS e JavaScript puros, o projeto consome múltiplas APIs para fornecer informações em tempo real sobre partidas de futebol e Fórmula 1, com animações de eventos, placares dinâmicos, classificações, notícias e muito mais.

A interface é moderna, utilizando o conceito de "glassmorphism", e é totalmente responsiva, adaptando-se desde telas de smartphones ultrapequenos até monitores ultrawide.

## ✨ Funcionalidades Principais

-   **Dois Esportes Suportados:** Futebol e Fórmula 1, com navegação e visualizações específicas para cada um.
-   **Placar de Transmissão Unificado:**
    -   Um placar de jogo inspirado em transmissões de TV, com cores e logos dos times, placar central e um cronômetro dinâmico.
    -   **Animações de Eventos em Tempo Real:** Overlays e animações são acionados para gols, cartões (amarelo/vermelho), substituições e checagens do VAR, enriquecendo a experiência ao vivo.
-   **Responsividade Avançada:** Layout otimizado para mais de 6 breakpoints diferentes, incluindo ajustes para modo paisagem em dispositivos móveis.
-   **Navegação Completa:**
    -   **Desktop:** Header com menus dropdown e uma barra lateral (sidebar) para navegação entre as visualizações.
    -   **Mobile:** Menu de navegação inferior fixo para acesso rápido às principais seções.
-   **Visualizações de Dados (Futebol):**
    -   **Jogos:** Exibe as partidas do dia (com um seletor de data) e um indicador de "AO VIVO".
    -   **Classificação:** Tabela de classificação completa com zonas coloridas (ex: Libertadores, Rebaixamento) e legenda.
    -   **Artilharia:** Lista dos maiores artilheiros da temporada (com seletor de ano), consumindo uma API externa.
    -   **Notícias:** Grade com as últimas notícias relacionadas à liga selecionada.
    -   **Clubes:** Grade com todos os clubes da liga, que leva a uma **página dedicada por time**, exibindo calendário de jogos e elenco completo.
-   **Visualizações de Dados (Fórmula 1):**
    -   **Calendário:** Exibe todas as corridas da temporada.
    -   **Mundial de Pilotos:** Tabela de classificação dos pilotos.
    -   **Mundial de Construtores:** Tabela de classificação das equipes.
    -   **Pilotos Históricos:** Grade de pilotos lendários com busca na Wikipedia.
-   **Interatividade:**
-   **Modal de Partida Detalhado:**
    -   **Resumo:** Placar, estatísticas detalhadas e linha do tempo com os principais eventos.
    -   **Escalações:** Uma **visualização tática 3D** do campo, mostrando a formação dos jogadores.
    -   **Transmissão:** Busca e exibe opções de streaming para a partida a partir de múltiplas fontes.
    -   **Modal de Corrida (F1):** Exibe detalhes da corrida, incluindo resultados de diferentes sessões (Treino, Qualificação, Corrida) em abas.
    -   **Busca Global:** Campo de busca no header que pesquisa jogadores e clubes em tempo real.
-   **Tematização Dinâmica:**
    -   **Modo Claro e Escuro:** Alternância de tema com persistência no `localStorage`.
    -   **Background por Liga:** Cada liga possui um plano de fundo temático que atualiza dinamicamente.

## 🛠️ Tecnologias e Ferramentas

-   **Frontend:**
    -   `HTML5`: Estrutura semântica do conteúdo.
    -   `CSS3`: Estilização avançada com **Variáveis CSS** para fácil tematização.
    -   `JavaScript (ES6+)`: Toda a lógica da aplicação, manipulação do DOM e requisições a APIs.
-   **Bibliotecas e Frameworks:**
    -   **Tailwind CSS (via CDN):** Utilizado para estilização rápida e responsiva através de classes utilitárias.
    -   **Lucide Icons:** Biblioteca de ícones SVG.
    -   **Flatpickr:** Componente de calendário (datepicker) leve e personalizável.
    -   **Fontes:** `Nokia Pure Headline` (local) e Google Fonts (`Chakra Petch`, `Teko`, `Roboto Condensed`).
-   **APIs e Fontes de Dados:**
    -   **ESPN API:** Fonte principal para placares, classificações, notícias e dados de equipes de futebol e Fórmula 1.
    -   **API-SPORTS (APIFOOTBALL):** Utilizada especificamente para a busca de artilheiros.
    -   **OpenF1 API:** Utilizada para classificações de pilotos e construtores de F1.
    -   **Wikipedia API:** Utilizada para buscar e exibir informações detalhadas sobre clubes e pilotos.
    -   **Fontes de Streaming:**
        -   `esportesembed.top`: Fonte primária para URLs de transmissão, geradas dinamicamente.
        -   `api.reidoscanais.io`: Fonte de fallback para aumentar a cobertura de transmissões.
    -   **Base de Dados Interna:** O objeto `PLAYER_DB_DATA` no JavaScript serve como um banco de dados local para acelerar a busca por jogadores famosos.

## 📂 Estrutura do Código (Dentro de `index.html`)

O projeto está contido em um único arquivo, dividido em três partes principais:

1.  **`<head>`:**
    -   Importação de todas as bibliotecas externas (Tailwind, Fonts, Lucide, Flatpickr).
    -   Definição de metatags para responsividade.

2.  **`<style>`:**
    -   **CSS com Variáveis (`:root`)**: O coração do sistema de temas. Define cores, fontes e outros valores para o modo escuro (padrão) e os sobrescreve na classe `.light-mode`.
    -   **Estilos Globais e Componentes:** Estilos para `body`, scrollbar, e componentes reutilizáveis como `.glass-panel`, `.nav-pill`, modais e loaders.
    -   **Placar Unificado e Animações:** Estilos detalhados para o placar (`.unified-broadcast-board`) e para os overlays de eventos (`.unified-full-overlay`).
    -   **Campo Tático 3D:** CSS para a renderização do campo de futebol em perspectiva, incluindo os jogadores e marcações.
    -   **Responsividade (`@media`)**: Media queries detalhadas que ajustam o layout para diferentes tamanhos de tela.

3.  **`<body>`:**
    -   **Estrutura HTML:** Contém os elementos principais da interface, como o header, a sidebar, o feed principal e o menu de navegação inferior.
    -   **Views (`#view-*`)**: Cada seção principal (Jogos, Tabela, Página de Time, etc.) é um contêiner com um ID específico. A lógica JavaScript alterna a visibilidade desses contêineres.
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
        -   `render...()` e `trigger...()`: Funções que recebem dados das APIs, os transformam em HTML e disparam as animações de eventos.
        -   **Manipuladores de Eventos:** Funções como `setView()`, `openMatch()`, `toggleTheme()`, `changeSport()` que respondem às interações do usuário.
        -   **Cache:** Implementa um cache simples em `state` (ex: `scorersCache`, `espnTeamsCache`) para evitar requisições repetidas à API.

## 🚀 Como Executar

1.  Certifique-se de ter uma chave válida para a **APIFOOTBALL** e a insira na variável `APIFOOTBALL_KEY` dentro da tag `<script>`.
2.  Abra o arquivo `index.html` em qualquer navegador web moderno (Chrome, Firefox, Edge).
3.  A aplicação carregará os dados da liga padrão (Brasileirão) e estará pronta para uso.