'use strict';

(function() {

    angular
    .module('colectivo')
    .controller('NavbarController', NavbarController);

  function NavbarController(reqService, $location, $sessionStorage) {
    var vm = this;
    var header = document.getElementById('header');
    var loginForm = document.getElementById('login-form');
    vm.data = {};

    if ($sessionStorage.session) {
        vm.logIn = true;
        vm.islogged = true;
    }

    //Show Hide Login Form
    vm.showHide = function () {
        loginForm.classList.toggle('hidden');
        header.classList.toggle('nav-login-visible');
    }

    // Login Service Request
    vm.login = function(data) {
        vm.data = angular.copy(data);
        reqService.login(vm.data)
        .success(function(data) {
            vm.showHide();
            vm.logIn = true;
            vm.islogged = true;
            reqService.session(data);
        })
        .error(function(err) {
            console.log(err);
        });
    };

    // Log Out User
    vm.logOut = function() {
        location.reload();
        $sessionStorage.$reset();
    }
  }
})();