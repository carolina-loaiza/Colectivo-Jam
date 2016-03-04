'use strict';

(function() {

  angular
  .module('colectivo')
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('grey')
      .dark();
  });

})();