"use strict";
$("#bgOpacity").val(localStorage.getItem("setBgOpacity") || 0.5);
window.save = function () {
  localStorage.setItem("setBgOpacity", $("#bgOpacity").val());
};
$("#bgOpacity").on("change", () => {
  $("#text").text($("#bgOpacity").val());
});
