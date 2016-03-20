'use strict';

(function() {

  angular
  .module('colectivo')
  .controller('AlbumPageController', AlbumPageController);

    function AlbumPageController($stateParams, reqService) {
      var vm = this;
      vm.data;
      var param = $stateParams.album_name;
      console.log(param);
      reqService.getAlbum(param)
      .success(function(data) {
        vm.data = data;
        console.log(data);
      })
      .error(function(err) {
        console.log(err);
      });

    }
})();