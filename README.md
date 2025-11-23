# 🏟️ SportingLabs - W3labs

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.1.0-green.svg)

> **A revolução do esporte através da tecnologia.** Uma iniciativa W3labs.

---

## 📖 Sobre o Projeto

O **SportingLabs** é o braço de inovação esportiva da **W3labs**. Este repositório contém o código-fonte da plataforma que visa integrar utilizando tecnologias de ponta.

---

## 📸 Screenshots

Abaixo estão algumas telas que demonstram as principais funcionalidades e a interface da plataforma SportingLabs.

| Tela Principal (Destaques) | Resultados de uma Liga |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://drive.google.com/uc?export=view&id=1cKjaLfFk7Qv5tMLHvgesJL7vDIu2vjjV" alt="Tela Principal com Destaques" width="450"> | <img src="https://drive.google.com/uc?export=view&id=1vLf4ifEkI-W8xzxrC0Y1vDoRlGD23LRw" alt="Resultados de uma Liga" width="450"> |

| Tabela de Classificação | Detalhes da Partida |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://drive.google.com/uc?export=view&id=1OX-DyJqaz-jtZfNlYrengl4cYcOjxpN1" alt="Tabela de Classificação" width="450"> | <img src="https://drive.google.com/file/d/1F80EC2l_rPsqtTjnI9w6qdJYiFlaaVap/view?usp=drive_link" alt="Detalhes da Partida" width="450"> |

| Clubes e Elenco | Seção de Notícias |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://drive.google.com/uc?export=view&id=1pd74Oai13jyYC2_Cu-nmQvwhpjusMx92" alt="Clubes e Elenco" width="450"> | <img src="https://drive.google.com/uc?export=view&id=1FQoqc0W_kwOrSgY9QUUrln5jgYsQhK3u" alt="Seção de Notícias" width="450"> |

---

## ✨ Funcionalidades

*   **Resultados ao Vivo:** Acompanhe os placares dos jogos em tempo real com atualizações automáticas.
*   **Múltiplos Esportes e Ligas:** Suporte para Futebol, Basquete, Futebol Americano e eventos como as Olimpíadas. Inclui cobertura de campeonatos como Brasileirão, Premier League, La Liga, Champions League, NBA, NFL e muitos outros.
*   **Tabelas de Classificação:** Visualize a classificação detalhada dos principais campeonatos de futebol e o quadro de medalhas das Olimpíadas.
*   **Notícias Esportivas:** Acesse as últimas notícias relacionadas a cada liga, diretamente da ESPN.
*   **Informações de Clubes e Elencos:** Explore os times de cada liga, veja seus elencos e acesse o histórico do clube (via Wikipedia).
*   **Detalhes da Partida:** Abra uma visão detalhada de cada jogo para ver a linha do tempo com os principais eventos (gols, cartões) e estatísticas comparativas.
*   **Busca Integrada:** Pesquise por jogadores e clubes e obtenha resultados diretamente da Wikipedia.
*   **Interface Temática:** A interface se adapta visualmente à identidade da liga selecionada, criando uma experiência mais imersiva.
*   **Design Responsivo:** A plataforma é totalmente funcional em desktops, tablets e dispositivos móveis.

---

## 🚀 Tecnologias e APIs

Este projeto foi construído utilizando a seguinte stack tecnológica:

### Frontend
*   **HTML5:** Estrutura semântica da aplicação.
*   **CSS3 (TailwindCSS):** Estilização moderna e responsiva.
*   **JavaScript (Vanilla):** Lógica da aplicação, manipulação do DOM e consumo de APIs.
*   **Lucide Icons:** Biblioteca de ícones SVG.

### APIs e Fontes de Dados
*   **ESPN API:** Fonte principal para placares, classificações, notícias e informações de times/jogos.
*   **Codante.io Olympic Games API:** Utilizada para obter dados de eventos e o quadro de medalhas das Olimpíadas.
*   **Wikipedia API:** Integrada à funcionalidade de busca para fornecer informações sobre clubes e atletas.
*   **IPAPI.co:** Para detecção de região do usuário e personalização de conteúdo.
*   **FlagCDN:** Para exibição das bandeiras dos países.
*   **CORSProxy.io:** Usado como proxy para contornar restrições de CORS ao acessar as APIs.

---

## 🛠️ Como Executar Localmente

Como este projeto é construído com tecnologias web front-end puras, você não precisa de um processo de build complexo.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Walker10TECH/SportingLabs.git
    ```

2.  **Abra o arquivo `index.html`:**
    Devido às políticas de segurança dos navegadores (CORS) ao fazer requisições de API a partir de arquivos locais (`file://`), é recomendado usar um servidor web local. A maneira mais fácil é usar a extensão **Live Server** no Visual Studio Code.

    *   Instale a extensão Live Server no VS Code.
    *   Clique com o botão direito no arquivo `index.html` e selecione "Open with Live Server".

---

## 🤝 Contribuições

Contribuições são bem-vindas! Se você tem ideias para novas funcionalidades, melhorias na interface ou correções de bugs, sinta-se à vontade para abrir uma *Issue* ou enviar um *Pull Request*.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
