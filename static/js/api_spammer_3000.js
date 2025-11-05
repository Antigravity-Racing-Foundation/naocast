const API_REFRESH_DELAY = 30000;

const PLAYER_API_LOCAL_URL = "/static/xml/GetPlayerCountExample.xml";
const LOBBY_API_LOCAL_URL = "/static/xml/GetLobbyListingExample.xml";

const PLAYER_API_REMOTE_URL = "https://svo.agracingfoundation.org/medius_db/api/GetPlayerCount";
const LOBBY_API_REMOTE_URL = "https://svo.agracingfoundation.org/medius_db/api/GetLobbyListing";

const SERVER_STATS_API_URL = "https://svo.agracingfoundation.org/medius_db/api/GetServerStats";

let currentAPIEndpoint = "remote";
let PLAYER_API_URL = "https://svo.agracingfoundation.org/medius_db/api/GetPlayerCount";
let LOBBY_API_URL = "https://svo.agracingfoundation.org/medius_db/api/GetLobbyListing";

let errorFlashIntervalPlayers = null;
let errorFlashIntervalLobbies = null;
let initialListFlashInterval = null;
let lastPlayerSnapshot = "";
let lastLobbySnapshot = "";

const status = {
    // this is probably bad but i feel like shit right now and cba to make it better  -b
    toggleAPIsRemoteLocal() {
        if (currentAPIEndpoint == "remote") {
            PLAYER_API_URL = PLAYER_API_LOCAL_URL
            LOBBY_API_URL = LOBBY_API_LOCAL_URL
            currentAPIEndpoint = "local"
        } else {
            PLAYER_API_URL = PLAYER_API_REMOTE_URL
            LOBBY_API_URL = LOBBY_API_REMOTE_URL
            currentAPIEndpoint = "remote"
        }
        fetchPlayers();
        fetchLobbies();
        console.log(`Fetching from ${currentAPIEndpoint} API now!`)
    },
    updateNow() {
        fetchPlayers();
        fetchLobbies();
        console.log("you're impatient :)")
    }
};

function getGameName(appId, username) {
    var gameName = "Unknown";

    switch(appId) {
        case "20794":
            gameName = 'WipEout Pulse';
            break;

        case "21614":
            gameName = 'WipEout Pulse';
            break;

        case "21664":
            gameName = 'WipEout HD Fury';
            break;

        case "22204":
            gameName = 'MotorStorm Arctic Edge';
            break;

        case "23360":
            //HD or 2048 according to platform, platform shouldn't be missing on 23360
            if(username.includes("+PS3")) {
                gameName = 'WipEout HD Fury';
            } else if(username.includes("+Vita")) {
                gameName = 'WipEout 2048';
            } else {
                gameName = 'Unknown';
            }
            break;

        default:
            gameName = 'Unknown';
            break;
    }

    return gameName;
}

function getSpeedClass(playerSkillLevel, appId) {
    var speedClass = "";

    switch(appId) {
        case "20794":
            switch(playerSkillLevel) {
                case "0":
                    speedClass = "Venom";
                    break;

                case "1":
                    speedClass = "Flash";
                    break;

                case "2":
                    speedClass = "Rapier";
                    break;

                case "3":
                    speedClass = "Phantom";
                    break;

                default:
                    speedClass = "Unknown";
                    break;
            }
            break;

        case "21614":
            speedClass = '';
            break;

        case "21664":
            speedClass = '';
            break;

        case "22204":
            speedClass = '';
            break;

        case "23360":
            switch(playerSkillLevel) {
                case "0":
                    speedClass = "Venom";
                    break;

                case "1":
                    speedClass = "Flash";
                    break;

                case "2":
                    speedClass = "Rapier";
                    break;

                case "3":
                    speedClass = "Phantom";
                    break;

                default:
                    speedClass = "Unknown";
                    break;
            }
            break;

        default:
            speedClass = 'Unknown';
            break;
    }
    return speedClass;
}

function getGameMode(ruleSet, appId) {
    var mode = "";

    switch(appId) {
        case "20794":
            switch(ruleSet) {
                case "14":
                    mode = "Single Race";
                    break;

                case "15":
                    mode = "Head 2 Head";
                    break;

                case "16":
                    mode = "Tournament";
                    break;

                case "17":
                    mode = "???";
                    break;

                case "18":
                    mode = "Eliminator";
                    break;

                default:
                    mode = "Unknown";
                    break;
            }
            break;

        case "21614":
            mode = '';
            break;

        case "21664":
            mode = '';
            break;

        case "22204":
            switch(ruleSet) {
                case "5":
                    mode = "Race";
                    break;

                case "6":
                    mode = "Time Ticker";
                    break;

                default:
                    mode = "Unknown";
                    break;
            }
            break;

        case "23360":
            switch(ruleSet) {
                case "16":
                    mode = "Single Race";
                    break;

                case "17":
                    mode = "Tournament";
                    break;

                case "20":
                    mode = "Eliminator";
                    break;

                case "21":
                    mode = "Zone Battle";
                    break;

                default:
                    mode = "Unknown";
                    break;
            }
            break;

        default:
            mode = 'Unknown';
            break;
    }
    return mode;
}

function getPlatform(appId, username) {
    var platform = "";

    switch(appId) {
        case "20794":
            if(username.includes("(PPSSPP)")) {
                platform = 'PPSSPP';
            } else {
                platform = 'PSP';
            }
            break;

        case "21614":
            if(username.includes("(PPSSPP)")) {
                platform = 'PPSSPP';
            } else {
                platform = 'PSP';
            }
            break;

        case "21664":
            platform = '';
            break;

        case "22204":
            if(username.includes("(PPSSPP)")) {
                platform = 'PPSSPP';
            } else {
                platform = 'PSP';
            }
            break;

        case "23360":
            if(username.includes("+PS3")) {
                if(username.includes("(RPCS3)")) {
                    platform = 'RPCS3';
                } else {
                    platform = 'PS3';
                }
            } else if(username.includes("+Vita")) {
                platform = 'PS VITA';
            } else {
                platform = 'UNK';
            }
            break;

        default:
            platform = 'UNK';
            break;
    }
    return platform;
}

function formatPlayerName(AppId, AccountName) {
    const raw = AccountName;
    if (AppId === "23360" && raw.includes("+")) {
        return raw.slice(0, raw.lastIndexOf('+'));
    } else if (raw.includes(' ')) {
        return raw.slice(0, raw.lastIndexOf(' '));
    }
    return raw;
}

function platformBadgeClass(platform) {
    return ["PS3", "PSP", "PS VITA"].includes(platform) ? "w-8" : "w-6 mx-1";
}

function renderPlayerError() {
    const list = document.getElementById("player_list");
    list.innerHTML = "";
    list.classList.remove("overflow-y-scroll");

    const tmpl = document.getElementById("players-error");
    const clone = tmpl.content.cloneNode(true);
    list.appendChild(clone);

    lastPlayerSnapshot = ""

    const flashTarget = document.getElementById("players-error-message");
    let visible = true;

    if (errorFlashIntervalPlayers) clearInterval(errorFlashIntervalPlayers);
    errorFlashIntervalPlayers = setInterval(() => {
        flashTarget.style.opacity = visible ? '0' : '1';
        visible = !visible;
    }, 250);
}

function renderEmptyPlayers() {
    const list = document.getElementById("player_list");
    list.innerHTML = "";
    list.classList.remove("overflow-y-scroll");

    const tmpl = document.getElementById("players-empty");
    const clone = tmpl.content.cloneNode(true);
    list.appendChild(clone);
}

function renderPlayers(players) {
    const list = document.getElementById("player_list");
    list.innerHTML = "";
    list.classList.toggle("overflow-y-scroll", players.length > 9);

    const template_player = document.getElementById("player-panel-template");
    const template_filler = document.getElementById("filler-panel-template");
    const fillCount = 9;

    players.forEach((player, index) => {
        const clone = template_player.content.cloneNode(true);
        const panel = clone.querySelector(".panel");
        if (index % 2 === 0) panel.classList.add("bg-white");

        const nameEl = clone.querySelector(".player-name");
        nameEl.textContent = formatPlayerName(player["AppId"], player["AccountName"]);

        clone.querySelector(".game-name").textContent =
            getGameName(player.AppId, player.AccountName);

        const img = clone.querySelector(".platform-icon");
        const platform = getPlatform(player.AppId, player.AccountName) || "unknown";
        img.src = `/static/images/icon_${platform.toLowerCase().replace(" ", "_")}.svg`;
        const classes = platformBadgeClass(platform).split(" ");
        classes.forEach(c => img.classList.add(c));

        list.appendChild(clone);
    });

    for (let i = fillCount - players.length; i > 0; i--) {
        const clone = template_filler.content.cloneNode(true);
        const panel = clone.querySelector(".filler-panel");
        if (i % 2 !== 0) panel.classList.add("bg-white");
        list.appendChild(clone);
    }
}

function fetchPlayers() {
    fetch(PLAYER_API_URL)
        .then(response => !response.ok ? Promise.reject("API error") : response.text())
        .then(xml => {
            const xmlParsed = new DOMParser().parseFromString(xml, 'application/xml');
            const playerItems = Array.from(xmlParsed.getElementsByTagName("Player"))
            .map(el => ({
                AppId: el.getAttribute("AppId"),
                AccountName: el.getAttribute("AccountName")
            }));

            const currentSnapshot = JSON.stringify(playerItems);
            if (currentSnapshot === lastPlayerSnapshot) {
                return;
            }

            lastPlayerSnapshot = currentSnapshot;

            var playerCount = xmlParsed.documentElement.getAttribute("totalEntries");
            playerCount += playerCount != 1 ? " ENTRIES" : " ENTRY";
            document.getElementById("player-count").textContent = playerCount;

            if (playerItems.length === 0) {
                renderEmptyPlayers();
            } else {
                renderPlayers(playerItems);
            }
        })
        .catch(err => {
            console.error("API fetch failed:", err);
            renderPlayerError();
        });
}

function renderLobbies(lobbies) {
    const list = document.getElementById("lobby_list");
    list.innerHTML = "";

    const template_lobby = document.getElementById("lobby-card-template");
    const template_filler = document.getElementById("filler-card-template");

    lobbies.forEach((lobby) => {

        let lobbyName = "";
        let gameName = "";
        let speedClass = "";
        let gameMode = "";
        let bgPath = "";

        const clone = template_lobby.content.cloneNode(true);
        const card = clone.querySelector(".card");

        switch(lobby["AppId"]) {
            case "23360":
                lobbyName = lobby["HostName"];
                speedClass = getSpeedClass(lobby["PlayerSkillLevel"], lobby["AppId"]);
                gameMode = getGameMode(lobby["RuleSet"], lobby["AppId"]);

                lobbyData = `${lobbyName} (${lobby["PlayerCount"]}/${lobby["MaxPlayers"]}) // ${speedClass} ${gameMode}`;

                gameName = "WipEout HD";
                gameNameColor = "game-hd";

                bgPath = "/static/images/lobby_card_hd.svg"
                break;

            case "20794":
                lobbyName = lobby["GameName"];
                speedClass = getSpeedClass(lobby["PlayerSkillLevel"], lobby["AppId"]);
                gameMode = getGameMode(lobby["RuleSet"], lobby["AppId"]);

                lobbyData = `${lobbyName} (${lobby["PlayerCount"]}/${lobby["MaxPlayers"]}) // ${speedClass} ${gameMode}`;

                gameName = "WipEout Pulse";
                gameNameColor = "game-pulse";

                bgPath = "/static/images/lobby_card_pulse.svg"
                break;

            case "22204":
                lobbyName = lobby["GameName"].split("~")[0];
                gameMode = getGameMode(lobby["GF2"], lobby["AppId"]);
                laps = "";
                if(gameMode === "Race") {
                    laps = lobby["GF3"] + " Lap";
                }

                lobbyData = `${lobbyName} (${lobby["PlayerCount"]}/${lobby["MaxPlayers"]}) // ${laps} ${gameMode}`;

                gameName = "MotorStorm: Arctic Edge";
                gameNameColor = "game-ae";

                bgPath = "/static/images/lobby_card_ae.svg"
                break;

            default:
                lobbyData = "null";
                gameName ="null";
                bgPath = "/static/images/lobby_card_blank.svg"
                break;
        }

        let playerList = "";
        let platformList = "";

        lobby["PlayerList"].split(", ").forEach((player) => {
            playerEntry = formatPlayerName(lobby["AppId"], player);
            playerList += `${playerEntry}<br>`;

            playerPlatform = getPlatform(lobby["AppId"], player);
            platformList += `[${playerPlatform}]<br>`
        });

        const gameNameElement = clone.querySelector(".game-name");
        gameNameElement.textContent = gameName;
        gameNameElement.style["color"] = `var(--color-${gameNameColor})`;
        clone.querySelector(".lobby-settings").textContent = lobbyData;
        clone.querySelector(".lobby-participants").innerHTML = playerList;
        clone.querySelector(".lobby-participants-platforms").innerHTML = platformList;
        clone.querySelector("#card-background").src = bgPath;

        list.appendChild(clone);
    })

    if(lobbies.length === 1) {
        list.appendChild(template_filler.content.cloneNode(true));
        list.appendChild(document.getElementById("lobbies-eol").content.cloneNode(true));
    }
}

function renderEmptyLobbies() {
    const list = document.getElementById("lobby_list");
    list.innerHTML = "";

    const tmpl = document.getElementById("lobbies-empty");
    const clone = tmpl.content.cloneNode(true);
    list.appendChild(clone);
}

function renderLobbyError() {
    const list = document.getElementById("lobby_list");
    list.innerHTML = "";

    const tmpl = document.getElementById("lobbies-error");
    const clone = tmpl.content.cloneNode(true);
    list.appendChild(clone);

    lastLobbySnapshot = ""

    const flashTarget = document.getElementById("lobbies-error-message");
    let visible = true;

    if (errorFlashIntervalLobbies) clearInterval(errorFlashIntervalLobbies);
    errorFlashIntervalLobbies = setInterval(() => {
        flashTarget.style.opacity = visible ? '0' : '1';
        visible = !visible;
    }, 250);
}

function fetchLobbies() {
    fetch(LOBBY_API_URL)
        .then(response => !response.ok ? Promise.reject("API error") : response.text())
        .then(xml => {
            const xmlParsed = new DOMParser().parseFromString(xml, 'application/xml');
            const lobbyItems = Array.from(xmlParsed.getElementsByTagName("Lobby"))
            .map(el => ({
                AppId: el.getAttribute("AppId"),
                MaxPlayers: el.getAttribute("MaxPlayers"),
                PlayerCount: el.getAttribute("PlayerCount"),
                PlayerList: el.getAttribute("PlayerListCurrent"),
                PlayerSkillLevel: el.getAttribute("PlayerSkillLevel"),
                GameName: el.getAttribute("GameName"),
                HostName: el.getElementsByTagName("HostName")[0]?.textContent || undefined,
                RuleSet: el.getAttribute("RuleSet"),
                GF2: el.getAttribute("GenericField2"),
                GF3: el.getAttribute("GenericField3")
            }));

            const currentSnapshot = JSON.stringify(lobbyItems);
            if (currentSnapshot === lastLobbySnapshot) {
                return;
            }

            lastLobbySnapshot = currentSnapshot;

            var lobbyCount = xmlParsed.documentElement.getAttribute("totalEntries");
            lobbyCount += lobbyCount != 1 ? " ENTRIES" : " ENTRY";
            document.getElementById("lobby-count").textContent = lobbyCount;

            if (lobbyItems.length === 0) {
                renderEmptyLobbies();
            } else {
                renderLobbies(lobbyItems);
            }
        })
        .catch(err => {
            console.error("API fetch failed:", err);
            renderLobbyError();
        });
}

function fetchStats() {
    fetch(SERVER_STATS_API_URL)
        .then(response => {
            if (!response.ok) throw new Error('API error');
            return response.text();
        })
        .then(xml => {
            const parser = new DOMParser();
            const xmlParsed = parser.parseFromString(xml, 'application/xml');
            const x = xmlParsed.getElementsByTagName("GetServerStats")[0];
            const accounts = x.getElementsByTagName('AccountsRegistered')[0];

            const total_accounts = accounts.attributes.totalEntries.nodeValue;
            const reg_hd = accounts.getElementsByTagName('woHD')[0].textContent;
            const reg_2048 = accounts.getElementsByTagName('wo2048')[0].textContent;
            const reg_pulse = accounts.getElementsByTagName('woPulse')[0].textContent;
            const reg_msae = accounts.getElementsByTagName('MSAE')[0].textContent;
            const logins_day = x.getElementsByTagName('LoginsPastDay')[0].textContent;
            const logins_week = x.getElementsByTagName('LoginsPastWeek')[0].textContent;
            const peak_players = x.getElementsByTagName('PeakPlayerCount')[0].textContent;

            if(x.length != 0) {
                document.getElementById("peakPlayers").textContent = peak_players;
                document.getElementById("loginsDay").textContent = logins_day;
                document.getElementById("loginsWeek").textContent = logins_week;
                document.getElementById("totalAccounts").textContent = total_accounts;
                document.getElementById("regHD").textContent = reg_hd;
                document.getElementById("reg2048").textContent = reg_2048;
                document.getElementById("regPulse").textContent = reg_pulse;
                document.getElementById("regMSAE").textContent = reg_msae;
            }
        })
        .catch(error => {
            console.error(`API fetch failed:`, error);
            document.querySelectorAll('.stat-element ').forEach(el => {
                el.classList.add('text-[rgba(222,222,222,1)]');
            });

            // unfortunately if we put the html into the target file and just set it to 0 opacity so it doesn't show up,
            // we won't be able to select the stats contents properly, because the warning has to be on top
            // and its div has to take up the entire block    -b

            // fix this by putting it into a template   -future b
            document.getElementById("stats").innerHTML += '<div class="w-full h-full absolute flex items-center justify-center pb-5 z-50"><span class="text-[rgba(230,7,23,1)] text-sm" id="stats-error-message" style="opacity: 0">!!! ERROR FETCHING STATS !!!</span></div>';

            const flashTargetStats = document.getElementById("stats-error-message");
            let visible = true;

            setInterval(() => {
                flashTargetStats.style.opacity = visible ? '0' : '1';
                visible = !visible;
            }, 250);
        });
}

fetchPlayers();
fetchLobbies();
fetchStats();

setInterval(fetchPlayers, API_REFRESH_DELAY);
setInterval(fetchLobbies, API_REFRESH_DELAY);

const flashTargetsRetrieve = document.getElementsByClassName("initial-text");
let visible = true;

if (initialListFlashInterval) clearInterval(initialListFlashInterval);
    initialListFlashInterval = setInterval(() => {
    for (let el of flashTargetsRetrieve) {
        el.style.opacity = visible ? '0' : '1';
    }
    visible = !visible;
}, 250);
