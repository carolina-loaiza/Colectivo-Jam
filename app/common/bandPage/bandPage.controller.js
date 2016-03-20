'use strict';

(function() {

  angular
  .module('colectivo')
  .controller('BandPageController', BandPageController);

    function BandPageController ($stateParams, reqService) {
      var vm = this;
      
      var param = $stateParams.band_name
      vm.data = reqService.getBand(param)
      .success(function(data) {
        vm.data = data;
      })
      .error(function(err) {
        console.log(err);
      });
    }
})();