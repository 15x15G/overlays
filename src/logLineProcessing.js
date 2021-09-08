"use strict";
let type00_LogLine = {
    Type: 0,
    Time: 1,
    MessageType: 2,
    MessageSources: 3, //Type为0038时这里为空
    MessageText: 4,
};
let type01_ChangeZone = {
    Type: 0,
    Time: 1,
    ZoneID: 2,
    ZoneName: 3,
};
let type02_ChangePrimaryPlayer = {
    Type: 0,
    Time: 1,
    PlayerID: 2,
    PlayerName: 3,
};
let type03_AddCombatant = {
    Type: 0,
    Time: 1,
    ObjectID: 2,
    CombatnatName: 3,
    JobID: 4,
    Level: 5,
    //"Unknown":6,
    //"Unknown":7,
    WorldName: 8,
    //"Unknown":9,
    //"Unknown":10,
    CurrentHP: 11,
    MaxHP: 12,
    CurrentMP: 13,
    MaxMP: 14,
    CurrenTP: 15,
    MaxTP: 16,
    X: 17,
    Y: 18,
    Z: 19,
    Heading: 20,
};
let type04_RemoveCombatant = {
    Type: 0,
    Time: 1, //未完
};
let type05_AddBuff = {
    Type: 0,
    Time: 1, //未完
};
let type06_RemoveBuff = {
    Type: 0,
    Time: 1, //未完
};
let type07_FlyingText = {
    Type: 0,
    Time: 1, //未完
};
let type08_OutgoingAbility = {
    Type: 0,
    Time: 1, //未完
};
let type0A_IncomingAbility = {
    Type: 0,
    Time: 1, //未完
};
let type0B_PartyList = {
    Type: 0,
    Time: 1, //未完
};
let type0C_PlayerStats = {
    Type: 0,
    Time: 1, //未完
};
let type0D_CombatantHP = {
    Type: 0,
    Time: 1, //未完
};
let type14_NetworkStartsCasting = {
    Type: 0,
    Time: 1,
    CasterObjectID: 2,
    CasterName: 3,
    AbilityID: 4,
    AbilityName: 5,
    TargetObjectID: 6,
    TaregtName: 7,
    Casting: 8,
    TargetIndex: 9,
};
let type15_NetworkAbility = {
    Type: 0,
    Time: 1,
    CasterObjectID: 2,
    CasterName: 3,
    AbilityID: 4,
    AbilityName: 5,
    TargetObjectID: 6,
    TargetName: 7,
    Flags: 8,
    Damage: 9,
    //Unknown:10~23
    TargetCurrentHP: 24,
    TargetMaxHP: 25,
    TargetCurrentMP: 26,
    TargetMaxMP: 27,
    TargetCurrentTP: 28,
    TargetMaxTP: 29,
    TargetX: 30,
    TargetY: 31,
    TargetZ: 32,
    TargetHeading: 33,
    CasterCurrentHP: 34,
    CasterMaxHP: 35,
    CasterCurrentMP: 36,
    CasterMaxMP: 37,
    CasterCurrentTP: 38,
    CasterMaxTP: 39,
    CasterX: 40,
    CasterY: 41,
    CasterZ: 42,
    CasterHeading: 43,
    NetworkInformatioNumber: 44,
    TargetNumber: 45,
};
let type16_NetworkAOEAbility = {
    Type: 0,
    Time: 1,
    CasterObjectID: 2,
    CasterName: 3,
    AbilityID: 4,
    AbilityName: 5,
    TargetObjectID: 6,
    TargetName: 7,
    Flags: 8,
    Damage: 9,
    //Unknown:10~23
    TargetCurrentHP: 24,
    TargetMaxHP: 25,
    TargetCurrentMP: 26,
    TargetMaxMP: 27,
    TargetCurrentTP: 28,
    TargetMaxTP: 29,
    TargetX: 30,
    TargetY: 31,
    TargetZ: 32,
    TargetHeading: 33,
    CasterCurrentHP: 34,
    CasterMaxHP: 35,
    CasterCurrentMP: 36,
    CasterMaxMP: 37,
    CasterCurrentTP: 38,
    CasterMaxTP: 39,
    CasterX: 40,
    CasterY: 41,
    CasterZ: 42,
    CasterHeading: 43,
    NetworkInformatioNumber: 44,
    TargetNumber: 45,
};
let type17_NetworkCancelAbility = {
    Type: 0,
    Time: 1, //未完
};
let type18_NetworkDoT = {
    Type: 0,
    Time: 1, //未完
};
let type19_NetworkDeath = {
    Type: 0,
    Time: 1, //未完
};
let type1A_NetworkBuff = {
    Type: 0,
    Time: 1,
    AbilityID: 2,
    AbilityName: 3,
    TimeRemaining: 4,
    CasterObjectID: 5,
    CasterName: 6,
    TargetObjectID: 7,
    TargetName: 8,
    unknown9: 9, //00、03、1E、28FE等
    unknown10: 10, //一串数字 未知 但同一个人是相同的
    unknown11: 11, //同上
    unknown12: 12, //似乎一直为空
};
let type1B_NetworkTargetIcon = {
    Type: 0,
    Time: 1, //未完
};
let type1C_NetworkRaidMarker = {
    Type: 0,
    Time: 1, //未完
};
let type1D_NetworkTargetMarker = {
    Type: 0,
    Time: 1, //未完
};
let type1E_NetworkBuffRemove = {
    Type: 0,
    Time: 1, //未完
};
let type1F_NetworkGauge = {
    Type: 0,
    Time: 1, //未完
};
let type20_NetworkWorld = {
    Type: 0,
    Time: 1, //未完
};
let type21_Network6D = {
    Type: 0,
    Time: 1,
    ZoneID: 2,
    Command: 3,
    Data1: 4, //??
    Data2: 5, //??
    Data3: 6, //??
    Data4: 7, //??
};
let type22_NetworkNameToggle = {
    Type: 0,
    Time: 1, //未完
};
let type23_NetworkTether = {
    Type: 0,
    Time: 1, //未完
};
let type24_LimitBreak = {
    Type: 0,
    Time: 1, //未完
};
let type25_NetworkActionSync = {
    Type: 0,
    Time: 1, //未完
};
let type26_NetworkStatusEffects = {
    Type: 0,
    Time: 1, //未完
};
let type27_NetworkUpdateHP = {
    Type: 0,
    Time: 1,
    TargetID: 2,
    TargetName: 3,
    CurrentHP: 4,
    MaxHP: 5,
    CurrentMP: 6,
    MaxMP: 7,
    CurrentTP: 8,
    MaxTP: 9,
    positionX: 10,
    positionY: 11,
    positionZ: 12,
    Facing: 13,
    TargetIndex: 14,
};
let typeFB_Debug = {
    Type: 0,
    Time: 1, //未完
};
let typeFC_PacketDump = {
    Type: 0,
    Time: 1, //未完
};
let typeFD_Version = {
    Type: 0,
    Time: 1, //未完
};
let typeFE_Error = {
    Type: 0,
    Time: 1, //未完
};
let typeFF_Timer = {
    Type: 0,
    Time: 1, //未完
};
let logData = {
    "00": type00_LogLine,
    "01": type01_ChangeZone,
    "02": type02_ChangePrimaryPlayer,
    "03": type03_AddCombatant,
    "04": type04_RemoveCombatant,
    "05": type05_AddBuff,
    "06": type06_RemoveBuff,
    "07": type07_FlyingText,
    "08": type08_OutgoingAbility,
    "0A": type0A_IncomingAbility,
    "0B": type0B_PartyList,
    "0C": type0C_PlayerStats,
    "0D": type0D_CombatantHP,
    14: type14_NetworkStartsCasting,
    15: type15_NetworkAbility,
    16: type16_NetworkAOEAbility,
    17: type17_NetworkCancelAbility,
    18: type18_NetworkDoT,
    19: type19_NetworkDeath,
    "1A": type1A_NetworkBuff,
    "1B": type1B_NetworkTargetIcon,
    "1C": type1C_NetworkRaidMarker,
    "1D": type1D_NetworkTargetMarker,
    "1E": type1E_NetworkBuffRemove,
    "1F": type1F_NetworkGauge,
    20: type20_NetworkWorld,
    21: type21_Network6D,
    22: type22_NetworkNameToggle,
    23: type23_NetworkTether,
    24: type24_LimitBreak,
    25: type25_NetworkActionSync,
    26: type26_NetworkStatusEffects,
    27: type27_NetworkUpdateHP,
    FB: typeFB_Debug,
    FC: typeFC_PacketDump,
    FD: typeFD_Version,
    FE: typeFE_Error,
    FF: typeFF_Timer,
};
const Comparison = {
    greaterThan: 0, //大于
    greaterOrEqualThan: 1, //大于等于
    lessThan: 2, //小于
    lessOrEqualThan: 3, //小于等于
    equal: 4, //等于
    notEqual: 5, //不等于
    matchRegex: 6, //正则匹配
    notMatchRegex: 7, //正则不匹配
};
function checkLog(log, type, conditions) {
    //检查log是否为type日志行且满足conditions内部所有条件
    try {
        if (parseInt(log[0]).toString(16).padStart("2", "0").toUpperCase() !== type.toUpperCase()) {
            //日志行类型正确
            return false; //不是type类型
        } else if (Object.keys(conditions).length === 0) {
            return true;
        } else {
            //相符
            Object.keys(conditions).forEach((c) => {
                //遍历条件
                switch (
                conditions[c][0] //log中的c数据使用Comparison与conditions[c][1]进行比较
                ) {
                    case 0:
                        if (log[logData[type][c]] <= conditions[c][1]) throw new error(); //大于
                        break;
                    case 1:
                        if (log[logData[type][c]] < conditions[c][1]) throw new error(); //大于等于
                        break;
                    case 2:
                        if (log[logData[type][c]] >= conditions[c][1]) throw new error(); //小于
                        break;
                    case 3:
                        if (log[logData[type][c]] > conditions[c][1]) throw new error(); //小于等于
                        break;
                    case 4:
                        if (log[logData[type][c]] !== conditions[c][1]) throw new error(); //等于
                        break;
                    case 5:
                        if (log[logData[type][c]] == conditions[c][1]) throw new error(); //不等于
                        break;
                    case 6:
                        if (!new RegExp(conditions[c][1]).test(log[logData[type][c]])) throw new error(); //正则匹配
                        break;
                    case 7:
                        if (new RegExp(conditions[c][1]).test(log[logData[type][c]])) throw new error(); //正则不匹配
                        break;
                }
            });
            return true; //全部符合
        }
    } catch {
        return false; //只要有不满足的就返回false
    }
}
function extractLog(log, name) {
    //返回log日志行中的name数据
    return log[logData[parseInt(log[0]).toString(16).padStart("2", "0").toUpperCase()][name]];
}
function jobIDConvert(jobID) {
    switch (jobID.toString()) {
        case "1":
            return {
                job: "Gla",
                short: "剑",
                middle: "剑术",
                full: "剑术师",
            };
        case "2":
            return {
                job: "Pgl",
                short: "格",
                middle: "格斗",
                full: "格斗家",
            };
        case "3":
            return {
                job: "Mrd",
                short: "斧",
                middle: "斧术",
                full: "斧术师",
            };
        case "4":
            return {
                job: "Lnc",
                short: "枪",
                middle: "枪术",
                full: "枪术士",
            };
        case "5":
            return {
                job: "Arc",
                short: "弓",
                middle: "弓箭",
                full: "弓箭手",
            };
        case "6":
            return {
                job: "Cnj",
                short: "弓",
                middle: "弓箭",
                full: "弓箭手",
            };
        case "7":
            return {
                job: "THM",
                short: "咒",
                middle: "咒术",
                full: "咒术师",
            };
        case "19":
            return {
                job: "Pld",
                short: "骑",
                middle: "骑士",
                full: "骑士",
            };
        case "20":
            return {
                job: "Mnk",
                short: "僧",
                middle: "武僧",
                full: "武僧",
            };
        case "21":
            return {
                job: "War",
                short: "战",
                middle: "战士",
                full: "战士",
            };
        case "22":
            return {
                job: "Drg",
                short: "龙",
                middle: "龙骑",
                full: "龙骑士",
            };
        case "23":
            return {
                job: "Brd",
                short: "诗",
                middle: "诗人",
                full: "吟游诗人",
            };
        case "24":
            return {
                job: "Whm",
                short: "白",
                middle: "白魔",
                full: "白魔法师",
            };
        case "25":
            return {
                job: "Blm",
                short: "黑",
                middle: "黑魔",
                full: "黑魔法师",
            };
        case "26":
            return {
                job: "Acn",
                short: "秘",
                middle: "秘术",
                full: "秘术师",
            };
        case "27":
            return {
                job: "Smn",
                short: "召",
                middle: "召唤",
                full: "召唤师",
            };
        case "28":
            return {
                job: "Sch",
                short: "学",
                middle: "学者",
                full: "学者",
            };
        case "29":
            return {
                job: "Rog",
                short: "双",
                middle: "双剑",
                full: "双剑师",
            };
        case "30":
            return {
                job: "Nin",
                short: "忍",
                middle: "忍者",
                full: "忍者",
            };
        case "31":
            return {
                job: "Mch",
                short: "机",
                middle: "机工",
                full: "机工士",
            };
        case "32":
            return {
                job: "Drk",
                short: "暗",
                middle: "暗骑",
                full: "暗黑骑士",
            };
        case "33":
            return {
                job: "Ast",
                short: "占",
                middle: "占星",
                full: "占星术士",
            };
        case "34":
            return {
                job: "Sam",
                short: "侍",
                middle: "武士",
                full: "武士",
            };
        case "35":
            return {
                job: "Rdm",
                short: "赤",
                middle: "赤魔",
                full: "赤魔法师",
            };
        case "36":
            return {
                job: "Blu",
                short: "青",
                middle: "青魔",
                full: "青魔法师",
            };
        case "37":
            return {
                job: "Gnb",
                short: "绝",
                middle: "绝枪",
                full: "绝枪战士",
            };
        case "38":
            return {
                job: "Dnc",
                short: "舞",
                middle: "舞者",
                full: "舞者",
            };
    }
}
export {
    Comparison,
    checkLog,
    extractLog,
    jobIDConvert
};
