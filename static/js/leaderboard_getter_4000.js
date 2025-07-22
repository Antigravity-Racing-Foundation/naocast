//rank, min_xp, max_xp, rank_name, rank_name_pretty
const ranked_list = [
    [1, 1, 199, "RANK_TRAINEE_1", "TRAINEE I"],
    [2, 200, 399, "RANK_TRAINEE_2", "TRAINEE II"],
    [3, 400, 599, "RANK_TRAINEE_3", "TRAINEE III"],
    [4, 600, 799, "RANK_TRAINEE_4", "TRAINEE IV"],
    [5, 800, 999, "RANK_TRAINEE_5", "TRAINEE V"],
    [6, 1000, 1499, "RANK_ROOKIE_1", "ROOKIE I"],
    [7, 1500, 1999, "RANK_ROOKIE_2", "ROOKIE II"],
    [8, 2000, 2499, "RANK_ROOKIE_3", "ROOKIE III"],
    [9, 2500, 2999, "RANK_ROOKIE_4", "ROOKIE IV"],
    [10, 3000, 3499, "RANK_ROOKIE_5", "ROOKIE V"],
    [11, 3500, 4499, "RANK_AMATEUR_1", "AMATEUR I"],
    [12, 4500, 5499, "RANK_AMATEUR_2", "AMATEUR II"],
    [13, 5500, 6499, "RANK_AMATEUR_3", "AMATEUR III"],
    [14, 6500, 7499, "RANK_AMATEUR_4", "AMATEUR IV"],
    [15, 7500, 8499, "RANK_AMATEUR_5", "AMATEUR V"],
    [16, 8500, 9999, "RANK_PROFESSIONAL_1", "PROFESSIONAL I"],
    [17, 10000, 11499, "RANK_PROFESSIONAL_2", "PROFESSIONAL II"],
    [18, 11500, 12999, "RANK_PROFESSIONAL_3", "PROFESSIONAL III"],
    [19, 13000, 14499, "RANK_PROFESSIONAL_4", "PROFESSIONAL IV"],
    [20, 14500, 15999, "RANK_PROFESSIONAL_5", "PROFESSIONAL V"],
    [21, 16000, 17999, "RANK_EXPERT_1", "EXPERT I"],
    [22, 18000, 19999, "RANK_EXPERT_2", "EXPERT II"],
    [23, 20000, 21999, "RANK_EXPERT_3", "EXPERT III"],
    [24, 22000, 23999, "RANK_EXPERT_4", "EXPERT IV"],
    [25, 24000, 25999, "RANK_EXPERT_5", "EXPERT V"],
    [26, 26000, 29999, "RANK_VETERAN_1", "VETERAN I"],
    [27, 30000, 33999, "RANK_VETERAN_2", "VETERAN II"],
    [28, 34000, 37999, "RANK_VETERAN_3", "VETERAN III"],
    [29, 38000, 41999, "RANK_VETERAN_4", "VETERAN IV"],
    [30, 42000, 45999, "RANK_VETERAN_5", "VETERAN V"],
    [31, 46000, 51999, "RANK_MASTER_1", "MASTER I"],
    [32, 52000, 57999, "RANK_MASTER_2", "MASTER II"],
    [33, 58000, 63999, "RANK_MASTER_3", "MASTER III"],
    [34, 64000, 69999, "RANK_MASTER_4", "MASTER IV"],
    [35, 70000, 75999, "RANK_MASTER_5", "MASTER V"],
    [36, 76000, 83999, "RANK_ELITE_1", "ELITE I"],
    [37, 84000, 91999, "RANK_ELITE_2", "ELITE II"],
    [38, 92000, 99999, "RANK_ELITE_3", "ELITE III"],
    [39, 100000, 107999, "RANK_ELITE_4", "ELITE IV"],
    [40, 108000, 115999, "RANK_ELITE_5", "ELITE V"],
    [41, 116000, 125999, "RANK_HERO_1", "HERO I"],
    [42, 126000, 135999, "RANK_HERO_2", "HERO II"],
    [43, 136000, 145999, "RANK_HERO_3", "HERO III"],
    [44, 146000, 155999, "RANK_HERO_4", "HERO IV"],
    [45, 156000, 165999, "RANK_HERO_5", "HERO V"],
    [46, 166000, 177999, "RANK_LEGEND_1", "LEGEND I"],
    [47, 178000, 189999, "RANK_LEGEND_2", "LEGEND II"],
    [48, 190000, 201999, "RANK_LEGEND_3", "LEGEND III"],
    [49, 202000, 213999, "RANK_LEGEND_4", "LEGEND IV"],
    [50, 214000, 225999, "RANK_LEGEND_5", "LEGEND V"],
    [51, 226000, 237999, "RANK_CONQUEROR_1", "CONQUEROR I"],
    [52, 238000, 249999, "RANK_CONQUEROR_2", "CONQUEROR II"],
    [53, 250000, 261999, "RANK_CONQUEROR_3", "CONQUEROR III"],
    [54, 262000, 273999, "RANK_CONQUEROR_4", "CONQUEROR IV"],
    [55, 274000, 285999, "RANK_CONQUEROR_5", "CONQUEROR V"],
    [56, 286000, 297999, "RANK_CONQUEROR_6", "CONQUEROR VI"],
    [57, 298000, 309999, "RANK_CONQUEROR_7", "CONQUEROR VII"],
    [58, 310000, 321999, "RANK_CONQUEROR_8", "CONQUEROR VIII"],
    [59, 322000, 333999, "RANK_CONQUEROR_9", "CONQUEROR IX"],
    [60, 334000, 345999, "RANK_CONQUEROR_10", "CONQUEROR X"],
    [61, 346000, 357999, "RANK_GURU_1", "GURU I"],
    [62, 358000, 369999, "RANK_GURU_2", "GURU II"],
    [63, 370000, 381999, "RANK_GURU_3", "GURU III"],
    [64, 382000, 393999, "RANK_GURU_4", "GURU IV"],
    [65, 394000, 405999, "RANK_GURU_5", "GURU V"],
    [66, 406000, 417999, "RANK_GURU_6", "GURU VI"],
    [67, 418000, 429999, "RANK_GURU_7", "GURU VII"],
    [68, 430000, 441999, "RANK_GURU_8", "GURU VIII"],
    [69, 442000, 453999, "RANK_GURU_9", "GURU IX"],
    [70, 454000, 465999, "RANK_GURU_10", "GURU X"],
    [71, 466000, 477999, "RANK_SAGE_1", "SAGE I"],
    [72, 478000, 489999, "RANK_SAGE_2", "SAGE II"],
    [73, 490000, 501999, "RANK_SAGE_3", "SAGE III"],
    [74, 502000, 513999, "RANK_SAGE_4", "SAGE IV"],
    [75, 514000, 525999, "RANK_SAGE_5", "SAGE V"],
    [76, 526000, 537999, "RANK_SAGE_6", "SAGE VI"],
    [77, 538000, 549999, "RANK_SAGE_7", "SAGE VII"],
    [78, 550000, 561999, "RANK_SAGE_8", "SAGE VIII"],
    [79, 562000, 573999, "RANK_SAGE_9", "SAGE IX"],
    [80, 574000, 585999, "RANK_SAGE_10", "SAGE X"],
    [81, 586000, 597999, "RANK_SAVANT_1", "SAVANT I"],
    [82, 598000, 609999, "RANK_SAVANT_2", "SAVANT II"],
    [83, 610000, 621999, "RANK_SAVANT_3", "SAVANT III"],
    [84, 622000, 633999, "RANK_SAVANT_4", "SAVANT IV"],
    [85, 634000, 645999, "RANK_SAVANT_5", "SAVANT V"],
    [86, 646000, 657999, "RANK_SAVANT_6", "SAVANT VI"],
    [87, 658000, 669999, "RANK_SAVANT_7", "SAVANT VII"],
    [88, 670000, 681999, "RANK_SAVANT_8", "SAVANT VIII"],
    [89, 682000, 693999, "RANK_SAVANT_9", "SAVANT IX"],
    [90, 694000, 705999, "RANK_SAVANT_10", "SAVANT X"],
    [91, 706000, 717999, "RANK_IMMORTAL_1", "IMMORTAL I"],
    [92, 718000, 729999, "RANK_IMMORTAL_2", "IMMORTAL II"],
    [93, 730000, 741999, "RANK_IMMORTAL_3", "IMMORTAL III"],
    [94, 742000, 753999, "RANK_IMMORTAL_4", "IMMORTAL IV"],
    [95, 754000, 765999, "RANK_IMMORTAL_5", "IMMORTAL V"],
    [96, 766000, 777999, "RANK_IMMORTAL_6", "IMMORTAL VI"],
    [97, 778000, 789999, "RANK_IMMORTAL_7", "IMMORTAL VII"],
    [98, 790000, 801999, "RANK_IMMORTAL_8", "IMMORTAL VIII"],
    [99, 802000, 813999, "RANK_IMMORTAL_9", "IMMORTAL IX"],
    [100, 814000, 873999, "RANK_IMMORTAL_10", "IMMORTAL X"],
    [101, 874000, 899999, "RANK_OVERLORD_1", "OVERLORD"]
];

const test_boards = [
    1030004,
    1130004,
    1230003,
    1300009,
    1530004,
    1700008,
    1800014
];

var tot_pages = 0;
var is_first = false;
var is_last = false;

function timeConverter(time) {
    milliseconds = time % 100; // get the last two digits (00 of 100)
    seconds = Math.floor(time / 100); // we divide hdTime such that 69420 == 694.20 and use floor to dismiss everything after period
    
    minutes = Math.floor(seconds / 60); // divide seconds by 60 and floor it to get rid of funky shenanigans in second calc
    seconds = seconds - minutes * 60;
    humanTime = minutes + ':' + seconds + '.' + milliseconds;

    return humanTime;
}

function rankGetProgress(score, min, max) {
    total = max-min;
    prog = score-min;

    return (prog/total*100).toFixed(1);
}

function headerFromMode(mode) {
    var ret;

    switch(mode) {
        case "0":
        case "1":
        case "2":
            ret = "<td>Pos.</td><td>Username</td><td>Team</td><td>Time</td><td>Pads</td>";
            break;

        case "5":
            ret = "<td>Pos.</td><td>Username</td><td>Team</td><td>Time</td><td>Best Lap</td>";
            break;

        case "3":
            ret = "<td>Pos.</td><td>Username</td><td>Zone</td><td>Score</td><td>Perfect Zones</td>";
            break;

        case "7":
            ret = "<td>Pos.</td><td>Username</td><td>Stage</td><td>Score</td><td>Accuracy</td>";
            break;

        case "8":
            ret = "<td>Pos.</td><td>Username</td><td>Rank</td><td>Progress</td><td>Rank Name</td>";
            break;

        default:
            ret = "<td>Pos.</td><td>Username</td><td>Team</td><td>Time</td><td>Pads</td>";
            break;
    }

    return ret;
}

function fetchBoard(id, pageSize, row) {
    fetch('https://svo.agracingfoundation.org/wox_ws/rest/lb/GetPage?leaderboardId=' + id + '&pageSize=' + pageSize + '&row=' + row).then(response => {
        if (!response.ok) {
            throw new Error('API error');
        }
        return response.text();
    }).then(xml => {
        const parser = new DOMParser();
        const xmlParsed = parser.parseFromString(xml, 'application/xml');

        var output = "";

        var mode = xmlParsed.getElementsByTagName("lb")[0].attributes.gm.nodeValue;
        var x = xmlParsed.getElementsByTagName("Stats")[0];

        tot_pages = Math.ceil(x.attributes.leaderboardSize.nodeValue/x.attributes.size.nodeValue);
        is_first = x.attributes.isFirst.nodeValue;
        is_last = x.attributes.isLast.nodeValue;

        if(x.length != 0) {
            output += '<table>';

            output += '<tr>' + headerFromMode(mode) + '</tr>';

            output += '<tr></tr>'; //spacer

            for(var i=0; i<pageSize; i++) {
                if(x.childNodes[i].attributes.filler && x.childNodes[i].attributes.filler.nodeValue == "true") {
                    output += "<tr><td>" + x.childNodes[i].attributes.position.nodeValue + "</td>";
                    output += "<td>" + x.childNodes[i].attributes.name.nodeValue + "</td>";
                    output += "<td>---</td>";
                    if(mode == 7 || mode == 8 || mode == 3) {
                        output += "<td>---</td>";
                    } else {
                        output += "<td>--:--.--</td>";
                    }
                    if(mode == 5) {
                        output += "<td>--:--.--</td>";
                    } else {
                        output += "<td>---</td>";
                    }
                } else {
                    switch(mode) {
                        case "0":
                        case "1":
                            output += "<tr><td>" + x.childNodes[i].attributes.position.nodeValue + "</td>";
                            output += "<td>" + x.childNodes[i].attributes.name.nodeValue + "</td>";
                            output += "<td>" + x.childNodes[i].attributes.team.nodeValue + "</td>";
                            output += "<td>" + timeConverter(x.childNodes[i].attributes.raceTime.nodeValue) + "</td>";
                            output += "<td>" + x.childNodes[i].attributes.racePads.nodeValue + "</td></tr>";
                            break;

                        case "5":
                            output += "<tr><td>" + x.childNodes[i].attributes.position.nodeValue + "</td>";
                            output += "<td>" + x.childNodes[i].attributes.name.nodeValue + "</td>";
                            output += "<td>" + x.childNodes[i].attributes.team.nodeValue + "</td>";
                            output += "<td>" + timeConverter(x.childNodes[i].attributes.raceTime.nodeValue) + "</td>";
                            output += "<td>" + timeConverter(x.childNodes[i].attributes.lapTime.nodeValue) + "</td></tr>";
                            break;

                        case "2":
                            output += "<tr><td>" + x.childNodes[i].attributes.position.nodeValue + "</td>";
                            output += "<td>" + x.childNodes[i].attributes.name.nodeValue + "</td>";
                            output += "<td>" + x.childNodes[i].attributes.team.nodeValue + "</td>";
                            output += "<td>" + timeConverter(x.childNodes[i].attributes.lapTime.nodeValue) + "</td>";
                            output += "<td>" + x.childNodes[i].attributes.lapPads.nodeValue + "</td></tr>";
                            break;

                        case "3":
                            output += "<tr><td>" + x.childNodes[i].attributes.position.nodeValue + "</td>";
                            output += "<td>" + x.childNodes[i].attributes.name.nodeValue + "</td>";
                            output += "<td>" + x.childNodes[i].attributes.zone.nodeValue + "</td>";
                            output += "<td>" + x.childNodes[i].attributes.score.nodeValue + "</td>";
                            output += "<td>" + x.childNodes[i].attributes.perfectZones.nodeValue + "</td></tr>";
                            break;

                        case "7":
                            output += "<tr><td>" + x.childNodes[i].attributes.position.nodeValue + "</td>";
                            output += "<td>" + x.childNodes[i].attributes.name.nodeValue + "</td>";
                            output += "<td>" + x.childNodes[i].attributes.stage.nodeValue + "</td>";
                            output += "<td>" + x.childNodes[i].attributes.score.nodeValue + "</td>";
                            output += "<td>" + (x.childNodes[i].attributes.accuracy.nodeValue/100).toFixed(2) + "%</td></tr>";
                            break;

                        case "8":
                            output += "<tr><td>" + x.childNodes[i].attributes.position.nodeValue + "</td>";
                            output += "<td>" + x.childNodes[i].attributes.name.nodeValue + "</td>";
                            output += "<td>" + x.childNodes[i].attributes.rank.nodeValue + "</td>";
                            output += "<td>" + rankGetProgress(x.childNodes[i].attributes.rankedScore.nodeValue, ranked_list[x.childNodes[i].attributes.rank.nodeValue-1][1], ranked_list[x.childNodes[i].attributes.rank.nodeValue-1][2]) + "%</td>";
                            output += "<td>" + ranked_list[x.childNodes[i].attributes.rank.nodeValue-1][4] + "</td></tr>";
                            break;
                    }
                }
            }

            output += '</table>';
            document.getElementById("board").innerHTML = output; 
        }
    }).catch(error => {
        console.error(`API fetch failed:`, error);
    });
}

//pick a random board from list
var id = test_boards[Math.floor(Math.random() * test_boards.length)];

fetchBoard(id, 10, 0);