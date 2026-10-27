
const $ = selector => document.querySelector(selector);

const gamesContainer = $("#games");
const statusText = $("#status");
const searchInput = $("#search");
const genreSelect = $("#genre");
const platformSelect = $("#platform");

const jsonSection = $("#json-explorer");
const jsonOutput = $("#jsonOutput");
const jsonCount = $("#jsonCount");
const gameJsonOutput = $("#gameJsonOutput");
const gameJsonCount = $("#gameJsonCount");

const pagination = $("#pagination");
const pageInfo = $("#pageInfo");
const detailsSection = $("#gameDetails");
const detailsContent = $("#detailsContent");

const PAGE_SIZE = 12;

let allGames = [];
let filteredGames = [];
let currentPage = 1;
let currentGameJSON = null;
let currentListJSON = [];

function safeText(value, fallback = "No especificado") {
    return value === null || value === undefined || value === ""
        ? fallback
        : String(value);
}

function updateJSONPanel(element, counter, data) {
    element.textContent = JSON.stringify(data, null, 2);

    const lines = element.textContent.split("\n").length;
    counter.textContent = `${lines} líneas · ${element.textContent.length} caracteres`;
}

async function loadGames() {
    statusText.textContent = "Consultando la API...";
    gamesContainer.replaceChildren();

    try {
        allGames = await getGames();
        currentListJSON = allGames;

        updateJSONPanel(jsonOutput, jsonCount, allGames);

        applyFilters();
    } catch (error) {
        console.error("Error al cargar juegos:", error);

        statusText.textContent =
            "No se pudo conectar con la API. Comprobá la conexión o las restricciones CORS.";

        jsonOutput.textContent = JSON.stringify({
            error: error.message,
            message: "No se recibió una respuesta JSON válida de la API."
        }, null, 2);

        jsonCount.textContent = "Error de conexión";
    }
}

function applyFilters() {
    const search = searchInput.value.trim().toLowerCase();
    const genre = genreSelect.value.toLowerCase();
    const platform = platformSelect.value.toLowerCase();

    filteredGames = allGames.filter(game => {
        const matchesName = safeText(game.title, "")
            .toLowerCase()
            .includes(search);

        const matchesGenre = !genre ||
            safeText(game.genre, "").toLowerCase() === genre;

        const matchesPlatform = !platform ||
            safeText(game.platform, "").toLowerCase() === platform;

        return matchesName && matchesGenre && matchesPlatform;
    });

    currentPage = 1;
    renderGames();
}

function createGameCard(game) {
    const card = document.createElement("article");
    card.className = "game-card";

    const imageWrap = document.createElement("div");
    imageWrap.className = "game-image-wrap";

    const image = document.createElement("img");
    image.src = game.thumbnail;
    image.alt = `Portada de ${safeText(game.title, "videojuego")}`;
    image.loading = "lazy";
    image.decoding = "async";

    image.addEventListener("error", () => {
        image.alt = `Imagen no disponible: ${safeText(game.title)}`;
        image.removeAttribute("src");
    }, { once: true });

    const badge = document.createElement("span");
    badge.className = "game-badge";
    badge.textContent = safeText(game.platform, "Plataforma desconocida");

    imageWrap.append(image, badge);

    const info = document.createElement("div");
    info.className = "game-info";

    const title = document.createElement("h3");
    title.textContent = safeText(game.title);

    const description = document.createElement("p");
    description.className = "game-description";
    description.textContent = safeText(
        game.short_description,
        "No hay una descripción disponible."
    );

    const tags = document.createElement("div");
    tags.className = "game-tags";

    const genre = document.createElement("span");
    genre.className = "game-tag";
    genre.textContent = safeText(game.genre);

    const platform = document.createElement("span");
    platform.className = "game-tag";
    platform.textContent = safeText(game.platform);

    tags.append(genre, platform);

    const footer = document.createElement("div");
    footer.className = "game-card-footer";

    const freeLabel = document.createElement("small");
    freeLabel.textContent = "Free to play";

    const detailsButton = document.createElement("button");
    detailsButton.type = "button";
    detailsButton.className = "game-details-link";
    detailsButton.textContent = "Ver detalles ↗";
    detailsButton.setAttribute(
        "aria-label",
        `Ver detalles de ${safeText(game.title)}`
    );

    detailsButton.addEventListener("click", () => {
        showGameDetails(game.id);
    });

    footer.append(freeLabel, detailsButton);
    info.append(title, description, tags, footer);
    card.append(imageWrap, info);

    return card;
}

function renderGames() {
    gamesContainer.replaceChildren();

    const total = filteredGames.length;
    const totalPages = Math.ceil(total / PAGE_SIZE);
    const start = (currentPage - 1) * PAGE_SIZE;
    const pageGames = filteredGames.slice(start, start + PAGE_SIZE);

    statusText.textContent = total
        ? `${total} videojuegos encontrados`
        : "No se encontraron juegos con esos filtros.";

    pageGames.forEach(game => {
        gamesContainer.append(createGameCard(game));
    });

    pagination.hidden = totalPages <= 1;

    if (totalPages > 1) {
        pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
        $("#prevPage").disabled = currentPage === 1;
        $("#nextPage").disabled = currentPage === totalPages;
    }

    // JSON general: muestra los juegos que coinciden con los filtros.
    currentListJSON = filteredGames;
    updateJSONPanel(jsonOutput, jsonCount, filteredGames);
}

async function showGameDetails(id) {
    detailsSection.hidden = false;
    detailsContent.replaceChildren();

    $("#catalog").scrollIntoView({ behavior: "smooth", block: "start" });

    const loading = document.createElement("p");
    loading.className = "detail-description";
    loading.textContent = "Consultando los detalles del videojuego...";
    detailsContent.append(loading);

    try {
        const game = await getGameDetails(id);

        // Guardamos y mostramos la respuesta original de la API.
        currentGameJSON = game;
        updateJSONPanel(gameJsonOutput, gameJsonCount, game);

        renderGameDetails(game);

        history.replaceState(
            null,
            "",
            `${location.pathname}${location.search}`
        );
    } catch (error) {
        console.error("Error al cargar los detalles:", error);

        detailsContent.replaceChildren();

        const message = document.createElement("p");
        message.className = "detail-description";
        message.textContent =
            "No se pudieron cargar los detalles. Intentá nuevamente.";

        detailsContent.append(message);

        gameJsonOutput.textContent = JSON.stringify({
            error: error.message
        }, null, 2);

        gameJsonCount.textContent = "Error de consulta";
    }
}

function renderGameDetails(game) {
    detailsContent.replaceChildren();

    const layout = document.createElement("div");
    layout.className = "game-detail-layout";

    const image = document.createElement("img");
    image.className = "detail-cover";
    image.src = game.thumbnail;
    image.alt = `Portada de ${safeText(game.title)}`;

    const info = document.createElement("div");
    info.className = "detail-information";

    const title = document.createElement("h3");
    title.textContent = safeText(game.title);

    const description = document.createElement("p");
    description.className = "detail-description";
    description.textContent = safeText(
        game.description,
        game.short_description || "Sin descripción disponible."
    );

    const list = document.createElement("div");
    list.className = "detail-list";

    const fields = [
        ["Género", game.genre],
        ["Plataforma", game.platform],
        ["Desarrollador", game.developer],
        ["Publicador", game.publisher],
        ["Fecha de lanzamiento", game.release_date],
        ["Estado", game.status]
    ];

    fields.forEach(([label, value]) => {
        const item = document.createElement("div");
        item.className = "detail-item";

        const name = document.createElement("span");
        name.textContent = label;

        const content = document.createElement("strong");
        content.textContent = safeText(value);

        item.append(name, content);
        list.append(item);
    });

    info.append(title, description, list);

    if (game.game_url) {
        const link = document.createElement("a");
        link.className = "detail-website";
        link.href = game.game_url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Visitar sitio del juego ↗";

        info.append(link);
    }

    layout.append(image, info);
    detailsContent.append(layout);

    detailsSection.hidden = false;
    detailsSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function showFilteredJSON() {
    jsonSection.hidden = false;
    updateJSONPanel(jsonOutput, jsonCount, currentListJSON);

    jsonSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

async function copyJSON(element, button) {
    const originalText = button.textContent;

    try {
        await navigator.clipboard.writeText(element.textContent);
        button.textContent = "Copiado ✓";
    } catch (error) {
        console.error("No se pudo copiar el JSON:", error);
        button.textContent = "No se pudo copiar";
    }

    setTimeout(() => {
        button.textContent = originalText;
    }, 1800);
}

$("#searchButton").addEventListener("click", applyFilters);
searchInput.addEventListener("input", applyFilters);
genreSelect.addEventListener("change", applyFilters);
platformSelect.addEventListener("change", applyFilters);

$("#clearButton").addEventListener("click", () => {
    searchInput.value = "";
    genreSelect.value = "";
    platformSelect.value = "";
    applyFilters();
});

$("#jsonButton").addEventListener("click", showFilteredJSON);

$("#refreshJson").addEventListener("click", loadGames);

$("#copyJson").addEventListener("click", event => {
    copyJSON(jsonOutput, event.currentTarget);
});

$("#copyGameJson").addEventListener("click", event => {
    if (currentGameJSON !== null) {
        copyJSON(gameJsonOutput, event.currentTarget);
    }
});

$("#closeDetails").addEventListener("click", () => {
    detailsSection.hidden = true;
    currentGameJSON = null;
    $("#catalog").scrollIntoView({ behavior: "smooth" });
});

$("#prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderGames();
        $("#catalog").scrollIntoView({ behavior: "smooth" });
    }
});

$("#nextPage").addEventListener("click", () => {
    const totalPages = Math.ceil(filteredGames.length / PAGE_SIZE);

    if (currentPage < totalPages) {
        currentPage++;
        renderGames();
        $("#catalog").scrollIntoView({ behavior: "smooth" });
    }
});

loadGames();
