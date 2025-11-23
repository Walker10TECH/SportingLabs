const app = {
            state: {
                currentSport: 'soccer',
                currentLeague: 'brasileirao',
                view: 'matches',
                region: 'br',
                matchRefresh: null,
                playerCache: {},
                teamWikiDb: {
                    'brasileirao': { 
                        'Flamengo': 'Clube_de_Regatas_do_Flamengo', 
                        'Palmeiras': 'Sociedade_Esportiva_Palmeiras', 
                        'São Paulo': 'São_Paulo_Futebol_Clube',
                        'Corinthians': 'Sport_Club_Corinthians_Paulista',
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
                        'Liverpool': 'Liverpool_F.C.',
                        'Arsenal': 'Arsenal_F.C.',
                        'Chelsea': 'Chelsea_F.C.',
                        'Tottenham Hotspur': 'Tottenham_Hotspur_F.C.',
                        'Newcastle United': 'Newcastle_United_F.C.',
                        'Aston Villa': 'Aston_Villa_F.C.',
                        'Everton': 'Everton_F.C.',
                        'West Ham United': 'West_Ham_United_F.C.',
                        'Leicester City': 'Leicester_City_F.C.',
                        'Wolverhampton Wanderers': 'Wolverhampton_Wanderers_F.C.',
                        'Southampton': 'Southampton_F.C.',
                        'Leeds United': 'Leeds_United_F.C.',
                        'Fulham': 'Fulham_F.C.',
                        'Crystal Palace': 'Crystal_Palace_F.C.',
                        'Burnley': 'Burnley_F.C.',
                        'Brighton & Hove Albion': 'Brighton_&_Hove_Albion_F.C.',
                        'Sheffield United': 'Sheffield_United_F.C.',
                        'West Bromwich Albion': 'West_Bromwich_Albion_F.C.'
                    },
                    'laliga': {
                        'Real Madrid': 'Real_Madrid_Club_de_Fútbol',
                        'Barcelona': 'Fútbol_Club_Barcelona',
                        'Atlético Madrid': 'Club_Atlético_de_Madrid',
                        'Sevilla': 'Sevilla_Fútbol_Club',
                        'Valencia': 'Valencia_Club_de_Fútbol',
                        'Real Sociedad': 'Real_Sociedad_de_Fútbol',
                        'Athletic Bilbao': 'Athletic_Club',
                        'Getafe': 'Getafe_Club_de_Fútbol',
                        'Villarreal': 'Villarreal_Club_de_Fútbol',
                        'Real Betis': 'Real_Betis_Club_de_Fútbol',
                        'Granada': 'Granada_Club_de_Fútbol',
                        'Celta Vigo': 'Real_Club_Celta_de_Vigo',
                        'Osasuna': 'Club_Atlético_Osasuna',
                        'Alavés': 'Deportivo_Alavés',
                        'Levante': 'Levante_Unión_Deportiva',
                        'Elche': 'Elche_Club_de_Fútbol',
                        'Cádiz': 'Cádiz_Club_de_Fútbol',
                        'Mallorca': 'Real_Club_Deportivo_Mallorca',
                        'Rayo Vallecano': 'Rayo_Vallecano',
                        'Espanyol': 'RCD_Espanyol',
                        'Valladolid': 'Real_Valladolid',
                        'Almería': 'Unión_Deportiva_Almería',
                        'Girona': 'Girona_Fútbol_Club',
                        'Las Palmas': 'Unión_Deportiva_Las_Palmas',
                        'Leganés': 'Club_Deportivo_Leganés',
                        'Huesca': 'Sociedad_Deportiva_Huesca',
                        'Eibar': 'Sociedad_Deportiva_Eibar',
                        'Real Zaragoza': 'Real_Zaragoza',
                        'Sporting Gijón': 'Real_Sporting_de_Gijón',
                        'Deportivo La Coruña': 'Real_Club_Deportivo_de_La_Coruña',
                        'Málaga': 'Málaga_Club_de_Fútbol',
                        'Tenerife': 'Club_Deportivo_Tenerife',
                        'Córdoba': 'Córdoba_Club_de_Fútbol',
                        'Recreativo': 'Real_Club_Recreativo_de_Huelva',
                        'Numancia': 'Club_Deportivo_Numancia_de_Soria',
                        'Racing Santander': 'Real_Racing_Club_de_Santander',
                        'Albacete': 'Albacete_Balompié',
                        'Burgos': 'Burgos_Club_de_Fútbol',
                        'Cartagena': 'Fútbol_Club_Cartagena',
                        'Mirandés': 'Club_Deportivo_Mirandes'
                    },
                    'seriea': {
                        'Juventus': 'Juventus_Football_Club',
                        'Inter': 'Football_Club_Internazionale_Milano',
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
                        'FC Groningen': 'FC_Groningen',
                        'Willem II': 'Willem_II_Tilburg',
                        'ADO Den Haag': 'ADO_Den_Haag',
                        'NAC Breda': 'NAC_Breda',
                        'FC Emmen': 'FC_Emmen',
                        'VVV-Venlo': 'VVV-Venlo',
                        'De Graafschap': 'De_Graafschap',
                        'Roda JC Kerkrade': 'Roda_JC_Kerkrade',
                        'MVV Maastricht': 'MVV_Maastricht',
                        'Telstar': 'Telstar',
                        'Jong Ajax': 'Jong_Ajax',
                        'Jong PSV': 'Jong_PSV',
                        'Jong AZ': 'Jong_AZ',
                        'TOP Oss': 'TOP_Oss',
                        'Helmond Sport': 'Helmond_Sport',
                        'Dordrecht': 'FC_Dordrecht',
                        'Den Bosch': 'FC_Den_Bosch',
                        'Jong Utrecht': 'Jong_FC_Utrecht'
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
                        'Huracán': 'Club_Atlético_Huracán',
                        'Aldosivi': 'Club_Atlético_Aldosivi',
                        'Patronato': 'Club_Atlético_Patronato_de_la_Juventud_Católica',
                        'Banfield': 'Club_Atlético_Banfield'
                    }
                },
                sports: {
                    'soccer': {
                        name: 'Futebol',
                        leagues: {
                            'brasileirao': { id: 'bra.1', slug: 'bra.1', name: 'Brasileirão Série A', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/85.png', bg: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/04/taca-e1712177532245.jpeg?w=910', wiki: 'https://pt.wikipedia.org/wiki/Campeonato_Brasileiro_de_Futebol_-_S%C3%A9rie_A', wikiTopScorers: 'Lista_de_artilheiros_do_Campeonato_Brasileiro_de_Futebol' },
                            'brasileiraob': { id: 'bra.2', slug: 'bra.2', name: 'Brasileirão Série B', logo: 'https://tse2.mm.bing.net/th/id/OIP.__oKyl0FfsyAe5TuaZdzjAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3', bg: 'https://tse2.mm.bing.net/th/id/OIP.r04uwPhHqix_1NMlertKLAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3', wiki: 'https://pt.wikipedia.org/wiki/Campeonato_Brasileiro_de_Futebol_-_S%C3%A9rie_B' },
                            'libertadores': { id: 'conmebol.libertadores', slug: 'conmebol.libertadores', name: 'Libertadores', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd67P_AzfHmj4qq31fAcG2Kg_ONyN72Bbnxpah0fZHu87x8m9RyKdL-5ZXOooXKx1QGlQ&usqp=CAU', bg: 'https://lncimg.lance.com.br/cdn-cgi/image/width=950,quality=75,fit=pad,format=webp/uploads/2021/01/29/60141dfea45a6.jpeg', wiki: 'https://pt.wikipedia.org/wiki/Copa_Libertadores_da_Am%C3%A9rica' },
                            'sulamericana': { id: 'conmebol.sudamericana', slug: 'conmebol.sudamericana', name: 'Sul-Americana', logo: 'https://play-lh.googleusercontent.com/CuPkacdZsi9ApxBOnGwPBAV-zikx8VKmRbMUYVfB-vy-DsNfrQ6ykY6lMcj8iqR7oC5u', bg: 'https://s2-ge.glbimg.com/-M2a9kZoesn0lYulcHlg0hIvCko=/0x0:1280x853/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2022/j/Y/BAJcXyRz6Iz6Svtlf1AA/244ecb3d-2cab-4933-87e0-de24261e1696.jfif', wiki: 'https://pt.wikipedia.org/wiki/Copa_Sul-Americana' },
                            'champions': { id: 'uefa.champions', slug: 'uefa.champions', name: 'Champions League', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/2.png', bg: 'https://lncimg.lance.com.br/cdn-cgi/image/width=1280,height=720,quality=75,fit=cover/uploads/2023/03/17/641465f53b411.jpeg', wiki: 'https://pt.wikipedia.org/wiki/Liga_dos_Campe%C3%B5es_da_UEFA' },
                            'premier': { id: 'eng.1', slug: 'eng.1', name: 'Premier League', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/23.png', bg: 'https://lncimg.lance.com.br/cdn-cgi/image/width=950,quality=75,fit=pad,format=webp/uploads/2020/04/05/5e8a04ba97834.jpeg', wiki: 'https://pt.wikipedia.org/wiki/Premier_League', wikiTopScorers: 'Lista_de_artilheiros_da_Premier_League' },
                            'laliga': { id: 'esp.1', slug: 'esp.1', name: 'La Liga', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/15.png', bg: 'https://assets.goal.com/images/v3/blt054a5ddddf1e5a2b/158f203189e94419d7010667f379da35bcf16d8e.jpg', wiki: 'https://pt.wikipedia.org/wiki/La_Liga', wikiTopScorers: 'Anexo:Lista_de_artilheiros_da_La_Liga' },
                            'seriea': { id: 'ita.1', slug: 'ita.1', name: 'Serie A', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/12.png', bg: 'https://cloudfront-us-east-1.images.arcpublishing.com/newr7/L6ZP3CEJ6VMPNFT5HTW7H7L7LY.jpg', wiki: 'https://pt.wikipedia.org/wiki/Campeonato_Italiano_de_Futebol_-_S%C3%A9rie_A', wikiTopScorers: 'Lista_de_artilheiros_do_Campeonato_Italiano_de_Futebol' },
                            'bundesliga': { id: 'ger.1', slug: 'ger.1', name: 'Bundesliga', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/10.png', bg: 'https://s2-ge.glbimg.com/F2PP74GbwM16ougDWVMDhZzEp6U=/0x0:1024x659/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2024/X/Y/3pfuBhTzuraB6EHOqszA/gettyimages-1742744089.jpg', wiki: 'https://pt.wikipedia.org/wiki/Bundesliga', wikiTopScorers: 'Lista_de_artilheiros_da_Fußball-Bundesliga' },
                            'saudi': { id: 'ksa.1', slug: 'ksa.1', name: 'Saudita', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Saudi_Pro_League_Logo.svg/1196px-Saudi_Pro_League_Logo.svg.png', bg: 'https://www.365scores.com/pt-br/news/magazine/wp-content/uploads/2023/11/366423961_5646928382077000_2604818796297545939_n-e1699379331310.jpg', wiki: 'https://en.wikipedia.org/wiki/Saudi_Pro_League' },
                            'eredivisie': { id: 'ned.1', slug: 'ned.1', name: 'Eredivisie', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Eredivisie_nieuw_logo_2017-.svg', bg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGutuFAjY1Jn4Egu_ncE2-IMj_zUDooPWDQ&s', wiki: 'https://pt.wikipedia.org/wiki/Eredivisie', wikiTopScorers: 'Lista_de_artilheiros_da_Eredivisie' },
                            'argentina': { id: 'arg.1', slug: 'arg.1', name: 'Argentina', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/1.png', bg: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/12/Capturar_e27e29.jpg?w=793', wiki: 'https://pt.wikipedia.org/wiki/Campeonato_Argentino_de_Futebol' }
                        }
                    },
                    'basketball': { name: 'Basquete', leagues: { 'nba': { id: 'nba', slug: 'nba', name: 'NBA', logo: 'https://a.espncdn.com/i/teamlogos/leagues/500/nba.png' } } },
                    'football': { name: 'Fut. Americano', leagues: { 'nfl': { id: 'nfl', slug: 'nfl', name: 'NFL', logo: 'https://a.espncdn.com/i/teamlogos/leagues/500/nfl.png' } } }
                }
            },
            proxy: 'https://corsproxy.io/?',

            async init() {
                try {
                    await this.detectRegion();
                    this.renderNav();
                    this.loadLeague(this.state.currentLeague);
                } catch(e) { console.log(e); }
                finally { 
                    document.getElementById('global-loader').classList.add('loader-hidden'); 
                    lucide.createIcons();
                    this.setupEvents();
                }
            },

            async detectRegion() {
                try {
                    const r = await fetch('https://ipapi.co/json/');
                    const d = await r.json();
                    this.state.region = d.country_code ? d.country_code.toLowerCase() : 'br';
                } catch(e) {}
                document.getElementById('region-flag').src = `https://flagcdn.com/${this.state.region}.svg`;
                document.getElementById('region-name').innerText = this.state.region.toUpperCase();
            },

            setupEvents() {
                document.getElementById('global-search-input').addEventListener('keyup', this.debounce(e => this.handleSearch(e.target.value), 500));
                window.onclick = e => {
                    if(!e.target.closest('.dropdown-container')) document.querySelectorAll('.dropdown-menu').forEach(el=>el.classList.remove('open'));
                    if(!e.target.closest('#search-container')) document.getElementById('global-search-results').classList.add('hidden');
                };
            },

            debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; },

            renderNav() {
                const sMenu = document.getElementById('sport-menu');
                sMenu.innerHTML = '';
                Object.entries(this.state.sports).forEach(([k, v]) => {
                    const div = document.createElement('div');
                    div.className = 'dropdown-item';
                    div.innerText = v.name;
                    div.onclick = () => this.changeSport(k);
                    sMenu.appendChild(div);
                });

                const lMenu = document.getElementById('league-menu');
                const sidebar = document.getElementById('sidebar-league-list');
                lMenu.innerHTML = ''; sidebar.innerHTML = '';
                
                const leagues = this.state.sports[this.state.currentSport].leagues;
                Object.entries(leagues).forEach(([k, v]) => {
                    const dItem = document.createElement('div');
                    dItem.className = 'dropdown-item';
                    dItem.innerHTML = `<img src="${v.logo}"> ${v.name}`;
                    dItem.onclick = () => this.changeLeague(k);
                    lMenu.appendChild(dItem);

                    const sItem = document.createElement('button');
                    sItem.className = 'w-full text-left p-2 px-3 rounded-lg hover:bg-white/5 flex items-center gap-3 text-sm text-gray-400 hover:text-white transition';
                    sItem.innerHTML = `<img src="${v.logo}" class="w-5 h-5 object-contain"> ${v.name}`;
                    sItem.onclick = () => this.changeLeague(k);
                    sidebar.appendChild(sItem);
                });

                const currL = leagues[this.state.currentLeague];
                document.getElementById('header-league-logo').src = currL.logo;
                document.getElementById('header-league-name').innerText = currL.name;
                document.getElementById('header-sport-name').innerText = this.state.sports[this.state.currentSport].name;
            },

            changeSport(s) {
                this.state.currentSport = s;
                this.state.currentLeague = Object.keys(this.state.sports[s].leagues)[0];
                this.renderNav();
                this.loadLeague(this.state.currentLeague);
            },

            changeLeague(l) {
                this.state.currentLeague = l;
                this.renderNav();
                this.loadLeague(l);
            },

            toggleDropdown(id) {
                const el = document.getElementById(id);
                const wasOpen = el.classList.contains('open');
                document.querySelectorAll('.dropdown-menu').forEach(e => e.classList.remove('open'));
                if(!wasOpen) el.classList.add('open');
            },

            setView(v) {
                this.state.view = v;
                ['matches', 'standings', 'news', 'clubs', 'wiki'].forEach(id => {
                    document.getElementById('view-'+id).classList.toggle('hidden', id !== v);
                });
                
                // Update active states
                ['matches', 'standings', 'news', 'clubs'].forEach(type => {
                    const mobBtn = document.getElementById('mob-'+type);
                    const deskBtn = document.getElementById('desk-'+type);
                    
                    // Mobile
                    if(mobBtn) {
                        mobBtn.className = type === v 
                            ? "flex flex-col items-center gap-1 text-xs text-[#d1ff4d]" 
                            : "flex flex-col items-center gap-1 text-xs text-gray-500";
                    }
                    
                    // Desktop
                    if(deskBtn) {
                        deskBtn.className = type === v
                            ? "w-full text-left p-3 rounded-lg bg-white/10 flex items-center gap-3 font-semibold text-white"
                            : "w-full text-left p-3 rounded-lg hover:bg-white/5 flex items-center gap-3 font-semibold text-gray-400 hover:text-white";
                    }
                });
            },

            async loadLeague(key) {
                this.setView('matches');
                const sport = this.state.currentSport;
                const league = this.state.sports[sport].leagues[key];
                
                document.getElementById('page-league-logo').src = league.logo;
                document.getElementById('page-league-name').innerText = league.name;
                if (league.bg) {
                    document.getElementById('bg-wrapper').style.backgroundImage = `url('${league.bg}')`;
                }
                
                document.getElementById('matches-grid').innerHTML = '<div class="text-center text-gray-500 py-10">Carregando jogos...</div>';
                
                const viewStandings = document.getElementById('view-standings');
                let standingsContainer = document.getElementById('standings-container');

                if (!standingsContainer) {
                     viewStandings.innerHTML = '<div class="section-title">Tabela de Classificação</div><div id="standings-container" class="grid grid-cols-1 xl:grid-cols-2 gap-6"></div>';
                     standingsContainer = document.getElementById('standings-container');
                }

                try {
                    const url = `${this.proxy}https://site.api.espn.com/apis/site/v2/sports/${sport}/${league.slug}`;
                    const [resScore, resNews] = await Promise.all([
                        fetch(`${url}/scoreboard?lang=pt&region=${this.state.region}`).then(r=>r.json()),
                        fetch(`${url}/news?lang=pt&region=${this.state.region}`).then(r=>r.json())
                    ]);

                    this.renderMatches(resScore.events || []);
                    this.renderNews(resNews.articles || []);

                    if(sport === 'soccer') {
                        this.loadStandings(sport, league.slug);
                    } else {
                         standingsContainer.innerHTML = '<p class="text-gray-500 text-center p-8 col-span-full">Tabela não disponível para este esporte.</p>';
                    }

                } catch(e) {
                    document.getElementById('matches-grid').innerHTML = '<p class="text-center text-red-500">Erro ao carregar.</p>';
                }
            },

            /* --- RENDER MATCHES (TV STYLE) --- */
            renderMatches(events) {
                const grid = document.getElementById('matches-grid');
                grid.innerHTML = '';
                if(!events.length) { grid.innerHTML = '<p class="text-center text-gray-500">Sem jogos hoje.</p>'; return; }

                // Determine Theme
                const lKey = this.state.currentLeague;
                let themeClass = 'theme-brasileirao'; // Default
                
                if (lKey.includes('libertadores')) themeClass = 'theme-libertadores';
                else if (lKey.includes('champions')) themeClass = 'theme-champions';
                else if (lKey.includes('premier')) themeClass = 'theme-premier';
                else if (lKey.includes('laliga')) themeClass = 'theme-laliga';
                else if (lKey.includes('bundesliga')) themeClass = 'theme-bundesliga';
                else if (lKey.includes('seriea')) themeClass = 'theme-seriea';
                else if (lKey.includes('saudi')) themeClass = 'theme-saudi';
                else if (lKey.includes('sulamericana')) themeClass = 'theme-sulamericana';

                events.forEach(ev => {
                    const comp = ev.competitions[0];
                    const home = comp.competitors.find(c => c.homeAway === 'home');
                    const away = comp.competitors.find(c => c.homeAway === 'away');
                    const status = ev.status;
                    const isLive = status.type.state === 'in';
                    
                    let timeText = status.type.shortDetail;
                    if(isLive) timeText = status.displayClock.replace("'", "") + "<span class='blink'>'</span>";

                    let aggText = '';
                    if(comp.series && comp.series.summary) aggText = `<div class="tv-time-agg">${comp.series.summary}</div>`;

                    const card = document.createElement('div');
                    card.className = `match-card ${themeClass}`;
                    card.onclick = () => this.openMatch(ev.id);

                    card.innerHTML = `
                        <div class="tv-scoreboard">
                            <div class="tv-logo-box"><img src="${this.state.sports[this.state.currentSport].leagues[this.state.currentLeague].logo}"></div>
                            <div class="tv-team-box text-right"><span class="truncate">${home.team.abbreviation || home.team.shortDisplayName}</span><img src="${home.team.logo}" class="w-8 h-8 object-contain ml-2"></div>
                            <div class="tv-score-box">${home.score} - ${away.score}</div>
                            <div class="tv-team-box text-left"><img src="${away.team.logo}" class="w-8 h-8 object-contain mr-2"><span class="truncate">${away.team.abbreviation || away.team.shortDisplayName}</span></div>
                            <div class="tv-time-box"><div>${timeText}</div>${aggText}</div>
                        </div>
                        <div class="match-footer"><span>${ev.name}</span><span>${comp.venue?.fullName || ''}</span></div>
                    `;
                    grid.appendChild(card);
                });
                lucide.createIcons();
            },

            async loadStandings(sport, slug) {
                const container = document.getElementById('standings-container');
                if(!container) return;

                container.innerHTML = '<p class="text-center text-gray-500 py-10 col-span-full">Carregando tabela...</p>';
                
                try {
                    const res = await fetch(`${this.proxy}https://site.api.espn.com/apis/v2/sports/${sport}/${slug}/standings?lang=pt`);
                    const data = await res.json();
                    
                    if (data.children && data.children.length > 0) {
                        this.renderStandingsTable(data.children);
                        this.renderClubs(data.children);
                    } else {
                        container.innerHTML = '<p class="text-center text-gray-500 py-10 col-span-full">Classificação indisponível no momento.</p>';
                    }
                } catch(e) {
                    console.error('Erro standings:', e);
                    container.innerHTML = '<p class="text-center text-red-500 py-10 col-span-full">Não foi possível carregar a tabela.</p>';
                }
            },

            renderStandingsTable(children) {
                const container = document.getElementById('standings-container');
                container.innerHTML = '';
                
                children.forEach(group => {
                    const div = document.createElement('div');
                    div.className = 'bg-[#1a1b1e] rounded-xl border border-[#333] overflow-hidden h-fit';
                    
                    // Header
                    let html = `
                        <div class="p-3 bg-white/5 flex justify-between items-center">
                            <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">${group.name}</span>
                        </div>
                        <div class="flex text-[10px] text-gray-500 px-2 py-2 border-b border-[#333] uppercase font-bold">
                            <span class="w-8 text-center">#</span>
                            <span class="flex-1 px-2">Time</span>
                            <span class="w-8 text-center">P</span>
                            <span class="w-8 text-center">J</span>
                            <span class="w-8 text-center">V</span>
                            <span class="w-8 text-center">E</span>
                            <span class="w-8 text-center">D</span>
                            <span class="w-8 text-center hidden sm:block">SG</span>
                        </div>
                    `;
                    
                    // Rows
                    let rows = '';
                    const entries = group.standings.entries || [];
                    
                    entries.forEach((e, i) => {
                        const stats = e.stats || [];
                        const getStat = (n) => stats.find(s => s.name === n)?.value || 0;
                        const p = getStat('points');
                        const j = getStat('gamesPlayed');
                        const v = getStat('wins');
                        const emp = getStat('ties');
                        const d = getStat('losses');
                        const sg = getStat('pointDifferential');
                        
                        // Colors for top positions
                        let posColor = 'text-gray-500';
                        if (i === 0) posColor = 'text-[#d1ff4d] font-bold';
                        else if (i < 4) posColor = 'text-blue-400 font-bold';
                        else if (i >= entries.length - 4) posColor = 'text-red-400 font-bold';

                        rows += `
                            <div class="flex items-center px-2 py-2 border-b border-[#333] hover:bg-white/5 text-sm">
                                <span class="w-8 text-center ${posColor}">${i+1}</span>
                                <div class="flex-1 flex items-center gap-2 px-2 min-w-0">
                                    <img src="${e.team.logos?.[0]?.href}" class="w-5 h-5 object-contain">
                                    <span class="font-semibold text-white truncate">${e.team.shortDisplayName || e.team.displayName}</span>
                                </div>
                                <span class="w-8 text-center font-bold text-white">${p}</span>
                                <span class="w-8 text-center text-gray-400">${j}</span>
                                <span class="w-8 text-center text-gray-500">${v}</span>
                                <span class="w-8 text-center text-gray-500">${emp}</span>
                                <span class="w-8 text-center text-gray-500">${d}</span>
                                <span class="w-8 text-center text-gray-500 hidden sm:block">${sg}</span>
                            </div>
                        `;
                    });
                    
                    div.innerHTML = html + rows;
                    container.appendChild(div);
                });
            },

            renderNews(articles) {
                const grid = document.getElementById('news-grid');
                grid.innerHTML = '';
                articles.slice(0, 6).forEach(n => {
                    if(!n.images[0]) return;
                    grid.innerHTML += `
                        <a href="${n.links.web.href}" target="_blank" class="news-card group">
                            <img src="${n.images[0].url}">
                            <div class="news-overlay"><h3 class="text-white font-bold text-lg leading-tight group-hover:text-[#d1ff4d]">${n.headline}</h3></div>
                        </a>
                    `;
                });
            },

            renderClubs(children) {
                const grid = document.getElementById('clubs-grid');
                grid.innerHTML = '';
                const seen = new Set();
                children.forEach(c => {
                    c.standings.entries.forEach(e => {
                        if(seen.has(e.team.id)) return;
                        seen.add(e.team.id);
                        grid.innerHTML += `
                            <div class="club-grid-item" onclick="app.openClub('${e.team.id}', '${e.team.displayName}')">
                                <img src="${e.team.logos[0].href}" class="mb-2 mx-auto">
                                <h4 class="text-sm text-white font-bold">${e.team.displayName}</h4>
                            </div>
                        `;
                    });
                });
            },

            // --- Modals ---
            async openMatch(id) {
                const modal = document.getElementById('match-modal');
                modal.classList.add('open');
                this.setMatchTab('timeline');
                
                // Reset
                document.getElementById('modal-score').innerText = '-';
                document.getElementById('timeline-container').innerHTML = '<div class="spinner mx-auto"></div>';
                
                // Clear old data to prevent showing stale info
                if(document.getElementById('game-info')) document.getElementById('game-info').innerHTML = '';
                if(document.getElementById('stats-container')) document.getElementById('stats-container').innerHTML = '';

                const sport = this.state.currentSport;
                const league = this.state.sports[sport].leagues[this.state.currentLeague];

                try {
                    const res = await fetch(`${this.proxy}https://site.api.espn.com/apis/site/v2/sports/${sport}/${league.slug}/summary?event=${id}&lang=pt`);
                    const data = await res.json();
                    const header = data.header.competitions[0];
                    const home = header.competitors.find(c=>c.homeAway==='home');
                    const away = header.competitors.find(c=>c.homeAway==='away');

                    // Safe DOM updates
                    const safeSetText = (id, text) => { if(document.getElementById(id)) document.getElementById(id).innerText = text; };
                    const safeSetSrc = (id, src) => { if(document.getElementById(id)) document.getElementById(id).src = src; };

                    safeSetText('modal-home', home.team.abbreviation);
                    safeSetText('modal-away', away.team.abbreviation);
                    safeSetSrc('modal-home-logo', home.team.logos[0].href);
                    safeSetSrc('modal-away-logo', away.team.logos[0].href);
                    safeSetText('modal-score', `${home.score}-${away.score}`);
                    safeSetText('modal-status', header.status.type.description);

                    // Penaltis
                    const pkDiv = document.getElementById('modal-pk-score');
                    if(pkDiv) {
                        if(home.shootoutScore) {
                            pkDiv.innerText = `(${home.shootoutScore}-${away.shootoutScore}) PÊNALTIS`;
                            pkDiv.classList.remove('hidden');
                        } else pkDiv.classList.add('hidden');
                    }

                    // Agg
                    const aggDiv = document.getElementById('modal-agg-score');
                    if(aggDiv) {
                        if(header.series && header.series.summary) {
                            aggDiv.innerText = header.series.summary.toUpperCase();
                            aggDiv.classList.remove('hidden');
                        } else aggDiv.classList.add('hidden');
                    }

                    // Info
                    if(document.getElementById('game-info')) {
                        document.getElementById('game-info').innerHTML = `
                            <p>Local: ${data.gameInfo?.venue?.fullName || 'N/A'}</p>
                            <p>Árbitro: ${data.gameInfo?.officials?.[0]?.displayName || 'N/A'}</p>
                        `;
                    }

                    this.renderTimeline(data);
                    this.renderStats(data);

                } catch(e) { console.error(e); }
            },

            renderTimeline(data) {
                const cont = document.getElementById('timeline-container');
                if(!cont) return;
                cont.innerHTML = '';
                
                let events = data.keyEvents ? [...data.keyEvents].reverse() : [];
                if(!events.length && data.header.competitions[0].details) {
                    events = data.header.competitions[0].details.map(d => ({
                        text: d.type?.text,
                        shortText: d.shortText,
                        clock: d.clock,
                        participants: d.participants
                    }));
                }

                if(!events.length) { cont.innerHTML = '<p class="text-center text-gray-500">Sem lances.</p>'; return; }

                events.forEach(ev => {
                    const t = ev.clock?.displayValue || '-';
                    const txt = ev.shortText || ev.text || '';
                    const pName = ev.participants?.[0]?.athlete?.displayName || '';
                    let icon = '•';
                    if (txt) {
                        const lowerTxt = txt.toLowerCase();
                        if(lowerTxt.includes('goal') || lowerTxt.includes('gol')) icon = '⚽';
                        if(lowerTxt.includes('red')) icon = '🟥';
                        if(lowerTxt.includes('yellow')) icon = '🟨';
                    }
                    cont.innerHTML += `
                        <div class="timeline-item">
                            <div class="timeline-time">${t}</div>
                            <div class="text-xl">${icon}</div>
                            <div><div class="text-white font-bold">${pName}</div><div class="text-gray-500 text-xs">${txt}</div></div>
                        </div>
                    `;
                });
            },

            renderStats(data) {
                const cont = document.getElementById('stats-container');
                if(!cont) return;
                cont.innerHTML = '';
                
                if(!data.boxscore?.teams) { cont.innerHTML = '<p class="text-center text-gray-500">Sem estatísticas.</p>'; return; }
                
                const hStats = data.boxscore.teams[1].statistics;
                const aStats = data.boxscore.teams[0].statistics;

                hStats.forEach((s, i) => {
                    const valH = s.displayValue;
                    const valA = aStats[i].displayValue;
                    const numH = parseFloat(valH)||0;
                    const numA = parseFloat(valA)||0;
                    const total = numH+numA;
                    const pct = total > 0 ? (numH/total)*100 : 50;

                    cont.innerHTML += `
                        <div class="mb-4">
                            <div class="flex justify-between text-xs text-gray-400 font-bold mb-1 uppercase"><span>${valH}</span><span>${s.label}</span><span>${valA}</span></div>
                            <div class="flex h-2 bg-gray-800 rounded-full overflow-hidden"><div class="bg-[#d1ff4d]" style="width: ${pct}%"></div><div class="bg-gray-600 flex-1"></div></div>
                        </div>
                    `;
                });
            },

            setMatchTab(t) {
                ['timeline', 'stats'].forEach(tab => {
                    const el = document.getElementById('match-tab-'+tab);
                    if(el) el.classList.toggle('hidden', t!==tab);
                    
                    const btn = document.getElementById('tab-btn-'+tab);
                    if(btn) {
                        if(t===tab) {
                            btn.classList.add('border-[#d1ff4d]', 'text-white');
                            btn.classList.remove('border-transparent', 'text-gray-500');
                        } else {
                            btn.classList.remove('border-[#d1ff4d]', 'text-white');
                            btn.classList.add('border-transparent', 'text-gray-500');
                        }
                    }
                });
            },

            closeModal(id) { 
                const el = document.getElementById(id);
                if(el) el.classList.remove('open'); 
            },

            // --- Search ---
            async handleSearch(q) {
                const resDiv = document.getElementById('global-search-results');
                if(q.length < 3) { resDiv.classList.add('hidden'); return; }
                resDiv.classList.remove('hidden');
                resDiv.innerHTML = '<div class="p-4 text-center text-gray-500">Buscando...</div>';
                const wRes = await fetch(`https://pt.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${encodeURIComponent(q)}&limit=5&format=json`);
                const wData = await wRes.json();
                let html = '';
                if(wData[1].length) {
                    html += `<div class="p-2 text-xs font-bold text-gray-500 uppercase bg-white/5">Wiki / Jogadores</div>`;
                    wData[1].forEach(t => html += `<div class="p-3 hover:bg-white/5 text-sm text-white cursor-pointer" onclick="app.openWiki('${t}')">${t}</div>`);
                }
                resDiv.innerHTML = html || '<div class="p-4 text-center text-gray-500">Nada encontrado.</div>';
            },

            async openWiki(term) {
                document.getElementById('global-search-results').classList.add('hidden');
                this.setView('wiki');
                const cont = document.getElementById('wiki-content');
                cont.innerHTML = '<div class="spinner mx-auto"></div>';
                try {
                    const res = await fetch(`https://pt.wikipedia.org/w/api.php?origin=*&action=parse&page=${encodeURIComponent(term)}&prop=text&formatversion=2&format=json`);
                    const data = await res.json();
                    cont.innerHTML = `<h2 class="text-2xl font-bold text-white mb-4">${data.parse.title}</h2><div class="wiki-article-content">${data.parse.text}</div>`;
                } catch(e) { cont.innerHTML = '<p class="text-red-500">Erro ao carregar.</p>'; }
            },

            // --- Clubs ---
            openClub(id, name) {
                document.getElementById('club-modal').classList.add('open');
                document.getElementById('club-modal-name').innerText = name;
                this.state.currentClubId = id;
                this.state.currentClubName = name;
                this.setClubTab('history');
            },

            async setClubTab(tab) {
                const hist = document.getElementById('club-view-history');
                const squad = document.getElementById('club-view-squad');
                if(hist) hist.classList.toggle('hidden', tab!=='history');
                if(squad) squad.classList.toggle('hidden', tab!=='squad');
                
                if(tab === 'history') this.openWiki(this.state.currentClubName);
                if(tab === 'squad') {
                    const cont = document.getElementById('club-view-squad');
                    if(!cont) return;
                    cont.innerHTML = '<div class="spinner mx-auto"></div>';
                    const s = this.state.currentSport;
                    const l = this.state.sports[s].leagues[this.state.currentLeague];
                    try {
                        const r = await fetch(`${this.proxy}https://site.api.espn.com/apis/site/v2/sports/${s}/${l.slug}/teams/${this.state.currentClubId}/roster`);
                        const d = await r.json();
                        cont.innerHTML = '<div class="grid grid-cols-1 md:grid-cols-2 gap-4"></div>';
                        const grid = cont.firstElementChild;
                        (d.athletes||[]).forEach(a => {
                            grid.innerHTML += `<div class="bg-[#1a1b1e] border border-[#333] p-3 rounded flex items-center gap-4"><img src="${a.headshot?.href || 'https://via.placeholder.com/50'}" class="w-12 h-12 rounded-full bg-black object-cover"><div><div class="font-bold text-white">${a.fullName}</div><div class="text-xs text-gray-500">${a.position?.displayName||''}</div></div></div>`;
                        });
                    } catch(e) { cont.innerHTML='<p>Elenco indisponível.</p>'; }
                }
            }
        };

        document.addEventListener('DOMContentLoaded', () => app.init());