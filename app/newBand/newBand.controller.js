'use strict';

(function() {

  angular
  .module('colectivo')
  .controller('NewBandController', NewBandController);

    function NewBandController (reqService) {
        var vm = this;
        
        vm.band = {};

        vm.add = function(band) {
            vm.band = angular.copy(band);
            console.log("Form = " + vm.band);
            //----------------------//
            reqService.create(vm.band)
            .success(function(data) {
                console.log(data);
            })
            .error(function(err) {
                console.log(err);
            });
        };
    }

})();
