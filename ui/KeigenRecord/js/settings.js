"use strict";

/*
 * @Author: Souma
 * @LastEditTime: 2021-08-18 21:56:07
 */
import { def } from "./def.js";
Object.freeze(def);
import { loadItem, saveItem } from "../../../resources/localStorage.min.js";
let namespace = "keigenRecord";
function load(t, a = "") {
  return loadItem(namespace, t, a);
}
function save(t, a) {
  saveItem(namespace, t, a);
}
$(function () {
  let settings = load("settings") || def;
  loadColor(settings);
  $("#cacheMax").val(settings.cacheMax);
  $("#autoHideS").val(settings.autoHideS);

  $("#save").on("click", (e) => {
    switch ($(e.currentTarget)[0].innerText) {
      case "保存":
        settings.cacheMax = $("#cacheMax").val();
        settings.autoHideS = $("#autoHideS").val();
        let colors = $(".fcolorpicker-curbox");
        for (const c of colors) settings.color[$(c).parent().attr("id")] = $(c).css("background-color");
        save("settings", settings);
    }
    window.opener.document.location.reload();
  });
  $("#cancel").on("click", () => location.reload());
  $("#reset").on("click", () => {
    loadColor(def);
  });
});
function loadColor(settings) {
  for (const key in settings.color) {
    if (Object.hasOwnProperty.call(settings.color, key)) {
      new XNColorPicker({
        color: `${settings.color[key]}`,
        selector: `#${key}`,
        showprecolor: false,
        prevcolors: null,
        showhistorycolor: true,
        historycolornum: 16,
        format: "rgba",
        showPalette: true,
        show: false,
        lang: "cn",
        colorTypeOption: "single",
        onConfirm: () => {},
        onCancel: () => {},
        onChange: () => {},
      });
    }
  }
}
