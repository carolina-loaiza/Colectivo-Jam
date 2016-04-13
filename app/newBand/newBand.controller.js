'use strict';

(function() {

  angular
  .module('colectivo')
  .controller('NewBandController', NewBandController);

    function NewBandController (Upload, $sessionStorage, reqService, $location) {
        var vm = this;
        var reader  = new FileReader();
        var bandImage;
        vm.band = {};
        vm.listGenres = [];
        vm.genres = reqService.genresList;

        vm.getGenres = function(input) {
            reqService.listArray(input, vm.listGenres)
            vm.customChoose = '';
        }

        vm.deleteGender = function(item) {
            reqService.deleteFromList(item, vm.listGenres);
        }

        vm.file = function(file) {
            var image = file.file
            Upload.upload({
                url: '/bands/images',
                file: image
            })
            .success(function(data) {
                bandImage = data;
                bandImage = bandImage.substring(49);
            });
        }

        vm.add = function(band, links) {
            vm.band = angular.copy(band);
            vm.band.links = angular.copy(links);
            vm.band.genres = vm.listGenres;
            vm.band.image = bandImage;

            reqService.create(vm.band)
            .success(function(data) {
                reqService.sessionStorage(data);
            })
            .error(function(err) {
                var error = err;
            });
            
        };
    }
})();