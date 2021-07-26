/*
 * @Author: Souma
 * @LastEditTime: 2021-07-27 05:41:32
 */
"use strict";
let dc = {
  Aether: ["Adamantoise", "Cactuar", "Faerie", "Gilgamesh", "Jenova", "Midgardsormr", "Sargatanas", "Siren"],
  Chaos: ["Cerberus", "Louisoix", "Moogle", "Omega", "Ragnarok", "Spriggan"],
  Crystal: ["Balmung", "Brynhildr", "Coeurl", "Diabolos", "Goblin", "Malboro", "Mateus", "Zalera"],
  Elemental: ["Aegis", "Atomos", "Carbuncle", "Garuda", "Gungnir", "Kujata", "Ramuh", "Tonberry", "Typhon", "Unicorn"],
  Gaia: [
    "Alexander",
    "Bahamut",
    "Durandal",
    "Fenrir",
    "Ifrit",
    "Ridill",
    "Tiamat",
    "Ultima",
    "Valefor",
    "Yojimbo",
    "Zeromus",
  ],
  Korea: ["초코보", "모그리", "카벙클", "톤베리"],
  Light: ["Lich", "Odin", "Phoenix", "Shiva", "Zodiark", "Twintania"],
  Mana: [
    "Anima",
    "Asura",
    "Belias",
    "Chocobo",
    "Hades",
    "Ixion",
    "Mandragora",
    "Masamune",
    "Pandaemonium",
    "Shinryu",
    "Titan",
  ],
  Primal: ["Behemoth", "Excalibur", "Exodus", "Famfrit", "Hyperion", "Lamia", "Leviathan", "Ultros"],
  猫小胖: ["紫水栈桥", "延夏", "静语庄园", "摩杜纳", "海猫茶屋", "柔风海湾", "琥珀原"],
  莫古力: ["白银乡", "白金幻想", "神拳痕", "潮风亭", "旅人栈桥", "拂晓之间", "龙巢神殿", "梦羽宝境"],
  陆行鸟: ["红玉海", "神意之地", "拉诺西亚", "幻影群岛", "萌芽池", "宇宙和音", "沃仙溪染", "晨曦王座"],
};
function getRegion(worldName) {
  for (const key in dc) {
    if (Object.hasOwnProperty.call(dc, key)) {
      const ele = dc[key];
      for (const k in dc[key]) {
        if (Object.hasOwnProperty.call(ele, k)) {
          const e = ele[k];
          if (e === worldName) return dataCenter(key);
        }
      }
    }
  }
}
export { dc, getRegion };
function dataCenter(world) {
  switch (world) {
    case "猫小胖":
    case "莫古力":
    case "陆行鸟":
      return "CN";
    case "Aether":
    case "Primal":
    case "Crystal":
      return "NA";
    case "Elemental":
    case "Gaia":
    case "Mana":
      return "JP";
    case "Chaos":
    case "Light":
    case "Korea":
      return "EU";
  }
}
