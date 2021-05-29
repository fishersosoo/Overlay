"use strict";

import {
    checkLog,
    Comparison,
    extractLog,
    jobIDConvert
}
from "../../resources/logLineProcessing.js";
var lifeMs = 15000;
var targetingJobID = 0;
var targetingName;
var watchingJobID = 0;
var watchingName;
var FFXIVAPI = "https://cafemaker.wakingsands.com";
var last16Time = 0;
var waitingText = "等待目标…"
var start = false;
$("#skillShow").text(waitingText);
addOverlayListener("LogLine", (e) => {
    let l = e.line;
    if (checkLog(l, "00", {
            "MessageType": [Comparison.equal, "0038"],
            "MessageText": [Comparison.equal, "Casting monitor"]
        })) {
        watchingJobID = targetingJobID;
        watchingName = targetingName;
        if (watchingJobID == 0) {
            $("#skillShow").text(waitingText);
            start = false;
            document.getElementById("skillShow").classList.remove("unhidden");
        } else {
            $("#skillShow").text(jobIDConvert(watchingJobID).middle);
            start = true;
            document.getElementById("skillShow").classList.add("unhidden");
        }
    } else if (start && checkLog(l, "15", {
            "CasterName": [Comparison.equal, watchingName],
            "AbilityID": [Comparison.notMatchRegex, "^07|08$"],
        })) {
        showSkillIcon(extractLog(l, "AbilityID"));
    } else if (start && checkLog(l, "16", {
            "Time": [Comparison.notEqual, last16Time],
            "CasterName": [Comparison.equal, watchingName]
        })) {
        last16Time = extractLog(l, "Time");
        showSkillIcon(extractLog(l, "AbilityID"));
    }
});
addOverlayListener('EnmityTargetData', (e) => {
    if (e.Target !== null) {
        targetingJobID = e.Target.Job;
        targetingName = e.Target.Name;
    } else {
        targetingJobID = 0;
        targetingName = null;
    };
});
addOverlayListener('ChangeZone', () => {
    targetingJobID = 0;
    targetingName = null;
    $("#skillShow").text(waitingText);
    start = false;
    document.getElementById("skillShow").classList.remove("unhidden");
})
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

    } else {
        document.getElementById("readme").classList.remove("hidden");

    }
});