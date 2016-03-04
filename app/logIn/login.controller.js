'use strict';

(function() {

  angular
  .module('colectivo')
  .controller('LoginController', LoginController);

    function LoginController (reqService) {
        var vm = this;
        
        vm.data = {};

        vm.submit = function(data) {
            vm.data = angular.copy(data);
            //----------------------//
            reqService.login(vm.data)
            .success(function(data) {
                console.log(data);
                //$sessionStorage.set('session', data)
            })
            .error(function(err) {
                console.log(err);
            });
        };
    }

})();
