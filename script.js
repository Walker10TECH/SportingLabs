const app = {
    state: {
        currentSport: 'soccer', // esporte padrão
        currentLeague: 'brasileirao',
        view: 'matches',
        modalTab: 'stats',
        matchRefreshInterval: null,
        lastGoalCount: 0,
        userRegion: 'br',
        sports: {
            'soccer': {
                name: 'Futebol',
                leagues: {
                    'brasileirao': { slug: 'bra.1', slugs: ['bra.1', 'bra.2'], name: 'Brasileirão', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/85.png', bg: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/04/taca-e1712177532245.jpeg?w=910' },
                    'libertadores': { slug: 'conmebol.libertadores', name: 'Libertadores', logo: 'https://upload.wikimedia.org/wikipedia/pt/thumb/9/95/Conmebol_Libertadores_logo.svg/330px-Conmebol_Libertadores_logo.svg.png', bg: 'https://lncimg.lance.com.br/cdn-cgi/image/width=950,quality=75,fit=pad,format=webp/uploads/2021/01/29/60141dfea45a6.jpeg' },
                    'sulamericana': { slug: 'conmebol.sudamericana', name: 'Sul-Americana', logo: 'https://upload.wikimedia.org/wikipedia/pt/thumb/e/e4/Conmebol_Sudamericana_logo.png/250px-Conmebol_Sudamericana_logo.png', bg: 'https://s2-ge.glbimg.com/-M2a9kZoesn0lYulcHlg0hIvCko=/0x0:1280x853/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2022/j/Y/BAJcXyRz6Iz6Svtlf1AA/244ecb3d-2cab-4933-87e0-de24261e1696.jfif' },
                    'champions': { slug: 'uefa.champions', name: 'Champions League', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/2.png', bg: 'https://lncimg.lance.com.br/cdn-cgi/image/width=1280,height=720,quality=75,fit=cover/uploads/2023/03/17/641465f53b411.jpeg' },
                    'premier': { slug: 'eng.1', slugs: ['eng.1', 'eng.2'], name: 'Inglaterra', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/23.png', bg: 'https://lncimg.lance.com.br/cdn-cgi/image/width=950,quality=75,fit=pad,format=webp/uploads/2020/04/05/5e8a04ba97834.jpeg' },
                    'laliga': { slug: 'esp.1', slugs: ['esp.1', 'esp.2'], name: 'Espanha', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/15.png', bg: 'https://assets.goal.com/images/v3/blt054a5ddddf1e5a2b/158f203189e94419d7010667f379da35bcf16d8e.jpg' },
                    'seriea': { slug: 'ita.1', slugs: ['ita.1', 'ita.2'], name: 'Itália', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/12.png', bg: 'https://cloudfront-us-east-1.images.arcpublishing.com/newr7/L6ZP3CEJ6VMPNFT5HTW7H7L7LY.jpg' },
                    'bundesliga': { slug: 'ger.1', slugs: ['ger.1', 'ger.2'], name: 'Alemanha', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/10.png', bg: 'https://s2-ge.glbimg.com/F2PP74GbwM16ougDWVMDhZzEp6U=/0x0:1024x659/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2024/X/Y/3pfuBhTzuraB6EHOqszA/gettyimages-1742744089.jpg' },
                    'eredivisie': { slug: 'ned.1', slugs: ['ned.1', 'ned.2'], name: 'Holanda', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Eredivisie_nieuw_logo_2017-.svg/1200px-Eredivisie_nieuw_logo_2017-.svg.png', bg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGutuFAjY1Jn4Egu_ncE2-IMj_zUDooPWDQ&s' },
                    'ligue1': { slug: 'fra.1', slugs: ['fra.1', 'fra.2'], name: 'França', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/9.png', bg: 'https://images.ps-program.com/meta/2023-06-04-psg-ligue-1-trophy-celebration-2022-23-1.jpg' },
                    'liga-portugal': { slug: 'por.1', name: 'Portugal', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Liga_Portugal_Betclic_logo_2023.svg/1200px-Liga_Portugal_Betclic_logo_2023.svg.png', bg: 'https://media.e-noticias.pt/2023/05/taca-liga-portugal-bwin-scaled.jpg' },
                    'argentina': { slug: 'arg.1', slugs: ['arg.1', 'arg.2'], name: 'Argentina', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/1.png', bg: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/12/Capturar_e27e29.jpg?w=793' },
                    'saudi': { slug: 'ksa.1', name: 'Arábia Saudita', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/Saudi_Pro_League_logo.svg/1200px-Saudi_Pro_League_logo.svg.png', bg: 'https://www.365scores.com/pt-br/news/magazine/wp-content/uploads/2023/11/366423961_5646928382077000_2604818796297545939_n-e1699379331310.jpg' },
                    'mls': { slug: 'usa.1', name: 'MLS', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/253.png', bg: 'https://images.mlssoccer.com/image/private/t_keep-aspect-ratio-e-mobile_3x/f_auto/mls-prod-images/zlkxdfpwc3s5qj6epm1a.jpg' },
                    'liga-mx': { slug: 'mex.1', name: 'México', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/207.png', bg: 'https://www.si.com/.image/t_share/MTk3MDUwMTEzMDU3MTEyMTg3/boletos-final-clausura-2023-chivas-vs-tigres-liga-mx.jpg' },
                    'j-league': { slug: 'jpn.1', name: 'Japão', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/J.League_logo.svg/1200px-J.League_logo.svg.png', bg: 'https://www.jleague.co/images/trophy/j1.png' }
                },
            },
            'basketball': {
                name: 'Basquete',
                leagues: {
                    'nba': { slug: 'nba', name: 'NBA', logo: 'https://a.espncdn.com/i/teamlogos/leagues/500/nba.png', bg: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3912172.png&w=350&h=254' }, // Imagem de fundo e logo corrigidos
                }
            },
            'football': {
                name: 'Futebol Americano',
                leagues: {
                    'nfl': { slug: 'nfl', name: 'NFL', logo: 'https://a.espncdn.com/i/teamlogos/leagues/500/nfl.png', bg: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3139477.png&w=350&h=254' }, // Imagem de fundo e logo corrigidos
                }
            }
        },
        // Mapeamento para nomes completos para melhorar a busca na Wikipédia
        teamNameMap: { // Mapeia o nome do time da API para o nome completo da página da Wikipédia
            // Brasileirão (SERIE A E B)
            'América-MG': 'América Futebol Clube (MG)',
            'Athletico-PR': 'Club Athletico Paranaense',
            'Atlético-MG': 'Clube Atlético Mineiro',
            'Bahia': 'Esporte Clube Bahia',
            'Botafogo': 'Botafogo de Futebol e Regatas',
            'Corinthians': 'Sport Club Corinthians Paulista',
            'Coritiba': 'Coritiba Foot Ball Club',
            'Cruzeiro': 'Cruzeiro Esporte Clube',
            'Cuiabá': 'Cuiabá Esporte Clube',
            'Flamengo': 'Clube de Regatas do Flamengo',
            'Fluminense': 'Fluminense Football Club',
            'Fortaleza': 'Fortaleza Esporte Clube',
            'Goiás': 'Goiás Esporte Clube',
            'Grêmio': 'Grêmio Foot-Ball Porto Alegrense',
            'Internacional': 'Sport Club Internacional',
            'Palmeiras': 'Sociedade Esportiva Palmeiras',
            'Red Bull Bragantino': 'Red Bull Bragantino',
            'Santos': 'Santos Futebol Clube',
            'São Paulo': 'São Paulo Futebol Clube',
            'Vasco da Gama': 'Club de Regatas Vasco da Gama',
            'Vitória': 'Esporte Clube Vitória',
            'Atlético-GO': 'Atlético Clube Goianiense',
            'Criciúma': 'Criciúma Esporte Clube',
            'Juventude': 'Esporte Clube Juventude',
            'Vila Nova': 'Vila Nova Futebol Clube',
            'Sport': 'Sport Club do Recife',
            'Avaí': 'Avaí Futebol Clube',
            'Chapecoense': 'Associação Chapecoense de Futebol',
            'Guarani': 'Guarani Futebol Clube',
            'Ponte Preta': 'Associação Atlética Ponte Preta',
            'CRB': 'Clube de Regatas Brasil',
            'Ceará': 'Ceará Sporting Club',
            'Náutico': 'Clube Náutico Capibaribe',
            'Remo': 'Clube do Remo',
            'Paysandu': 'Paysandu Sport Club',
            'Sampaio Corrêa': 'Sampaio Corrêa Futebol Clube',
            'ABC': 'ABC Futebol Clube',
            'America-RN': 'América Futebol Clube (RN)',
            'Botafogo-PB': 'Botafogo Futebol Clube (PB)',
            'Confiança': 'Associação Desportiva Confiança',
            'Ferroviário': 'Ferroviário Atlético Clube',
            'Floresta': 'Floresta Esporte Clube',
            'Manaus': 'Manaus Futebol Clube',
            'Mirassol': 'Mirassol Futebol Clube',
            'Operário-PR': 'Operário Ferroviário Esporte Clube',
            'Remo': 'Clube do Remo',
            'Volta Redonda': 'Volta Redonda Futebol Clube',
            'Ypiranga-RS': 'Ypiranga Futebol Clube (RS)',
            'São José-RS': 'São José Esporte Clube (RS)',
            'Figueirense': 'Figueirense Futebol Clube',
            'Botafogo-SP': 'Botafogo Futebol Clube (SP)',
            'Brusque': 'Brusque Futebol Clube',
            'Novorizontino': 'Grêmio Novorizontino',
            'Amazonas': 'Amazonas Futebol Clube',
            'Ituano': 'Ituano Futebol Clube',
            'Pouso Alegre': 'Pouso Alegre Futebol Clube',
            'Aparecidense': 'Associação Atlética Aparecidense',
            'São Bernardo': 'São Bernardo Futebol Clube',
            'Altos': 'Associação Atlética de Altos',
            'Campinense': 'Campinense Clube',
            'Manaus FC': 'Manaus Futebol Clube',
            'Paysandu': 'Paysandu Sport Club',
            'Tombense': 'Tombense Futebol Clube',
            'CSA': 'Centro Sportivo Alagoano',
            'Brasil de Pelotas': 'Grêmio Esportivo Brasil',
            'Ferroviário-CE': 'Ferroviário Atlético Clube',
            'Jacuipense': 'Esporte Clube Jacuipense',
            'Joinville': 'Joinville Esporte Clube',
            'Moto Club': 'Moto Club de São Luís',
            'Santa Cruz': 'Santa Cruz Futebol Clube',
            'Sergipe': 'Club Sportivo Sergipe',
            'ABC FC': 'ABC Futebol Clube',
            'ASA': 'Agremiação Sportiva Arapiraquense',
            'Botafogo-PB': 'Botafogo Futebol Clube (PB)',
            'Confiança': 'Associação Desportiva Confiança',
            'Ferroviário': 'Ferroviário Atlético Clube',
            'Floresta': 'Floresta Esporte Clube',
            'Manaus FC': 'Manaus Futebol Clube',
            'Mirassol': 'Mirassol Futebol Clube',
            'Operário-PR': 'Operário Ferroviário Esporte Clube',
            'Remo': 'Clube do Remo',
            'Volta Redonda': 'Volta Redonda Futebol Clube',
            'Ypiranga-RS': 'Ypiranga Futebol Clube (RS)',
            'São José-RS': 'São José Esporte Clube (RS)',
            'Figueirense': 'Figueirense Futebol Clube',
            'Botafogo-SP': 'Botafogo Futebol Clube (SP)',
            'Brusque': 'Brusque Futebol Clube',
            'Novorizontino': 'Grêmio Novorizontino',
            'Amazonas FC': 'Amazonas Futebol Clube',
            'Ituano': 'Ituano Futebol Clube',
            'Pouso Alegre': 'Pouso Alegre Futebol Clube',
            'Aparecidense': 'Associação Atlética Aparecidense',
            'São Bernardo FC': 'São Bernardo Futebol Clube',
            'Altos': 'Associação Atlética de Altos',
            'Campinense': 'Campinense Clube',
            'Tombense': 'Tombense Futebol Clube',
            'CSA': 'Centro Sportivo Alagoano',
            'Brasil de Pelotas': 'Grêmio Esportivo Brasil',
            'Ferroviário-CE': 'Ferroviário Atlético Clube',
            'Jacuipense': 'Esporte Clube Jacuipense',
            'Joinville': 'Joinville Esporte Clube',
            'Moto Club': 'Moto Club de São Luís',
            'Santa Cruz': 'Santa Cruz Futebol Clube',
            'Sergipe': 'Club Sportivo Sergipe', // FIM BRASIL
           // Argentina
            'River Plate': 'Club Atlético River Plate',
            'Boca Juniors': 'Club Atlético Boca Juniors',
            'Racing Club': 'Racing Club de Avellaneda',
            'Independiente': 'Club Atlético Independiente',
            'San Lorenzo': 'Club Atlético San Lorenzo de Almagro',
            'Estudiantes': 'Club Estudiantes de La Plata',
            'Talleres': 'Club Atlético Talleres',
            'Rosario Central': 'Club Atlético Rosario Central',
            'Lanús': 'Club Atlético Lanús',
            'Defensa y Justicia': 'Club Social y Deportivo Defensa y Justicia',
            'Vélez Sarsfield': 'Club Atlético Vélez Sarsfield',
            // Inglaterra (Premier League)
            'Arsenal': 'Arsenal F.C.',
            'Aston Villa': 'Aston Villa F.C.',
            'Chelsea': 'Chelsea F.C.',
            'Everton': 'Everton F.C.',
            'Liverpool': 'Liverpool F.C.',
            'Manchester City': 'Manchester City F.C.',
            'Manchester United': 'Manchester United F.C.',
            'Newcastle United': 'Newcastle United F.C.',
            'Tottenham Hotspur': 'Tottenham Hotspur F.C.',
            'West Ham United': 'West Ham United F.C.',
            // Espanha (La Liga)
            'Atlético Madrid': 'Club Atlético de Madrid',
            'Barcelona': 'Futbol Club Barcelona',
            'Real Madrid': 'Real Madrid CF',
            'Sevilla': 'Sevilla FC',
            'Real Sociedad': 'Real Sociedad de Fútbol',
            'Villarreal': 'Villarreal CF',
            'Athletic Bilbao': 'Athletic Club',
            'Real Betis': 'Real Betis Balompié',
            'Valencia': 'Valencia CF',
            'Getafe': 'Getafe CF',
            'Celta Vigo': 'Celta de Vigo',
            'Osasuna': 'CA Osasuna',
            'Cádiz': 'Cádiz CF',
            'Alavés': 'Deportivo Alavés',
            'Mallorca': 'RCD Mallorca',
            'Las Palmas': 'UD Las Palmas',
            'Rayo Vallecano': 'Rayo Vallecano',
            'Granada': 'Granada CF',
            'Almería': 'UD Almería',
            'Girona': 'Girona FC',
            // Itália (Serie A)
            'Inter': 'Internazionale Milano',
            'Juventus': 'Juventus F.C.',
            'Milan': 'A.C. Milan',
            'Napoli': 'S.S.C. Napoli',
            'Roma': 'A.S. Roma',
            'Lazio': 'S.S. Lazio',
            // Alemanha (Bundesliga)
            'Bayern Munich': 'FC Bayern Munich',
            'Borussia Dortmund': 'Borussia Dortmund',
            'RB Leipzig': 'RB Leipzig',
            'Bayer Leverkusen': 'Bayer 04 Leverkusen',
            // Outras Ligas
            'Ajax': 'AFC Ajax',
            'PSV': 'PSV Eindhoven',
            'Feyenoord': 'Feyenoord Rotterdam',
            'Paris Saint-Germain': 'Paris Saint-Germain F.C.',
            'Al Nassr': 'Al-Nassr FC',
            'Al-Hilal': 'Al-Hilal Saudi FC',
            'Al Ittihad': 'Al-Ittihad Club',
            // Arábia Saudita
            'Al Ahli': 'Al-Ahli Saudi FC',
            'Al-Shabab': 'Al-Shabab FC',
            'Al-Ettifaq': 'Ettifaq FC',
            'Al-Fateh': 'Al-Fateh SC',
            'Al-Taawoun': 'Al-Taawoun FC',
            'Damac': 'Damac FC',
            'Abha': 'Abha Club',
            'Al-Raed': 'Al-Raed FC',
            'Al-Wehda': 'Al-Wehda FC',
            'Al-Hazem': 'Al-Hazem FC',
            'Al-Okhdood': 'Al-Okhdood Club',
            'Al-Riyadh': 'Al-Riyadh SC',
            'Al-Tai': 'Al-Tai FC',
            'Al-Khaleej': 'Al-Khaleej FC',
            'Al-Fayha': 'Al-Fayha FC',
            // Clubes Sul-Americanos (Libertadores, Sul-Americana, etc.)
            'Nacional': 'Club Nacional de Football', // Uruguai
            'Peñarol': 'Club Atlético Peñarol',
            'Olimpia': 'Club Olimpia',
            'Cerro Porteño': 'Club Cerro Porteño',
            'Libertad': 'Club Libertad',
            'Colo-Colo': 'Club Social y Deportivo Colo-Colo',
            'Universidad Católica': 'Club Deportivo Universidad Católica',
            'Independiente del Valle': 'Club de Fútbol Independiente del Valle',
            'LDU Quito': 'Liga Deportiva Universitaria de Quito',
            'Barcelona SC': 'Barcelona Sporting Club',
            'Emelec': 'Club Sport Emelec',
            'Atlético Nacional': 'Club Atlético Nacional',
            'América de Cali': 'Corporación Deportiva América de Cali',
            'Junior': 'Corporación Popular Deportiva Junior',
            'The Strongest': 'Club The Strongest',
            'Bolívar': 'Club Bolívar',
            'Alianza Lima': 'Club Alianza Lima',
            'Sporting Cristal': 'Club Sporting Cristal',
            'Deportivo Táchira': 'Deportivo Táchira',
            'Caracas FC': 'Caracas Fútbol Club',
        },
        cache: {
            clubs: [], // Cache para a lista de clubes para a busca global
            standings: [] // Cache para os dados completos da classificação
        },
        leagueWikipediaMap: {
            'brasileirao': 'Campeonato_Brasileiro_de_Futebol_de_2024_-_Série_A',
            'premier': 'Premier_League_de_2024-25',
            'laliga': 'La_Liga_de_2024-25',
            // Adicionar outros mapeamentos conforme necessário
            clubs: [], // Cache para a lista de clubes para a busca global
            standings: [] // Cache para os dados completos da classificação
        }
    },

    init() {
        // Verifica e aplica o tema salvo
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
        this.updateThemeIcon();

        this.loadAndRenderLeagues();
        lucide.createIcons();
        // Adiciona listener para fechar a busca ao clicar fora
        document.addEventListener('click', (event) => {
            const searchContainer = document.getElementById('search-container');
            if (!searchContainer.contains(event.target)) {
                document.getElementById('search-results-container').classList.add('hidden');
            }
        });

        // Adiciona listener para a busca global no Enter
        const globalSearchInput = document.getElementById('global-search-input');
        globalSearchInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') this.handleGlobalSearch();
        });

        // Atualiza apenas a seção de placares
        setInterval(() => { 
            if(!document.hidden) this.loadMatches(this.state.currentLeague, true); 
        }, 60000);

        // Inicia o pré-carregamento de todas as outras ligas em segundo plano
        setTimeout(() => this.preloadAllLeagues(), 1000);
    },

    async preloadAllLeagues() {
        console.log('Iniciando pré-carregamento de todas as competições...');
        for (const sportKey in this.state.sports) {
            const sport = this.state.sports[sportKey];
            for (const leagueKey in sport.leagues) {
                // Verifica se a liga já não está no cache e não é a liga atual (que já foi carregada)
                if (!this.state.cache[leagueKey]) {
                    try {
                        const league = sport.leagues[leagueKey];
                        const res = await fetch(`https://site.api.espn.com/apis/site/v2/sports/${sportKey}/${league.slug}/scoreboard?lang=pt&region=${this.state.userRegion}`);
                        const data = await res.json();
                        this.state.cache[leagueKey] = data.events || [];
                        console.log(`Pré-carregado: ${league.name}`);
                    } catch (e) {
                        console.warn(`Falha ao pré-carregar ${leagueKey}:`, e);
                    }
                }
            }
        }
        console.log('Pré-carregamento finalizado.');
    },

    async loadAndRenderLeagues() {
        await this.detectRegion();
        this.renderNav();
    },

    async detectRegion() {
        try {
            const res = await fetch('http://ip-api.com/json/?fields=countryCode');
            const data = await res.json();
            if (data.countryCode) {
                this.state.userRegion = data.countryCode.toLowerCase();
            }
        } catch (e) {
            console.warn('Não foi possível detectar a região. Usando padrão US.');
        }
        document.getElementById('region-flag').src = `https://flagcdn.com/${this.state.userRegion}.svg`;
    },

    // --- UI ---
    toggleSettings() { document.getElementById('settings-modal').classList.toggle('hidden'); },
    saveKey() { this.closeModal('settings-modal'); this.loadLeague(this.state.currentLeague); },
    
    renderNav() {
        const sportNav = document.getElementById('sport-nav');
        this.updateThemeIcon(); // Garante que o ícone do tema esteja correto
        sportNav.innerHTML = '';
        Object.entries(this.state.sports).forEach(([key, sport]) => {
            const btn = document.createElement('button');
            btn.className = `sport-link ${key === this.state.currentSport ? 'active' : ''}`;
            btn.innerText = sport.name;
            btn.onclick = () => this.changeSport(key);
            sportNav.appendChild(btn);
        });

        const leagueNav = document.getElementById('league-nav');
        leagueNav.innerHTML = '';
        const currentLeagues = this.state.sports[this.state.currentSport].leagues;
        Object.entries(currentLeagues).forEach(([k, v]) => {
            const btn = document.createElement('button');
            btn.className = `nav-link ${k===this.state.currentLeague?'active':''}`;
            btn.id = `nav-${k}`;
            btn.innerText = v.name;
            btn.onclick = () => this.changeLeague(k);
            leagueNav.appendChild(btn);
        });
    },

    toggleTheme() {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        this.updateThemeIcon();
    },

    updateThemeIcon() {
        const isLight = document.body.classList.contains('light-theme');
        const sunIcon = document.getElementById('theme-sun');
        const moonIcon = document.getElementById('theme-moon');
        if (!sunIcon || !moonIcon) return;
        sunIcon.classList.toggle('hidden', !isLight);
        moonIcon.classList.toggle('hidden', isLight);
    },

    changeSport(key) {
        this.state.currentSport = key;
        // Define a primeira liga do novo esporte como a atual
        this.state.currentLeague = Object.keys(this.state.sports[key].leagues)[0];
        this.renderNav();
        this.loadLeague(this.state.currentLeague, false, true);
    },

    changeLeague(k) {
        this.state.currentLeague = k;
        // Apenas atualiza a UI da navegação e carrega os dados da liga
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.getElementById(`nav-${k}`).classList.add('active');
        this.loadLeague(k);
    },

    setView(v) {
        this.state.view = v;
        const targetSection = document.getElementById(`view-${v}`);

        if (targetSection) {
            // Rola para a seção
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Atualiza o estado visual dos botões
        ['matches','standings', 'news', 'clubs', 'top-scorers'].forEach(name => {
            const btn = document.getElementById('btn-'+name);
            if (btn) {
                const isActive = name === v;
                btn.classList.toggle('bg-red-600', isActive);
                btn.classList.toggle('text-white', isActive);
                btn.classList.toggle('shadow-md', isActive);
                btn.classList.toggle('text-gray-400', !isActive);
            }
        });
    },

    setModalTab(t) {
        const modalContent = document.querySelector('#match-modal .flex-1.overflow-y-auto');
        modalContent.classList.remove('content-fade-in');

        this.state.modalTab = t;
        const tabs = ['stats', 'lineups'];
        tabs.forEach(tabId => {
            const btn = document.getElementById(`tab-${tabId}`);
            const view = document.getElementById(`modal-view-${tabId}`);
            if (tabId === t) {
                // Adiciona um pequeno delay para a animação ser perceptível na troca de abas
                setTimeout(() => {
                    modalContent.classList.add('content-fade-in');
                }, 50);
                btn.classList.add('text-white', 'border-red-600');
                view.classList.remove('hidden');
            } else {
                btn.classList.remove('text-white', 'border-red-600');
                view.classList.add('hidden');
            }
        });
    },

    setClubModalTab(tab) {
        // Botões
        document.querySelectorAll('.club-modal-tab-btn').forEach(btn => {
            const isActive = btn.getAttribute('onclick').includes(`'${tab}'`);
            btn.classList.toggle('text-white', isActive);
            btn.classList.toggle('border-red-600', isActive);
            btn.classList.toggle('border-transparent', !isActive);
            btn.classList.toggle('text-gray-500', !isActive);
        });
        // Conteúdo
        document.querySelectorAll('.club-modal-tab-content').forEach(content => {
            const isActive = content.id === `club-tab-${tab}`;
            content.classList.toggle('hidden', !isActive);
        });
    },

    // --- API FETCHING ---
    
    async loadLeague(key, isRefresh = false, isSportChange = false) {
        const sport = this.state.currentSport;
        const league = this.state.sports[sport].leagues[key];
        if (!league) return;

        // Update header only if it's not a background refresh or if the sport changed
        if (!isRefresh || isSportChange) {
            const leagueTitle = document.getElementById('league-title');
            if (leagueTitle) leagueTitle.innerText = league.name;
            const bgWrapper = document.getElementById('bg-wrapper');
            if (bgWrapper) bgWrapper.style.backgroundImage = `url('${league.bg}')`;
        }
        document.getElementById('league-logo').src = league.logo;

        // Oculta/mostra abas de acordo com o suporte do esporte
        const isSoccer = this.state.currentSport === 'soccer';
        const viewsToToggle = ['btn-standings', 'btn-clubs', 'btn-top-scorers'];

        viewsToToggle.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.style.display = isSoccer ? 'flex' : 'none';
        });

        // Limpa todas as seções
        document.getElementById('view-matches').querySelector('.grid').innerHTML = '';
        document.getElementById('standings-container').innerHTML = '';
        document.getElementById('view-news').innerHTML = '';
        document.getElementById('clubs-container').innerHTML = '';
        document.getElementById('top-scorers-container').innerHTML = '';

        this.setView('matches'); // Define a visão inicial para 'matches' (placar)
        // Carrega todos os dados da liga em paralelo
        console.log(`Carregando todos os dados para: ${league.name}`);
        Promise.allSettled([
            this.loadMatches(key),
            this.loadStandings(),
            this.loadNews(),
            this.loadClubs(),
            this.loadTopScorers()
        ]).then(results => {
            console.log('Todas as seções da liga foram carregadas.', results);
        });
    },

    async loadMatches(key, isRefresh = false) {
        const sport = this.state.currentSport;
        const league = this.state.sports[sport].leagues[key];
        const container = document.getElementById('view-matches').querySelector('.grid');

        
        // Se não for uma atualização forçada, verifica o cache primeiro
        if (!isRefresh && this.state.cache[key]) {
            console.log(`Carregando '${league.name}' do cache.`);
            this.renderMatches(this.state.cache[key]);
            return;
        }

        if (!isRefresh || !container.innerHTML.includes('loader')) {
            container.innerHTML = '<div class="col-span-full mx-auto"><div class="loader"></div></div>';
        }

        fetch(`https://site.api.espn.com/apis/site/v2/sports/${sport}/${league.slug}/scoreboard?lang=pt&region=${this.state.userRegion}`)
            .then(res => res.json())
            .then(data => {
                this.state.cache[key] = data.events || []; // Salva/Atualiza o cache
                this.renderMatches(data.events || []);
            })
            .catch(e => {
                container.innerHTML = '<p class="text-center text-gray-400 col-span-2">Erro ao conectar à ESPN.</p>';
            });
    },

    async loadStandings() {
        const sport = this.state.currentSport;
        const league = this.state.sports[sport].leagues[this.state.currentLeague];
        if (!league) {
            console.error(`Tentando carregar classificação para uma liga inválida.`);
            return;
        }

        const slugsToFetch = league.slugs || [league.slug];
        const container = document.getElementById('standings-container');
        container.innerHTML = '<div class="col-span-full mx-auto p-8"><div class="loader"></div></div>';

        try {
            // Busca os dados de todas as divisões em paralelo
            const responses = await Promise.all(
                slugsToFetch.map(slug => fetch(`https://site.api.espn.com/apis/v2/sports/${sport}/${slug}/standings?lang=pt&region=${this.state.userRegion}`))
            );
            const dataArray = await Promise.all(responses.map(res => res.json()));

            this.state.cache.standings = dataArray; // Armazena os dados no cache
            container.innerHTML = ''; // Limpa o loader

            dataArray.forEach(data => {
                const children = data.children || [];
                this.renderStandings(children, true); // O `true` indica para adicionar ao container
                container.classList.add('content-fade-in');
            });
        } catch (e) {
            container.innerHTML = '<p class="text-center text-red-400 p-4">Classificação indisponível.</p>';
        }
    },

    async loadNews() {
        const container = document.getElementById('view-news');
        container.innerHTML = '<div class="col-span-full mx-auto p-8"><div class="loader"></div></div>';
        const sport = this.state.currentSport;
        const league = this.state.sports[sport].leagues[this.state.currentLeague];

        try {
            const res = await fetch(`https://site.api.espn.com/apis/site/v2/sports/${sport}/${league.slug}/news`);
            const data = await res.json();
            if (container) this.renderNews(data.articles || []);
            container.classList.add('content-fade-in');
        } catch (e) {
            container.innerHTML = '<p class="col-span-full text-center text-red-400 p-4">Não foi possível carregar as notícias.</p>';
        }
    },

    renderNews(articles) {
        const container = document.getElementById('view-news');
        container.innerHTML = '';
        if (articles.length === 0) {
            container.innerHTML = '<p class="col-span-full text-center text-gray-500 py-12">Nenhuma notícia encontrada para esta liga.</p>';
            return;
        }

        articles.slice(0, 12).forEach(article => {
            const imageUrl = article.images?.[0]?.url || 'https://placehold.co/600x400/1e1e1e/ffffff?text=Notícia';
            container.innerHTML += `
                <a href="${article.links.web.href}" target="_blank" rel="noopener noreferrer" class="news-card block group">
                    <div class="aspect-video overflow-hidden">
                        <img src="${imageUrl}" alt="${article.headline}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
                    </div>
                    <div class="p-4">
                        <h3 class="font-bold text-white text-md mb-2 leading-tight group-hover:text-accent-red transition-colors">${article.headline}</h3>
                        <p class="text-gray-400 text-sm">${article.description || ''}</p>
                    </div>
                </a>
            `;
        });
    },

    async loadClubs() {
        const container = document.getElementById('clubs-container');
        container.innerHTML = '<div class="p-8 flex justify-center"><div class="loader"></div></div>';
        const sport = this.state.currentSport;
        const league = this.state.sports[sport].leagues[this.state.currentLeague];

        try {
            // Reutiliza a chamada da classificação para obter a lista de times
            const res = await fetch(`https://site.api.espn.com/apis/v2/sports/${sport}/${league.slug}/standings?lang=pt&region=${this.state.userRegion}`);
            const data = await res.json();
            
            let teams = [];
            if (data.children && data.children.length > 0) {
                data.children.forEach(child => {
                    if (child.standings && child.standings.entries) {
                        child.standings.entries.forEach(entry => {
                            teams.push(entry.team);
                        });
                    }
                });
            }
            
            if (container) container.classList.add('content-fade-in');
            this.state.cache.clubs = teams; // Armazena os times no cache para a busca
            this.renderClubs(teams);
        } catch (e) {
            if (container) container.classList.remove('content-fade-in');
            container.innerHTML = '<p class="text-center text-red-400 p-8">Não foi possível carregar os clubes.</p>';
        }
    },

    async loadTopScorers() {
        const container = document.getElementById('top-scorers-container');
        container.innerHTML = '<div class="p-8 flex justify-center"><div class="loader"></div></div>';
        
        const wikiPageName = this.state.leagueWikipediaMap[this.state.currentLeague];
        if (!wikiPageName) {
            container.innerHTML = '<p class="text-center text-gray-500 p-8">A artilharia para esta liga não está configurada.</p>';
            return;
        }

        try {
            const res = await fetch(`https://pt.wikipedia.org/api/rest_v1/page/html/${encodeURIComponent(wikiPageName)}`);
            if (!res.ok) throw new Error('Página não encontrada na Wikipédia.');
            
            const html = await res.text();
            this.renderTopScorers(html, 'top-scorers-container');
        } catch (e) {
            console.error("Erro ao carregar artilharia:", e);
            container.innerHTML = '<p class="text-center text-red-400 p-8">Não foi possível carregar a artilharia.</p>';
        }
    },

    renderTopScorers(html, containerId) {
        const container = document.getElementById(containerId);
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Tenta encontrar a tabela de artilheiros
        const scorerHeader = Array.from(doc.querySelectorAll('h2, h3')).find(h => h.textContent.toLowerCase().includes('artilharia'));
        let scorerTable = null;

        if (scorerHeader) {
            let nextElement = scorerHeader.nextElementSibling;
            while (nextElement && nextElement.tagName !== 'TABLE') {
                nextElement = nextElement.nextElementSibling;
            }
            if (nextElement && nextElement.tagName === 'TABLE') {
                scorerTable = nextElement;
            }
        }

        if (!scorerTable) {
            container.innerHTML = '<p class="text-center text-gray-500 p-8">Tabela de artilharia não encontrada na página da Wikipédia.</p>';
            return;
        }

        // Limpa e reestrutura a tabela
        scorerTable.querySelectorAll('sup, style, .mw-editsection').forEach(el => el.remove());
        scorerTable.removeAttribute('style');
        scorerTable.setAttribute('class', 'top-scorers-table');

        // Adiciona um cabeçalho mais limpo se necessário ou ajusta o existente
        let thead = scorerTable.querySelector('thead');
        if (!thead) {
            thead = document.createElement('thead');
            thead.innerHTML = `<tr><th>#</th><th>Jogador</th><th>Clube</th><th>Gols</th></tr>`;
            scorerTable.prepend(thead);
        }

        container.innerHTML = `<div class="overflow-x-auto">${scorerTable.outerHTML}</div>`;
    },

    renderClubs(teams, view = 'clubs') {
        const container = document.getElementById('clubs-container');
        if (teams.length === 0) {
            container.innerHTML = '<p class="text-center text-gray-500 p-8">Nenhum clube encontrado para esta liga.</p>';
            return;
        }
        let clubsHTML = '';
        teams.forEach(team => {
            clubsHTML += `
                <div class="club-card bg-surface p-4 rounded-lg border border-border flex items-center gap-4 cursor-pointer hover:bg-surface-light transition" 
                     data-name="${team.displayName.toLowerCase()}"
                     onclick='app.openClubHistory(${JSON.stringify(team)})'>
                    <img src="${team.logos?.[0]?.href || 'https://placehold.co/40x40/2a2a2a/ffffff?text=?'}" class="w-10 h-10 object-contain bg-white rounded-full p-1">
                    <div>
                        <div class="font-bold text-white">${team.displayName}</div>
                        <div class="text-xs text-gray-400">${team.abbreviation}</div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">${clubsHTML}</div>`;
    },

    filterClubs(view = 'clubs') {
        const input = document.getElementById('club-search-input').value.toLowerCase();
        document.querySelectorAll(`#clubs-container .club-card`).forEach(card => {
            const name = card.dataset.name;
            card.style.display = name.includes(input) ? '' : 'none';
        });
    },

    handleGlobalSearch() {
        const input = document.getElementById('global-search-input').value.toLowerCase();
        const resultsContainer = document.getElementById('search-results-container');

        if (input.length < 2) {
            resultsContainer.classList.add('hidden');
            return;
        }

        // Buscar competições
        const leagueResults = [];
        Object.values(this.state.sports).forEach(sport => {
            Object.entries(sport.leagues).forEach(([key, league]) => {
                if (league.name.toLowerCase().includes(input)) {
                    leagueResults.push({ ...league, key: key, sport: sport.name });
                }
            });
        });

        // Buscar times (usando o cache de clubes)
        const teamResults = this.state.cache.clubs.filter(team => 
            team.displayName.toLowerCase().includes(input)
        );

        this.renderSearchResults(leagueResults, teamResults);
    },

    renderSearchResults(leagues, teams) {
        const container = document.getElementById('search-results-container');
        container.innerHTML = '';

        if (leagues.length === 0 && teams.length === 0) {
            container.innerHTML = `<p class="p-4 text-sm text-gray-500 text-center">Nenhum resultado encontrado.</p>`;
            container.classList.remove('hidden');
            return;
        }

        let html = '';
        if (leagues.length > 0) {
            html += `<h4 class="text-xs font-bold text-gray-400 uppercase p-3 border-b border-border">Competições</h4>`;
            leagues.forEach(l => {
                html += `<a href="#" onclick="app.changeLeague('${l.key}'); document.getElementById('search-results-container').classList.add('hidden');" class="flex items-center gap-3 p-3 hover:bg-white/10 transition">
                           <img src="${l.logo}" class="w-6 h-6 object-contain"><span class="text-sm font-bold text-white">${l.name}</span></a>`;
            });
        }
        if (teams.length > 0) {
            html += `<h4 class="text-xs font-bold text-gray-400 uppercase p-3 border-b border-border mt-2">Times</h4>`;
            teams.forEach(t => {
                html += `<a href="#" onclick='app.openClubHistory(${JSON.stringify(t)}); app.closeModal("search-results-container");' class="flex items-center gap-3 p-3 hover:bg-white/10 transition">
                           <img src="${t.logos?.[0]?.href}" class="w-6 h-6 object-contain"><span class="text-sm font-bold text-white">${t.displayName}</span></a>`;
            });
        }
        container.innerHTML = html;
        container.classList.remove('hidden');
    },

    async openClubHistory(team) {
        const modal = document.getElementById('club-history-modal');
        modal.classList.remove('hidden');
        modal.querySelector('.modal-content').classList.add('modal-enter');
        this.setClubModalTab('history'); // Define a aba inicial

        document.getElementById('club-history-name').innerText = team.displayName;
        const historyDiv = document.getElementById('club-tab-history');
        const squadDiv = document.getElementById('club-tab-squad');
        historyDiv.innerHTML = '<div class="loader w-6 h-6 mx-auto my-8"></div>';
        squadDiv.innerHTML = '<div class="loader w-6 h-6 mx-auto my-8"></div>';
        this.renderPerformanceChart(team.id, 'club-tab-performance');

        // Normaliza o nome do time, removendo sufixos como (Libertadores) para a busca.
        const normalizedDisplayName = team.displayName.replace(/\s*\((Libertadores|Sul-Americana)\)/i, '').trim();

        // Tenta buscar na Wikipédia com nomes diferentes para mais precisão
        const fullName = this.state.teamNameMap[normalizedDisplayName] || normalizedDisplayName;
        const searchTerms = [
            fullName, // Tenta primeiro com o nome mapeado
            normalizedDisplayName // Depois com o nome normalizado
        ].filter((value, index, self) => self.indexOf(value) === index && Boolean(value)); // Remove duplicados e nulos
        let wikipediaHtml = null;
        let wikipediaLink = '';

        for (const term of searchTerms) {
            try {
                const res = await fetch(`https://pt.wikipedia.org/api/rest_v1/page/html/${encodeURIComponent(term)}`);
                if (res.ok) {
                    wikipediaHtml = await res.text();
                    wikipediaLink = `https://pt.wikipedia.org/wiki/${encodeURIComponent(term)}`;
                    break; // Para na primeira busca bem-sucedida
                }
            } catch (e) { /* Ignora erros para tentar o próximo termo */ }
        }

        if (wikipediaHtml) {
            historyDiv.innerHTML = `<a href="${wikipediaLink}" target="_blank" rel="noopener noreferrer" class="text-accent-red hover:underline text-xs mb-4 inline-block">Ver artigo original na Wikipédia ↗</a>${wikipediaHtml}`;
            this.renderSquad(wikipediaHtml, 'club-tab-squad');
        } else {
            console.error("Erro ao carregar história do clube da Wikipédia para:", team.displayName);
            historyDiv.innerHTML = '<p class="text-center text-red-400">Não foi possível carregar a história do clube.</p>';
            squadDiv.innerHTML = '<p class="text-center text-red-400">Não foi possível carregar o elenco.</p>';
        }
    },

    renderSquad(html, containerId) {
        const container = document.getElementById(containerId);
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Tenta encontrar a tabela do elenco. Seletores comuns são 'Elenco_atual' ou tabelas com 'Jogador' no header.
        const squadHeader = doc.getElementById('Elenco_atual') || Array.from(doc.querySelectorAll('h2, h3')).find(h => h.textContent.toLowerCase().includes('elenco'));
        let squadTable = null;

        if (squadHeader) {
            let nextElement = squadHeader.nextElementSibling;
            while (nextElement && nextElement.tagName !== 'TABLE') {
                nextElement = nextElement.nextElementSibling;
            }
            if (nextElement && nextElement.tagName === 'TABLE') {
                squadTable = nextElement;
            }
        }

        // Se não encontrou, tenta uma busca mais genérica
        if (!squadTable) {
            squadTable = Array.from(doc.querySelectorAll('.wikitable')).find(table => table.textContent.includes('Pos.') && table.textContent.includes('Jogador'));
        }

        if (!squadTable) {
            container.innerHTML = '<p class="text-center text-gray-500 p-4">Não foi possível encontrar a tabela de elenco na página.</p>';
            return;
        }

        // Limpa classes e estilos desnecessários da tabela para melhor visualização
        squadTable.querySelectorAll('sup, style, .mw-editsection').forEach(el => el.remove());

        const newTable = document.createElement('table');
        newTable.className = 'squad-table w-full text-sm text-left';
        
        const newThead = document.createElement('thead');
        newThead.innerHTML = '<tr><th class="p-2 w-12">Foto</th><th>Jogador</th><th class="hidden md:table-cell">Pos.</th><th class="hidden md:table-cell">Nac.</th></tr>';
        newTable.appendChild(newThead);

        const tbody = document.createElement('tbody');
        const bodyRows = squadTable.querySelectorAll('tbody tr');

        bodyRows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length < 2) return; // Pula linhas inválidas

            const playerCell = Array.from(cells).find(c => c.querySelector('a[href^="/wiki/"]'));
            if (!playerCell) return;

            const playerLink = playerCell.querySelector('a');
            const playerName = playerLink ? playerLink.textContent.trim() : playerCell.textContent.trim();
            const playerWikiLink = playerLink ? playerLink.getAttribute('href') : '';

            // Tenta encontrar posição e nacionalidade
            const posCell = cells[0]; // Geralmente a primeira ou segunda célula
            const nationalityCell = Array.from(cells).find(c => c.querySelector('.flagicon'));

            const newRow = document.createElement('tr');

            // Célula da Foto (Placeholder)
            const photoTd = document.createElement('td');
            photoTd.className = 'p-1';
            const photoDiv = document.createElement('div');
            photoDiv.className = 'player-photo-placeholder lazy-load-player-image';
            if (playerWikiLink) {
                photoDiv.setAttribute('data-wiki-link', playerWikiLink);
            }
            photoDiv.innerHTML = '<i data-lucide="user"></i>';
            photoTd.appendChild(photoDiv);
            newRow.appendChild(photoTd);

            // Célula do Jogador
            const nameTd = document.createElement('td');
            nameTd.textContent = playerName;
            newRow.appendChild(nameTd);

            // Célula da Posição
            const posTd = document.createElement('td');
            posTd.className = 'hidden md:table-cell';
            posTd.textContent = posCell.textContent.trim();
            newRow.appendChild(posTd);

            // Célula da Nacionalidade
            const natTd = document.createElement('td');
            natTd.className = 'hidden md:table-cell';
            if (nationalityCell) {
                const flagImg = nationalityCell.querySelector('img');
                if (flagImg) {
                    flagImg.style.width = '20px';
                    flagImg.style.height = 'auto';
                    flagImg.style.border = '1px solid #444';
                    natTd.appendChild(flagImg);
                }
            }
            newRow.appendChild(natTd);

            tbody.appendChild(newRow);
        });

        newTable.appendChild(tbody);

        container.innerHTML = `<div class="overflow-x-auto">${newTable.outerHTML}</div>`;
        lucide.createIcons();
    },

    async fetchPlayerImage(element) {
        const wikiLink = element.dataset.wikiLink;
        if (!wikiLink) return;

        try {
            const res = await fetch(`https://pt.wikipedia.org/api/rest_v1/page/html/${wikiLink.split('/').pop()}`);
            if (!res.ok) return;

            const html = await res.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Tenta encontrar a imagem no infobox
            const imageElement = doc.querySelector('.infobox .image img');
            if (imageElement) {
                const imageUrl = imageElement.src;
                // Substitui o ícone pela imagem
                element.innerHTML = `<img src="${imageUrl}" class="player-photo" alt="Foto do jogador">`;
                element.querySelector('img').onload = () => {
                    element.querySelector('img').classList.add('image-fade-in');
                };
            }
        } catch (e) {
            console.error('Falha ao buscar imagem do jogador:', e);
        }
    },

    initImageLazyLoader() {
        const lazyImages = document.querySelectorAll('.lazy-load-player-image');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.fetchPlayerImage(entry.target);
                    observer.unobserve(entry.target); // Para de observar após carregar
                }
            });
        });
        lazyImages.forEach(img => imageObserver.observe(img));
    },

    renderPerformanceChart(teamId, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = ''; // Limpa o conteúdo anterior

        let teamEntry = null;
        // Procura o time nos dados de classificação cacheados
        for (const group of this.state.cache.standings) {
            for (const child of group.children) {
                teamEntry = child.standings?.entries.find(e => e.team.id === teamId);
                if (teamEntry) break;
            }
            if (teamEntry) break;
        }

        if (!teamEntry) return;

        const formStat = teamEntry.stats.find(s => s.name === 'form');
        if (!formStat || !formStat.displayValue) return;

        const form = formStat.displayValue.split(''); // Ex: ['W', 'W', 'L', 'D', 'W']
        const results = { W: 0, D: 0, L: 0 };
        form.forEach(r => { if (results[r] !== undefined) results[r]++; });

        const chartData = [
            { label: 'Vitórias', value: results.W, color: '#00cc99' },
            { label: 'Empates', value: results.D, color: '#fbbf24' },
            { label: 'Derrotas', value: results.L, color: '#ef4444' }
        ];

        const maxValue = Math.max(...chartData.map(d => d.value), 1); // Evita divisão por zero

        const bars = chartData.map(d => `
            <div class="chart-bar-group">
                <div class="chart-label">${d.label} (${d.value})</div>
                <div class="chart-bar-bg">
                    <div class="chart-bar" style="width: ${(d.value / maxValue) * 100}%; background-color: ${d.color};"></div>
                </div>
            </div>
        `).join('');

        container.innerHTML = bars;
    },

    // Função para obter uma cor de texto contrastante (branco ou preto)
    getContrastColor(hexColor) {
        if (!hexColor) return '#FFFFFF';
        // Expande cores hexadecimais de 3 para 6 dígitos
        if (hexColor.length === 3) {
            hexColor = hexColor.split('').map(char => char + char).join('');
        }
        const r = parseInt(hexColor.substr(0, 2), 16);
        const g = parseInt(hexColor.substr(2, 2), 16);
        const b = parseInt(hexColor.substr(4, 2), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? '#000000' : '#FFFFFF';
    },

    renderMatches(events) {
        const container = document.getElementById('view-matches');
        if (!container) return;
        const div = container.querySelector('.grid');
        if(events.length === 0) { div.innerHTML = '<p class="col-span-full text-center text-gray-500 py-12">Nenhum jogo hoje ou dados indisponíveis.</p>'; return; }

        events.forEach(ev => {
            const comp = ev.competitions[0];
            const home = comp.competitors.find(c => c.homeAway === 'home');
            const away = comp.competitors.find(c => c.homeAway === 'away');
            const isLive = ev.status.type.state === 'in';
            const clock = isLive ? ev.status.displayClock.replace(/'/g, '') : ev.status.type.shortDetail;
            const broadcast = this.getBroadcastForRegion(comp.broadcasts);
            
            div.innerHTML += `
                <div class="game-card p-4 cursor-pointer relative group overflow-hidden ${isLive ? 'border-red-500/50 bg-red-900/20' : ''}" onclick="app.openMatch('${ev.id}')">
                    ${isLive ? `<div class="absolute top-0 right-0 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl live-pulse">AO VIVO • ${clock}</div>` : ''}
                    <div class="flex items-center gap-4">
                        <div class="w-16 text-center border-r border-white/10 pr-4 flex-shrink-0">
                            <div class="text-[10px] font-bold text-gray-400 uppercase mb-1">${isLive ? 'JOGANDO' : ev.status.type.shortDetail}</div>
                            <div class="text-[9px] text-gray-500 text-ellipsis overflow-hidden">${broadcast ? '📺 '+broadcast : ''}</div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex justify-between items-center mb-2">
                                <div class="flex items-center gap-2 truncate">
                                    <img src="${home.team.logo}" class="w-6 h-6 object-contain bg-white rounded-full p-0.5" style="border: 2px solid #${home.team.color || 'transparent'}">
                                    <span class="text-sm font-bold truncate" style="color: #${home.team.color || 'FFFFFF'}">${home.team.displayName}</span>
                                </div>
                                <div class="flex rounded-md overflow-hidden font-bold text-lg shadow-inner">
                                    <span style="background-color: #${home.team.color || '374151'}; color: ${this.getContrastColor(home.team.color || '374151')}" class="px-2 py-0.5">${home.score || '0'}</span>
                                </div>
                            </div>
                            <div class="flex justify-between items-center">
                                <div class="flex items-center gap-2 truncate">
                                    <img src="${away.team.logo}" class="w-6 h-6 object-contain bg-white rounded-full p-0.5" style="border: 2px solid #${away.team.color || 'transparent'}">
                                    <span class="text-sm font-bold truncate" style="color: #${away.team.color || 'FFFFFF'}">${away.team.displayName}</span>
                                </div>
                                <div class="flex rounded-md overflow-hidden font-bold text-lg shadow-inner">
                                    <span style="background-color: #${away.team.color || '374151'}; color: ${this.getContrastColor(away.team.color || '374151')}" class="px-2 py-0.5">${away.score || '0'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        lucide.createIcons();
        container.classList.add('content-fade-in');
    },

    getBroadcastForRegion(broadcasts) {
        if (!broadcasts || broadcasts.length === 0) return '';
        // Tenta encontrar uma transmissão para a região do usuário
        const regionalBroadcast = broadcasts.find(b => b.market === this.state.userRegion);
        if (regionalBroadcast) return regionalBroadcast.names[0];
        // Se não encontrar, retorna a primeira da lista (geralmente a principal)
        return broadcasts[0].names[0];
    },

    renderStandings(children, append = false) {
        const container = document.getElementById('standings-container');
        if (!append) container.innerHTML = '';
        if (children.length === 0 && !append) {
            container.innerHTML = '<p class="text-center text-gray-500 w-full">Dados não encontrados.</p>';
            return;
        }

        // Pega os jogos do dia que estão no cache para adicionar o contexto na tabela
        const todaysMatches = this.state.cache[this.state.currentLeague] || [];

        children.forEach(child => {
            const groupName = child.name || 'Classificação Geral';
            const entries = child.standings?.entries || [];

            if(entries.length === 0) return;
            
            const tableWrapper = document.createElement('div');
            tableWrapper.className = 'standings-table-wrapper bg-surface rounded-xl border-border overflow-hidden flex flex-col';
            tableWrapper.dataset.groupName = groupName; // Adiciona para fácil identificação
            
            let rowsHTML = '';
            entries.forEach((entry, idx) => {
                const stats = entry.stats;
                const getStat = (n) => stats.find(s => s.name === n)?.value ?? 0;
                
                // Lógica de cores para classificação baseada na API
                const note = entry.note;
                const rank = stats.find(s => s.name === 'rank')?.value ?? (idx + 1);
                let borderColor = 'transparent';
                if (note && note.color) {
                    borderColor = `#${note.color}`;
                }

                // Procura o jogo do time atual na lista de jogos do dia
                const match = todaysMatches.find(ev => ev.competitions[0].competitors.some(c => c.id === entry.team.id));
                let matchInfoHTML = '';
                if (match) {
                    const competition = match.competitions[0];
                    const homeTeam = competition.competitors.find(c => c.homeAway === 'home');
                    const awayTeam = competition.competitors.find(c => c.homeAway === 'away');
                    const opponent = homeTeam.id === entry.team.id ? awayTeam : homeTeam;
                    const isLive = match.status.type.state === 'in';
                    const score = isLive ? `${homeTeam.score || 0} - ${awayTeam.score || 0}` : match.status.type.shortDetail;

                    matchInfoHTML = `
                        <div class="text-[10px] text-gray-400 mt-1 flex items-center gap-1.5 cursor-pointer hover:opacity-80" onclick="app.openMatch('${match.id}')">
                            <img src="${opponent.team.logo}" class="w-3 h-3 object-contain">
                            <span>vs ${opponent.team.abbreviation}</span>
                            <span class="font-bold ${isLive ? 'text-red-400 animate-pulse' : ''}">${score}</span>
                        </div>
                    `;
                }
                
                rowsHTML += `
                    <tr class="border-b border-[#333] text-gray-300 hover:bg-white/5 transition" data-team-id="${entry.team.id}" data-original-stats='${JSON.stringify(entry.stats)}' title="${note?.description || ''}">
                        <td class="p-3 text-center font-mono text-xs border-l-4 rank-cell" style="border-color: ${borderColor};">
                            ${rank}
                        </td>
                        <td class="p-3 flex items-center gap-3 min-w-[150px] team-cell">
                            <img src="${entry.team.logos?.[0]?.href}" class="w-6 h-6 bg-white rounded-full p-0.5 object-contain">
                            <div>
                                <span class="font-bold text-white text-xs md:text-sm">${entry.team.displayName}</span>
                                ${matchInfoHTML}
                            </div>
                        </td>
                        <td class="p-3 text-center font-bold text-white bg-[#2a2a2a]">${getStat('points')}</td>
                        <td class="p-3 text-center text-gray-500">${getStat('gamesPlayed')}</td>
                        <td class="p-3 text-center text-green-400 hidden sm:table-cell">${getStat('wins')}</td>
                        <td class="p-3 text-center text-yellow-400 hidden sm:table-cell">${getStat('ties')}</td>
                        <td class="p-3 text-center text-red-400 hidden sm:table-cell">${getStat('losses')}</td>
                        <td class="p-3 text-center text-gray-400 hidden md:table-cell">${getStat('pointDifferential')}</td>
                    </tr>
                `;
            });

            tableWrapper.innerHTML = `
                <div class="bg-surface-light p-3 border-b border-border flex justify-between items-center">
                    <h3 class="font-bold text-white uppercase text-sm text-red-500">${groupName}</h3>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left">
                        <thead class="text-xs text-gray-500 uppercase bg-[#1a1a1a]">
                            <tr>
                                <th class="p-3 text-center">#</th>
                                <th class="p-3">Time</th>
                                <th class="p-3 text-center">P</th>
                                <th class="p-3 text-center">J</th>
                                <th class="p-3 text-center hidden sm:table-cell">V</th>
                                <th class="p-3 text-center hidden sm:table-cell">E</th>
                                <th class="p-3 text-center hidden sm:table-cell">D</th>
                                <th class="p-3 text-center hidden md:table-cell">SG</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[#333]">${rowsHTML}</tbody>
                    </table>
                </div>
            `;
            container.appendChild(tableWrapper);
        });
    },

    updateTeamRowInStandings(teamId, result) {
        const row = document.querySelector(`tr[data-team-id="${teamId}"]`);
        if (!row || !row.dataset.originalStats) return;

        const originalStats = JSON.parse(row.dataset.originalStats);
        const getStat = (name) => originalStats.find(s => s.name.toLowerCase() === name.toLowerCase())?.value || 0;

        let points = getStat('points');
        let gamesPlayed = getStat('gamesPlayed');
        let wins = getStat('wins');
        let ties = getStat('ties');
        let losses = getStat('losses');

        // Simula o resultado
        gamesPlayed++;
        if (result === 'win') {
            points += 3;
            wins++;
        } else if (result === 'tie') {
            points += 1;
            ties++;
        } else { // loss
            losses++;
        }

        // Atualiza as células da tabela
        const cells = row.cells;
        cells[2].innerHTML = `${points} <span class="text-green-400 text-xs animate-pulse">+${points - getStat('points')}</span>`;
        cells[3].textContent = gamesPlayed;
        if (cells.length > 4) {
            cells[4].textContent = wins;
            cells[5].textContent = ties;
            cells[6].textContent = losses;
        }
        
        // Adiciona um brilho para destacar a mudança
        row.classList.add('live-update-pulse');
        setTimeout(() => row.classList.remove('live-update-pulse'), 2000);
    },

    // --- MATCH DETAIL ---
    async openMatch(id) {
        const modal = document.getElementById('match-modal');
        modal.classList.remove('hidden');
        modal.querySelector('.bg-dark-bg').classList.add('modal-enter');
        clearInterval(this.state.matchRefreshInterval); // Limpa qualquer atualização anterior
        this.state.matchRefreshInterval = null;
        this.state.lastGoalCount = 0; // Reseta a contagem de gols ao abrir um novo jogo

        this.setModalTab('stats');

        document.getElementById('incidents-list').innerHTML = '<p class="text-center text-gray-500 text-xs mt-4">Carregando lances...</p>';

        document.getElementById('stats-container').innerHTML = '<p class="text-center text-gray-500 text-xs">Carregando...</p>';
        const sport = this.state.currentSport;
        const league = this.state.sports[sport].leagues[this.state.currentLeague];
        const url = `https://site.api.espn.com/apis/site/v2/sports/${sport}/${league.slug}/summary?event=${id}&lang=pt&region=${this.state.userRegion}`;
        const fetchData = async () => {
            const res = await fetch(url);
            const data = await res.json();
            const comp = data.header.competitions[0];
            const home = comp.competitors.find(c => c.homeAway === 'home');
            const away = comp.competitors.find(c => c.homeAway === 'away');

            // Atualiza o cabeçalho e informações apenas na primeira carga
            if (!this.state.matchRefreshInterval) {
                document.getElementById('modal-home').innerText = home.team.displayName;
                document.getElementById('modal-home-logo').src = home.team.logos[0].href;
                document.getElementById('modal-away').innerText = away.team.displayName;
                document.getElementById('modal-away-logo').src = away.team.logos[0].href;
                const broadcast = this.getBroadcastForRegion(comp.broadcasts) || 'Sem transmissão listada';
                document.getElementById('broadcast-text').innerText = broadcast;
                const venue = data.gameInfo?.venue?.fullName || 'Estádio não informado';
                document.getElementById('game-info').innerHTML = `<p><strong>Estádio:</strong> ${venue}</p><p><strong>Data:</strong> ${new Date(data.header.competitions[0].date).toLocaleString('pt-BR')}</p>`;
            }

            const modalClock = document.getElementById('modal-clock');
            const modalStatus = document.getElementById('modal-status');

            document.getElementById('modal-score').innerText = `${home.score} : ${away.score}`;

            if (comp.status.type.state === 'in') {
                modalClock.innerText = comp.status.displayClock.replace(/'/g, '');
                modalClock.classList.remove('hidden');
                modalStatus.innerText = comp.status.type.shortDetail; // Usa o status curto (ex: 'HT' para intervalo)
            } else {
                modalStatus.innerText = comp.status.type.detail; // Usa o status completo (ex: 'Encerrado')
                modalClock.classList.add('hidden');
            }

            // Atualiza a tabela de classificação em tempo real
            if (comp.status.type.state === 'in' && this.state.view === 'standings') {
                this.updateLiveStandings(home, away);
            } 

            this.renderIncidents(data.plays || [], home.id);
            this.renderStats(data.boxscore?.teams || []);

            // Se o jogo acabou, para de atualizar
            if (comp.status.type.state === 'post') {
                clearInterval(this.state.matchRefreshInterval);
                this.state.matchRefreshInterval = null;
                if (this.state.view === 'standings') this.loadStandings(); // Recarrega a classificação final
            }
        };

        await fetchData(); // Carga inicial

        // Inicia o intervalo de atualização apenas se o jogo estiver ao vivo
        const initialData = await (await fetch(url)).json();
        if (initialData.header.competitions[0].status.type.state === 'in') {
            this.state.matchRefreshInterval = setInterval(fetchData, 15000); // Atualiza a cada 15s
        }
    },

    updateLiveStandings(home, away) {
        const homeScore = parseInt(home.score) || 0;
        const awayScore = parseInt(away.score) || 0;

        // Determina o resultado parcial
        const homeResult = homeScore > awayScore ? 'win' : (homeScore < awayScore ? 'loss' : 'tie');
        const awayResult = awayScore > homeScore ? 'win' : (awayScore < homeScore ? 'loss' : 'tie');

        this.updateTeamRowInStandings(home.id, homeResult);
        this.updateTeamRowInStandings(away.id, awayResult);
    },

    closeModal(id) {
        const modal = document.getElementById(id);
        if (!modal) return;
        if (id === 'search-results-container') { modal.classList.add('hidden'); } else { modal.classList.add('hidden'); }
        modal.querySelector('.bg-surface, .bg-dark-bg')?.classList.remove('modal-enter');
        if (id === 'match-modal') {
            if (this.state.matchRefreshInterval) {
                    clearInterval(this.state.matchRefreshInterval);
                    this.state.matchRefreshInterval = null;
                }
            if (this.state.view === 'standings') this.loadStandings();
        }
        if (id === 'settings-modal') {
            modal.classList.add('hidden');
        }
    },

    renderIncidents(plays, homeId) {
        const div = document.getElementById('incidents-list');
        div.innerHTML = '';
        // A API retorna os tipos de evento em inglês
        const keyEvents = plays.filter(p => p.type.text.toLowerCase().includes('goal') || p.type.text.toLowerCase().includes('card'));
        const goalEvents = keyEvents.filter(p => p.type.text.toLowerCase().includes('goal'));

        // Dispara a animação de gol se um novo gol for detectado
        if (goalEvents.length > this.state.lastGoalCount) {
            const overlay = document.getElementById('goal-animation-overlay');
            overlay.classList.add('show');
            setTimeout(() => overlay.classList.remove('show'), 2500); // Remove a classe após a animação
        }
        this.state.lastGoalCount = goalEvents.length;


        if(keyEvents.length === 0) { div.innerHTML = '<p class="text-center text-gray-500 text-xs mt-4">Sem lances principais.</p>'; return; }
        
        keyEvents.reverse().forEach(p => {
            const isHome = p.team?.id === homeId;
            let icon = '⚽'; // Padrão para Gol
            if (p.type.text.toLowerCase().includes('card')) {
                icon = p.text.toLowerCase().includes('vermelho') ? '🟥' : '🟨';
            }
            div.innerHTML += `
                <div class="flex items-center gap-3 p-2 border-l-2 ${isHome ? 'border-blue-500 bg-blue-500/5' : 'border-red-500 bg-red-500/5 flex-row-reverse text-right'} mb-2 rounded text-xs transition hover:bg-white/5">
                    <span class="font-bold text-gray-300 font-mono w-8">${p.clock.displayValue}</span>
                    <span class="text-lg">${icon}</span>
                    <span class="text-gray-300 flex-1">${p.text}</span>
                </div>
            `;
        });
    },

    renderStats(teams) {
        const div = document.getElementById('stats-container');
        div.innerHTML = '';
        if(!teams || teams.length < 2) { div.innerHTML='<p class="text-center text-gray-500 text-xs">Indisponível</p>'; return; }
        const hStats = teams[1].statistics; 
        const aStats = teams[0].statistics;
        if(!hStats || !aStats) return;

        hStats.forEach((s, i) => {
            const label = s.label;
            const hVal = s.displayValue;
            const aVal = aStats[i]?.displayValue || '0';
            const hNum = parseInt(hVal) || 0;
            const aNum = parseInt(aVal) || 0;
            const total = hNum + aNum;
            const perc = total > 0 ? (hNum/total)*100 : 50;
            div.innerHTML += `
                <div class="mb-2">
                    <div class="flex justify-between text-[10px] font-bold text-gray-400 uppercase mb-1 px-1"><span>${hVal}</span><span>${label}</span><span>${aVal}</span></div>
                    <div class="flex h-1 bg-[#333] rounded-full overflow-hidden"><div class="bg-blue-600" style="width:${perc}%"></div><div class="bg-red-600" style="width:${100-perc}%"></div></div>
                </div>
            `;
        });
    },

    openPlayer(name, pos, team, img, stats) {
        const modal = document.getElementById('player-modal');
        modal.classList.remove('hidden');
        modal.querySelector('.bg-surface').classList.add('modal-enter');
        document.getElementById('player-modal-name').innerText = name;
        document.getElementById('player-modal-pos').innerText = pos;
        document.getElementById('player-modal-team').innerText = team;
        document.getElementById('player-modal-img').src = (img && img !== 'undefined') ? img : 'https://placehold.co/100x100/2a2a2a/ffffff?text=Jog';
        
        const statsDiv = document.getElementById('player-modal-stats');
        statsDiv.innerHTML = '';
        if(!stats || stats.length === 0) {
            statsDiv.innerHTML = '<p class="col-span-2 text-center text-gray-500">Sem dados.</p>';
            return;
        }
        const keyStats = ['gols', 'assistências', 'finalizações', 'faltas cometidas', 'defesas'];
        const relevant = stats.filter(s => keyStats.includes(s.name.toLowerCase()) || parseInt(s.value) > 0).slice(0, 6);
        relevant.forEach(s => {
             statsDiv.innerHTML += `<div class="bg-white/5 p-2 rounded text-center"><span class="block text-xs text-gray-500 uppercase">${s.label}</span><span class="font-bold text-white">${s.displayValue}</span></div>`;
        });
    }
};
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});