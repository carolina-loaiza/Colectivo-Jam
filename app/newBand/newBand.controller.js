'use strict';

(function() {

  angular
  .module('colectivo')
  .controller('NewBandController', NewBandController);

    function NewBandController (reqService) {
        var vm = this;
        
        vm.band = {};

        vm.add = function(band, social) {
            // If file exist
            var files = document.getElementById("file_input").files;
            var file = files[0];
            if(file == null){
                alert("No file selected.");
                return;
            }

            vm.band = angular.copy(band);
            vm.band.social = angular.copy(social);
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
            /*
            reqService.create(vm.band)
            .success(function(data) {
                console.log(data);
            })
            .error(function(err) {
                console.log(err);
            });
            */
        };
    }

})();
