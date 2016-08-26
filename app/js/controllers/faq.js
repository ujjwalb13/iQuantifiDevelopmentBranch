(function() {
  'use strict';
  angular.module('agera').controller('FaqCtrl', function($scope, $rootScope, faqService, ENV) {
    faqService.get().then(function(data) {
      $scope.faqs = _.groupBy(data, 'section');
      $scope.sections = _.keys($scope.faqs);
      return $scope.activeSection = $scope.sections[0];
    });
    $scope.toogleSection = function(section) {
      return $scope.activeSection = section;
    };
    return $scope.isActiveSection = function(section) {
      return section === $scope.activeSection;
    };
  });

}).call(this);

//# sourceMappingURL=faq.js.map
