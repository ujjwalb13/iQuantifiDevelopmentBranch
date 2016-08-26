(function() {
  'use strict';
  angular.module('agera').factory('configService', function() {
    var configService;
    return configService = {
      growthRate: 0.08,
      timeout: 30000,
      colors: ['#19bdc4', '#766dcd', '#9b59b6', '#e67e22', '#1bce84', '#e16250'],
      color: function(index) {
        return this.colors[index % this.colors.length];
      }
    };
  });

}).call(this);

//# sourceMappingURL=config.js.map
