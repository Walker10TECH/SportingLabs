# SportingLabs

📘 SportingLabs - Manual do Usuário e Desenvolvedor

Bem-vindo ao manual do SportingLabs, um painel de estatísticas esportivas em tempo real focado em futebol sul-americano e europeu. Este sistema oferece placares ao vivo, classificações, chaves de mata-mata e análises táticas detalhadas.

🚀 Visão Geral

O SportingLabs é uma Single Page Application (SPA) construída com HTML, CSS (Tailwind) e JavaScript puro (Vanilla JS). Ele consome dados reais de uma API de esportes para renderizar uma interface imersiva estilo "Dark Mode" inspirada nos grandes portais esportivos (ESPN/SofaScore).

Principais Funcionalidades

Placares em Tempo Real: Atualização automática de jogos ao vivo.

Classificação Multi-Grupos: Suporte para ligas de pontos corridos (Brasileirão) e fases de grupos (Libertadores/Champions).

Mata-Mata (Brackets): Visualização automática de oitavas, quartas, semifinais e finais.

Campo Tático Real: Renderização de escalações com posicionamento baseado na formação tática.

Detalhes da Partida: Estatísticas, linha do tempo (gols/cartões) e gráfico de pressão (momentum).

Modal de Jogador: Fotos e estatísticas de carreira ao clicar nos atletas.

🛠️ Configuração e Instalação

Como o projeto é um arquivo único (index.html), não há necessidade de instalação de servidores (Node.js, Apache, etc.) para uso básico.

Passo 1: Abrir o Projeto

Baixe o arquivo index.html.

Abra-o diretamente em qualquer navegador moderno (Chrome, Edge, Firefox).

Passo 2: Configurar a API Key (Essencial)

Para que os dados reais apareçam, você precisa de uma chave de API válida. O sistema utiliza o wrapper SportAPI7 (disponível no RapidAPI).

No canto superior direito da tela, clique no ícone de Engrenagem (Configurações).

No modal que abrir, verifique o campo "RapidAPI Key".

O sistema já vem com uma chave de demonstração pré-configurada:

7aeea329c2mshc5230fc31155b74p197515jsnb2890148aec4


Clique em "Atualizar" para salvar. A chave ficará salva no seu navegador (localStorage).

Nota: Se a chave exceder o limite de uso gratuito, você precisará criar uma conta no RapidAPI e assinar a sportapi7 para obter sua própria chave.

📱 Guia de Navegação

Barra Superior (Header)

Logo: Recarrega a página.

Menu de Ligas: Role horizontalmente para selecionar entre Brasileirão, Libertadores, Champions League, Premier League, etc.

Configurações: Ícone para trocar a chave da API.

Painel Principal

O painel se adapta dependendo da liga selecionada:

Botão "Placar": Mostra os jogos passados, ao vivo e futuros.

Botão "Classificação": Mostra a tabela. Se for Copa (ex: Libertadores), mostra todos os Grupos (A, B, C...).

Botão "Mata-mata": Gera a árvore do torneio se as fases finais estiverem definidas.

Detalhes do Jogo (Modal)

Ao clicar em qualquer card de jogo, um modal se abre com três abas:

Resumo: Estatísticas de posse, chutes e linha do tempo dos eventos.

H2H (Head to Head): Histórico de confrontos diretos (se disponível).

Escalações/TV: Mostra o campo tático. Clique nas bolinhas dos jogadores para ver a foto e dados da carreira do atleta.

💻 Documentação Técnica (Para Desenvolvedores)

Estrutura de Arquivos

Todo o código reside em um único arquivo para facilidade de portabilidade, mas está logicamente separado:

HTML: Estrutura semântica.

CSS (Tailwind + Custom): Estilização via CDN e classes customizadas para o campo de futebol e animações.

JS (Objeto app): Toda a lógica está encapsulada no objeto global app para evitar poluição do escopo global.

Integração com API

O sistema consome a API sportapi7.p.rapidapi.com.

Endpoints Principais Utilizados:

Buscar Temporada:
GET /api/v1/unique-tournament/{id}/seasons
Detecta automaticamente a temporada atual (2024 ou 2025).

Listar Jogos:
GET /api/v1/unique-tournament/{id}/season/{seasonId}/events/last/0 (Jogos passados)
GET /api/v1/unique-tournament/{id}/season/{seasonId}/events/next/0 (Próximos jogos)

Detalhes da Partida:
GET /api/v1/event/{id}/lineups (Escalações)
GET /api/v1/event/{id}/incidents (Gols, cartões)
GET /api/v1/event/{id}/statistics (Estatísticas gerais)

Detalhes do Jogador:
GET /api/v1/player/{id}/career-statistics

Lógica de Fallback (Segurança)

O sistema possui uma robustez implementada na função loadLeague:

Tenta buscar o ID da temporada atual.

Se falhar (erro de API ou limite), ele tenta buscar os Jogos do Dia (scheduled-events) filtrando pela liga selecionada.

Isso garante que o usuário raramente veja uma tela em branco ("white screen").

⚠️ Solução de Problemas (Troubleshooting)

1. "Nenhum jogo encontrado"

Causa: A temporada pode ter acabado ou ainda não começou, e não há jogos agendados para os próximos dias.

Solução: Tente trocar para uma liga europeia (Premier League/Champions) que esteja em andamento.

2. Os dados não carregam (Loader infinito)

Causa: A chave da API pode ter expirado ou atingido o limite de requisições diárias do RapidAPI.

Solução: Abra as configurações, limpe a chave e insira uma nova chave válida do RapidAPI.

3. Imagens/Logos quebrados

Causa: A URL da CDN de imagens pode ter mudado ou o ID do time está incorreto na base de dados da API.

Solução: O código possui um onerror nas imagens para carregar um placeholder genérico caso a imagem oficial falhe.

⚖️ Aviso Legal

Este projeto é para fins educacionais e de demonstração.

As imagens de fundo são provenientes do Unsplash.

Os dados são fornecidos por RapidAPI (SportAPI7).

Os logotipos de clubes e ligas são propriedade de seus respectivos detentores.

Versão: 4.0 (Ultimate Real Engine)
Desenvolvido por: Gemini AI
