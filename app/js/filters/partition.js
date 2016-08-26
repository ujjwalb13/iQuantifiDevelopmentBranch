(function() {
  'use strict';
  angular.module('agera').filter('partition', function() {
    var cache, filter;
    cache = {};
    filter = function(arr, size) {
      var arrString, fromCache, i, newArr;
      if (!arr) {
        return;
      }
      newArr = [];
      i = 0;
      while (i < arr.length) {
        newArr.push(arr.slice(i, i + size));
        i += size;
      }
      arrString = JSON.stringify(arr);
      fromCache = cache[arrString + size];
      if (JSON.stringify(fromCache) === JSON.stringify(newArr)) {
        return fromCache;
      }
      cache[arrString + size] = newArr;
      return newArr;
    };
    return filter;
  });

}).call(this);

//# sourceMappingURL=partition.js.map
