/*
 * @Author: Souma
 * @LastEditTime: 2021-07-27 23:13:20
 */
"use strict";
import { saveItem, loadItem } from "../../resources/localStorage.min.js";
import { worldId } from "../../resources/worldId.min.js";
let namespace = "logs";
function save(e, t) {
  return saveItem(namespace, e, t);
}
function load(e, t = "") {
  return loadItem(namespace, e, t);
}
let api = load("logsAPI");
let server = load("logsServer", "海猫茶屋");
for (const key in worldId) {
  if (Object.hasOwnProperty.call(worldId, key)) {
    $("#server").append(`<option value="${key}" ${server === worldId[key] ? "selected" : ""}>${worldId[key]}</option>`);
  }
}
let zone = 0;
addZones();
function addZones() {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "../../resources/zones.json",
    // async:false,
    success: (data) => {
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          $("#zones").append(
            `<option value="${key}" ${parseInt(key) === (parseInt(load("logsZone"))|| 38) ? "selected" : ""}>${data[key]}</option>`
          );
        }
      }
    },
  });
}

$("#api").val(api);
if (!api) {
  $("body")
    .children("p:eq(0)")
    .children("label")
    .append($(`<a href="https://cn.fflogs.com/profile#api" target="view_window">快捷跳转</a>`));
}
$("#api").on("change", () => {
  api = $("#api").val();
  api.length === 32 ? addZones() : "";
});
$("#save").on("click", () => {
  api = $("#api").val();
  server = $("#server").find("option:selected").text();
  // tran = $("#tran").prop("checked");
  zone = $("#zones").val();
  save("logsZone", zone);
  save("logsAPI", api);
  save("logsServer", server);
  // save("logsTran", tran);
  window.close();
});
