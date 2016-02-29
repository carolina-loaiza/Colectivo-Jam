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

      var signed = function(file) {
        return $http.get('/bands/sign_s3?file_name='+file.name+'&file_type='+file.type);
      }

      var put = function(file, data){
        console.log(data.signed_request);
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", data.signed_request);
        xhr.setRequestHeader('x-amz-acl', 'public-read');
        xhr.onload = function() {
            if (xhr.status === 200) {
              console.log('di ok');
            }
        };
        xhr.onerror = function() {
            alert("Could not upload file."); 
        };
        xhr.send(file);
      }

      var public_api = {
        create : create,
        login : login,
        signed: signed,
        put: put
      };

      return public_api;
    }
})();