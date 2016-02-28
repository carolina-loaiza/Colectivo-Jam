'use strict';

(function() {

    angular
    .module('colectivo')
    .directive('mainNav', mainNav);

    function mainNav() {
        return {
            restrict: 'E',
            templateUrl: 'common/navbar/navbar.html',
            bindToController: true,
            controllerAs: 'nav',
            controller: 'NavbarController'
        };
    }

})();
