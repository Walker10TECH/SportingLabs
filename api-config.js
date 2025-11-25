const API_CONFIG = {
    // Lista de proxies para fallback automático.
    PROXY_LIST: [
        'https://cors.eu.org/',
        'https://cors.bridged.cc/',
        'https://cors-anywhere.herokuapp.com/',
    ],
    currentProxyIndex: 0,
    ESPN_BASE_SITE: 'https://site.api.espn.com/apis/site/v2/sports',
    ESPN_BASE_V2: 'https://site.api.espn.com/apis/v2/sports',
    ESPN_BASE_CORE: 'https://sports.core.api.espn.com/v2/sports',
    ESPN_BASE_WEB: 'https://site.web.api.espn.com/apis',

    /**
     * Reporta que o proxy atual falhou e tenta mudar para o próximo.
     */
    _reportFailedProxy() {
        console.warn(`Proxy ${this.PROXY_LIST[this.currentProxyIndex]} falhou. Tentando o próximo...`);
        this.currentProxyIndex = (this.currentProxyIndex + 1) % this.PROXY_LIST.length;
        console.log(`Novo proxy ativo: ${this.PROXY_LIST[this.currentProxyIndex]}`);
    },

    /**
     * Helper interno para construir a URL final com proxy.
     */
    _buildUrl(targetUrl) {
        const proxy = this.PROXY_LIST[this.currentProxyIndex];
        // Alguns proxies precisam da URL completa, outros precisam que ela seja parte do caminho.
        // Este formato é mais comum.
        return `${proxy}${targetUrl}`;
    },

    /**
     * Generates the URL for the scoreboard of a specific league and date.
     */
    getScoreboardUrl(sport, leagueSlug, date) {
        const espnUrl = `${this.ESPN_BASE_SITE}/${sport}/${leagueSlug}/scoreboard?lang=pt&region=br&dates=${date}`;
        return this._buildUrl(espnUrl);
    },

    /**
     * Generates the URL for news of a specific league.
     */
    getNewsUrl(sport, leagueSlug, region = 'br') {
        const espnUrl = `${this.ESPN_BASE_SITE}/${sport}/${leagueSlug}/news?lang=pt&region=${region}`;
        return this._buildUrl(espnUrl);
    },

    /**
     * Generates the URL for the standings of a specific league.
     */
    getStandingsUrl(sport, leagueSlug) {
        const espnUrl = `${this.ESPN_BASE_WEB}/v2/sports/${sport}/${leagueSlug}/standings?lang=pt`;
        return this._buildUrl(espnUrl);
    },

    /**
     * Generates the URL for a specific game summary (match details).
     */
    getGameSummaryUrl(sport, leagueSlug, eventId) {
        const espnUrl = `${this.ESPN_BASE_SITE}/${sport}/${leagueSlug}/summary?event=${eventId}&lang=pt`;
        return this._buildUrl(espnUrl);
    },

    /**
     * Generates the URL for a team's roster.
     */
    getTeamRosterUrl(sport, leagueSlug, teamId) {
        const espnUrl = `${this.ESPN_BASE_SITE}/${sport}/${leagueSlug}/teams/${teamId}/roster`;
        return this._buildUrl(espnUrl);
    },

    /**
     * Generates the URL for Wikipedia API search.
     */
    getWikiSearchUrl(query) {
        // Wikipedia API supports CORS, so no proxy is needed here.
        return `https://pt.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${encodeURIComponent(query)}&limit=5&format=json`;
    },

    /**
     * Generates the URL for parsing a Wikipedia article.
     */
    getWikiParseUrl(term) {
        // Wikipedia API supports CORS, so no proxy is needed here.
        return `https://pt.wikipedia.org/w/api.php?origin=*&action=parse&page=${encodeURIComponent(term)}&prop=text&formatversion=2&format=json`;
    },

    /**
     * Generates the URL for league leaders (top scorers).
     */
    getLeagueLeadersUrl(sport, leagueSlug) {
        const year = new Date().getFullYear();
        const espnUrl = `${this.ESPN_BASE_SITE}/${sport}/${leagueSlug}/scoreboard?dates=${year}`;
        return this._buildUrl(espnUrl);
    },

    /**
     * Generates the URL for a specific game summary, including leaders.
     */
    getGameSummaryWithLeadersUrl(sport, leagueSlug, eventId) {
        const espnUrl = `${this.ESPN_BASE_SITE}/${sport}/${leagueSlug}/summary?event=${eventId}&lang=pt&contentorigin=espn`;
        return this._buildUrl(espnUrl);
    }
};