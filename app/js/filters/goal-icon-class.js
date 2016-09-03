(function() {
  'use strict';
  angular.module('agera').filter('goalIconClass', function() {
    return function(input) {
      if (input === 'baby') {
        return 'icon-gl-baby';
      }
      if (input === 'car') {
        return 'icon-gl-car';
      }
      if (input === 'college') {
        return 'icon-gl-college';
      }
      if (input === 'custom') {
        return 'icon-gl-custom-goal';
      }
      if (input === 'house') {
        return 'icon-gl-house';
      }
      if (input === 'purchase') {
        return 'icon-gl-purchase';
      }
      if (input === 'relocation') {
        return 'icon-gl-relocation';
      }
      if (input === 'rent') {
        return 'icon-gl-rent';
      }
      if (input === 'retirement') {
        return 'icon-gl-retirement';
      }
      if (input === 'ring') {
        return 'icon-gl-ring';
      }
      if (input === 'travel') {
        return 'icon-gl-travel';
      }
      if (input === 'wedding') {
        return 'icon-gl-wedding';
      }
      if (input === "downsizing") {
        return 'icon-gl-downsizing';
      }
      if (input === "CR1") {
        return 'icon-protection-achieved-1-lb';
      }
      if (input === "CR3") {
        return 'icon-protection-achieved-3-lb';
      }
      if (input === "CR6") {
        return 'icon-protection-achieved-6-lb';
      }
      if (input === "Monthly") {
        return 'icon-protection-dp-lb';
      }
    };
  });

}).call(this);

//# sourceMappingURL=goal-icon-class.js.map
