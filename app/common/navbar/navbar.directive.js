'use strict';

(function() {

    angular
    .module('colectivo')
    .directive('mainNav', mainNav);

    function mainNav($location) {
        return {
            restrict: 'E',
            templateUrl: 'common/navbar/navbar.html',
            bindToController: true,
            controllerAs: 'nav',
            controller: 'NavbarController',
            link: function(scope) {
                scope.isCurrentPath = function(path) {
                    return $location.path() == path;
                };
            }
        };
    }

})();
