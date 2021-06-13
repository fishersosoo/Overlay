"use strict";

import {
    checkLog,
    Comparison,
    extractLog,
}
from "../../resources/logLineProcessing.js";

var characterName;
var defaultServerName;
var serverName;
var serverRegion = "CN";
var metric = "dps";
var timeframe = "historical";
var apiKey;
var t;
addOverlayListener("LogLine", (e) => {
    let l = e.line;
    if (checkLog(l, "00", {
            "MessageType": [Comparison.equal, "0038"],
            "MessageText": [Comparison.matchRegex, "^好感度查询 .+$"]
        })) {
        let t = extractLog(l, "MessageText").match(/^好感度查询 (?<name>[^\ ]+?)(?<server>晨曦王座|沃仙曦染|宇宙和音|红玉海|萌芽池|神意之地|幻影群岛|拉诺西亚|拂晓之间|龙巢神殿|旅人栈桥|白金幻象|白银乡|神拳痕|潮风亭|琥珀原|柔风海湾|海猫茶屋|延夏|静语庄园|摩杜纳|紫水栈桥|梦羽宝境)?$/);
        characterName = t.groups["name"];
        serverName = !t.groups["server"] ? defaultServerName : t.groups["server"];
        query(`https://www.fflogs.com/v1/rankings/character/${encodeURIComponent(characterName)}/${encodeURIComponent(serverName)}/${encodeURIComponent(serverRegion)}?zone=38&metric=${encodeURIComponent(metric)}&timeframe=${encodeURIComponent(timeframe)}&api_key=${encodeURIComponent(apiKey)}`);
    };
});
startOverlayEvents();

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
// var cacheBuster = new Date().getTime();
// setInterval(function() {
//         cacheBuster = new Date().getTime();
//     }, 1000 * 60 * 60)

function query(url) {
    let last73 = 0,
        last74 = 0,
        last75 = 0,
        last76 = 0,
        last77 = 0;
    $.ajax({
        type: "GET",
        cache: true,
        dataType: "json",
        url: url,
        success: function(data) {
            $("#boss73").text("");
            $("#boss74").text("");
            $("#boss75").text("");
            $("#boss76").text("");
            $("#boss77").text("");
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                switch (element["encounterID"]) {
                    case 73:
                        if (element["percentile"] > last73 && element["difficulty"] == 101) {
                            scoring($("#boss73"), i);
                            last73 = element["percentile"];
                        }
                        break;
                    case 74:
                        if (element["percentile"] > last74 && element["difficulty"] == 101) {
                            scoring($("#boss74"), i);
                            last74 = element["percentile"];
                        }
                        break;
                    case 75:
                        if (element["percentile"] > last75 && element["difficulty"] == 101) {
                            scoring($("#boss75"), i);
                            last75 = element["percentile"];
                        }
                        break;
                    case 76:
                        if (element["percentile"] > last76 && element["difficulty"] == 101) {
                            scoring($("#boss76"), i);
                            last76 = element["percentile"];
                        }
                        break;
                    case 77:
                        if (element["percentile"] > last77 && element["difficulty"] == 101) {
                            scoring($("#boss77"), i);
                            last77 = element["percentile"];
                        }
                        break;
                    default:
                        break;
                }
            }
            clearTimeout(t);
            $("#boss-table").fadeIn(200);
            t = setTimeout(function() {
                $("#boss-table").fadeOut(2500);
            }, 5000);

            function scoring(e, n) {
                try {
                    e.html(Math.round(data[n]["percentile"]) +
                        `<span class="actors ${data[n]["spec"].replace(/\s/g,"")}"></span>`);
                    let m = e.text();
                    if (m == 100) {
                        e.css("color", "#e5cc80");
                    } else if (m == 99) {
                        e.css("color", "#e268a8");
                    } else if (m >= 95) {
                        e.css("color", "#ff8000");
                    } else if (m >= 75) {
                        e.css("color", "#a335ee");
                    } else if (m >= 50) {
                        e.css("color", "#0070ff");
                    } else if (m >= 25) {
                        e.css("color", "#1eff00");
                    } else if (m >= 0) {
                        e.css("color", "#666666");
                    }
                } catch {}
            }
        },
        timeout: 5000,
        error: function(e) {
            console.log("错误" + e["responseJSON"]["status"] + ":" + e["responseJSON"]["error"]);
            $("#boss-table").fadeOut(200);
            $("#noData").fadeIn(200);
            $("#noData").fadeOut(4000);
            clearTimeout(t);
            t = setTimeout(function() {
                $("#noData").fadeOut(4000);
            }, 5000);
        }
    });
}


$(function() {
    // window.localStorage.clear();
    apiKey = localStorage.getItem("apiKey");
    defaultServerName = localStorage.getItem("defaultServerName");
    if (apiKey == "" || apiKey == null || getQueryString("settings") == "1") {
        let inputApiKey = prompt("输入api key", apiKey == null ? "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" : apiKey);
        if (inputApiKey) {
            apiKey = inputApiKey;
            localStorage.setItem("apiKey", apiKey);
        };
    }
    if (defaultServerName == "" || defaultServerName == null || getQueryString("settings") == "1") {
        let inputServerName = prompt("输入你所在的服务器名称", defaultServerName == null ? "海猫茶屋" : defaultServerName);
        if (inputServerName) {
            defaultServerName = inputServerName;
            localStorage.setItem("defaultServerName", defaultServerName);
        };
    }

})

document.addEventListener("onOverlayStateUpdate", (e) => {
    if (e.detail.isLocked) {
        $("#readme").stop();
        $("#boss-table").stop();
        $("#readme").slideUp("slow");
        $("#boss-table").fadeOut(2500);
    } else {
        $("#readme").stop();
        $("#boss-table").stop();
        $("#boss-table").fadeIn(0);
        $("#readme").slideDown(0);
    }
});