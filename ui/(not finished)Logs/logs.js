/*
 * @Author: Souma
 * @LastEditTime: 2021-07-27 00:33:17
 */
"use strict";
import { saveItem, loadItem } from "../../resources/localStorage.min.js";
let api = loadItem("logsAPI");
let regionegion = loadItem("logsRegion", "CN");
let server = loadItem("logsServer", "海猫茶屋");
let zone = loadItem("logsZone", "38");
let time = loadItem("logsTime", 5);
let characterName = "";
let metric = "dps";
let timeframe = "historical";
$("#api").val(api);
api ? "" : $("#readMe").children("p:eq(1)").append($(`<a href="https://cn.fflogs.com/profile">获取API Key</a>`));
$("#server").val(server);
$("#region").val(regionegion);
$("#zone").val(zone);
$("#time").val(time);
$("#save").on("click", () => {
  api = $("#api").val();
  server = $("#server").val();
  time = $("#time").val();
  saveItem("logsAPI", api);
  saveItem("logsServer", server);
  saveItem("logsTime", time);
});
$("#submit").on("click", () => {
  if (api) {
    $.ajax({
      type: "GET",
      cache: false,
      dataType: "json",
      url: `https://www.fflogs.com/v1/rankings/character/${encodeURIComponent($("#test-id").val())}/${encodeURIComponent(
        $("#test-server").val()
      )}/${regionegion}?zone=${zone}&metric=${metric}&timeframe=${timeframe}&api_key=${api}`,
      success: (data) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          switch (element["encounterID"]) {
            case 73:
              break;
            case 74:
              break;
            case 75:
              break;
            case 76:
              break;
            case 77:
              break;
            default:
              break;
          }
        }
      },
      timeout: 5000,
      error: (e) => {},
    });
  } else {
    console.log("未填写API Key");
  }
});
