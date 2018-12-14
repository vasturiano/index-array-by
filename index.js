export default (list, keyAccessors, multiItem = true, flattenKeys = false) => {

  const keys = (keyAccessors instanceof Array ? keyAccessors : [keyAccessors]).map(key => ({
    keyAccessor: key,
    isProp: !(key instanceof Function)
  }));

  const indexedResult = list.reduce((res, item) => {
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

  if (multiItem  instanceof Function) {
    // Reduce leaf multiple values
    let leafGroup = indexedResult;
    for(let i = 1; i < keys.length - 1; i++) {
      leafGroup = Object.values(leafGroup);
    }
    Object.keys(leafGroup).forEach(k => leafGroup[k] = multiItem(leafGroup[k]));
  }

  let result = indexedResult;

  if (flattenKeys) {
    // flatten into array
    result = [];

    (function flatten(node, accKeys = []) {
      if (accKeys.length === keys.length) {
        result.push({
          keys: accKeys,
          vals: node
        });
      } else {
        Object.entries(node)
          .forEach(([key, val]) => flatten(val, [...accKeys, key]));
      }
    })(indexedResult); //IIFS
  }

  return result;
}
