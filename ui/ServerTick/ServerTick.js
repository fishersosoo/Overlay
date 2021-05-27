"use strict";

import {
    checkLog,
    Comparison,
    extractLog
}
from "../../resources/logLineProcessing.js";

let loopCycleMs = 3000; //每轮循环的时间(毫秒)
let loopTimer; //计时器
let charName; //玩家名称
loadSetting();

addOverlayListener("ChangePrimaryPlayer", (e) => {
    charName = e.charName; //获取玩家名称
    if (typeof(locked) == "undefined" || locked) jqLoopStop();
});

addOverlayListener("LogLine", (e) => {
    let l = e.line;
    if (checkLog(l, "27", {
            "TargetName": [Comparison.equal, charName],
            "CurrentMP": [Comparison.equal, "10000"],
            "MaxMP": [Comparison.equal, "10000"]
        })) {
        jqLoopStart(); //触发回蓝日志
    };
});

startOverlayEvents();

document.addEventListener("onOverlayStateUpdate", (e) => { //锁定悬浮窗
    let settingsContainer = document.getElementById("setting");
    if (!settingsContainer)
        return;
    var locked = e.detail.isLocked;
    if (locked) {
        settingsContainer.classList.add("hidden"); //锁定
        jqLoopStop();
    } else {
        settingsContainer.classList.remove("hidden"); //未锁定
        jqLoopStart();
    }
});

$(document).bind("selectstart", () => { //禁用文字选择功能
    return false;
});

$("table").mousedown((e) => { //右键恢复默认
    if (e.which == 3) {
        $(e.target).val($(e.target).attr("value"));
        setStyle(e);
    }
});

$("table").bind("input propertychange", (e) => { //用户改变设置
    setStyle(e);
});

function setStyle(e) { //设置外观
    switch (e.target.id) {
        case "inputRangeBarR":
        case "inputRangeBarG":
        case "inputRangeBarB":
        case "inputRangeBarA":
            $("#bar").css("backgroundColor", `rgba(${$("#inputRangeBarR").val()}, 
                                                   ${$("#inputRangeBarG").val()}, 
                                                   ${$("#inputRangeBarB").val()}, 
                                                   ${$("#inputRangeBarA").val()})`);
            break;
        case "inputRangeProgressHeightPer":
            $("#progress").css("height", `${$(e.target).val()}%`);
            break;
        case "inputRangeProgressWidthPer":
            $("#progress").css("width", `${$(e.target).val()}%`);
            break;
        case "inputRangeBorderSize":
            $("#progress").css("border-width", $(e.target).val());
            break;
    }
    saveSetting();
}

function jqAnimation() { //动画
    $("#bar").stop();
    $("#bar").css("width", "0%");
    $("#bar").animate({
        width: "100%"
    }, loopCycleMs, "linear"); //线性
}

function jqLoopStart() { //计时器启动
    jqLoopStop();
    jqAnimation();
    loopTimer = setInterval(jqAnimation, loopCycleMs); //创建计时器
}

function jqLoopStop() { //计时器停止
    clearInterval(loopTimer);
    $("#bar").stop();
    $("#bar").css("width", "0%");
}

function saveSetting() { //保存设置
    localStorage.clear();
    localStorage.setItem("serverTickBarColor", $("#bar").css("backgroundColor"));
}

function loadSetting() { //读取设置
    $("#bar").css("backgroundColor", localStorage.getItem("serverTickBarColor"));
}

function invertColor(hex, bw) { //返回高对比度颜色 bw=是否纯黑白
    if (hex.indexOf("#") === 0) {
        hex = hex.slice(1);
    }
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error("Invalid HEX color.");
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ?
            "#000000" :
            "#FFFFFF";
    }
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    return "#" + padZero(r) + padZero(g) + padZero(b);
}

// $("#progress").bind("contextmenu", () => { // 禁用右键菜单
//     return false;
// })