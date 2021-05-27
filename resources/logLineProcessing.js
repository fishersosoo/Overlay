'use strict';
let type00_LogLine = {
    "Type": 0,
    "Time": 1
};
let type01_ChangeZone = {
    "Type": 0,
    "Time": 1
};
let type02_ChangePrimaryPlayer = {
    "Type": 0,
    "Time": 1
};
let type03_AddCombatant = {
    "Type": 0,
    "Time": 1
};
let type04_RemoveCombatant = {
    "Type": 0,
    "Time": 1
};
let type05_AddBuff = {
    "Type": 0,
    "Time": 1
};
let type06_RemoveBuff = {
    "Type": 0,
    "Time": 1
};
let type07_FlyingText = {
    "Type": 0,
    "Time": 1
};
let type08_OutgoingAbility = {
    "Type": 0,
    "Time": 1
};
let type0A_IncomingAbility = {
    "Type": 0,
    "Time": 1
};
let type0B_PartyList = {
    "Type": 0,
    "Time": 1
};
let type0C_PlayerStats = {
    "Type": 0,
    "Time": 1
};
let type0D_CombatantHP = {
    "Type": 0,
    "Time": 1
};
let type14_NetworkStartsCasting = {
    "Type": 0,
    "Time": 1,
    "CasterObjectId": 2,
    "CasterName": 3,
    "AbilityId": 4,
    "AbilityName": 5,
    "TargetObjectId": 6,
    "TaregtName": 7,
    "Casting": 8,
    "TargetIndex": 9
};
let type15_NetworkAbility = {
    "Type": 0,
    "Time": 1
};
let type16_NetworkAOEAbility = {
    "Type": 0,
    "Time": 1
};
let type17_NetworkCancelAbility = {
    "Type": 0,
    "Time": 1
};
let type18_NetworkDoT = {
    "Type": 0,
    "Time": 1
};
let type19_NetworkDeath = {
    "Type": 0,
    "Time": 1
};
let type1A_NetworkBuff = {
    "Type": 0,
    "Time": 1
};
let type1B_NetworkTargetIcon = {
    "Type": 0,
    "Time": 1
};
let type1C_NetworkRaidMarker = {
    "Type": 0,
    "Time": 1
};
let type1D_NetworkTargetMarker = {
    "Type": 0,
    "Time": 1
};
let type1E_NetworkBuffRemove = {
    "Type": 0,
    "Time": 1
};
let type1F_NetworkGauge = {
    "Type": 0,
    "Time": 1
};
let type20_NetworkWorld = {
    "Type": 0,
    "Time": 1
};
let type21_Network6D = {
    "Type": 0,
    "Time": 1
};
let type22_NetworkNameToggle = {
    "Type": 0,
    "Time": 1
};
let type23_NetworkTether = {
    "Type": 0,
    "Time": 1
};
let type24_LimitBreak = {
    "Type": 0,
    "Time": 1
};
let type25_NetworkActionSync = {
    "Type": 0,
    "Time": 1
};
let type26_NetworkStatusEffects = {
    "Type": 0,
    "Time": 1
};
let type27_NetworkUpdateHP = {
    "Type": 0,
    "Time": 1,
    "TargetID": 2,
    "TargetName": 3,
    "CurrentHP": 4,
    "MaxHP": 5,
    "CurrentMP": 6,
    "MaxMP": 7,
    "CurrentTP": 8,
    "MaxTP": 9,
    "positionX": 10,
    "positionY": 11,
    "positionZ": 12,
    "Facing": 13,
    "TargetIndex": 14
};
let typeFB_Debug = {
    "Type": 0,
    "Time": 1
};
let typeFC_PacketDump = {
    "Type": 0,
    "Time": 1
};
let typeFD_Version = {
    "Type": 0,
    "Time": 1
};
let typeFE_Error = {
    "Type": 0,
    "Time": 1
};
let typeFF_Timer = {
    "Type": 0,
    "Time": 1
};
let logData = {
    "0": type00_LogLine,
    "1": type01_ChangeZone,
    "2": type02_ChangePrimaryPlayer,
    "3": type03_AddCombatant,
    "4": type04_RemoveCombatant,
    "5": type05_AddBuff,
    "6": type06_RemoveBuff,
    "7": type07_FlyingText,
    "8": type08_OutgoingAbility,
    "A": type0A_IncomingAbility,
    "B": type0B_PartyList,
    "C": type0C_PlayerStats,
    "D": type0D_CombatantHP,
    "14": type14_NetworkStartsCasting,
    "15": type15_NetworkAbility,
    "16": type16_NetworkAOEAbility,
    "17": type17_NetworkCancelAbility,
    "18": type18_NetworkDoT,
    "19": type19_NetworkDeath,
    "1A": type1A_NetworkBuff,
    "1B": type1B_NetworkTargetIcon,
    "1C": type1C_NetworkRaidMarker,
    "1D": type1D_NetworkTargetMarker,
    "1E": type1E_NetworkBuffRemove,
    "1F": type1F_NetworkGauge,
    "20": type20_NetworkWorld,
    "21": type21_Network6D,
    "22": type22_NetworkNameToggle,
    "23": type23_NetworkTether,
    "24": type24_LimitBreak,
    "25": type25_NetworkActionSync,
    "26": type26_NetworkStatusEffects,
    "27": type27_NetworkUpdateHP,
    "FB": typeFB_Debug,
    "FC": typeFC_PacketDump,
    "FD": typeFD_Version,
    "FE": typeFE_Error,
    "FF": typeFF_Timer
}

const Comparison = {
    greaterThan: 0, //大于
    greaterOrEqualThan: 1, //大于等于
    lessThan: 2, //小于
    lessOrEqualThan: 3, //小于等于
    equal: 4, //等于
    notEqual: 5 //不等于
};

function checkLog(log, type, conditions) { //检查log是否为type日志行且满足conditions内部所有条件

    try {
        if (parseInt(log[0]).toString(16) !== type) { //日志行类型正确
            return false; //不是type类型
        } else { //相符
            Object.keys(conditions).forEach(c => { //遍历条件
                switch (conditions[c][0]) { //log中的c数据使用Comparison与conditions[c][1]进行比较
                    case 0:
                        if (log[logData[type][c]] <= conditions[c][1]) throw new error; //大于
                        break;
                    case 1:
                        if (log[logData[type][c]] < conditions[c][1]) throw new error; //大于等于
                        break;
                    case 2:
                        if (log[logData[type][c]] >= conditions[c][1]) throw new error; //小于
                        break;
                    case 3:
                        if (log[logData[type][c]] > conditions[c][1]) throw new error; //小于等于
                        break;
                    case 4:
                        if (log[logData[type][c]] !== conditions[c][1]) throw new error; //等于
                        break;
                    case 5:
                        if (log[logData[type][c]] == conditions[c][1]) throw new error; //不等于
                        break;
                }
            })
            return true; //全部符合
        }
    } catch {
        return false; //只要有不满足的就返回false
    }
};

function extractLog(log, name) { //返回log日志行中的name数据
    return log[logData[log[0]][name]];
}

export {
    Comparison,
    checkLog,
    extractLog
};