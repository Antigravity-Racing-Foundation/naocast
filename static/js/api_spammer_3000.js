const API_REFRESH_DELAY = 30000;

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
            mode = '';
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

function fetchPlayers() {
    fetch('https://svo.agracingfoundation.org/medius_db/api/GetPlayerCount').then(response => {
        if (!response.ok) {
            throw new Error('API error');
        }
        return response.text();
    }).then(xml => {
        const parser = new DOMParser();
        const xmlParsed = parser.parseFromString(xml, 'application/xml');

        var output = "";

        var x = xmlParsed.getElementsByTagName("Player");

        if(x.length != 0) {
            document.getElementById("playersTitle").innerHTML = 'Players Online: ' + x[0].parentNode.attributes.totalEntries.nodeValue;
            output += '<div id="playersListing" style="padding-left: 5px;">';
            for (i = 0; i < x.length; i++) {
                output += '<div id="playersEntry">'

                //cut off name at + to exclude platform of hd/2048 players
                if(x[i].attributes.AppId.nodeValue == "23360") {
                    if(x[i].attributes.AccountName.nodeValue.includes('+')) {
                        output += '<h3 id="playersEntryName">' + x[i].attributes.AccountName.nodeValue.slice(0, x[i].attributes.AccountName.nodeValue.lastIndexOf('+')) + '</h3>';
                    } else {
                        output += '<h3 id="playersEntryName">' + x[i].attributes.AccountName.nodeValue + '</h3>';
                    }
                } else {
                    if(x[i].attributes.AccountName.nodeValue.includes(' ')) {
                        output += '<h3 id="playersEntryName">' + x[i].attributes.AccountName.nodeValue.slice(0, x[i].attributes.AccountName.nodeValue.lastIndexOf(' ')) + '</h3>';
                    } else {
                        output += '<h3 id="playersEntryName">' + x[i].attributes.AccountName.nodeValue + '</h3>';
                    }
                }

                output += '<h4 id="playersEntryStatus"> Playing: ' + getGameName(x[i].attributes.AppId.nodeValue, x[i].attributes.AccountName.nodeValue) + ' (' + getPlatform(x[i].attributes.AppId.nodeValue, x[i].attributes.AccountName.nodeValue) + ')</h4>';
                output += '</div><div id="spacer"></div>';
            }
            output += '</div>';
            document.getElementById("players").innerHTML = output;
        } else {
            document.getElementById("playersTitle").innerHTML = 'Players Online: 0';
            document.getElementById("players").innerHTML = '<div id="playersListing" style="padding-left: 5px;"><h2>No one\'s online right now</h2></div>';
        }
    }).catch(error => {
        console.error(`API fetch failed:`, error);

        document.getElementById("playersTitle").innerHTML = 'Players Online: Unknown';
        document.getElementById("players").innerHTML = '<div id="playersListing" style="padding-left: 5px;"><h2>Waiting on API...</h2></div>';
    });
}

function fetchLobbies() {
    fetch('https://svo.agracingfoundation.org/medius_db/api/GetLobbyListing').then(response => {
        if (!response.ok) {
            throw new Error('API error');
        }
        return response.text();
    }).then(xml => {
        const parser = new DOMParser();
        const xmlParsed = parser.parseFromString(xml, 'application/xml');

        var output = "";

        var nowPlaying = "";
        var gameMode = "";
        var speedClass = "";
        var PlayerList;

        var x = xmlParsed.getElementsByTagName("Lobby");

        if(x.length != 0) {
            document.getElementById("lobbiesTitle").innerHTML = 'Ongoing Lobbies: ' + x[0].parentNode.attributes.totalEntries.nodeValue;
            output += '<div id="lobbiesListing" style="padding-left: 5px;">';
            for (i = 0; i < x.length; i++) {
                //print what game user is playing according to AppId
                nowPlaying = getGameName(x[i].attributes.AppId.nodeValue, '+PS3');
                gameMode = getGameMode(x[i].attributes.RuleSet.nodeValue, x[i].attributes.AppId.nodeValue);
                speedClass = getSpeedClass(x[i].attributes.PlayerSkillLevel.nodeValue, x[i].attributes.AppId.nodeValue);

                PlayerList = x[i].attributes.PlayerListCurrent.nodeValue.split(', ');

                output += '<div id="lobbiesEntry">';

                //print base lobby info
                output += '<div id="lobbiesEntryTitle">';
                switch(x[i].attributes.AppId.nodeValue) {
                    case "23360":
                        output += '<h3>' + nowPlaying + ' // ' + x[i].getElementsByTagName('GameStats')[0].getElementsByTagName('HostName')[0].textContent + ' (' + x[i].attributes.PlayerCount.nodeValue + '/' + x[i].attributes.MaxPlayers.nodeValue + ')' + ' // ' + speedClass + ' ' + gameMode + '</h3>';
                        break;

                    case "20794":
                        output += '<h3>' + nowPlaying + ' // ' + x[i].attributes.GameName.nodeValue + ' (' + x[i].attributes.PlayerCount.nodeValue + '/' + x[i].attributes.MaxPlayers.nodeValue + ')' + ' // ' + speedClass + ' ' + gameMode + '</h3>';
                        break;

                    case "22204":
                        output += '<h3>' + nowPlaying + ' // ' + x[i].attributes.GameName.nodeValue.slice(0, x[i].attributes.GameName.nodeValue.lastIndexOf('~')) + ' (' + x[i].attributes.PlayerCount.nodeValue + '/' + x[i].attributes.MaxPlayers.nodeValue + ')</h3>';
                        break;

                    default:
                        output += '<h3>' + nowPlaying + ' // ' + x[i].attributes.GameName.nodeValue + ' (' + x[i].attributes.PlayerCount.nodeValue + '/' + x[i].attributes.MaxPlayers.nodeValue + ')</h3>';
                        break;
                }

                output += '</div><div id="lobbiesEntryExtraInfo">';

                switch(x[i].attributes.AppId.nodeValue) {
                    case "23360":
                        if(x[i].attributes.GenericField1.nodeValue == "0" && gameMode != "Zone Battle") {
                            output += '<h5>Weapons Off</h5>';
                        }
                        if(x[i].getElementsByTagName('GameStats')[0].getElementsByTagName('LobbyConfigSecondary')[0].getElementsByTagName('BRsAllowed')[0].textContent == "0") {
                            output += '<h5>Barrel Rolls Off</h5>';
                        }
                        if(gameMode == "Eliminator") {
                            output += '<h5>Elimination Target: ' + x[i].getElementsByTagName('GameStats')[0].getElementsByTagName('ElimTarget')[0].textContent + '</h5>';
                        }
                        if(gameMode == "Zone Battle") {
                            output += '<h5>Zone Target: ' + x[i].getElementsByTagName('GameStats')[0].getElementsByTagName('ZBTarget')[0].textContent + '</h5>';
                        }
                        break;

                    case "20794":
                        if(x[i].getElementsByTagName('GameStats')[0].getElementsByTagName('Weapons')[0].textContent == "0") {
                            output += '<h5>Weapons Off</h5>';
                        }
                        break;

                    default:
                        break;
                }

                output += '</div><div id="lobbiesEntryPlayerList">';

                for(o = 0; o < PlayerList.length; o++) {
                    if(x[i].attributes.AppId.nodeValue == "23360") {
                        if(PlayerList[o].includes('+')) {
                            output += '<h4>' + PlayerList[o].slice(0, PlayerList[o].lastIndexOf('+')) + ' (' + getPlatform(x[i].attributes.AppId.nodeValue, PlayerList[o]) + ')</h4>';
                        } else {
                            output += '<h4>' + PlayerList[o] + ' (' + getPlatform(x[i].attributes.AppId.nodeValue, PlayerList[o]) + ')</h4>';
                        }
                    } else {
                        if(PlayerList[o].includes(' ')) {
                            output += '<h4>' + PlayerList[o].slice(0, PlayerList[o].lastIndexOf(' ')) + ' (' + getPlatform(x[i].attributes.AppId.nodeValue, PlayerList[o]) + ')</h4>';
                        } else {
                            output += '<h4>' + PlayerList[o] + ' (' + getPlatform(x[i].attributes.AppId.nodeValue, PlayerList[o]) + ')</h4>';
                        }
                    }
                }
                output += '</div></div><div id="spacer"></div>';
            }
            output += '</div>';
            document.getElementById("lobbies").innerHTML = output;
        } else {
            document.getElementById("lobbiesTitle").innerHTML = 'Ongoing Lobbies: 0';
            document.getElementById("lobbies").innerHTML = '<div id="lobbiesListing" style="padding-left: 5px;"><h2>No lobbies</h2></div>';
        }
    }).catch(error => {
        console.error(`API fetch failed:`, error);

        document.getElementById("lobbiesTitle").innerHTML = 'Ongoing Lobbies: Unknown';
        document.getElementById("lobbies").innerHTML = '<div id="lobbiesListing" style="padding-left: 5px;"><h2>Waiting on API...</h2></div>';
    });
}

function fetchStats() {
    fetch('https://svo.agracingfoundation.org/medius_db/api/GetServerStats')
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
            document.getElementById("stats").innerHTML += '<div class="w-full h-full absolute flex items-center justify-center pb-5 z-50"><span class="text-[rgba(230,7,23,1)] text-sm" id="overview-error-message" style="opacity: 0">!!! ERROR FETCHING STATS !!!</span></div>';

            const flashTarget = document.getElementById("overview-error-message");
            let visible = true;

            setInterval(() => {
                flashTarget.style.opacity = visible ? '0' : '1';
                visible = !visible;
            }, 250);
        });
}

fetchPlayers();
fetchLobbies();
fetchStats();

setInterval(fetchPlayers, API_REFRESH_DELAY);
setInterval(fetchLobbies, API_REFRESH_DELAY);
