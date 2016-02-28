'use strict';

(function() {

  angular
  .module('colectivo', ['ngCookies', 'ngResource', 'ngSanitize', 'ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
    .otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('main.login', {
        url: '/bands/login',
        templateUrl: 'login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .state('signup', {
        url: '/bands/signup',
        templateUrl: 'newBand/newBand.html',
        controller: 'NewBandController',
        controllerAs: 'newBand'
      })
      .state('edit', {
        url: '/bands/album/edit',
        templateUrl: 'editAlbum/editAlbum.html',
        controller: 'EditAlbumController',
        controllerAs: 'editAlbum'
      })
  });

})();