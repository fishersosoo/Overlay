"use strict";

import {
    checkLog,
    Comparison,
    extractLog
}
from "../../resources/logLineProcessing.js";
var lifeMs = 20000;
var targeting = null;
var watching = null;
var FFXIVAPI = "https://cafemaker.wakingsands.com";
var last16Time = 0;
var skillShowText = "等待目标…"
var start = false;
$("#skillShow").text(skillShowText);
addOverlayListener("LogLine", (e) => {
    let l = e.line;
    if (checkLog(l, "00", {
            "MessageType": [Comparison.equal, "0038"],
            "MessageText": [Comparison.equal, "Casting monitor"]
        })) {
        watching = targeting;
        if (watching == 0) {
            $("#skillShow").text(skillShowText);
            start = false;
        } else {
            $("#skillShow").text(watching);
            start = true;
        }
    } else if (start && checkLog(l, "15", {
            "CasterName": [Comparison.equal, watching],
            "AbilityID": [Comparison.notMatchRegex, "^07|08$"],
        })) {
        showSkillIcon(extractLog(l, "AbilityID"));
    } else if (start && checkLog(l, "16", {
            "Time": [Comparison.notEqual, last16Time],
            "CasterName": [Comparison.equal, watching]
        })) {
        last16Time = extractLog(l, "Time");
        showSkillIcon(extractLog(l, "AbilityID"));
    }
});
addOverlayListener('EnmityTargetData', (e) => {
    e.Target !== null ? targeting = e.Target.Name : targeting = "0";
});
startOverlayEvents();

function showSkillIcon(ID) {
    let urlAPI = FFXIVAPI + "/Action/" + parseInt(ID, 16) + "?columns=Icon,ActionCategoryTargetID";
    let d = new Date();
    let imgClass;
    let imgDOM;

    $.getJSON(urlAPI, function(data) {
        data["ActionCategoryTargetID"] == 4 ? imgClass = "oGCD" : imgClass = "GCD";
        imgDOM = $("<img class='" + imgClass + "' id='" + d.getTime() + "' src='" + FFXIVAPI + data["Icon"] + "'>");
        $("#skillShow").append(imgDOM);
        $(imgDOM).animate({
            right: "100%"
        }, lifeMs, "linear");
        setTimeout("$('#" + d.getTime() + "').remove()", lifeMs);
    });
};

document.addEventListener("onOverlayStateUpdate", (e) => { //锁定悬浮窗
    if (e.detail.isLocked) {
        document.getElementById("readme").classList.add("hidden");
        document.getElementById("skillShow").classList.add("unhidden");
    } else {
        document.getElementById("readme").classList.remove("hidden");
        document.getElementById("skillShow").classList.remove("unhidden");
    }
});