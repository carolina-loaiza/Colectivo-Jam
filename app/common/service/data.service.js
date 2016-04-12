'use strict';

//Api service

;(function() {
  
  angular
    .module('colectivo')
    .service('reqService', reqService);

    function reqService($state, $http, $sessionStorage){

      var user_data;

      var genresList = [
        {name:'rock'},
        {name:'punk'},
        {name:'pop'},
        {name:'garage'},
        {name:'metal'},
        {name:'classical'},
        {name:'ambient'},
        {name:'electronic'},
        {name:'romantic'},
        {name:'rock & roll'}
      ]

      var sessionStorage = function(data) {
        $sessionStorage.session = data;
        var name = data.name.replace(/\s+/g, '-').toLowerCase();
        $state.go('bandUser', {band_name : name});
      }

      var userData = function() {
        if ($sessionStorage.session) {
          return user_data = $sessionStorage.session;
        }else {
          return user_data = {};
        }
      }

      var listArray = function(input, array) {
        var newSong = input;
        if (typeof newSong == 'string') {
          newSong = {name: newSong}
        }
        array.push(newSong);
      }

      var deleteFromList = function(item, array) {
        array.splice(array.indexOf(item), 1);
      }

      var create = function(band){
        return $http.post('/bands/add', band);
      }

      var uploadImage = function(file) {
        return $http.post('/bands/images', file);
      }

      var login = function(submit){
        return $http.post('/bands/login', submit);
      }

      var createAlbum = function(album){
        return $http.post('/bands/album/new', album);
      }

      var addAlbum = function(ids) {
        return $http.post('/bands/add/album', ids);
      }

      var getBand = function(band){
        return $http.get('/bands/'+band);
      }

      var getAlbum = function(album){
        return $http.get('/bands/album/'+album);
      }

      var getAllAlbum = function(){
        return $http.get('/bands/all/albums');
      }
      
      var public_api = {
        getBand: getBand,
        getAlbum: getAlbum,
        getAllAlbum: getAllAlbum,
        genresList : genresList,
        listArray : listArray,
        deleteFromList : deleteFromList,
        create : create,
        userData: userData,
        sessionStorage : sessionStorage,
        addAlbum: addAlbum,
        createAlbum : createAlbum,
        login : login,
        uploadImage: uploadImage
      };

      return public_api;
    }
})();