let sortRule = [
  "19", //pld //tank
  "21", //war //tank
  "32", //drk //tank
  "37", //gnb //tank
  "24", //whm //healer
  "28", //sch //healer
  "33", //ast //healer
  "40", //sge //healer new!!
  "20", //mnk //dps
  "22", //drg //dps
  "30", //nin //dps
  "34", //sam //dps
  "39", //rpr //dps new!!
  "23", //brd //dps
  "31", //mch //dps
  "38", //dnc //dps
  "25", //blm //dps
  "27", //smn //dps
  "35", //rdm //dps
  "36", //blu //dps
];
const watchJobsActionsID = {
  "1": [7535, 0, 7531, 17, 20], //剑术师
  "2": [7549, 65, 7541, 7542, 0], //格斗家
  "3": [7535, 0, 7531, 43, 44], //斧术师
  "4": [7549, 0, 7541, 7542, 85], //枪术士
  "5": [0, 0, 7541, 0, 101], //弓箭手
  "6": [0, 0, 7561, 0, 0], //幻术师
  "7": [7560, 157, 0, 0, 0], //咒术师
  "19": [7535, 7385, 7531, 17, 30], //骑士
  "20": [7549, 65, 7541, 7542, 7395], //武僧
  "21": [7535, 7388, 7531, 44, 43], //战士
  "22": [7549, 0, 7541, 7542, 85], //龙骑士
  "23": [7405, 7408, 7541, 0, 101], //吟游诗人
  "24": [25862, 16536, 7561, 25861, 7432], //白魔法师
  "25": [7560, 157, 7561, 0, 3573], //黑魔法师
  "26": [7560, 0, 7561, 0, 0], //秘术师
  "27": [7560, 25799, 7561, 0, 25831], //召唤师
  "28": [25868, 16545, 7561, 16542, 188], //学者
  "29": [7549, 2241, 7541, 7542, 0], //双剑师
  "30": [7549, 2241, 7541, 7542, 2264], //忍者
  "31": [16889, 0, 7541, 0, 2878], //机工士
  "32": [7535, 16471, 7531, 3636, 3638], //暗黑骑士
  "33": [25874, 16559, 7561, 7439, 3614], //占星术士
  "34": [7549, 7498, 7541, 7542, 16486], //武士
  "35": [7560, 25857, 7561, 0, 7521], //赤魔法师
  "36": [7560, 18305, 7561, 18317, 11415], //青魔法师
  "37": [7535, 16160, 7531, 16148, 16152], //绝枪战士
  "38": [16012, 16014, 7541, 16015, 16013], //舞者
  "39": [7549, 24404, 7541, 7542, 24393], //钐镰
  "40": [24318, 24311, 7561, 24305, 24302], //贤者
};
const baseClass = {
  1: 19,
  2: 20,
  3: 21,
  4: 22,
  5: 23,
  6: 24,
  7: 25,
  26: 27,
  29: 30,
};
export { sortRule, watchJobsActionsID, baseClass };
