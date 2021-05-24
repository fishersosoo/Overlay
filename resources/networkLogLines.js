let _LogLine = [];
let _ChangeZone = [];
let _ChangePrimaryPlayer = [];
let _AddCombatant = [];
let _RemoveCombatant = [];
let _AddBuff = [];
let _RemoveBuff = [];
let _FlyingText = [];
let _OutgoingAbility = [];
let _IncomingAbility
let _PartyList = [];
let _PlayerStats = [];
let _CombatantHP = [];
let _NetworkStartsCasting = {
    "Lines": 1,
    "Time": 2,
    "CasterObjectId": 3,
    "CasterName": 4,
    "AbilityId": 5,
    "AbilityName": 6,
    "TargetObjectId": 7,
    "TaregtName": 8,
    "Casting": 9,
    "unknown": 10
};
let _NetworkAbility = [];
let _NetworkAOEAbility = [];
let _NetworkCancelAbility = [];
let _NetworkDoT = [];
let _NetworkDeath = [];
let _NetworkBuff = [];
let _NetworkTargetIcon = [];
let _NetworkRaidMarker = [];
let _NetworkTargetMarker = [];
let _NetworkBuffRemove = [];
let _NetworkGauge = [];
let _NetworkWorld = [];
let _Network6D = [];
let _NetworkNameToggle = [];
let _NetworkTether = [];
let _LimitBreak = [];
let _NetworkActionSync = [];
let _NetworkStatusEffects = [];
let _NetworkUpdateHP = {
    "Lines": 1,
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
    "Facing": 13
};
let _Debug = [];
let _PacketDump = [];
let _Version = [];
let _Error = [];
let _Timer = [];

let logData = {
    "0": _LogLine,
    "1": _ChangeZone,
    "2": _ChangePrimaryPlayer,
    "3": _AddCombatant,
    "4": _RemoveCombatant,
    "5": _AddBuff,
    "6": _RemoveBuff,
    "7": _FlyingText,
    "8": _OutgoingAbility,
    "A": _IncomingAbility,
    "B": _PartyList,
    "C": _PlayerStats,
    "D": _CombatantHP,
    "14": _NetworkStartsCasting,
    "15": _NetworkAbility,
    "16": _NetworkAOEAbility,
    "17": _NetworkCancelAbility,
    "18": _NetworkDoT,
    "19": _NetworkDeath,
    "1A": _NetworkBuff,
    "1B": _NetworkTargetIcon,
    "1C": _NetworkRaidMarker,
    "1D": _NetworkTargetMarker,
    "1E": _NetworkBuffRemove,
    "1F": _NetworkGauge,
    "20": _NetworkWorld,
    "21": _Network6D,
    "22": _NetworkNameToggle,
    "23": _NetworkTether,
    "24": _LimitBreak,
    "25": _NetworkActionSync,
    "26": _NetworkStatusEffects,
    "27": _NetworkUpdateHP,
    "FB": _Debug,
    "FC": _PacketDump,
    "FD": _Version,
    "FE": _Error,
    "FF": _Timer
}

export function checkLog(e, l, c) //检查e是否为l日志行且满足c的所有条件
{
    try
    {
        if (parseInt(e[0]).toString(16) !== l) //如果本次日志行的行数(转16进制后)等于输入的l
        {
            return false; //l不符合,直接返回false
        }
        else //l相符,进行条件判断
        {
            Object.keys(c).forEach(element => //遍历条件
                {
                    if (e[logData[l][element] - 1] !== c[element]) //日志中截取的条件与条件的字符串判断
                    {
                        throw new error;
                    } //只要有一个不满足就跳出报错跳出循环且返回false
                })
            return true; //全部符合,返回true
        }
    }
    catch
    {
        return false; //条件未全部满足
    }
};