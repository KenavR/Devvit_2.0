const Utils = (function initUtils(window, document) {
  function convertNodeListToArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
  }

  function convertClassListToArray(classList) {
    var array = [];
    for (var i = classList.length >>> 0; i--; ) {
      array[i] = classList[i];
    }
    return array;
  }

  return {
    convertNodeListToArray,
    convertClassListToArray
  };
})(window, document);
