'use strict';

(function() {

  angular
  .module('colectivo', ['ngResource', 'ui.router', 'ngStorage', 'flow'])
  .config(function($stateProvider, $urlRouterProvider, $sceProvider) {
    $sceProvider.enabled(false);

    $urlRouterProvider
    .otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'main/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        data: {
          requireLogin: false
        }
      })
      .state('bandPage', {
        url: '/bands/:band_name',
        controller: 'BandPageController',
        controllerAs: 'band',
        templateUrl: 'common/bandPage/bandPage.html',
        data: {
          requireLogin: false
        }
      })
      .state('albumPage', {
        url: '/bands/album/:album_name',
        controller: 'AlbumPageController',
        controllerAs: 'album',
        templateUrl: 'common/albumPage/albumPage.html',
        data: {
          requireLogin: false
        }
      })
      .state('signup', {
        url: '/band/signup',
        templateUrl: 'newBand/newBand.html',
        controller: 'NewBandController',
        controllerAs: 'newBand',
        data: {
          requireLogin: false
        }
      })
      .state('bandUser', {
        url: '/bands/edit/:band_name',
        templateUrl: 'bandUser/bandUser.html',
        controller: 'BandUserController',
        controllerAs: 'bandUser',
        data: {
          requireLogin: true
        }
      })
  }).run(function($rootScope, $sessionStorage, $state) {

    $rootScope.$on('$viewContentLoaded', function(values) {
      componentHandler.upgradeAllRegistered();
    });

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;
    
      if (requireLogin && $sessionStorage.session === undefined) {
        event.preventDefault();
        $state.go('main')
      }
    });
  });
})();