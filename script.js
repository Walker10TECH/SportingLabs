const app = {
    state: {
        currentSport: 'soccer',
        currentLeague: 'brasileirao',
        view: 'matches',
        modalTab: 'stats',
        matchRefreshInterval: true,
        lastGoalCount: 0,
        userRegion: 'br',
        sports: {
            'soccer': {
                name: 'Futebol',
                leagues: {
                    'brasileirao': { slug: 'bra.1', slugs: ['bra.1', 'bra.2'], name: 'Brasileirão', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/85.png', bg: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/04/taca-e1712177532245.jpeg?w=910', wiki: 'https://pt.wikipedia.org/wiki/Campeonato_Brasileiro_de_Futebol_-_S%C3%A9rie_A', wikiTopScorers: 'Lista_de_artilheiros_do_Campeonato_Brasileiro_de_Futebol' },
                    'libertadores': { slug: 'conmebol.libertadores', name: 'Libertadores', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/68.png', bg: 'https://lncimg.lance.com.br/cdn-cgi/image/width=950,quality=75,fit=pad,format=webp/uploads/2021/01/29/60141dfea45a6.jpeg', wiki: 'https://pt.wikipedia.org/wiki/Copa_Libertadores_da_Am%C3%A9rica' },
                    'sulamericana': { slug: 'conmebol.sudamericana', name: 'Sul-Americana', logo: 'https://play-lh.googleusercontent.com/CuPkacdZsi9ApxBOnGwPBAV-zikx8VKmRbMUYVfB-vy-DsNfrQ6ykY6lMcj8iqR7oC5u', bg: 'https://s2-ge.glbimg.com/-M2a9kZoesn0lYulcHlg0hIvCko=/0x0:1280x853/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2022/j/Y/BAJcXyRz6Iz6Svtlf1AA/244ecb3d-2cab-4933-87e0-de24261e1696.jfif', wiki: 'https://pt.wikipedia.org/wiki/Copa_Sul-Americana' },
                    'champions': { slug: 'uefa.champions', name: 'Champions League', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/2.png', bg: 'https://lncimg.lance.com.br/cdn-cgi/image/width=1280,height=720,quality=75,fit=cover/uploads/2023/03/17/641465f53b411.jpeg', wiki: 'https://pt.wikipedia.org/wiki/Liga_dos_Campe%C3%B5es_da_UEFA' },
                    'premier': { slug: 'eng.1', slugs: ['eng.1', 'eng.2'], name: 'Inglaterra', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/23.png', bg: 'https://lncimg.lance.com.br/cdn-cgi/image/width=950,quality=75,fit=pad,format=webp/uploads/2020/04/05/5e8a04ba97834.jpeg', wiki: 'https://pt.wikipedia.org/wiki/Premier_League', wikiTopScorers: 'Lista_de_artilheiros_da_Premier_League' },
                    'laliga': { slug: 'esp.1', slugs: ['esp.1', 'esp.2'], name: 'Espanha', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/15.png', bg: 'https://assets.goal.com/images/v3/blt054a5ddddf1e5a2b/158f203189e94419d7010667f379da35bcf16d8e.jpg', wiki: 'https://pt.wikipedia.org/wiki/La_Liga', wikiTopScorers: 'Anexo:Lista_de_artilheiros_da_La_Liga' },
                    'seriea': { slug: 'ita.1', slugs: ['ita.1', 'ita.2'], name: 'Itália', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/12.png', bg: 'https://cloudfront-us-east-1.images.arcpublishing.com/newr7/L6ZP3CEJ6VMPNFT5HTW7H7L7LY.jpg', wiki: 'https://pt.wikipedia.org/wiki/Campeonato_Italiano_de_Futebol_-_S%C3%A9rie_A', wikiTopScorers: 'Lista_de_artilheiros_do_Campeonato_Italiano_de_Futebol' },
                    'bundesliga': { slug: 'ger.1', slugs: ['ger.1', 'ger.2'], name: 'Alemanha', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/10.png', bg: 'https://s2-ge.glbimg.com/F2PP74GbwM16ougDWVMDhZzEp6U=/0x0:1024x659/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2024/X/Y/3pfuBhTzuraB6EHOqszA/gettyimages-1742744089.jpg', wiki: 'https://pt.wikipedia.org/wiki/Bundesliga', wikiTopScorers: 'Lista_de_artilheiros_da_Fußball-Bundesliga' },
                    'eredivisie': { slug: 'ned.1', slugs: ['ned.1', 'ned.2'], name: 'Holanda', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Eredivisie_nieuw_logo_2017-.svg', bg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGutuFAjY1Jn4Egu_ncE2-IMj_zUDooPWDQ&s', wiki: 'https://pt.wikipedia.org/wiki/Eredivisie' },
                    'argentina': { slug: 'arg.1', slugs: ['arg.1', 'arg.2'], name: 'Argentina', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/1.png', bg: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/12/Capturar_e27e29.jpg?w=793', wiki: 'https://pt.wikipedia.org/wiki/Campeonato_Argentino_de_Futebol' },
                    'saudi': { slug: 'ksa.1', name: 'Arábia Saudita', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Saudi_Pro_League_Logo.svg/1196px-Saudi_Pro_League_Logo.svg.png', bg: 'https://www.365scores.com/pt-br/news/magazine/wp-content/uploads/2023/11/366423961_5646928382077000_2604818796297545939_n-e1699379331310.jpg', wiki: 'https://en.wikipedia.org/wiki/Saudi_Pro_League' }
                },
            },
            'basketball': {
                name: 'Basquete',
                leagues: {
                    'nba': { slug: 'nba', name: 'NBA', logo: 'https://a.espncdn.com/i/teamlogos/leagues/500/nba.png', bg: 'https://content.sportslogos.net/news/2023/12/nba-christmas-court-milwaukee-bucks-fiserv-forum-2023.jpg' }, // Imagem de fundo corrigida
                }
            },
            'football': {
                name: 'Futebol Americano',
                leagues: {
                    'nfl': { slug: 'nfl', name: 'NFL', logo: 'https://a.espncdn.com/i/teamlogos/leagues/500/nfl.png', bg: 'https://static.www.nfl.com/image/private/t_editorial_landscape_12_desktop/league/k55d4s5w72vgxxdq4vje' }, // Imagem de fundo corrigida
                }
            }
        },
        topScorersData: null, // Cache para os dados dos artilheiros
        playersData: null, // Cache para os dados dos jogadores da Wikipedia
        cache: {},
        teamWikiDb: {
            'brasileirao': {
                'Flamengo': 'Clube_de_Regatas_do_Flamengo',
                'Palmeiras': 'Sociedade_Esportiva_Palmeiras',
                'Corinthians': 'Sport_Club_Corinthians_Paulista',
                'São Paulo': 'São_Paulo_Futebol_Clube',
                'Grêmio': 'Grêmio_Foot-Ball_Porto_Alegrense',
                'Internacional': 'Sport_Club_Internacional',
                'Atlético Mineiro': 'Clube_Atlético_Mineiro',
                'Fluminense': 'Fluminense_Football_Club',
                'Botafogo': 'Botafogo_de_Futebol_e_Regatas',
                'Vasco da Gama': 'Club_de_Regatas_Vasco_da_Gama',
                'Santos': 'Santos_Futebol_Clube',
                'Cruzeiro': 'Cruzeiro_Esporte_Clube',
                'Bahia': 'Esporte_Clube_Bahia',
                'Athletico Paranaense': 'Club_Athletico_Paranaense',
                'Fortaleza': 'Fortaleza_Esporte_Clube',
                'Cuiabá': 'Cuiabá_Esporte_Clube',
                'Red Bull Bragantino': 'Red_Bull_Bragantino',
                'Juventude': 'Esporte_Clube_Juventude',
                'Criciúma': 'Criciúma_Esporte_Clube',
                'Vitória': 'Esporte_Clube_Vitória'
            },
            'premier': {
                'Manchester City': 'Manchester_City_F.C.',
                'Manchester United': 'Manchester_United_F.C.',
                'Liverpool': 'Liverpool_F.C.',
                'Arsenal': 'Arsenal_F.C.',
                'Chelsea': 'Chelsea_F.C.',
                'Tottenham Hotspur': 'Tottenham_Hotspur_F.C.',
                'Newcastle United': 'Newcastle_United_F.C.',
                'Aston Villa': 'Aston_Villa_F.C.',
                'Everton': 'Everton_F.C.',
                'West Ham United': 'West_Ham_United_F.C.'
            },
            'laliga': {
                'Real Madrid': 'Real_Madrid_Club_de_Fútbol',
                'Barcelona': 'Fútbol_Club_Barcelona',
                'Atlético Madrid': 'Club_Atlético_de_Madrid',
                'Sevilla': 'Sevilla_Fútbol_Club',
                'Valencia': 'Valencia_Club_de_Fútbol',
                'Real Sociedad': 'Real_Sociedad_de_Fútbol',
                'Athletic Bilbao': 'Athletic_Club'
            },
            'seriea': {
                'Juventus': 'Juventus_Football_Club',
                'Inter': 'Football_Club_Internazionale_Milano',
                'AC Milan': 'Associazione_Calcio_Milan',
                'Milan': 'Associazione_Calcio_Milan',
                'Napoli': 'Società_Sportiva_Calcio_Napoli',
                'AS Roma': 'Associazione_Sportiva_Roma',
                'Roma': 'Associazione_Sportiva_Roma',
                'Lazio': 'Società_Sportiva_Lazio',
                'Fiorentina': 'ACF_Fiorentina'
            },
            'bundesliga': {
                'Bayern Munich': 'Fußball-Club_Bayern_München',
                'Borussia Dortmund': 'Ballspielverein_Borussia_09_e._V._Dortmund',
                'RB Leipzig': 'RB_Leipzig',
                'Bayer Leverkusen': 'Bayer_04_Leverkusen'
                
            },
            'libertadores': {
                'Flamengo': 'Clube_de_Regatas_do_Flamengo',
                'Palmeiras': 'Sociedade_Esportiva_Palmeiras',
                'Corinthians': 'Sport_Club_Corinthians_Paulista',
                'São Paulo': 'São_Paulo_Futebol_Clube',
                'Grêmio': 'Grêmio_Foot-Ball_Porto_Alegrense',
                'Internacional': 'Sport_Club_Internacional',
                'Atlético Mineiro': 'Clube_Atlético_Mineiro',
                'Fluminense': 'Fluminense_Football_Club',
                'Botafogo': 'Botafogo_de_Futebol_e_Regatas',
                'Vasco da Gama': 'Club_de_Regatas_Vasco_da_Gama',
                'River Plate': 'Club_Atlético_River_Plate',
                'Boca Juniors': 'Club_Atlético_Boca_Juniors'
            },
            'sulamericana': {
                'Corinthians': 'Sport_Club_Corinthians_Paulista',
                'Internacional': 'Sport_Club_Internacional',
                'Atlético Mineiro': 'Clube_Atlético_Mineiro',
                'Fluminense': 'Fluminense_Football_Club',
                'Botafogo': 'Botafogo_de_Futebol_e_Regatas',
                'Vasco da Gama': 'Club_de_Regatas_Vasco_da_Gama',
                'São Paulo': 'São_Paulo_Futebol_Clube',
                'Santos': 'Santos_Futebol_Clube',
                'Cruzeiro': 'Cruzeiro_Esporte_Clube',
                'Bahia': 'Esporte_Clube_Bahia',
                'Athletico Paranaense': 'Club_Athletico_Paranaense',
                'Fortaleza': 'Fortaleza_Esporte_Clube',
                'Cuiabá': 'Cuiabá_Esporte_Clube',
                'Red Bull Bragantino': 'Red_Bull_Bragantino',
                'Juventude': 'Esporte_Clube_Juventude',
                'Criciúma': 'Criciúma_Esporte_Clube',
                'Vitória': 'Esporte_Clube_Vitória'
            },
            'champions': {
                'Real Madrid': 'Real_Madrid_Club_de_Fútbol',
                'Barcelona': 'Fútbol_Club_Barcelona',
                'Manchester City': 'Manchester_City_F.C.',
                'Liverpool': 'Liverpool_F.C.',
                'Bayern Munich': 'Fußball-Club_Bayern_München',
                'Paris Saint-Germain': 'Paris_Saint-Germain_Football_Club',
                'Juventus': 'Juventus_Football_Club',
                'Chelsea': 'Chelsea_F.C.',
                'Inter': 'Football_Club_Internazionale_Milano',
                'AC Milan': 'Associazione_Calcio_Milan'
            },
            'saudi': {
                'Al-Nassr': 'Al-Nassr_FC',
                'Al-Hilal': 'Al-Hilal_SFC',
                'Al-Ittihad': 'Al-Ittihad_Club_(Jeddah)'
            },
            'eredivisie': {
                'Ajax': 'Amsterdamsche_Football_Club_Ajax',
                'PSV': 'Philips_Sport_Vereniging',
                'Feyenoord': 'Feyenoord_Rotterdam',
                'AZ Alkmaar': 'Alkmaar_Zaanstreek',
                'Utrecht': 'Football_Club_Utrecht',
                'Twente': 'Football_Club_Twente',
                'Vitesse': 'Stichting_Betaald_Voetbal_Vitesse',
                'Heerenveen': 'Sportclub_Heerenveen',
                'Go Ahead Eagles': 'Go_Ahead_Eagles',
                'Sparta Rotterdam': 'Sparta_Rotterdam',
                'Fortuna Sittard': 'Fortuna_Sittard',
                'RKC Waalwijk': 'RKC_Waalwijk',
                'Excelsior': 'Excelsior_Rotterdam',
                'Volendam': 'FC_Volendam',
                'Almere City': 'Almere_City_FC',
                'Heracles Almelo': 'Heracles_Almelo',
                'PEC Zwolle': 'PEC_Zwolle',
                'NEC': 'N.E.C.',
                'FC Utrecht': 'Football_Club_Utrecht',
                'FC Twente': 'Football_Club_Twente',
                'Vitesse': 'Stichting_Betaald_Voetbal_Vitesse',
                'SC Heerenveen': 'Sportclub_Heerenveen',
                'FC Groningen': 'FC_Groningen',
                'Willem II': 'Willem_II_Tilburg',
                'ADO Den Haag': 'ADO_Den_Haag',
                'NAC Breda': 'NAC_Breda',
                'FC Emmen': 'FC_Emmen',
                'VVV-Venlo': 'VVV-Venlo',
                'De Graafschap': 'De_Graafschap',
                'Roda JC Kerkrade': 'Roda_JC_Kerkrade',
                'NAC Breda': 'NAC_Breda',
                'Excelsior': 'Excelsior_Rotterdam',
                'MVV Maastricht': 'MVV_Maastricht',
                'Telstar': 'Telstar',
                'Jong Ajax': 'Jong_Ajax',
                'Jong PSV': 'Jong_PSV',
                'Jong AZ': 'Jong_AZ',
                'TOP Oss': 'TOP_Oss',
                'Helmond Sport': 'Helmond_Sport',
                'Dordrecht': 'FC_Dordrecht',
                'Den Bosch': 'FC_Den_Bosch',
                'Jong Utrecht': 'Jong_FC_Utrecht',
                'ADO Den Haag': 'ADO_Den_Haag',
                'PEC Zwolle': 'PEC_Zwolle',
            },
            'argentina': {
                'River Plate': 'Club_Atlético_River_Plate',
                'Boca Juniors': 'Club_Atlético_Boca_Juniors',
                'Independiente': 'Club_Atlético_Independiente',
                'Racing Club': 'Racing_Club_de_Avellaneda',
                'San Lorenzo': 'Club_Atlético_San_Lorenzo_de_Almagro',
                'Estudiantes': 'Estudiantes_de_La_Plata',
                'Gimnasia La Plata': 'Gimnasia_y_Esgrima_La_Plata',
                'Rosario Central': 'Club_Atlético_Rosario_Central',
                'Newell\'s Old Boys': 'Club_Atlético_Newell%27s_Old_Boys',
                'Vélez Sarsfield': 'Club_Atlético_Vélez_Sarsfield',
                'Lanús': 'Club_Atlético_Lanús',
                'Argentinos Juniors': 'Asociación_Atlética_Argentinos_Juniors',
                'Union': 'Club_Atlético_Unión',
                'Talleres': 'Club_Atlético_Talleres',
                'Defensa y Justicia': 'Defensa_y_Justicia',
                'Godoy Cruz': 'Club_Deportivo_Godoy_Cruz_Antonio_Tomba',
                'Central Córdoba': 'Central_Córdoba_de_Santiago_del_Estero',
                'Atlético Tucumán': 'Club_Atlético_Tucumán',
                'Platense': 'Club_Atlético_Platense',
                'Sarmiento': 'Club_Atlético_Sarmiento_(Junín)',
                'Arsenal Sarandí': 'Arsenal_Fútbol_Club',
                'Barracas Central': 'Club_Atlético_Barracas_Central',
                'Tigre': 'Club_Atlético_Tigre',
                'Colón': 'Colón_de_Santa_Fe',
                'Unión': 'Club_Atlético_Unión',
                'Huracán': 'Club_Atlético_Huracán',
                'Vélez': 'Club_Atlético_Vélez_Sarsfield',
                'Gimnasia': 'Gimnasia_y_Esgrima_La_Plata',
                'Aldosivi': 'Club_Atlético_Aldosivi',
                'Patronato': 'Club_Atlético_Patronato_de_la_Juventud_Católica',
                'Argentinos': 'Asociación_Atlética_Argentinos_Juniors',
                'Banfield': 'Club_Atlético_Banfield',
                'Defensa': 'Defensa_y_Justicia',
                'Godoy Cruz': 'Club_Deportivo_Godoy_Cruz_Antonio_Tomba',
                'Rosario': 'Club_Atlético_Rosario_Central',
                'Newell\'s': 'Club_Atlético_Newell%27s_Old_Boys',
                'San Lorenzo': 'Club_Atlético_San_Lorenzo_de_Almagro',
                'Estudiantes': 'Estudiantes_de_La_Plata',
                'Racing': 'Racing_Club_de_Avellaneda',
                'Independiente': 'Club_Atlético_Independiente',
                'Lanús': 'Club_Atlético_Lanús',
            }
        }
    },

    // Proxy estável para contornar bloqueios de CORS da API da ESPN.
    proxyUrl: 'https://corsproxy.io/?',

    init() {
        this.loadAndRenderLeagues();
        lucide.createIcons();
        setInterval(() => { if(!document.hidden && this.state.view === 'matches') this.loadLeague(this.state.currentLeague, true); }, 60000);

        // Adiciona listener para fechar dropdowns ao clicar fora
        window.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown-container')) {
                this.closeAllDropdowns();
            }
            if (!e.target.closest('#global-search-container')) {
                document.getElementById('global-search-results').classList.add('hidden');
            }
        });

        // Adiciona listener para a busca global
        const globalSearchInput = document.getElementById('global-search-input');
        globalSearchInput.addEventListener('keyup', this.debounce(() => this.handleGlobalSearch(), 300));
        globalSearchInput.addEventListener('focus', () => this.handleGlobalSearch());
    },

    async detectRegion() {
        try {
            const res = await fetch(`${this.proxyUrl}http://ip-api.com/json/?fields=countryCode`);
            const data = await res.json();
            if (data.countryCode) {
                this.state.userRegion = data.countryCode.toLowerCase();
            }
        } catch (e) {
            console.warn('Não foi possível detectar a região. Usando padrão US.');
        }
        document.getElementById('region-flag').src = `https://flagcdn.com/${this.state.userRegion}.svg`;
    },

    async loadAndRenderLeagues() {
        await this.detectRegion();
        this.renderNav();
        this.loadLeague(this.state.currentLeague, false, true);
    },

    // --- UI ---
    toggleSettings() { document.getElementById('settings-modal').classList.toggle('hidden'); },
    saveKey() { this.toggleSettings(); this.loadLeague(this.state.currentLeague); },
    
    toggleDropdown(id) {
        const isHidden = document.getElementById(id).classList.contains('hidden');
        this.closeAllDropdowns();
        if (isHidden) {
            document.getElementById(id).classList.remove('hidden');
        }
    },

    closeAllDropdowns() {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.add('hidden');
        });
    },

    renderNav() {
        const sportMenu = document.getElementById('sport-dropdown');
        sportMenu.innerHTML = '';
        Object.entries(this.state.sports).forEach(([key, sport]) => {
            const btn = document.createElement('button');
            btn.className = `dropdown-item w-full text-left rounded-md text-gray-300 hover:bg-white/10 hover:text-white transition ${key === this.state.currentSport ? 'bg-red-600/50 text-white' : ''}`;
            btn.innerText = sport.name;
            btn.onclick = () => this.changeSport(key);
            sportMenu.appendChild(btn);
        });

        const leagueMenu = document.getElementById('league-dropdown');
        leagueMenu.innerHTML = '';
        const currentLeagues = this.state.sports[this.state.currentSport].leagues;
        Object.entries(currentLeagues).forEach(([k, v]) => {
            const btn = document.createElement('button');
            btn.className = `dropdown-item w-full text-left rounded-md text-gray-300 hover:bg-white/10 hover:text-white transition ${k === this.state.currentLeague ? 'bg-red-600/50 text-white' : ''}`;
            btn.innerHTML = `
                <img src="${v.logo}" class="w-6 h-6 object-contain flex-shrink-0">
                <span class="truncate">${v.name}</span>
            `;
            btn.onclick = () => this.changeLeague(k);
            leagueMenu.appendChild(btn);
        });

        // Atualiza os botões principais dos dropdowns
        document.getElementById('selected-sport-name').innerText = this.state.sports[this.state.currentSport].name;
        const currentLeagueData = this.state.sports[this.state.currentSport].leagues[this.state.currentLeague];
        document.getElementById('selected-league-logo').src = currentLeagueData.logo;
        document.getElementById('selected-league-name').innerText = currentLeagueData.name;
    },

    changeSport(key) {
        this.state.currentSport = key;
        // Define a primeira liga do novo esporte como a atual
        this.state.currentLeague = Object.keys(this.state.sports[key].leagues)[0];
        this.renderNav();
        this.closeAllDropdowns();
        this.loadLeague(this.state.currentLeague, false, true);
    },

    changeLeague(k) {
        this.state.currentLeague = k;
        this.renderNav();
        this.closeAllDropdowns();
        this.loadLeague(k);
    },

    setView(v) {
        // Oculta abas não suportadas por certos esportes
        const unsupportedViews = ['standings', 'players'];
        if (this.state.currentSport !== 'soccer' && unsupportedViews.includes(v)) {
            this.setView('matches'); // Volta para a aba de placar se a clicada não for suportada
            return;
        }


        this.state.view = v;
        ['matches','standings', 'news', 'players', 'clubs'].forEach(name => {
            const btn = document.getElementById('btn-'+name);
            const view = document.getElementById(`view-${name}`);
            
            if (btn) {
                if (name === v) {
                    btn.classList.add('bg-red-600', 'text-white', 'shadow-md');
                    btn.classList.remove('text-gray-400');
                } else {
                    btn.classList.remove('bg-red-600', 'text-white', 'shadow-md');
                    btn.classList.add('text-gray-400');
                }
            }
            
            if (view) {
                if (name === v) {
                    view.classList.remove('hidden');
                } else {
                    view.classList.add('hidden');
                }
            }
        });

        if(v === 'standings') this.loadStandings();
        if(v === 'news') this.loadNews();
        if(v === 'players') this.initWikipediaSearch();
        if(v === 'clubs') this.loadClubs();
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

    closeModal(id) { 
        const modal = document.getElementById(id);
        modal.classList.add('hidden');
        modal.querySelector('.bg-surface, .bg-dark-bg')?.classList.remove('modal-enter');
        clearInterval(this.state.matchRefreshInterval);
        this.state.matchRefreshInterval = null;
    },

    // --- API FETCHING ---
    
    async loadLeague(key, isRefresh = false, isSportChange = false) {
        const sport = this.state.currentSport;
        const league = this.state.sports[sport].leagues[key];
        if (!league) {
            console.error(`Liga com a chave "${key}" não encontrada para o esporte "${sport}".`);
            document.getElementById('loader').classList.add('hidden');
            return;
        }
        
        // Update header only if it's not a background refresh or if the sport changed
        if (!isRefresh || isSportChange) {
            document.getElementById('league-title').innerText = league.name;
            document.getElementById('bg-wrapper').style.backgroundImage = `url('${league.bg}')`;
        }
        document.getElementById('league-logo').src = league.logo;

        // Oculta/mostra abas de acordo com o suporte do esporte
        const supportedViews = this.state.currentSport === 'soccer';
        document.getElementById('btn-standings').style.display = supportedViews ? 'block' : 'none';
        document.getElementById('btn-clubs').style.display = supportedViews ? 'block' : 'none';
        document.getElementById('btn-players').style.display = supportedViews ? 'block' : 'none';


        document.getElementById('loader').classList.remove('hidden');
        document.getElementById('view-matches').innerHTML = '';
        document.getElementById('view-standings').classList.add('hidden');

        try {
            // Adiciona animação de fade-in ao container de partidas
            const matchesContainer = document.getElementById('view-matches');
            matchesContainer.classList.remove('content-fade-in');

            const res = await fetch(`${this.proxyUrl}https://site.api.espn.com/apis/site/v2/sports/${sport}/${league.slug}/scoreboard?lang=pt&region=${this.state.userRegion}`);
            const data = await res.json();
            this.state.cache[key] = data.events || []; 
            this.renderMatches(data.events || []);
        } catch (e) {
            document.getElementById('view-matches').innerHTML = '<p class="text-center text-gray-400 col-span-2">Erro ao conectar à ESPN.</p>';
        }
        document.getElementById('loader').classList.add('hidden');
        document.getElementById('view-matches').classList.add('content-fade-in');
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
        container.innerHTML = '<div class="loader w-6 h-6"></div>';

        try {
            // Busca os dados de todas as divisões em paralelo
            const responses = await Promise.all(
                slugsToFetch.map(slug => fetch(`${this.proxyUrl}https://site.api.espn.com/apis/v2/sports/${sport}/${slug}/standings?lang=pt&region=${this.state.userRegion}`))
            );
            const dataArray = await Promise.all(responses.map(res => res.json()));

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
        container.innerHTML = '<div class="loader w-6 h-6 col-span-full mx-auto"></div>';
        const sport = this.state.currentSport;
        const league = this.state.sports[sport].leagues[this.state.currentLeague];

        try {
            const res = await fetch(`${this.proxyUrl}https://site.api.espn.com/apis/site/v2/sports/${sport}/${league.slug}/news`);
            const data = await res.json();
            this.renderNews(data.articles || []);
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

    // --- Global Search ---
    async handleGlobalSearch() {
        const query = document.getElementById('global-search-input').value.trim().toLowerCase();
        const resultsContainer = document.getElementById('global-search-results');

        if (query.length < 2) {
            resultsContainer.classList.add('hidden');
            return;
        }

        resultsContainer.classList.remove('hidden');
        resultsContainer.innerHTML = '<div class="p-4 text-center text-gray-400 text-sm">Buscando...</div>';

        // 1. Search local leagues
        const leagueResults = [];
        Object.entries(this.state.sports).forEach(([sportKey, sportData]) => {
            Object.entries(sportData.leagues).forEach(([leagueKey, leagueData]) => {
                if (leagueData.name.toLowerCase().includes(query)) {
                    leagueResults.push({ ...leagueData, sport: sportKey, key: leagueKey });
                }
            });
        });

        // 2. Search Wikipedia articles
        const url = `https://pt.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${encodeURIComponent(query)}&limit=5&format=json`;
        let wikiResults = [];
        try {
            const response = await fetch(url);
            const data = await response.json();
            const [, titles, , links] = data;
            wikiResults = titles.map((title, index) => ({ title, link: links[index] }));
        } catch (error) {
            console.error("Erro na busca da Wikipedia:", error);
        }

        this.renderGlobalSearchResults(leagueResults, wikiResults);
    },

    renderGlobalSearchResults(leagues, articles) {
        const resultsContainer = document.getElementById('global-search-results');
        let html = '';

        if (leagues.length > 0) {
            html += '<h4 class="text-xs font-bold text-gray-500 uppercase p-3 border-b border-border">Competições</h4>';
            leagues.forEach(league => {
                html += `
                    <div onclick="app.changeSport('${league.sport}'); app.changeLeague('${league.key}'); document.getElementById('global-search-results').classList.add('hidden');" class="search-result-item flex items-center gap-3 p-3 cursor-pointer">
                        <img src="${league.logo}" class="w-6 h-6 object-contain">
                        <span class="text-sm text-white">${league.name}</span>
                    </div>
                `;
            });
        }

        if (articles.length > 0) {
            html += '<h4 class="text-xs font-bold text-gray-500 uppercase p-3 border-b border-border mt-2">Artigos da Wikipedia</h4>';
            articles.forEach(article => {
                html += `
                    <div onclick="app.loadWikipediaArticle('${article.title}'); document.getElementById('global-search-results').classList.add('hidden');" class="search-result-item p-3 cursor-pointer">
                        <p class="text-sm text-white font-bold">${article.title}</p>
                    </div>
                `;
            });
        }

        resultsContainer.innerHTML = (html === '') ? '<div class="p-4 text-center text-gray-400 text-sm">Nenhum resultado encontrado.</div>' : html;
    },

    // Função para obter uma cor de texto contrastante (branco ou preto)
    getContrastColor(hexColor) {
        if (!hexColor) return '#FFFFFF';
        const r = parseInt(hexColor.substr(0, 2), 16);
        const g = parseInt(hexColor.substr(2, 2), 16);
        const b = parseInt(hexColor.substr(4, 2), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? '#000000' : '#FFFFFF';
    },

    renderWikipediaResults(data, container) {
        container.innerHTML = '';
        const [query, titles, descriptions, links] = data;

        if (titles.length === 0) {
            container.innerHTML = '<p class="text-center text-gray-500 p-8">Nenhum resultado encontrado para sua busca.</p>';
            return;
        }

        titles.forEach((title, index) => {
            const resultItem = `
                <div onclick="app.loadWikipediaArticle('${title}')" class="wiki-result-card block p-5 rounded-xl cursor-pointer">
                    <h3 class="font-bold text-lg text-accent-red mb-1">${title}</h3>
                    <p class="text-gray-400 text-sm">${descriptions[index]}</p>
                </div>`;
            container.innerHTML += resultItem;
        });
    },

    // --- Clubs View ---
    async loadClubs() {
        const container = document.getElementById('clubs-grid-container');
        container.innerHTML = '<div class="col-span-full p-8 flex justify-center"><div class="loader w-8 h-8"></div></div>';
        
        const sport = this.state.currentSport;
        const league = this.state.sports[sport].leagues[this.state.currentLeague];
        const slugsToFetch = league.slugs || [league.slug];

        try {
            const responses = await Promise.all(
                slugsToFetch.map(slug => fetch(`${this.proxyUrl}https://site.api.espn.com/apis/v2/sports/${sport}/${slug}/standings?lang=pt&region=${this.state.userRegion}`))
            );
            const dataArray = await Promise.all(responses.map(res => res.json()));

            const allTeams = new Map(); // Usa um Map para evitar times duplicados
            dataArray.forEach(data => {
                const children = data.children || [];
                children.forEach(child => {
                    const entries = child.standings?.entries || [];
                    entries.forEach(entry => {
                        if (!allTeams.has(entry.team.id)) {
                            allTeams.set(entry.team.id, entry.team);
                        }
                    });
                });
            });

            this.renderClubsGrid(Array.from(allTeams.values()));
        } catch (error) {
            console.error("Erro ao carregar clubes:", error);
            container.innerHTML = '<p class="col-span-full text-center text-red-400 p-8">Não foi possível carregar os clubes.</p>';
        }
    },

    renderClubsGrid(teams) {
        const container = document.getElementById('clubs-grid-container');
        container.innerHTML = '';

        if (teams.length === 0) {
            container.innerHTML = '<p class="col-span-full text-center text-gray-500 p-8">Nenhum clube encontrado para esta competição.</p>';
            return;
        }

        teams.forEach(team => {
            container.innerHTML += `
                <div class="club-card cursor-pointer" data-team-name="${team.displayName.toLowerCase()}" onclick="app.loadWikipediaArticle('${team.displayName}')">
                    <img src="${team.logos?.[0]?.href}" alt="${team.displayName}" class="w-16 h-16 object-contain mb-4">
                    <p class="text-sm font-bold text-white">${team.displayName}</p>
                </div>
            `;
        });
    },

    filterClubs() {
        const query = document.getElementById('clubs-filter-input').value.toLowerCase();
        document.querySelectorAll('.club-card').forEach(card => {
            const teamName = card.dataset.teamName;
            card.style.display = teamName.includes(query) ? 'flex' : 'none';
        });
    },

    // --- Wikipedia Search View (Players) ---
    initWikipediaSearch() {
        this.loadTopScorersData();
    },

    async loadWikipediaArticle(title) {
        const modal = document.getElementById('wiki-article-modal');
        const titleEl = document.getElementById('wiki-article-title');
        const contentEl = document.getElementById('wiki-article-content');

        modal.classList.remove('hidden');
        modal.querySelector('.bg-dark-bg').classList.add('modal-enter');
        titleEl.innerText = 'Carregando...';
        contentEl.innerHTML = '<div class="p-8 flex justify-center"><div class="loader w-8 h-8"></div></div>';
        
        // Verifica se o time está na nossa base de dados para obter o título exato da página
        const currentLeagueKey = this.state.currentLeague;
        const leagueDb = this.state.teamWikiDb[currentLeagueKey] || {};
        const wikiPageTitle = leagueDb[title] || title; // Usa o título do DB ou o original como fallback

        const url = `https://pt.wikipedia.org/w/api.php?origin=*&action=parse&page=${encodeURIComponent(wikiPageTitle)}&prop=text&formatversion=2&format=json`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            const linkElement = document.getElementById('wiki-article-link');
            const originalArticleLink = `https://pt.wikipedia.org/wiki/${encodeURIComponent(wikiPageTitle)}`;
            if (linkElement) {
                linkElement.href = originalArticleLink;
            }


            if (data.error) throw new Error(data.error.info);

            titleEl.innerText = data.parse.title;
            contentEl.innerHTML = data.parse.text;
        } catch (error) {
            console.error('Erro ao carregar artigo da Wikipedia:', error);
            titleEl.innerText = 'Erro';
            contentEl.innerHTML = '<p class="text-center text-red-400 p-8">Não foi possível carregar este artigo.</p>';
        }
    },

    async loadTopScorersData() {
        const container = document.getElementById('view-players');
        container.innerHTML = '<div class="p-8 flex justify-center col-span-full"><div class="loader w-8 h-8"></div></div>';

        const league = this.state.sports[this.state.currentSport].leagues[this.state.currentLeague];
        if (!league.wikiTopScorers) {
            container.innerHTML = '<p class="text-center text-gray-500 p-8 col-span-full">Lista de artilheiros não disponível para esta liga.</p>';
            return;
        }

        try {
            // 1. Buscar a página de artilheiros
            const url = `https://pt.wikipedia.org/w/api.php?origin=*&action=parse&page=${encodeURIComponent(league.wikiTopScorers)}&prop=text&formatversion=2&format=json`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.error) throw new Error(data.error.info);

            // 2. Parsear o HTML para encontrar os jogadores
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data.parse.text;
            const playerLinks = Array.from(tempDiv.querySelectorAll('table.wikitable tbody tr td:nth-child(2) a:not(.image)'));

            const playerPromises = playerLinks.slice(0, 15).map(link => { // Limita a 15 jogadores para performance
                const playerPageTitle = link.getAttribute('href').split('/wiki/')[1];
                return this.parsePlayerInfobox(decodeURIComponent(playerPageTitle));
            });

            const playersData = await Promise.all(playerPromises);
            this.state.playersData = playersData.filter(p => p !== null); // Filtra jogadores que não tiveram infobox

            this.renderPlayersDataset();

        } catch (error) {
            console.error('Erro ao carregar dados dos artilheiros:', error);
            container.innerHTML = '<p class="text-center text-red-400 p-8 col-span-full">Não foi possível carregar os dados dos jogadores.</p>';
        }
    },

    async parsePlayerInfobox(pageTitle) {
        try {
            const url = `https://pt.wikipedia.org/w/api.php?origin=*&action=parse&page=${encodeURIComponent(pageTitle)}&prop=text&formatversion=2&format=json`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.error) return null;

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data.parse.text;

            const infobox = tempDiv.querySelector('.infobox_v2');
            if (!infobox) return null;

            const playerData = { pageTitle };
            const rows = infobox.querySelectorAll('tr');

            // Extrair imagem
            const imageEl = infobox.querySelector('.infobox_v2_image img');
            playerData['Imagem'] = imageEl ? imageEl.src : 'https://placehold.co/150x200/2a2a2a/ffffff?text=?';

            rows.forEach(row => {
                const labelEl = row.querySelector('.infobox_v2_label');
                const dataEl = row.querySelector('.infobox_v2_data');
                if (labelEl && dataEl) {
                    // Limpa o texto, removendo referências e textos pequenos
                    const label = labelEl.textContent.trim();
                    dataEl.querySelectorAll('sup, small').forEach(el => el.remove());
                    const value = dataEl.textContent.trim();
                    playerData[label] = value;
                }
            });

            return playerData;
        } catch (error) {
            console.error(`Erro ao processar ${pageTitle}:`, error);
            return null;
        }
    },

    renderPlayersDataset() {
        const container = document.getElementById('view-players');
        container.innerHTML = '';
        if (!this.state.playersData || this.state.playersData.length === 0) {
            container.innerHTML = '<p class="col-span-full text-center text-gray-500 p-8">Nenhum jogador encontrado no dataset.</p>';
            return;
        }

        this.state.playersData.forEach(player => {
            const characteristicsHtml = Object.entries(player)
                .filter(([key]) => !['Imagem', 'pageTitle'].includes(key) && key.length < 25) // Filtra campos indesejados
                .map(([key, value]) => `<li class="text-xs truncate"><strong class="text-gray-400">${key}:</strong> <span class="text-white">${value}</span></li>`)
                .join('');

            container.innerHTML += `
                <div class="player-dataset-card">
                    <img src="${player.Imagem}" alt="${player['Nome completo'] || 'Jogador'}" class="w-24 h-24 object-cover object-top rounded-full mb-4 shrink-0">
                    <div class="flex-1 overflow-hidden">
                        <h3 class="font-bold text-lg text-accent-red truncate" title="${player['Nome completo']}">${player['Nome completo'] || player.pageTitle.replace(/_/g, ' ')}</h3>
                        <ul class="space-y-1 mt-2 pr-2">${characteristicsHtml}</ul>
                    </div>
                </div>
            `;
        });
    },

    async performWikipediaSearch(query, container) {
        container.innerHTML = '<div class="col-span-full p-8 flex justify-center"><div class="loader w-8 h-8"></div></div>';
        const url = `https://pt.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${encodeURIComponent(query)}&limit=12&format=json`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            this.renderWikipediaResults(data, container);
        } catch (error) {
            console.error('Erro ao buscar na Wikipedia:', error);
            container.innerHTML = '<p class="col-span-full text-center text-red-400 p-8">Ocorreu um erro durante a busca.</p>';
        }
    },

    debounce(func, delay) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    },

    renderMatches(events) {
        const div = document.getElementById('view-matches');
        div.innerHTML = '';
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
                                    <span class="text-sm font-bold truncate text-white">${home.team.displayName}</span>
                                </div>
                                <div class="px-3 py-1 rounded-md text-lg font-bold text-center min-w-[40px]" style="background-color: #${home.team.color || '374151'}; color: ${this.getContrastColor(home.team.color || '374151')}">${home.score || '0'}</div>
                            </div>
                            <div class="flex justify-between items-center">
                                <div class="flex items-center gap-2 truncate">
                                    <img src="${away.team.logo}" class="w-6 h-6 object-contain bg-white rounded-full p-0.5" style="border: 2px solid #${away.team.color || 'transparent'}">
                                    <span class="text-sm font-bold truncate text-white">${away.team.displayName}</span>
                                </div>
                                <div class="px-3 py-1 rounded-md text-lg font-bold text-center min-w-[40px]" style="background-color: #${away.team.color || '374151'}; color: ${this.getContrastColor(away.team.color || '374151')}">${away.score || '0'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        lucide.createIcons();
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

            // Adiciona a lógica de ordenação manual para garantir a ordem correta
            entries.sort((a, b) => {
                const getStat = (team, statName) => team.stats.find(s => s.name === statName)?.value || 0;

                // 1. Ordena por pontos (decrescente)
                const pointsDiff = getStat(b, 'points') - getStat(a, 'points');
                if (pointsDiff !== 0) return pointsDiff;

                // 2. Critério de desempate: Saldo de gols (decrescente)
                const goalDiff = getStat(b, 'pointDifferential') - getStat(a, 'pointDifferential');
                return goalDiff;
            });

            if(entries.length === 0) return;
            
            const tableWrapper = document.createElement('div');
            tableWrapper.className = 'bg-surface rounded-xl border border-border overflow-hidden shadow-xl flex flex-col';
            tableWrapper.dataset.groupName = groupName; // Adiciona para fácil identificação
            
            let rowsHTML = '';
            entries.forEach((entry, idx) => {
                const stats = entry.stats || [];
                const getStat = (n) => stats.find(s => s.name === n)?.value || 0;
                let color = idx < 4 ? 'border-l-4 border-blue-500' : 'border-l-4 border-transparent';

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
                    <tr class="border-b border-[#333] text-gray-300 hover:bg-white/5 transition" data-team-id="${entry.team.id}" data-original-stats='${JSON.stringify(entry.stats)}'>
                        <td class="p-3 text-center font-mono text-xs ${color} bg-[#1a1a1a]">${idx+1}</td>
                        <td class="p-3 flex items-center gap-3 min-w-[150px]">
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
        const fetchData = async (isInitialLoad = false) => {
            const res = await fetch(`${this.proxyUrl}${url}`);
            const data = await res.json();
            const comp = data.header.competitions[0];
            const home = comp.competitors.find(c => c.homeAway === 'home');
            const away = comp.competitors.find(c => c.homeAway === 'away');

            // Atualiza o cabeçalho e informações apenas na primeira carga
            if (isInitialLoad) {
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
                this.loadStandings(); // Recarrega a classificação final
            }
        };

        await fetchData(true); // Carga inicial

        // Inicia o intervalo de atualização apenas se o jogo estiver ao vivo
        const initialData = await (await fetch(`${this.proxyUrl}${url}`)).json();
        if (initialData.header.competitions[0].status.type.state === 'in') {
            this.state.matchRefreshInterval = setInterval(() => fetchData(false), 15000); // Atualiza a cada 15s
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
        if (modal) {
            modal.classList.add('hidden');
            const enterElement = modal.querySelector('.modal-enter');
            if (enterElement) {
                enterElement.classList.remove('modal-enter');
            }
        }
        if (id === 'match-modal') {
            clearInterval(this.state.matchRefreshInterval);
            this.state.matchRefreshInterval = null;
            // Recarrega a classificação para reverter as mudanças visuais
            if (this.state.view === 'standings') {
                this.loadStandings();
            }
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

document.addEventListener('DOMContentLoaded', () => app.init());
