'use strict';

(function() {

  angular
  .module('colectivo')
  .controller('MainController', MainController);

    function MainController(reqService) {
        var vm = this;
        vm.albumList;
        vm.filtered;
        vm.filterList = reqService.genresList;

        reqService.getAllAlbum()
        .success(function(data) {
            vm.albumList = data;
            vm.filtered = vm.albumList;
            console.log(data);
        })
        .error(function(err) {
            console.log(err);
        });

        vm.genreFilter = function(prop, value) {
            if(!prop || !value) {
                vm.filtered = vm.albumList;
                return;
            }
            
            vm.filtered = vm.albumList.filter(function(item) {

                for (var i = 0; i < item[prop].length; i++) {
                    var isTrue = item[prop][i].name === value;
                    if (isTrue) {
                        return isTrue;
                    };
                };
                

            });
        }
    }

})();
