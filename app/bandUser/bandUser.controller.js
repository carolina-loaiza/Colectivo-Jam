'use strict';

(function() {

  angular
  .module('colectivo')
  .controller('BandUserController', BandUserController);

    function BandUserController(reqService, $sessionStorage, $stateParams) {
      var vm = this;

      vm.datos = reqService.userData();
      console.log(vm.datos);

      vm.album = {};
      vm.listGenres = [];
      vm.listSongs = [];
      vm.files = {};
      vm.genres = reqService.genresList;

      vm.getFiles = function(files) {
        if (files.file.type === "audio/mp3") {
          vm.files.name = files.name;
          vm.files.link = "https://raw.githubusercontent.com/carolina-loaiza/Guayaba-Jam/blob/master/bandas/ave_negra/ave_negra/Ave%20Negra.mp3"
        }
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
        vm.album.song = vm.files;
        vm.album.cover = 'https://raw.githubusercontent.com/carolina-loaiza/Guayaba-Jam/master/bandas/las_robertas/cry_out_loud/cover.jpg';
        console.log(vm.album);

        reqService.createAlbum(vm.album)
        .then(function(response) {
          var ids = {
            id : vm.datos._id,
            album : response.data._id
          };
          console.log(ids);
          return reqService.addAlbum(ids);
        })
        .then(function(response) {
          var data = response.data;
          console.log(data);
          //$state.go(/)
        })
      }
    }
})();
