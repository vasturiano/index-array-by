export default (list, keyAccessors, multiItem = true) => {

  const keys = (keyAccessors instanceof Array ? keyAccessors : [keyAccessors]).map(key => ({
    keyAccessor: key,
    isProp: !(key instanceof Function)
  }));

  return list.reduce((res, item) => {
    let iterObj = res;
    let itemVal = item;

    keys.forEach(({ keyAccessor, isProp }, idx) => {
      let key;
      if (isProp) {
        const { [keyAccessor]: propVal, ...rest } = itemVal;
        key = propVal;
        itemVal = rest;
      } else {
        key = keyAccessor(itemVal);
      }

      if (idx + 1 < keys.length) {
        if (!iterObj.hasOwnProperty(key)) {
          iterObj[key] = {};
        }
        iterObj = iterObj[key];
      } else { // Leaf key
        if (multiItem) {
          if (!iterObj.hasOwnProperty(key)) {
            iterObj[key] = [];
          }
          iterObj[key].push(itemVal);
        } else {
          iterObj[key] = itemVal;
        }
      }
    });

    return res;
  }, {});
}
