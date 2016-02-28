'use strict';

(function() {

    angular
    .module('colectivo')
    .directive('mainFooter', function() {
        return {
          templateUrl: 'common/footer/footer.html',
          restrict: 'E',
          link: function(scope, element) {
            element.addClass('footer');
          }
        };
    });

})();
