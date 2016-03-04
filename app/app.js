'use strict';

(function() {

  angular
  .module('colectivo', ['ngCookies', 'ngResource', 'ngSanitize', 'ui.router', 'ngStorage', 'ngMaterial'])
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
      .state('signup', {
        url: '/bands/signup',
        templateUrl: 'newBand/newBand.html',
        controller: 'NewBandController',
        controllerAs: 'newBand'
      })
      .state('album', {
        url: '/bands/album/new',
        templateUrl: 'newAlbum/newAlbum.html',
        controller: 'NewAlbumController',
        controllerAs: 'newAlbum'
      })
  });

})();