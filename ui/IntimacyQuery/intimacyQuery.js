"use strict";

import {
    checkLog,
    Comparison,
    extractLog,
}
from "../../resources/logLineProcessing.min.js";

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
            "MessageText": [Comparison.matchRegex, "^出警 .+$"]
        })) {
        t = extractLog(l, "MessageText").match(/^好感度查询 (?<name>[^\ ]+?)(?<server>晨曦王座|沃仙曦染|宇宙和音|红玉海|萌芽池|神意之地|幻影群岛|拉诺西亚|拂晓之间|龙巢神殿|旅人栈桥|白金幻象|白银乡|神拳痕|潮风亭|琥珀原|柔风海湾|海猫茶屋|延夏|静语庄园|摩杜纳|紫水栈桥|梦羽宝境)?$/);
        match();
    } else if (checkLog(l, "00", {
            "MessageType": [Comparison.matchRegex, "^2239|1039$"],
            "MessageText": [Comparison.matchRegex, "^.+加入了小队。$"]
        })) {
        t = extractLog(l, "MessageText").match(/^(?<name>.+?)(?<server>晨曦王座|沃仙曦染|宇宙和音|红玉海|萌芽池|神意之地|幻影群岛|拉诺西亚|拂晓之间|龙巢神殿|旅人栈桥|白金幻象|白银乡|神拳痕|潮风亭|琥珀原|柔风海湾|海猫茶屋|延夏|静语庄园|摩杜纳|紫水栈桥|梦羽宝境)?加入了小队。$/);
        match();
    } else if (checkLog(l, "00", {
            "MessageType": [Comparison.equal, "0039"],
            "MessageText": [Comparison.matchRegex, "^加入了(?<name>[^\ ]+?)(?<server>晨曦王座|沃仙曦染|宇宙和音|红玉海|萌芽池|神意之地|幻影群岛|拉诺西亚|拂晓之间|龙巢神殿|旅人栈桥|白金幻象|白银乡|神拳痕|潮风亭|琥珀原|柔风海湾|海猫茶屋|延夏|静语庄园|摩杜纳|紫水栈桥|梦羽宝境)?组建的"]
        })) {
        t = extractLog(l, "MessageText").match(/^加入了(?<name>[^\ ]+?)(?<server>晨曦王座|沃仙曦染|宇宙和音|红玉海|萌芽池|神意之地|幻影群岛|拉诺西亚|拂晓之间|龙巢神殿|旅人栈桥|白金幻象|白银乡|神拳痕|潮风亭|琥珀原|柔风海湾|海猫茶屋|延夏|静语庄园|摩杜纳|紫水栈桥|梦羽宝境)?组建的/);
        match();
    };

    function match() {
        characterName = t.groups["name"];
        serverName = !t.groups["server"] ? defaultServerName : t.groups["server"];
        query(`https://www.fflogs.com/v1/parses/character/${encodeURIComponent(characterName)}/${encodeURIComponent(serverName)}/${encodeURIComponent(serverRegion)}?zone=38&metric=${encodeURIComponent(metric)}&timeframe=${encodeURIComponent(timeframe)}&api_key=${encodeURIComponent(apiKey)}`);
    }
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
    let count73= 0,
        count74 = 0,
        count75 = 0,
        count76 = 0,
        count77 = 0;
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
            $("#count73").text("");
            $("#count74").text("");
            $("#count75").text("");
            $("#count76").text("");
            $("#count77").text("");
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                switch (element["encounterID"]) {
                    case 73:
                        if ( element["difficulty"] == 101){
                            if (element["percentile"] > last73 ) {
                                scoring($("#boss73"), i);
                                last73 = element["percentile"];
                            }
                            count73+=1;
                        }

                        break;
                    case 74:
                        if( element["difficulty"] == 101){
                            if (element["percentile"] > last74) {
                                scoring($("#boss74"), i);
                                last74 = element["percentile"];
                            }
                            count74+=1;
                    }
                        break;
                    case 75:
                        if( element["difficulty"] == 101){
                        if (element["percentile"] > last75 ) {
                            scoring($("#boss75"), i);
                            last75 = element["percentile"];
                        }
                        count75+=1;
                    }
                        break;
                    case 76:
                        if( element["difficulty"] == 101){

                        if (element["percentile"] > last76) {
                            scoring($("#boss76"), i);
                            last76 = element["percentile"];
                        }
                        count76+=1;
                    }
                        break;
                    case 77:
                        if( element["difficulty"] == 101){

                        if (element["percentile"] > last77 ) {
                            scoring($("#boss77"), i);
                            last77 = element["percentile"];
                        }
                        count77+=1;

                    }
                        break;
                    default:
                        break;
                }
            }
            $("#count73").text(count73+"次");
            $("#count74").text(count74+"次");
            $("#count75").text(count75+"次");
            $("#count76").text(count76+"次");
            $("#count77").text(count77+"次");

            clearTimeout(t);
            $("#boss-table").stop();
            $("#boss-table").fadeOut(0);
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
            if (e["responseJSON"]["status"] != 400) console.log("Error " + e["responseJSON"]["status"] + "：" + e["responseJSON"]["error"]);
            clearTimeout(t);
            $("#boss-table").stop();
            $("#boss-table").fadeOut(0);
            $("#boss73").text("");
            $("#boss74").text("");
            $("#boss75").text("");
            $("#boss76").text("");
            $("#boss77").text("");
            $("#boss-table").fadeIn(200);
            t = setTimeout(function() {
                $("#boss-table").fadeOut(2500);
            }, 5000);
        }
    });
}


$(function() {
    // window.localStorage.clear();
    apiKey = localStorage.getItem("apiKey");
    defaultServerName = localStorage.getItem("defaultServerName");
    if (apiKey == "" || apiKey == null || getQueryString("settings") == "1") {
        let inputApiKey = prompt("输入FF Logs V1 Client Key", apiKey == null ? "https://www.fflogs.com/profile" : apiKey);
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