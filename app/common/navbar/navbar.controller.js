'use strict';

(function() {

    angular
    .module('colectivo')
    .controller('NavbarController', NavbarController);

  function NavbarController($scope, $state, $rootScope, reqService, $location, $sessionStorage) {
    var vm = this;
    vm.bandData = {};
    
    vm.bandName;

    $scope.$watch(function(){
      return $sessionStorage.session
    }, function (users) {
        if (users) {
            vm.bandName = users.name;
        };
    })

    // Login Service Request
    vm.login = function(data) {
        vm.bandData = angular.copy(data);
        reqService.login(vm.bandData)
        .success(function(data) {
            vm.isActive = false;
            reqService.sessionStorage(data);
        })
        .error(function(err) {
            console.log(err);
            vm.invalid = true;
        });
    };

    // Log Out User
    vm.logOut = function() {
        vm.bandName = undefined;
        $sessionStorage.$reset();
        $state.go('main');
    }
  }
})();