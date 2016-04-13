'use strict';

(function() {

  angular
  .module('colectivo')
  .controller('BandUserController', BandUserController);

    function BandUserController(Upload, reqService, $sessionStorage, $stateParams) {
      var vm = this;
      var coverAlbum;
      var files = {};

      vm.datos = reqService.userData();

      vm.album = {};
      vm.listGenres = [];
      vm.listSongs = [];
      vm.genres = reqService.genresList;

      vm.getFiles = function(file) {
        //
        files.name = "File Audio";
        files.link = "https://raw.githubusercontent.com/carolina-loaiza/Guayaba-Jam/blob/master/bandas/ave_negra/ave_negra/Ave%20Negra.mp3"
        //
        var image = file.file
        Upload.upload({
          url: '/bands/images',
          file: image
        })
        .success(function(data) {
          coverAlbum = data;
          coverAlbum = coverAlbum.substring(49)
        });
      }

      vm.getListSongs = function(input) {
        reqService.listArray(input, vm.listSongs)
        vm.newSong = '';
      }

      vm.getGenres = function(input) {
        reqService.listArray(input, vm.listGenres)
        vm.customChoose = '';
      }

      vm.deleteGender = function(item) {
        reqService.deleteFromList(item, vm.listGenres);
      }

      vm.deleteSong = function(item) {
        reqService.deleteFromList(item, vm.listSongs);
      }

      vm.add = function(album, links) {
        vm.album = angular.copy(album);
        vm.album.genres = vm.listGenres;
        vm.album.tracks = vm.listSongs;
        vm.album.owner = vm.datos._id;
        vm.album.song = files;
        vm.album.cover = coverAlbum;

        reqService.createAlbum(vm.album)
        .then(function(response) {
          var ids = {
            id : vm.datos._id,
            album : response.data._id
          };
          return reqService.addAlbum(ids);
        })
        .then(function(response) {
          var data = response.data;
        })
      }
    }
})();
