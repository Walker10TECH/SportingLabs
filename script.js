const app = {
            state: {
                currentSport: 'soccer',
                currentLeague: 'brasileirao',
                view: 'matches',
                region: 'br',
                timers: {},
                matchRefreshInterval: null,
                scoreboardRefreshInterval: null, // Novo: para atualizar a lista de jogos
                playerCache: {},
                teamWikiDb: {},
                sports: {}
            },
            proxy: 'https://corsproxy.io/?',

            async init() {
                try {
                    await Promise.all([
                        this.detectRegion(),
                        this.loadTeamWikiDb(),
                        this.loadSportsDb()
                    ]);
                    this.renderNav();
                    this.loadLeague(this.state.currentLeague);
                } catch(e) { console.log(e); }
                finally { 
                    document.getElementById('global-loader').classList.add('loader-hidden'); 
                    lucide.createIcons();
                    this.setupEvents();
                }
            },

            async loadTeamWikiDb() {
                try {
                    const res = await fetch('team-wiki-db.json');
                    this.state.teamWikiDb = await res.json();
                } catch(e) {
                    console.error("Falha ao carregar o banco de dados de times da Wiki.", e);
                }
            },

            async loadSportsDb() {
                try {
                    const res = await fetch('sports-db.json');
                    this.state.sports = await res.json();
                } catch(e) {
                    console.error("Falha ao carregar o banco de dados de esportes.", e);
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
                document.getElementById('mobile-search-input').addEventListener('keyup', this.debounce(e => this.handleSearch(e.target.value, true), 500));
                document.getElementById('club-search-input').addEventListener('keyup', this.debounce(e => this.filterClubs(e.target.value), 300));
                window.onclick = e => {
                    if(!e.target.closest('.dropdown-container')) document.querySelectorAll('.dropdown-menu').forEach(el=>el.classList.remove('open'));
                    if(!e.target.closest('#search-container')) document.getElementById('global-search-results').classList.add('hidden');
                };
            },

            debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; },

            renderNav() {
                const sMenu = document.getElementById('sport-menu');
                const mobSMenu = document.getElementById('mob-sport-menu');
                sMenu.innerHTML = '';
                mobSMenu.innerHTML = '';

                Object.entries(this.state.sports).forEach(([k, v]) => {
                    const div = document.createElement('div');
                    div.className = 'dropdown-item';
                    div.innerText = v.name;
                    div.onclick = () => this.changeSport(k);
                    sMenu.appendChild(div);

                    const mobDiv = div.cloneNode(true);
                    mobDiv.onclick = () => this.changeSport(k);
                    mobSMenu.appendChild(mobDiv);
                });
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
                const mobSidebar = document.getElementById('mob-sidebar-league-list');
                lMenu.innerHTML = ''; sidebar.innerHTML = '';
                mobSidebar.innerHTML = '';
                
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

                    const mobSItem = sItem.cloneNode(true);
                    mobSItem.onclick = () => { this.changeLeague(k); this.toggleMobileMenu(); };
                    mobSidebar.appendChild(mobSItem);
                });

                const currL = leagues[this.state.currentLeague];
                document.getElementById('header-league-logo').src = currL.logo;
                document.getElementById('header-league-name').innerText = currL.name;
                document.getElementById('header-sport-name').innerText = this.state.sports[this.state.currentSport].name;
                document.getElementById('mob-header-sport-name').innerText = this.state.sports[this.state.currentSport].name;
                lucide.createIcons();
            },

            changeSport(s) {
                this.state.currentSport = s;
                this.state.currentLeague = Object.keys(this.state.sports[s].leagues)[0];
                this.renderNav();
                this.loadLeague(this.state.currentLeague);
            },

            changeLeague(l) {
                this.state.currentLeague = l;
                document.querySelectorAll('.dropdown-menu').forEach(e => e.classList.remove('open'));
                this.renderNav();
                this.loadLeague(l);
            },

            toggleDropdown(id) {
                const el = document.getElementById(id);
                const wasOpen = el.classList.contains('open');
                document.querySelectorAll('.dropdown-menu').forEach(e => e.classList.remove('open'));
                if(!wasOpen) el.classList.add('open');
            },

            toggleMobileMenu() {
                const sidebar = document.getElementById('mobile-sidebar');
                const overlay = document.getElementById('mobile-sidebar-overlay');
                sidebar.classList.toggle('open');
                overlay.classList.toggle('hidden');
            },

            toggleMobileSearch() {
                const overlay = document.getElementById('mobile-search-overlay');
                overlay.classList.toggle('hidden');
                if (!overlay.classList.contains('hidden')) {
                    document.getElementById('mobile-search-input').focus();
                }
            },

            setView(v) {
                this.state.view = v;
                ['matches', 'standings', 'news', 'clubs', 'wiki'].forEach(id => {
                    document.getElementById('view-'+id).classList.toggle('hidden', id !== v);
                    if (id === 'clubs') this.addWikiFilterToggle(); // Adiciona o toggle se não existir
                });

                // Garante que as abas olímpicas ocultas não sejam selecionadas
                if (this.state.currentSport === 'olympics' && (v === 'news' || v === 'clubs')) {
                    this.setView('matches');
                    return; // Impede a re-renderização da aba errada
                }

                // Ajusta a visibilidade dos botões de navegação
                ['matches', 'standings', 'news', 'clubs'].forEach(type => {
                    const mobBtn = document.getElementById('mob-' + type);
                    if (mobBtn) mobBtn.style.display = (this.state.currentSport === 'olympics' && (type === 'news' || type === 'clubs')) ? 'none' : 'flex';
                });

                // Update active states
                ['matches', 'standings', 'news', 'clubs', 'players'].forEach(type => {
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
                            ? "w-full text-left p-3 rounded-lg bg-white/10 flex items-center gap-3 font-semibold text-white group"
                            : "w-full text-left p-3 rounded-lg hover:bg-white/5 flex items-center gap-3 font-semibold text-gray-400 hover:text-white group";
                        const icon = deskBtn.querySelector('i');
                        if(icon) icon.classList.toggle('text-[#d1ff4d]', type === v);
                    }
                });
            },

            async loadLeague(key) {
                this.setView('matches');
                const sport = this.state.currentSport;
                const league = this.state.sports[sport].leagues[key];

                // Limpa o intervalo de atualização anterior
                if (this.state.matchRefreshInterval) clearInterval(this.state.matchRefreshInterval);
                this.state.matchRefreshInterval = null;
                // Novo: Limpa o intervalo de atualização do placar geral
                if (this.state.scoreboardRefreshInterval) clearInterval(this.state.scoreboardRefreshInterval);
                this.state.scoreboardRefreshInterval = null;


                // Controla a visibilidade das abas de desktop
                const olympicsSelected = sport === 'olympics';
                ['desk-news', 'desk-clubs'].forEach(id => {
                    const btn = document.getElementById(id);
                    if(btn) btn.style.display = olympicsSelected ? 'none' : 'flex';
                });
                
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

                if (sport === 'olympics') {
                    this.loadOlympicEvents();
                    this.loadOlympicMedalTable();
                    this.renderNews([]); // Limpa as notícias pois a API não fornece
                    return;
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
                        // Inicia a atualização automática de placares
                        this.state.matchRefreshInterval = setInterval(() => {
                            this.updateScores(sport, league.slug);
                        }, 20000); // Atualiza a cada 20 segundos

                        // Novo: Inicia a atualização da lista de jogos
                        this.state.scoreboardRefreshInterval = setInterval(() => {
                            this.loadLeague(this.state.currentLeague, false); // `false` para não resetar a view
                        }, 60000); // Atualiza a lista de jogos a cada 60 segundos

                        this.loadStandings(sport, league.slug);
                    } else {
                         standingsContainer.innerHTML = '<p class="text-gray-500 text-center p-8 col-span-full">Tabela não disponível para este esporte.</p>';
                    }

                } catch(e) {
                    document.getElementById('matches-grid').innerHTML = '<p class="text-center text-red-500">Erro ao carregar.</p>';
                }
            },

            async loadOlympicEvents() {
                const grid = document.getElementById('matches-grid');
                grid.innerHTML = '<div class="text-center text-gray-500 py-10">Carregando eventos olímpicos...</div>';
                try {
                    const res = await fetch(`${this.proxy}https://sph-s-api.olympics.com/summer/schedules/api/PT/schedule/day/2024-07-27`);
                    const data = await res.json();
                    this.renderOlympicEvents(data.units || []);
                } catch (e) { 
                    grid.innerHTML = '<p class="text-center text-red-500">Erro ao carregar eventos olímpicos.</p>';
                }
            },

            async loadOlympicMedalTable() {
                const container = document.getElementById('standings-container');
                container.innerHTML = '<p class="text-center text-gray-500 py-10 col-span-full">Carregando quadro de medalhas...</p>';
                try {
                    const res = await fetch(`${this.proxy}https://sph-s-api.olympics.com/summer/schemas/api/PT/medal_table`);
                    const data = await res.json();
                    this.renderOlympicMedalTable(data.medalTableNOC || []);
                } catch (e) { 
                    container.innerHTML = '<p class="text-center text-red-500 py-10 col-span-full">Não foi possível carregar o quadro de medalhas.</p>';
                }
            },

            renderOlympicEvents(events) {
                const grid = document.getElementById('matches-grid');
                grid.innerHTML = '';
                if (!events.length) {
                    grid.innerHTML = '<p class="text-center text-gray-500">Sem eventos olímpicos hoje.</p>';
                    return;
                }

                events.forEach(ev => {
                    if (!ev.competitors) return;

                    const home = ev.competitors.find(c => c.order === 1) || ev.competitors[0];
                    const away = ev.competitors.find(c => c.order === 2) || ev.competitors[1];
                    const status = ev.status.description;
                    const matchName = ev.disciplineName || 'Evento Olímpico';

                    const card = document.createElement('div');
                    card.className = 'match-card theme-olympics';

                    card.innerHTML = `
                        <div class="tv-scoreboard">
                            <div class="tv-logo-box"><img src="${ev.discipline.imageUrl}"></div>
                            <div class="tv-team-box text-right"><span class="truncate">${home.name}</span><img src="${home.noc.imageUrl}" class="w-8 h-8 object-cover rounded-full ml-2"></div>
                            <div class="tv-score-box">${home.result?.mark || '-'} - ${away?.result?.mark || '-'}</div>
                            <div class="tv-team-box text-left"><img src="${away.noc.imageUrl}" class="w-8 h-8 object-cover rounded-full mr-2"><span class="truncate">${away.name}</span></div>
                            <div class="tv-time-box">
                                <div class="match-timer-main">${status}</div>
                            </div>
                        </div>
                        <div class="match-footer"><span>${matchName}</span><span>${ev.venue_name || ''}</span></div>
                    `;
                    grid.appendChild(card);
                });
            },

            renderOlympicMedalTable(countries) {
                const container = document.getElementById('standings-container');
                container.innerHTML = '';

                const tableHtml = `
                    <div class="bg-[#1a1b1e] rounded-xl border border-[#333] overflow-hidden h-fit col-span-full medal-table">
                        <div class="p-3 bg-white/5">
                            <h3 class="text-base font-bold text-white">Quadro de Medalhas</h3>
                        </div>
                        <div class="flex text-[10px] text-gray-500 px-2 py-2 border-b border-[#333] uppercase font-bold">
                            <span class="w-8 text-center">#</span>
                            <span class="flex-1 px-2">País</span>
                            <span class="w-8 text-center" title="Ouro">🥇</span>
                            <span class="w-8 text-center" title="Prata">🥈</span>
                            <span class="w-8 text-center" title="Bronze">🥉</span>
                            <span class="w-10 text-center font-bold">Total</span>
                        </div>
                        ${countries.map(c => `
                            <div class="flex items-center px-2 py-2 border-b border-[#333] hover:bg-white/5 text-sm" onclick="app.openWiki('${c.noc.description.replace(' ', '_')}')" style="cursor: pointer;">
                                <span class="w-8 text-center font-bold">${c.rank}</span>
                                <div class="flex-1 px-2 country-cell">
                                    <img src="${c.noc.imageUrl}" alt="${c.noc.description}">
                                    <span class="font-semibold text-white truncate">${c.noc.description}</span>
                                </div>
                                <span class="w-8 text-center gold font-semibold">${c.golds}</span>
                                <span class="w-8 text-center silver font-semibold">${c.silvers}</span>
                                <span class="w-8 text-center bronze font-semibold">${c.bronzes}</span>
                                <span class="w-10 text-center font-bold text-white">${c.total}</span>
                            </div>
                        `).join('')}
                    </div>
                `;
                container.innerHTML = tableHtml;
            },

            getThemeClassForLeague(lKey) {
                if (!lKey) lKey = this.state.currentLeague;

                if (lKey.includes('brasileiraob')) return 'theme-brasileiraob';
                if (lKey.includes('libertadores')) return 'theme-libertadores';
                if (lKey.includes('champions')) return 'theme-champions';
                if (lKey.includes('premier')) return 'theme-premier';
                if (lKey.includes('laliga')) return 'theme-laliga';
                if (lKey.includes('bundesliga')) return 'theme-bundesliga';
                if (lKey.includes('seriea')) return 'theme-seriea';
                if (lKey.includes('saudi')) return 'theme-saudi';
                if (lKey.includes('argentina')) return 'theme-argentina';
                if (lKey.includes('eredivisie')) return 'theme-eredivisie';
                if (lKey.includes('olympics')) return 'theme-olympics';
                if (lKey.includes('sulamericana')) return 'theme-sulamericana';
                
                return 'theme-brasileirao'; // Default
            },

            /* --- RENDER MATCHES (TV STYLE) --- */
            renderMatches(events) {
                const grid = document.getElementById('matches-grid');
                grid.innerHTML = '';
                if(!events.length) { grid.innerHTML = '<p class="text-center text-gray-500">Sem jogos hoje.</p>'; return; }

                // Clear old timers
                Object.values(this.state.timers).forEach(timer => clearInterval(timer.interval));
                this.state.timers = {};

                // Determine Theme
                const themeClass = this.getThemeClassForLeague();

                events.forEach(ev => {
                    const comp = ev.competitions[0];
                    const home = comp.competitors.find(c => c.homeAway === 'home');
                    const away = comp.competitors.find(c => c.homeAway === 'away');
                    const status = ev.status;
                    const isLive = status.type.state === 'in';
                    let aggText = '';
                    if(comp.series && comp.series.summary) aggText = `<div class="tv-time-agg">${comp.series.summary}</div>`;
                    const matchName = ev.name.replace(' em ', ' VS ');

                    const card = document.createElement('div');
                    card.className = `match-card ${themeClass}`;
                    card.onclick = () => this.openMatch(ev.id, themeClass, home.team.color);

                    card.innerHTML = `
                        <div class="tv-scoreboard">
                            <div class="tv-logo-box"><img src="${this.state.sports[this.state.currentSport].leagues[this.state.currentLeague].logo}" alt="League Logo"></div>
                            <div class="tv-team-box text-right"><span class="truncate">${home.team.abbreviation || home.team.shortDisplayName}</span><img src="${home.team.logo}" class="w-8 h-8 object-contain ml-2" alt="Home Team Logo"></div>
                            <div class="tv-score-box" data-match-id="${ev.id}"><span data-score-home>${home.score}</span> - <span data-score-away>${away.score}</span></div>
                            <div class="tv-team-box text-left"><img src="${away.team.logo}" class="w-8 h-8 object-contain mr-2" alt="Away Team Logo"><span class="truncate">${away.team.abbreviation || away.team.shortDisplayName}</span></div>
                            <div class="tv-time-box" id="time-box-${ev.id}">
                                <div class="timer-wrapper">
                                    <div id="match-timer-${ev.id}" class="match-timer-main">${status.type.shortDetail}</div>
                                    <div id="match-stoppage-time-${ev.id}" class="match-timer-stoppage"></div>
                                </div>
                                ${aggText}
                            </div>
                        </div>
                        <div class="match-footer"><span>${matchName}</span><span>${comp.venue?.fullName || ''}</span></div>
                    `;
                    grid.appendChild(card);

                    if (isLive) {
                        this.startMatchTimer(ev.id, status.displayClock, status.type.shortDetail, comp);
                    }
                });
                lucide.createIcons();
            },

            async updateScores(sport, slug) {
                try {
                    const url = `${this.proxy}https://site.api.espn.com/apis/site/v2/sports/${sport}/${slug}/scoreboard?lang=pt&region=${this.state.region}`;
                    const res = await fetch(url);
                    const data = await res.json();

                    if (!data.events) return;

                    data.events.forEach(event => {
                        const comp = event.competitions[0];
                        const home = comp.competitors.find(c => c.homeAway === 'home');
                        const away = comp.competitors.find(c => c.homeAway === 'away');
                        const status = event.status;

                        const scoreBox = document.querySelector(`.tv-score-box[data-match-id="${event.id}"]`);
                        if (!scoreBox) return;

                        const homeScoreEl = scoreBox.querySelector('[data-score-home]');
                        const awayScoreEl = scoreBox.querySelector('[data-score-away]');
                        const oldHomeScore = parseInt(homeScoreEl.textContent, 10);
                        const oldAwayScore = parseInt(awayScoreEl.textContent, 10);

                        if (home.score > oldHomeScore) {
                            homeScoreEl.classList.add('goal-animation');
                            this.playGoalSound();
                            setTimeout(() => homeScoreEl.classList.remove('goal-animation'), 800);
                        }
                        if (away.score > oldAwayScore) {
                            awayScoreEl.classList.add('goal-animation');
                            this.playGoalSound();
                            setTimeout(() => awayScoreEl.classList.remove('goal-animation'), 800);
                        }

                        homeScoreEl.textContent = home.score;
                        awayScoreEl.textContent = away.score;
                    });
                } catch (e) { console.error("Erro ao atualizar placares:", e); }
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
                const themeClass = this.getThemeClassForLeague();
                
                children.forEach(group => {
                    const div = document.createElement('div');
                    div.className = `bg-[#1a1b1e] rounded-xl border border-[#333] overflow-hidden h-fit ${themeClass}`;
                    
                    // Header
                    let html = `
                        <div class="p-3 flex justify-between items-center standings-group-header">
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
                    let entries = group.standings.entries || [];

                    // Ordena as entradas pela classificação (rank)
                    entries.sort((a, b) => a.stats.find(s => s.name === 'rank')?.value - b.stats.find(s => s.name === 'rank')?.value);
                    
                    entries.forEach(e => {
                        const stats = e.stats || []; // A variável 'i' não é mais necessária aqui
                        const getStat = (n) => stats.find(s => s.name === n)?.value || 0;
                        const p = getStat('points');
                        const j = getStat('gamesPlayed');
                        const v = getStat('wins');
                        const emp = getStat('ties');
                        const d = getStat('losses');
                        const sg = getStat('pointDifferential');
                        const rank = getStat('rank');
                        
                        // Colors for top positions
                        let posColor = 'text-gray-500';
                        if (rank === 1) posColor = 'text-[#d1ff4d] font-bold';
                        else if (rank <= 4) posColor = 'text-blue-400 font-bold';
                        else if (rank >= entries.length - 3) posColor = 'text-red-400 font-bold';

                        rows += `
                            <div class="flex items-center px-2 py-2 border-b border-[#333] hover:bg-white/5 text-sm">
                                <span class="w-8 text-center ${posColor}">${rank}</span>
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

            addWikiFilterToggle() {
                const clubsView = document.getElementById('view-clubs');
                if (!clubsView || clubsView.querySelector('#wiki-filter-container')) return;

                const searchInput = document.getElementById('club-search-input');
                const container = document.createElement('div');
                container.id = 'wiki-filter-container';
                container.className = 'flex items-center justify-end gap-2 mb-4 text-xs text-gray-400';
                container.innerHTML = `
                    <span>Apenas clubes com Wiki</span>
                    <button id="wiki-filter-toggle" class="relative inline-flex items-center h-5 rounded-full w-9 transition-colors bg-gray-600" onclick="app.toggleWikiFilter()">
                        <span class="inline-block w-3 h-3 transform bg-white rounded-full transition-transform translate-x-1"></span>
                    </button>
                `;
                // Insere o container do filtro depois do input de busca
                searchInput.parentNode.insertBefore(container, searchInput.nextSibling);
            },

            toggleWikiFilter() {
                const toggle = document.getElementById('wiki-filter-toggle');
                const span = toggle.querySelector('span');
                toggle.classList.toggle('bg-green-500');
                toggle.classList.toggle('bg-gray-600');
                span.classList.toggle('translate-x-5');
                span.classList.toggle('translate-x-1');
                this.filterClubs(document.getElementById('club-search-input').value); // Reaplica o filtro
            },

            renderClubs(children) {
                const grid = document.getElementById('clubs-grid');
                grid.innerHTML = '';
                 const themeClass = this.getThemeClassForLeague();
                const seen = new Set();
                children.forEach(c => {
                    c.standings.entries.forEach(e => {
                        if(seen.has(e.team.id)) return;
                        seen.add(e.team.id);
                        grid.innerHTML += `
                            <div class="club-grid-item" onclick="app.openClub('${e.team.id}', '${e.team.displayName}', '${themeClass}')">
                                <img src="${e.team.logos?.[0]?.href || 'https://a.espncdn.com/i/teamlogos/default-team-logo-500.png'}" class="h-12 mb-2 mx-auto object-contain" alt="${e.team.displayName}">
                                <h4 class="text-xs sm:text-sm text-white font-bold w-full truncate">${e.team.displayName}</h4>
                            </div>
                        `;
                    });
                });
            },

            filterClubs(query) {
                const searchTerm = query.toLowerCase().trim();
                const clubItems = document.querySelectorAll('#clubs-grid .club-grid-item');
                const wikiOnly = document.getElementById('wiki-filter-toggle')?.classList.contains('bg-green-500') || false;
                const wikiDb = this.state.teamWikiDb[this.state.currentLeague] || {};
                
                clubItems.forEach(item => {
                    const clubName = item.querySelector('h4').textContent.toLowerCase();
                    const hasWikiEntry = Object.keys(wikiDb).some(wikiName => wikiName.toLowerCase() === clubName);

                    const matchesSearch = clubName.includes(searchTerm);
                    const matchesWikiFilter = !wikiOnly || hasWikiEntry;

                    item.style.display = (matchesSearch && matchesWikiFilter) ? 'block' : 'none';
                });
            },

            startMatchTimer(matchId, initialClock, shortDetail, competition) {
                if (this.state.timers[matchId]) {
                    clearInterval(this.state.timers[matchId].interval);
                }
        
                const timerEl = document.getElementById(`match-timer-${matchId}`);
                const stoppageEl = document.getElementById(`match-stoppage-time-${matchId}`);
                if (!timerEl || !stoppageEl) return; 
        
                stoppageEl.textContent = '';
        
                if (!initialClock || !initialClock.includes(':')) {
                    timerEl.textContent = shortDetail;
                    return;
                }
        
                let [minutes, seconds] = initialClock.replace("'", "").split(':').map(Number);
        
                // Determina a duração da partida (90 para normal, 120 para prorrogação)
                const isExtraTime = competition.competitors.some(c => c.linescores?.some(l => l.period === 3));
                const maxTime = isExtraTime ? 120 : 90;
                const halfTime = maxTime / 2;
        
                const interval = setInterval(() => {
                    const matchCard = timerEl.closest('.match-card');
                    const statusEl = matchCard?.querySelector('.match-timer-main');
                    
                    // Para o cronômetro se o card sumir ou o status mudar para algo que não seja tempo (ex: Fim, Int)
                    if (!matchCard || (statusEl && !statusEl.textContent.includes(':'))) {
                        clearInterval(interval);
                        delete this.state.timers[matchId];
                        return;
                    }
        
                    seconds++;
                    if (seconds >= 60) {
                        seconds = 0;
                        minutes++;
                    }
        
                    let displayMinutes = minutes;
                    let displaySeconds = seconds;
                    let stoppageTime = 0;
        
                    if (minutes >= halfTime && minutes < maxTime) { // Acréscimos do 1º tempo
                        stoppageTime = minutes - halfTime;
                        displayMinutes = halfTime;
                        displaySeconds = 0;
                    } else if (minutes >= maxTime) { // Acréscimos do 2º tempo / Fim da prorrogação
                        stoppageTime = minutes - maxTime;
                        displayMinutes = maxTime;
                        displaySeconds = 0;
                    }
        
                    timerEl.textContent = `${String(displayMinutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`;
        
                    if (stoppageTime > 0) {
                        stoppageEl.textContent = `+${stoppageTime}`;
                    } else {
                        stoppageEl.textContent = '';
                    }
                }, 1000);
        
                this.state.timers[matchId] = {
                    interval: interval,
                    minutes: minutes,
                    seconds: seconds,
                    stoppage: stoppageMinutes
                };
            },

            // --- Modals ---
            async openMatch(id, themeClass = 'theme-brasileirao', teamColor = '#d1ff4d') {
                const modal = document.getElementById('match-modal');
                const modalContent = modal.querySelector('.modal-content');
                this.state.currentMatchId = id; // Armazena o ID da partida aberta

                document.getElementById('bg-wrapper').style.filter = 'blur(8px)';
                modal.classList.add('open');
                this.setMatchTab('timeline');

                // Limpa temas antigos e aplica o novo
                if (modalContent) {
                    const themes = ['theme-brasileirao', 'theme-brasileiraob', 'theme-libertadores', 'theme-champions', 'theme-premier', 'theme-laliga', 'theme-bundesliga', 'theme-seriea', 'theme-saudi', 'theme-argentina', 'theme-eredivisie', 'theme-olympics', 'theme-sulamericana'];
                    modalContent.classList.remove(...themes);
                    modalContent.classList.add(themeClass);
                }

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
                    safeSetSrc('modal-home-logo', home.team.logos?.[0]?.href);
                    safeSetSrc('modal-away-logo', away.team.logos?.[0]?.href);
                    safeSetText('modal-score', `${home.score || 0}-${away.score || 0}`);
                    safeSetText('modal-score-home', home.score || 0);
                    safeSetText('modal-score-away', away.score || 0);
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
                    this.renderStats(data, teamColor);

                    // Inicia a atualização do placar do modal
                    if (this.state.matchRefreshInterval) clearInterval(this.state.matchRefreshInterval);
                    this.state.matchRefreshInterval = setInterval(() => {
                        this.updateModalScore(this.state.currentMatchId);
                    }, 15000); // Atualiza a cada 15 segundos
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
                    const time = ev.clock?.displayValue || '-';
                    const text = ev.shortText || ev.text || '';
                    const participantName = ev.participants?.[0]?.athlete?.displayName || '';
                    let iconHtml = '<i data-lucide="circle" class="w-4 h-4 text-gray-600"></i>'; // Ícone padrão
                    const lowerText = text.toLowerCase();

                    if (lowerText.includes('gol') || lowerText.includes('goal')) {
                        if (lowerText.includes('contra') || lowerText.includes('own goal')) {
                            iconHtml = '<i data-lucide="shield-alert" class="w-5 h-5 text-red-400"></i>';
                        } else {
                            iconHtml = '<i data-lucide="soccer" class="w-5 h-5 text-white"></i>';
                        }
                    } else if (lowerText.includes('pênalti') || lowerText.includes('penalty')) {
                        if (lowerText.includes('perdido') || lowerText.includes('missed')) {
                            iconHtml = '<i data-lucide="shield-x" class="w-5 h-5 text-red-400"></i>';
                        } else {
                            iconHtml = '<i data-lucide="shield-check" class="w-5 h-5 text-green-400"></i>';
                        }
                    } else if (lowerText.includes('cartão amarelo') || lowerText.includes('yellow card')) {
                        iconHtml = '<i data-lucide="square" class="w-5 h-5 text-yellow-400 fill-current"></i>';
                    } else if (lowerText.includes('cartão vermelho') || lowerText.includes('red card')) {
                        iconHtml = '<i data-lucide="square" class="w-5 h-5 text-red-500 fill-current"></i>';
                    } else if (lowerText.includes('substituição') || lowerText.includes('substitution')) {
                        iconHtml = '<i data-lucide="arrow-left-right" class="w-5 h-5 text-blue-400"></i>';
                    } else if (lowerText.includes('início') || lowerText.includes('fim') || lowerText.includes('start') || lowerText.includes('end') || lowerText.includes('half-time')) {
                        iconHtml = '<i data-lucide="whistle" class="w-5 h-5 text-gray-400"></i>';
                    } else if (lowerText.includes('var')) {
                        iconHtml = '<i data-lucide="tv" class="w-5 h-5 text-cyan-400"></i>';
                    } else if (lowerText.includes('lesão') || lowerText.includes('injury')) {
                        iconHtml = '<i data-lucide="siren" class="w-5 h-5 text-orange-400"></i>';
                    } else if (lowerText.includes('assistência') || lowerText.includes('assist')) {
                        iconHtml = '<i data-lucide="footprints" class="w-5 h-5 text-purple-400"></i>';
                    } else if (lowerText.includes('escanteio') || lowerText.includes('corner')) {
                        iconHtml = '<i data-lucide="flag" class="w-5 h-5 text-gray-300"></i>';
                    }

                    cont.innerHTML += `
                        <div class="timeline-item">
                            <div class="timeline-time">${time}</div>
                            <div class="w-8 h-8 flex items-center justify-center">${iconHtml}</div>
                            <div><div class="text-white font-bold">${participantName}</div><div class="text-gray-500 text-xs">${text}</div></div>
                        </div>
                    `;
                });

                lucide.createIcons();
            },

            renderStats(data, teamColor = '#d1ff4d') {
                const cont = document.getElementById('stats-container');
                if(!cont) return;
                cont.innerHTML = '';
                
                if(!data.boxscore?.teams) { cont.innerHTML = '<p class="text-center text-gray-500">Sem estatísticas.</p>'; return; }
                
                const hStats = data.boxscore.teams[1].statistics;
                const aStats = data.boxscore.teams[0].statistics;

                // Adiciona uma verificação para garantir que as estatísticas existam
                if (!hStats || !aStats || hStats.length === 0) {
                    cont.innerHTML = '<p class="text-center text-gray-500">Sem estatísticas disponíveis.</p>';
                    return;
                }

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
                            <div class="flex h-2 bg-gray-800 rounded-full overflow-hidden"><div class="stat-bar-home" style="width: ${pct}%; background-color: #${teamColor};"></div><div class="bg-gray-600 flex-1"></div></div>
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
                            btn.classList.add('active');
                            btn.classList.remove('inactive');
                        } else {
                            btn.classList.remove('active');
                            btn.classList.add('inactive');
                        }
                    }
                });
            },

            closeModal(id) { 
                const el = document.getElementById(id);
                if(el) el.classList.remove('open'); 
                document.getElementById('bg-wrapper').style.filter = 'none';

                // Limpa o intervalo de atualização do modal e reinicia o da lista principal
                if (this.state.matchRefreshInterval) clearInterval(this.state.matchRefreshInterval);
                this.state.matchRefreshInterval = setInterval(() => {
                    // Certifica-se de que a liga e o esporte ainda existem antes de tentar acessar o slug
                    if (!this.state.sports[this.state.currentSport] || !this.state.sports[this.state.currentSport].leagues[this.state.currentLeague]) {
                        this.init(); // Reinicia se o estado for inválido
                        return;
                    }
                    this.updateScores(this.state.currentSport, this.state.sports[this.state.currentSport].leagues[this.state.currentLeague].slug);
                }, 20000);
            },

            // --- Search ---
            async handleSearch(q, isMobile = false) {
                const resDivId = isMobile ? 'mobile-search-results' : 'global-search-results';
                const resDiv = document.getElementById(resDivId);

                if(q.length < 3) { resDiv.classList.add('hidden'); return; }
                
                if (!isMobile) resDiv.classList.remove('hidden');
                resDiv.innerHTML = '<div class="p-4 text-center text-gray-500">Buscando...</div>';
                
                const wRes = await fetch(`https://pt.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${encodeURIComponent(q)}&limit=5&format=json`);
                const wData = await wRes.json();
                let html = '';
                
                if(wData[1].length) {
                    html += `<div class="p-2 text-xs font-bold text-gray-500 uppercase bg-white/5">Wiki / Jogadores</div>`;
                    wData[1].forEach(t => {
                        const clickAction = isMobile ? `app.openWiki('${t}'); app.toggleMobileSearch();` : `app.openWiki('${t}')`;
                        html += `<div class="p-3 hover:bg-white/5 text-sm text-white cursor-pointer" onclick="${clickAction}">${t}</div>`;
                    });
                }
                resDiv.innerHTML = html || '<div class="p-4 text-center text-gray-500">Nada encontrado.</div>';
            },

            async openWiki(term, containerId = 'wiki-content') {
                if (containerId === 'wiki-content') {
                    if(document.getElementById('global-search-results')) document.getElementById('global-search-results').classList.add('hidden');
                    this.setView('wiki');
                }
                const cont = document.getElementById(containerId);
                cont.innerHTML = '<div class="spinner mx-auto"></div>';
                try {
                    const res = await fetch(`https://pt.wikipedia.org/w/api.php?origin=*&action=parse&page=${encodeURIComponent(term)}&prop=text&formatversion=2&format=json`);
                    const data = await res.json();
                    cont.innerHTML = `<h2 class="text-2xl font-bold text-white mb-4 ${containerId !== 'wiki-content' ? 'hidden' : ''}">${data.parse.title}</h2><div class="wiki-article-content">${data.parse.text}</div>`;
                } catch(e) { cont.innerHTML = `<p class="text-red-500">Erro ao carregar artigo da Wikipedia para "${term}".</p>`; }
            },

            async updateModalScore(matchId) {
                const modal = document.getElementById('match-modal');
                if (!modal.classList.contains('open')) return; // Só atualiza se o modal estiver aberto

                const sport = this.state.currentSport;
                const league = this.state.sports[sport].leagues[this.state.currentLeague];

                try {
                    const res = await fetch(`${this.proxy}https://site.api.espn.com/apis/site/v2/sports/${sport}/${league.slug}/summary?event=${matchId}&lang=pt`);
                    const data = await res.json();
                    const header = data.header.competitions[0];
                    const home = header.competitors.find(c => c.homeAway === 'home');
                    const away = header.competitors.find(c => c.homeAway === 'away');

                    const homeScoreEl = document.getElementById('modal-score-home');
                    const awayScoreEl = document.getElementById('modal-score-away');
                    const oldHomeScore = parseInt(homeScoreEl.textContent, 10);
                    const oldAwayScore = parseInt(awayScoreEl.textContent, 10);
                    
                    if (homeScoreEl && home.score > oldHomeScore) {
                        homeScoreEl.classList.add('goal-animation');
                        this.playGoalSound(); // Toca o som
                    }
                    if (awayScoreEl && away.score > oldAwayScore) {
                        awayScoreEl.classList.add('goal-animation');
                        this.playGoalSound();
                    }

                    homeScoreEl.textContent = home.score || 0;
                    awayScoreEl.textContent = away.score || 0;
                    document.getElementById('modal-status').textContent = header.status.type.description;

                    setTimeout(() => { homeScoreEl.classList.remove('goal-animation'); awayScoreEl.classList.remove('goal-animation'); }, 800);
                } catch (e) { console.error("Erro ao atualizar placar do modal:", e); }
            },

            playGoalSound() {
                const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/11/17/audio_7022d52293.mp3'); // URL de um som de gol
                audio.play().catch(error => {
                    // A reprodução automática pode ser bloqueada pelo navegador.
                    // Isso é esperado e não precisa de um log de erro visível para o usuário.
                    console.log("A reprodução de áudio foi impedida pelo navegador:", error.message); // Log silencioso
                });
            },

            // --- Clubs ---
            openClub(id, name, themeClass = 'theme-brasileirao') {
                const modal = document.getElementById('club-modal');
                const modalContent = modal.querySelector('.modal-content');
                modal.classList.add('open');
                document.getElementById('bg-wrapper').style.filter = 'blur(8px)';
                document.getElementById('club-modal-name').innerText = name;
                this.state.currentClubId = id;
                this.state.currentClubName = name;

                // Limpa temas antigos e aplica o novo
                if (modalContent) {
                    const themes = ['theme-brasileirao', 'theme-brasileiraob', 'theme-libertadores', 'theme-champions', 'theme-premier', 'theme-laliga', 'theme-bundesliga', 'theme-seriea', 'theme-saudi', 'theme-argentina', 'theme-eredivisie', 'theme-olympics', 'theme-sulamericana'];
                    modalContent.classList.remove(...themes);
                    modalContent.classList.add(themeClass);
                }

                this.setClubTab('history');
            },

            async setClubTab(tab) {
                const hist = document.getElementById('club-view-history');
                const squad = document.getElementById('club-view-squad');
                if(hist) hist.classList.toggle('hidden', tab!=='history');
                if(squad) squad.classList.toggle('hidden', tab!=='squad');

                ['history', 'squad'].forEach(t => {
                    const btn = document.getElementById(`club-tab-btn-${t}`);
                    if (btn) {
                        btn.classList.toggle('active', t === tab);
                        btn.classList.toggle('inactive', t !== tab);
                    }
                });

                this.setClubTabStyles();
                
                if(tab === 'history') {
                    const wikiTerm = this.state.teamWikiDb[this.state.currentLeague]?.[this.state.currentClubName] || this.state.currentClubName;
                     this.openWiki(wikiTerm, 'club-view-history');
                }


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
            },

            setClubTabStyles() {
                ['history', 'squad'].forEach(tab => {
                    const btn = document.getElementById(`club-tab-btn-${tab}`);
                    if (btn) {
                        const isActive = !document.getElementById(`club-view-${tab}`).classList.contains('hidden');
                        btn.classList.toggle('active', isActive);
                        btn.classList.toggle('inactive', !isActive);
                    }
                });
            }
        };

        document.addEventListener('DOMContentLoaded', () => app.init());