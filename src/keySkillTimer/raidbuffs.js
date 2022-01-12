const buffs60 = [
  [30, "神圣领域", 10, 420, [1, 19], 0],
  [43, "死斗", 10, 240, [3, 21], 0],
  [3638, "行尸走肉", 10, 300, [32], 0],
  [16152, "超火流星", 10, 360, [37], 0],
  [3540, "幕帘", 30, 90, [1, 19], 0],
  [140, "天赐", 0, 180, [6, 24], 0],
  [25862, "铃兰圣礼", 15, 180, [6, 24], 0],
  [25868, "疾风怒涛  ", 20, 120, [28], 0],
  [25874, "宏观宇宙", 15, 180, [33], 0],
  //--------------------------------------
  [118, "战歌", 15, 120, [5, 23], 1],
  [25785, "光神曲", 15, 110, [5, 23], 1],
  [2258, "背刺", 15, 60, [29, 30], 1],
  [24405, "奥秘环", 20, 120, [39], 1],
  [3557, "连祷", 15, 120, [4, 22], 1],
  [7398, "龙肠", 20, 120, [4, 22], 1],
  [7396, "义结金兰", 15, 120, [2, 20], 1],
  [25801, "闪耀之光", 30, 120, [27], 1],
  [7436, "连环计", 15, 120, [28], 1],
  [7520, "鼓励", 20, 110, [35], 1],
  [16196, "技巧舞", 20, 120, [38], 1],
  [16011, "探戈", 20, 120, [38], 1],
  [16552, "占卜", 15, 120, [33], 1],
];
const buffs50 = [
  [30, "神圣领域", 10, 420, [1, 19], 0],
  [43, "死斗", 8, 240, [3, 21], 0],
  [3638, "行尸走肉", 10, 300, [32], 0],
  [16152, "超火流星", 8, 360, [37], 0],
  [3540, "幕帘", 30, 90, [1, 19], 0],
  [140, "天赐", 0, 180, [6, 24], 0],
  //--------------------------------------
  [118, "战歌", 20, 180, [5, 23], 1],
  [2258, "背刺", 15, 60, [29, 30], 1],
  [3557, "连祷", 20, 180, [4, 22], 1],
  [7398, "龙肠", 20, 120, [4, 22], 1],
  [7396, "义结金兰", 15, 90, [2, 20], 1],
  [7423, "灵护", 15, 180, [27], 1],
  [7436, "连环计", 15, 120, [28], 1],
  [7520, "鼓励", 20, 120, [35], 1],
  [16196, "技巧舞", 20, 120, [38], 1],
  [16011, "探戈", 20, 120, [38], 1],
  [16552, "占卜", 15, 120, [33], 1],
];
const raidBuffs60 = buffs60.reduce((pre, cur, index) => {
  let i = 0;
  pre[cur[i++]] = {
    tts: cur[i++],
    duration: cur[i++],
    recast1000ms: cur[i++],
    job: cur[i++],
    type: cur[i++],
    order: index,
  };
  return pre;
}, {});
const raidBuffs50 = buffs50.reduce((pre, cur, index) => {
  let i = 0;
  pre[cur[i++]] = {
    tts: cur[i++],
    duration: cur[i++],
    recast1000ms: cur[i++],
    job: cur[i++],
    type: cur[i++],
    order: index,
  };
  return pre;
}, {});
export { raidBuffs60, raidBuffs50 };
