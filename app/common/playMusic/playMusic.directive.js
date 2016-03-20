'use strict';

(function() {

  angular
  .module('colectivo')
  .directive('playContainer', playContainer);

  function PlayController($sce){
    var vm = this;
    vm.btn = 'play_arrow';
    vm.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    }
    

    vm.play = function(button, ele) {
      if (button == 'play_arrow') {
        vm.btn = 'pause';
        audio.play();
      }else {
        vm.btn = 'play_arrow';
        audio.pause();
      }
    }
  }

  function playContainer() {
    return {
      restrict: 'E',
      templateUrl: 'common/playMusic/playMusic.html',
      scope: { data : '=' },
      bindToController: true,
      controllerAs: 'ctrlPlay',
      controller: PlayController
    };
  }
})();