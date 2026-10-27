
const API_URL = "https://www.freetogame.com/api";

async function requestJSON(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`);
    }

    return response.json();
}

async function getGames(filters = {}) {
    const params = new URLSearchParams();

    if (filters.category) {
        params.set("category", filters.category);
    }

    if (filters.platform) {
        params.set("platform", filters.platform);
    }

    const query = params.toString();
    const url = `${API_URL}/games${query ? `?${query}` : ""}`;

    return requestJSON(url);
}

async function getGameDetails(id) {
    return requestJSON(
        `${API_URL}/game?id=${encodeURIComponent(id)}`
    );
}
