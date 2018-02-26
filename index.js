export default (list, keyAccessor, multiItem = true) => {
  const isProp = !(keyAccessor instanceof Function);

  return list.reduce((res, item) => {
    if (isProp) {
      var { [keyAccessor]: key, ...val } = item;
    } else {
      var key = keyAccessor(item);
      var val = item;
    }
    if (multiItem) {
      if (!res.hasOwnProperty(key)) {
        res[key] = [];
      }
      res[key].push(val);
    } else {
      res[key] = val;
    }
    return res;
  }, {});
}
