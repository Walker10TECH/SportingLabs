# 🏟️ SportingLabs - W3labs

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.2.0-green.svg)

> **A revolução do esporte através da tecnologia.** Uma iniciativa W3labs.

---

## 📖 Sobre o Projeto

O **SportingLabs** é uma plataforma web moderna e imersiva para fãs de esportes, desenvolvida como uma iniciativa de inovação da **W3labs**. O projeto oferece resultados de jogos em tempo real, classificações, notícias e informações detalhadas sobre diversas ligas e competições, tudo em uma interface dinâmica e responsiva que se adapta ao seu campeonato favorito.

---

## 📸 Screenshots

Abaixo, algumas telas que demonstram as principais funcionalidades e a interface da plataforma.

| Tela Principal (Destaques) | Resultados de uma Liga |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://drive.google.com/uc?export=view&id=1cKjaLfFk7Qv5tMLHvgesJL7vDIu2vjjV" alt="Tela Principal com Destaques" width="450"> | <img src="https://drive.google.com/uc?export=view&id=1vLf4ifEkI-W8xzxrC0Y1vDoRlGD23LRw" alt="Resultados de uma Liga" width="450"> |

| Tabela de Classificação | Detalhes da Partida |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://drive.google.com/uc?export=view&id=1OX-DyJqaz-jtZfNlYrengl4cYcOjxpN1" alt="Tabela de Classificação" width="450"> | <img src="https://drive.google.com/uc?export=view&id=1F80EC2l_rPsqtTjnI9w6qdJYiFlaaVap" alt="Detalhes da Partida" width="450"> |

| Clubes e Elenco | Seção de Notícias |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://drive.google.com/uc?export=view&id=1pd74Oai13jyYC2_Cu-nmQvwhpjusMx92" alt="Clubes e Elenco" width="450"> | <img src="https://drive.google.com/uc?export=view&id=1FQoqc0W_kwOrSgY9QUUrln5jgYsQhK3u" alt="Seção de Notícias" width="450"> |

---

## ✨ Funcionalidades Principais

*   **Placares ao Vivo:** Acompanhe os resultados dos jogos em tempo real, com atualizações automáticas de placar e animações de gol.
*   **Classificação Dinâmica:** Tabelas de classificação que se atualizam ao vivo conforme os resultados das partidas em andamento.
*   **Cobertura Ampla:** Suporte para múltiplos esportes e dezenas de ligas, incluindo Brasileirão (A e B), Premier League, La Liga, Champions League, Libertadores, NBA e NFL!
*   **Notícias Esportivas:** Acesse as últimas notícias relacionadas a cada liga, diretamente da ESPN.
*   **Detalhes da Partida:** Explore a linha do tempo de cada jogo com os principais eventos (gols, cartões, substituições) e estatísticas comparativas (posse de bola, finalizações, etc.).
*   **Informações de Clubes:** Navegue pelos times de cada liga, visualize seus elencos e mergulhe na história de cada clube com artigos integrados da Wikipedia.
*   **Interface Temática e Imersiva:** O design da plataforma, incluindo placares e modais, se adapta visualmente à identidade da liga selecionada.
*   **Busca Global:** Pesquise por jogadores, clubes ou termos gerais e obtenha resultados instantâneos da Wikipedia.
*   **Design Responsivo:** A plataforma é totalmente funcional em desktops, tablets e dispositivos móveis.

---

## 🚀 Tecnologias e APIs

O projeto foi construído com uma stack moderna de tecnologias front-end, focada em performance e interatividade.

### Frontend
*   **HTML5:** Estrutura semântica da aplicação.
*   **CSS3 com TailwindCSS:** Para uma estilização moderna, responsiva e de rápida prototipação.
*   **JavaScript (Vanilla):** Toda a lógica da aplicação, manipulação do DOM e consumo de APIs é feita com JavaScript puro, sem frameworks.
*   **Lucide Icons:** Biblioteca de ícones SVG.
*   **Flatpickr:** Componente de calendário para seleção de datas de jogos.

### APIs e Fontes de Dados
*   **ESPN API:** Fonte principal para placares, classificações, notícias e informações de times/jogos.
*   **Wikipedia API:** Integrada à funcionalidade de busca para fornecer informações sobre clubes e atletas.
*   **IPAPI.co:** Para detecção de região do usuário e personalização de conteúdo.
*   **FlagCDN:** Para exibição das bandeiras dos países.
*   **corsproxy.io:** Utilizado como proxy para contornar restrições de CORS ao acessar as APIs no ambiente de desenvolvimento.

---

## 🛠️ Como Executar Localmente

Como o projeto é construído com tecnologias web front-end puras, não há necessidade de um processo de build complexo.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Walker10TECH/SportingLabs.git
    ```

2.  **Inicie um servidor local:**
    Devido às políticas de segurança dos navegadores (CORS) ao fazer requisições de API a partir de arquivos locais (`file://`), é **essencial** usar um servidor web local. A maneira mais fácil é com a extensão **Live Server** no Visual Studio Code.

    *   Instale a extensão Live Server no VS Code.
    *   Clique com o botão direito no arquivo `index.html` e selecione "Open with Live Server".

---

## 🤝 Contribuições

Contribuições são muito bem-vindas! Se você tem ideias para novas funcionalidades, melhorias ou correções de bugs, sinta-se à vontade para abrir uma **Issue** para discussão ou enviar um **Pull Request**.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
