'use strict';

(function() {

  angular
  .module('colectivo')
  .controller('AlbumPageController', AlbumPageController);

    function AlbumPageController($stateParams, reqService) {
      var vm = this;
      vm.data;
      var param = $stateParams.album_name;
      reqService.getAlbum(param)
      .success(function(data) {
        vm.data = data;
      })
      .error(function(err) {
        var error = err;
      });

    }
})();