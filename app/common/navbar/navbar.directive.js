'use strict';

(function() {

    angular
    .module('colectivo')
    .directive('mainNav', mainNav);

    function mainNav() {
        return {
            templateUrl: 'common/navbar/navbar.html',
            bindToController: true,
            controllerAs: 'nav',
            controller: 'NavbarController'
        };
    }

})();
