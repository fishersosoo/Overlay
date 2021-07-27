/*
 * @Author: Souma
 * @LastEditTime: 2021-07-28 02:21:07
 */
"use strict";
import { loadItem } from "../../resources/localStorage.min.js";
import { getRegion } from "../../resources/dataCenter.min.js";
import { checkLog, Comparison, extractLog } from "../../resources/logLineProcessing.min.js";
let namespace = "logs";
function load(e, t = "") {
  return loadItem(namespace, e, t);
}
let api = load("logsAPI");
let zone = load("logsZone");
let server = load("logsServer", "海猫茶屋");
let metric = "dps";
let timeframe = "historical";
let timer;

$("#settings").on("click", () => {
  window.open("./settings.html", "_blank", "width=300,height=350");
});
$("#submit").on("click", () => {
  cha($("#test-id").val(), $("#test-server").val());
});
function cha(i, s) {
  api = load("logsAPI");
  if (api) {
    zone = load("logsZone");
    $.ajax({
      type: "GET",
      cache: false,
      dataType: "json",
      url: `https://www.fflogs.com/v1/rankings/character/${encodeURIComponent(i)}/${encodeURIComponent(s)}/${getRegion(
        s
      )}?zone=${zone}&metric=${metric}&timeframe=${timeframe}&api_key=${api}`,
      success: (data) => {
        $("#main").html(template(data));
        $("#main").fadeIn(0);
        timer = setTimeout(() => {
          $("#main").fadeOut(0);
        }, 5000);
      },
      timeout: 5000,
      error: () => {
        $("#main").html(`查无此人`);
        $("#main").fadeIn(0);
        timer = setTimeout(() => {
          $("#main").fadeOut(0);
        }, 5000);
      },
    });
  } else {
    $("#readMe").append("不设置API怎么查？");
  }
}
function template(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].difficulty === 100) {
      delete data[i];
    }
  }

  if (data.hidden) {
    return `此人隐藏了logs`;
  }
  data.sort(function (a, b) {
    if (a.encounterID === b.encounterID) {
      return parseInt(b.percentile) - parseInt(a.percentile);
    } else return a.encounterID === b.encounterID;
  });

  return `
    ${
      data
        .map(
          (item) =>
            `<p><img src="https://assets.rpglogs.com/img/ff/bosses/${item.encounterID}-icon.jpg" class="boss-icon">${per(
              item.percentile
            )}<img src="https://assets.rpglogs.com/img/ff/icons/actors.png?v=5" class="tiny-icon sprite actor-sprite-${item.spec.replace(
              /\s+/g,
              ""
            )}"></p>`
        )
        .join("") || `无logs`
    }
    `;
}
function per(per) {
  let p = Math.round(per);
  let percent = "";
  if (p == 100) {
    percent = "artifact";
  } else if (p == 99) {
    percent = "astounding";
  } else if (p >= 95) {
    percent = "legendary";
  } else if (p >= 75) {
    percent = "epic";
  } else if (p >= 50) {
    percent = "rare";
  } else if (p >= 25) {
    percent = "uncommon";
  } else {
    percent = "common";
  }
  return `<span class="rank-percent ${percent}">${p}</span>`;
}
document.addEventListener("onOverlayStateUpdate", (e) => {
  if (e.detail.isLocked) {
    $("#readMe").hide();
  } else {
    $("#readMe").show();
  }
});
let regexServer = {
  CN: /晨曦王座|沃仙曦染|宇宙和音|红玉海|萌芽池|神意之地|幻影群岛|拉诺西亚|拂晓之间|龙巢神殿|旅人栈桥|白金幻象|白银乡|神拳痕|潮风亭|琥珀原|柔风海湾|海猫茶屋|延夏|静语庄园|摩杜纳|紫水栈桥|梦羽宝境/,
  NA: /Adamantoise|Cactuar|Faerie|Gilgamesh|Jenova|Midgardsormr|Sargatanas|Siren|Behemoth|Excalibur|Exodus|Famfrit|Hyperion|Lamia|Leviathan|Ultros|Balmung|Brynhildr|Coeurl|Diabolos|Goblin|Malboro|Mateus|Zalera/,
  JP: /Aegis|Atomos|Carbuncle|Garuda|Gungnir|Kujata|Ramuh|Tonberry|Typhon|Unicorn|Alexander|Bahamut|Durandal|Fenrir|Ifrit|Ridill|Tiamat|Ultima|Valefor|Yojimbo|Zeromus|Anima|Asura|Belias|Chocobo|Hades|Ixion|Mandragora|Masamune|Pandaemonium|Shinryu|Titan/,
  EU: /Cerberus|Louisoix|Moogle|Omega|Ragnarok|Spriggan|Lich|Odin|Phoenix|Shiva|Zodiark|Twintania|초코보|모그리|카벙클|톤베리/,
};
addOverlayListener("LogLine", (e) => {
  let l = e.line;
  let t;
  if (
    checkLog(l, "00", {
      MessageType: [Comparison.equal, "0038"],
      MessageText: [Comparison.matchRegex, "^[lL]ogs .+$"],
    })
  ) {
    t = extractLog(l, "MessageText").match(`^[lL]ogs (?<name>[^\ ]+?)(?<server>${regexServer[getRegion(server)]})?$`);
    match();
  } else if (
    checkLog(l, "00", {
      MessageType: [Comparison.matchRegex, "^2239|1039$"],
      MessageText: [Comparison.matchRegex, "^.+(加入了小队。|joins? the party.|がパーティに参加しました。)$"],
    })
  ) {
    t = extractLog(l, "MessageText").match(
      `^(?<name>.+?)(?<server>${
        regexServer[getRegion(server)]
      })?(加入了小队。|joins? the party.|がパーティに参加しました。)$`
    );
    match();
  } else if (
    checkLog(l, "00", {
      MessageType: [Comparison.equal, "0039"],
      MessageText: [
        Comparison.matchRegex,
        `^(加入了|You join |コンテンツ「)(?<name>[^\ ]+?)(?<server>${
          regexServer[getRegion(server)]
        })?(组建的|'s party for |」、募集者)`,
      ],
    })
  ) {
    t = extractLog(l, "MessageText").match(
      `^(加入了|You join |コンテンツ「)(?<name>[^\ ]+?)(?<server>${
        regexServer[getRegion(server)]
      })?(组建的|'s party for |」、募集者)`
    );
    match();
  }
  function match() {
    cha(t.groups["name"], t.groups["server"] ? t.groups["server"] : server);
  }
});
startOverlayEvents();
