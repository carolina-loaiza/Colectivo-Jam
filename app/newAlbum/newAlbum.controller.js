'use strict';

(function() {

  angular
  .module('colectivo')
  .controller('NewAlbumController', NewAlbumController);

    function NewAlbumController ($timeout, $q, reqService, $sessionStorage) {
        var vm = this;
        
        vm.album = {};
        /*
        vm.imageFile; 

        var image = document.getElementById("file_input");

        image.onchange = function(){
            var files = image.files;
            var file = files[0];
            var preview = document.getElementById("file_image");
            var reader  = new FileReader();

            reader.addEventListener("load", function () {
                preview.src = reader.result;
            }, false)

            if (file) {
                reader.readAsDataURL(file);
                vm.imageFile = file;
            }
        }
        */
        vm.add = function(album) {

            vm.album = angular.copy(album);
            //vm.album.social = angular.copy(social);
            console.log(vm.album);
            var session = $sessionStorage.session;
            /*
            reqService.signed(file)
            .success(function(data) {
                vm.album.url = data.url;
                reqService.create(vm.album)
                console.log(vm.album);
                reqService.put(file, data);
            })
            .error(function(err) {
                console.log(err);
            });
            */
            
            reqService.createAlbum(vm.album)
            .success(function(data) {
                var ids = {
                    id : session._id,
                    album: data._id
                }
                console.log(ids);
                reqService.addAlbum(ids)
                .success(function(data) {
                    console.log(data);
                })
                .error(function(err) {
                    console.log(err);
                });
            })
            .error(function(err) {
                console.log(err);
            });
        };
    }
})();
