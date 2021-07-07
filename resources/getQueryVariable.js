function getQueryVariable() {
  const result = {};
  const queryString = location.search;
  const reg = /[?&][^?&]+=[^?&]*/g;
  const found = queryString.match(reg);
  if (found) {
    found.forEach((item) => {
      let temp = item.substring(1).split("=");
      result[temp[0]] = temp[1];
    });
  }
  return result;
}
export { getQueryVariable };
