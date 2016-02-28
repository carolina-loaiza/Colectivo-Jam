'use strict';

//Api service

;(function() {
  
  angular
    .module('colectivo')
    .service('reqService', reqService);

    function reqService($http){

      var create = function(band){
        return $http.post('/bands/add', band);
      }

      var login = function(submit){
        return $http.post('/bands/login', submit);
      }

      var public_api = {
        create : create,
        login : login
      };

      return public_api;
    }
})();