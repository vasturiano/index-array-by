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
        key = keyAccessor(itemVal, idx);
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
    (function reduce(node, level = 1) {
      if (level === keys.length) {
        Object.keys(node).forEach(k => node[k] = multiItem(node[k]));
      } else {
        Object.values(node).forEach(child => reduce(child, level + 1));
      }
    })(indexedResult); // IIFE
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
    })(indexedResult); //IIFE
  }

  return result;
}
