const app = {
    state: {
        currentLeague: 'brasileirao',
        view: 'matches',
        modalTab: 'stats',
        //COLOQUE VARIOS USER REGIONS
        userRegion: 'br',
        leagues: {
            'brasileirao': { slug: 'bra.1', slugs: ['bra.1', 'bra.2'], name: 'Brasileirão', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/85.png', bg: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/04/taca-e1712177532245.jpeg?w=910' },
            'libertadores': { slug: 'conmebol.libertadores', name: 'Libertadores', logo: 'https://designersbrasileiros.com.br/wp-content/uploads/2017/01/logo.jpg', bg: 'https://lncimg.lance.com.br/cdn-cgi/image/width=950,quality=75,fit=pad,format=webp/uploads/2021/01/29/60141dfea45a6.jpeg' },
            'sulamericana': { slug: 'conmebol.sudamericana', name: 'Sul-Americana', logo: 'https://play-lh.googleusercontent.com/CuPkacdZsi9ApxBOnGwPBAV-zikx8VKmRbMUYVfB-vy-DsNfrQ6ykY6lMcj8iqR7oC5u', bg: 'https://s2-ge.glbimg.com/-M2a9kZoesn0lYulcHlg0hIvCko=/0x0:1280x853/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2022/j/Y/BAJcXyRz6Iz6Svtlf1AA/244ecb3d-2cab-4933-87e0-de24261e1696.jfif' },
            'champions': { slug: 'uefa.champions', name: 'Champions League', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/2.png', bg: 'https://lncimg.lance.com.br/cdn-cgi/image/width=1280,height=720,quality=75,fit=cover/uploads/2023/03/17/641465f53b411.jpeg' },
            'premier': { slug: 'eng.1', slugs: ['eng.1', 'eng.2'], name: 'Inglaterra', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/23.png', bg: 'https://lncimg.lance.com.br/cdn-cgi/image/width=950,quality=75,fit=pad,format=webp/uploads/2020/04/05/5e8a04ba97834.jpeg' },
            'laliga': { slug: 'esp.1', slugs: ['esp.1', 'esp.2'], name: 'Espanha', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/15.png', bg: 'https://assets.goal.com/images/v3/blt054a5ddddf1e5a2b/158f203189e94419d7010667f379da35bcf16d8e.jpg' },
            'seriea': { slug: 'ita.1', slugs: ['ita.1', 'ita.2'], name: 'Itália', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/12.png', bg: 'https://cloudfront-us-east-1.images.arcpublishing.com/newr7/L6ZP3CEJ6VMPNFT5HTW7H7L7LY.jpg' },
            'bundesliga': { slug: 'ger.1', slugs: ['ger.1', 'ger.2'], name: 'Alemanha', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/10.png', bg: 'https://s2-ge.glbimg.com/F2PP74GbwM16ougDWVMDhZzEp6U=/0x0:1024x659/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2024/X/Y/3pfuBhTzuraB6EHOqszA/gettyimages-1742744089.jpg' },
            'eredivisie': { slug: 'ned.1', slugs: ['ned.1', 'ned.2'], name: 'Holanda', logo: 'https://i.pinimg.com/736x/5c/7e/7b/5c7e7b70cd67fa9a59d626a7efdf3a19.jpg', bg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGutuFAjY1Jn4Egu_ncE2-IMj_zUDooPWDQ&s' },
            'argentina': { slug: 'arg.1', slugs: ['arg.1', 'arg.2'], name: 'Argentina', logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/1.png', bg: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/12/Capturar_e27e29.jpg?w=793' },
            'saudi': { slug: 'ksa.1', name: 'Arábia Saudita', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Saudi_Pro_League_Logo.svg/1196px-Saudi_Pro_League_Logo.svg.png', bg: 'https://www.365scores.com/pt-br/news/magazine/wp-content/uploads/2023/11/366423961_5646928382077000_2604818796297545939_n-e1699379331310.jpg' }
        },
        cache: {}
    },

    init() {
        this.detectRegion();
        lucide.createIcons();
        this.renderNav();
        this.loadLeague(this.state.currentLeague);
        setInterval(() => { if(!document.hidden && this.state.view === 'matches') this.loadLeague(this.state.currentLeague, true); }, 60000);
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
    saveKey() { this.toggleSettings(); this.loadLeague(this.state.currentLeague); },
    
    renderNav() {
        const nav = document.getElementById('league-nav');
        nav.innerHTML = '';
        Object.entries(this.state.leagues).forEach(([k, v]) => {
            const btn = document.createElement('button');
            btn.className = `nav-link ${k===this.state.currentLeague?'active':''}`;
            btn.id = `nav-${k}`;
            btn.innerText = v.name;
            btn.onclick = () => this.changeLeague(k);
            nav.appendChild(btn);
        });
    },

    changeLeague(k) {
        this.state.currentLeague = k;
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.getElementById(`nav-${k}`).classList.add('active');
        this.loadLeague(k);
    },

    setView(v) {
        this.state.view = v;
        ['matches','standings', 'news', 'top-scorers'].forEach(name => {
            const btn = document.getElementById('btn-'+name);
            const view = document.getElementById(`view-${name}`);
            if(name === v) {
                btn.classList.remove('text-gray-400');
                btn.classList.add('bg-red-600', 'text-white', 'shadow-md');
                view.classList.remove('hidden');
            } else {
                btn.classList.add('text-gray-400');
                btn.classList.remove('bg-red-600', 'text-white', 'shadow-md');
                view.classList.add('hidden');
            }
        });
        if(v === 'standings') this.loadStandings();
        if(v === 'news') this.loadNews();
        if(v === 'top-scorers') this.loadTopScorers();
    },

    setModalTab(t) {
        this.state.modalTab = t;
        document.querySelectorAll('.modal-tab-btn').forEach(b => {
            b.classList.remove('text-white', 'border-b-2', 'border-red-600');
            b.classList.add('text-gray-500');
        });
        const activeBtn = document.getElementById(`tab-${t}`);
        activeBtn.classList.remove('text-gray-500');
        activeBtn.classList.add('text-white', 'border-b-2', 'border-red-600');
        ['stats','lineups'].forEach(view => document.getElementById(`modal-view-${view}`).classList.add('hidden'));
        document.getElementById(`modal-view-${t}`).classList.remove('hidden');
    },

    closeModal(id) { document.getElementById(id).classList.add('hidden'); },

    // --- API FETCHING ---
    
    async loadLeague(key, isRefresh = false) {
        const league = this.state.leagues[key];
        
        // Update header only if it's not a background refresh
        if (!isRefresh) {
            document.getElementById('league-title').innerText = league.name;
            document.getElementById('bg-wrapper').style.backgroundImage = `url('${league.bg}')`;
        }
        document.getElementById('league-logo').src = league.logo;

        document.getElementById('loader').classList.remove('hidden');
        document.getElementById('view-matches').innerHTML = '';
        document.getElementById('view-standings').classList.add('hidden');

        if(this.state.view === 'news') { this.loadNews(); document.getElementById('loader').classList.add('hidden'); return; }
        if(this.state.view === 'top-scorers') { this.loadTopScorers(); document.getElementById('loader').classList.add('hidden'); return; }
        if(this.state.view === 'standings') { this.loadStandings(); document.getElementById('loader').classList.add('hidden'); return; }

        try {
            const res = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/${league.slug}/scoreboard?lang=pt&region=${this.state.userRegion}`);
            const data = await res.json();
            this.state.cache[key] = data.events || []; 
            this.renderMatches(data.events || []);
        } catch (e) {
            document.getElementById('view-matches').innerHTML = '<p class="text-center text-gray-400 col-span-2">Erro ao conectar à ESPN.</p>';
        }
        document.getElementById('loader').classList.add('hidden');
    },

    async loadStandings() {
        const league = this.state.leagues[this.state.currentLeague];
        const slugsToFetch = league.slugs || [league.slug];
        const container = document.getElementById('standings-container');
        container.innerHTML = '<div class="loader w-6 h-6"></div>';

        try {
            // Busca os dados de todas as divisões em paralelo
            const responses = await Promise.all(
                slugsToFetch.map(slug => fetch(`https://site.api.espn.com/apis/v2/sports/soccer/${slug}/standings?lang=pt&region=${this.state.userRegion}`))
            );
            const dataArray = await Promise.all(responses.map(res => res.json()));

            container.innerHTML = ''; // Limpa o loader

            dataArray.forEach(data => {
                const children = data.children || [];
                this.renderStandings(children, true); // O `true` indica para adicionar ao container
            });
        } catch (e) {
            container.innerHTML = '<p class="text-center text-red-400 p-4">Classificação indisponível.</p>';
        }
    },

    async loadNews() {
        const container = document.getElementById('view-news');
        container.innerHTML = '<div class="loader w-6 h-6 col-span-full mx-auto"></div>';
        const league = this.state.leagues[this.state.currentLeague];

        try {
            const res = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/${league.slug}/news`);
            const data = await res.json();
            this.renderNews(data.articles || []);
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

    async loadTopScorers() {
        const container = document.getElementById('top-scorers-container');
        container.innerHTML = '<div class="p-8 flex justify-center"><div class="loader w-6 h-6"></div></div>';
        const league = this.state.leagues[this.state.currentLeague];

        try {
            const res = await fetch(`https://site.api.espn.com/apis/v2/sports/soccer/${league.slug}/leaders`);
            const data = await res.json();
            const goalsCategory = data.leaderCategories?.find(cat => cat.name === 'goals');
            this.renderTopScorers(goalsCategory?.leaders || []);
        } catch (e) {
            container.innerHTML = '<p class="text-center text-red-400 p-8">Não foi possível carregar os artilheiros.</p>';
        }
    },

    renderTopScorers(leaders) {
        const container = document.getElementById('top-scorers-container');
        if (leaders.length === 0) {
            container.innerHTML = '<p class="text-center text-gray-500 p-8">Dados de artilharia indisponíveis para esta liga.</p>';
            return;
        }

        let rowsHTML = '';
        leaders.forEach(leader => {
            rowsHTML += `
                <tr class="border-b border-border text-gray-300 hover:bg-white/5 transition">
                    <td class="p-4 text-center font-mono text-sm">${leader.rank}</td>
                    <td class="p-4 flex items-center gap-4">
                        <img src="${leader.athlete.headshot?.href || 'https://placehold.co/40x40/2a2a2a/ffffff?text=?'}" class="w-10 h-10 object-cover bg-surface-light rounded-full">
                        <div>
                            <div class="font-bold text-white">${leader.athlete.displayName}</div>
                            <div class="text-xs text-gray-400">${leader.team.displayName}</div>
                        </div>
                    </td>
                    <td class="p-4 text-center font-bold text-xl text-accent-red">${leader.value}</td>
                </tr>
            `;
        });

        container.innerHTML = `
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left">
                    <thead class="text-xs text-gray-500 uppercase bg-surface-light">
                        <tr>
                            <th class="p-4 text-center">#</th>
                            <th class="p-4">Jogador</th>
                            <th class="p-4 text-center">Gols</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-border">${rowsHTML}</tbody>
                </table>
            </div>
        `;
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
            const clock = ev.status.displayClock;
            const broadcast = this.getBroadcastForRegion(comp.broadcasts);
            
            div.innerHTML += `
                <div class="game-card p-4 cursor-pointer relative group overflow-hidden ${isLive?'border-red-500/50 bg-red-900/20':''}" onclick="app.openMatch('${ev.id}')">
                    ${isLive ? `<div class="absolute top-0 right-0 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl live-pulse">AO VIVO • ${clock}'</div>` : ''}
                    <div class="flex items-center gap-4">
                        <div class="w-16 text-center border-r border-white/10 pr-4 flex-shrink-0">
                            <div class="text-[10px] font-bold text-gray-400 uppercase mb-1">${isLive ? 'JOGANDO' : ev.status.type.shortDetail}</div>
                            <div class="text-[9px] text-gray-500 text-ellipsis overflow-hidden">${broadcast ? '📺 '+broadcast : ''}</div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex justify-between items-center mb-2">
                                <div class="flex items-center gap-2 truncate">
                                    <img src="${home.team.logo}" class="w-6 h-6 object-contain bg-white rounded-full p-0.5">
                                    <span class="text-sm font-bold text-white truncate">${home.team.displayName}</span>
                                </div>
                                <span class="text-lg font-bold ${isLive?'text-red-400':'text-white'}">${home.score || '0'}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <div class="flex items-center gap-2 truncate">
                                    <img src="${away.team.logo}" class="w-6 h-6 object-contain bg-white rounded-full p-0.5">
                                    <span class="text-sm font-bold text-white truncate">${away.team.displayName}</span>
                                </div>
                                <span class="text-lg font-bold ${isLive?'text-red-400':'text-white'}">${away.score || '0'}</span>
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

        children.forEach(child => {
            const groupName = child.name || 'Classificação Geral';
            const entries = child.standings?.entries || [];

            if(entries.length === 0) return;
            
            const tableWrapper = document.createElement('div');
            tableWrapper.className = 'bg-surface rounded-xl border border-border overflow-hidden shadow-xl flex flex-col';
            
            let rowsHTML = '';
            entries.forEach((entry, idx) => {
                const stats = entry.stats || [];
                const getStat = (n) => stats.find(s => s.name === n)?.value || 0;
                let color = idx < 4 ? 'border-l-4 border-blue-500' : 'border-l-4 border-transparent';
                
                rowsHTML += `
                    <tr class="border-b border-[#333] text-gray-300 hover:bg-white/5 transition">
                        <td class="p-3 text-center font-mono text-xs ${color} bg-[#1a1a1a]">${idx+1}</td>
                        <td class="p-3 flex items-center gap-3 min-w-[150px]">
                            <img src="${entry.team.logos?.[0]?.href}" class="w-6 h-6 bg-white rounded-full p-0.5 object-contain">
                            <span class="font-bold text-white text-xs md:text-sm">${entry.team.displayName}</span>
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

    // --- MATCH DETAIL ---
    async openMatch(id) {
        document.getElementById('match-modal').classList.remove('hidden');
        this.setModalTab('stats');
        
        document.getElementById('pitch-container').innerHTML = '<div class="pitch-lines"></div><div class="center-circle"></div><div class="half-line"></div>';
        document.getElementById('incidents-list').innerHTML = '<p class="text-center text-gray-500 text-xs">Carregando...</p>';
        document.getElementById('stats-container').innerHTML = '<p class="text-center text-gray-500 text-xs">Carregando...</p>';

        const league = this.state.leagues[this.state.currentLeague];
        const res = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/${league.slug}/summary?event=${id}&lang=pt&region=${this.state.userRegion}`);
        const data = await res.json();
        const comp = data.header.competitions[0];
        const home = comp.competitors.find(c => c.homeAway === 'home');
        const away = comp.competitors.find(c => c.homeAway === 'away');

        document.getElementById('modal-home').innerText = home.team.displayName;
        document.getElementById('modal-home-logo').src = home.team.logos[0].href;
        document.getElementById('modal-away').innerText = away.team.displayName;
        document.getElementById('modal-away-logo').src = away.team.logos[0].href;
        document.getElementById('modal-score').innerText = `${home.score} : ${away.score}`;
        document.getElementById('modal-status').innerText = comp.status.type.detail;
        
        const broadcast = this.getBroadcastForRegion(comp.broadcasts) || 'Sem transmissão listada';
        document.getElementById('broadcast-text').innerText = broadcast;

        const venue = data.gameInfo?.venue?.fullName || 'Estádio não informado';
        document.getElementById('game-info').innerHTML = `<p><strong>Estádio:</strong> ${venue}</p><p><strong>Data:</strong> ${new Date(data.header.competitions[0].date).toLocaleString('pt-BR')}</p>`;

        this.renderIncidents(data.plays || [], home.id);
        this.renderStats(data.boxscore?.teams || []);
        this.renderLineups(data.boxscore?.players || [], data.boxscore?.form); 
    },

    renderIncidents(plays, homeId) {
        const div = document.getElementById('incidents-list');
        div.innerHTML = '';
        const keyEvents = plays.filter(p => p.type.text.toLowerCase().includes('gol') || p.type.text.toLowerCase().includes('cartão'));
        if(keyEvents.length === 0) { div.innerHTML = '<p class="text-center text-gray-500 text-xs mt-4">Sem lances principais.</p>'; return; }
        
        keyEvents.reverse().forEach(p => {
            const isHome = p.team?.id === homeId;
            let icon = p.type.text.toLowerCase().includes('gol') ? '⚽' : '🟥';
            if(p.type.text.includes('Card')) icon = '🟨';
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

    renderLineups(teams) {
        const pitch = document.getElementById('pitch-container');
        const lists = document.getElementById('roster-lists');
        lists.innerHTML = '';
        if(!teams || teams.length === 0) { pitch.innerHTML += '<p class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500 text-xs">Sem escalação</p>'; return; }

        teams.forEach((team, idx) => {
            const isHome = idx === 1; 
            const color = isHome ? 'bg-blue-600' : 'bg-red-600';
            let listHTML = `<div class="text-xs text-gray-400"><h5 class="font-bold text-white mb-2 uppercase flex items-center gap-2"><img src="${team.team.logo}" class="w-4 h-4"> ${team.team.displayName}</h5><ul class="space-y-1">`;
            const starters = team.statistics.filter(p => p.starter);
            const defs = starters.filter(p => p.athlete.position.abbreviation === 'D');
            const mids = starters.filter(p => p.athlete.position.abbreviation === 'M');
            const fwds = starters.filter(p => p.athlete.position.abbreviation === 'F');

            starters.forEach((p) => {
                const ath = p.athlete;
                const pos = ath.position.abbreviation;
                const statsJson = JSON.stringify(p.stats || []).replace(/"/g, "&quot;");

                listHTML += `<li class="flex justify-between items-center border-b border-white/5 pb-1 cursor-pointer hover:text-white" onclick='app.openPlayer("${ath.displayName}", "${ath.position.displayName}", "${team.team.displayName}", "${ath.headshot?.href}", ${statsJson})'><span>${ath.jersey || '-'} ${ath.displayName}</span> <span class="text-[10px] opacity-50">${pos}</span></li>`;

                // Pitch Positioning
                let top = 50, left = 50;
                if(isHome) {
                    if(pos === 'G') { top = 92; left = 50; }
                    else if(pos === 'D') { top = 75; left = 10 + (80 / (defs.length + 1)) * (defs.indexOf(p) + 1); }
                    else if(pos === 'M') { top = 50; left = 10 + (80 / (mids.length + 1)) * (mids.indexOf(p) + 1); }
                    else { top = 20; left = 10 + (80 / (fwds.length + 1)) * (fwds.indexOf(p) + 1); }
                } else {
                    if(pos === 'G') { top = 8; left = 50; }
                    else if(pos === 'D') { top = 25; left = 10 + (80 / (defs.length + 1)) * (defs.indexOf(p) + 1); }
                    else if(pos === 'M') { top = 50; left = 10 + (80 / (mids.length + 1)) * (mids.indexOf(p) + 1); }
                    else { top = 80; left = 10 + (80 / (fwds.length + 1)) * (fwds.indexOf(p) + 1); }
                }

                const dot = document.createElement('div');
                dot.className = 'player-dot absolute';
                dot.style.top = top+'%'; dot.style.left = left+'%'; dot.style.transform = 'translate(-50%, -50%)';
                const goals = p.stats.find(s=>s.name==='goals')?.value || 0;
                const badge = goals > 0 ? `<div class="absolute -top-1 -right-1 bg-green-500 text-[8px] w-3 h-3 rounded-full flex items-center justify-center text-black font-bold">⚽</div>` : '';
                
                dot.innerHTML = `
                    <div class="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center font-bold text-xs text-white ${color} relative" onclick='app.openPlayer("${ath.displayName}", "${ath.position.displayName}", "${team.team.displayName}", "${ath.headshot?.href}", ${statsJson})'>
                        ${ath.headshot?.href ? `<img src="${ath.headshot.href}" class="w-full h-full object-cover rounded-full opacity-90">` : (ath.jersey || '')}
                        ${badge}
                    </div>
                    <div class="mt-0.5 text-[7px] font-bold text-white bg-black/70 px-1 rounded backdrop-blur-sm whitespace-nowrap">${ath.shortName}</div>
                `;
                pitch.appendChild(dot);
            });

            const formation = `${defs.length}-${mids.length}-${fwds.length}`;
            if(isHome) {
                document.getElementById('formation-label').innerText = formation;
            }

            listHTML += '</ul></div>';
            lists.innerHTML += listHTML;
        });
    },

    openPlayer(name, pos, team, img, stats) {
        document.getElementById('player-modal').classList.remove('hidden');
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