function saveItem(key, value) {
  let storage = localStorage.getItem("Souma");
  if (!storage) {
    storage = {};
  } else {
    storage = JSON.parse(storage);
  }
  storage[key] = value;
  localStorage.setItem("Souma", JSON.stringify(storage));
}
/**
 *
 * @param {key} key
 * @param {默认值} def
 * @returns
 */
function loadItem(key, def="") {
  let storage = localStorage.getItem("Souma");
  return storage ? JSON.parse(storage)[key] || def : def;
}
export { saveItem, loadItem };
