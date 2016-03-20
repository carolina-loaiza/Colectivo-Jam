'use strict';

(function() {

  angular
  .module('colectivo')
  .controller('NewBandController', NewBandController);

    function NewBandController ($scope, $sessionStorage, reqService, $location) {
        var vm = this;
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
            console.log(file);
        }

        vm.add = function(band, links) {
            vm.band = angular.copy(band);
            vm.band.links = angular.copy(links);
            vm.band.genres = vm.listGenres;
            vm.band.image = "https://raw.githubusercontent.com/carolina-loaiza/Guayaba-Jam/master/bandas/ni%C3%B1o_koi/photo.jpg";
            console.log(vm.band);
            /*
            reqService.signed(file)
            .success(function(data) {
                vm.band.url = data.url;
                reqService.create(vm.band)
                console.log(vm.band);
                reqService.put(file, data);
            })
            .error(function(err) {
                console.log(err);
            });
            
            */
            reqService.create(vm.band)
            .success(function(data) {
                console.log(data);
                reqService.sessionStorage(data);
            })
            .error(function(err) {
                console.log(err);
            });
            
        };
    }
})();