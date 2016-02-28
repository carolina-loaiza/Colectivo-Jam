'use strict';

(function() {

  angular
  .module('colectivo')
  .controller('NewBandController', NewBandController);

    function NewBandController (reqService) {
        var vm = this;
        
        vm.band = {};

        function get_signed_request(file){
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "/sign_s3?file_name="+file.name+"&file_type="+file.type);
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        var response = JSON.parse(xhr.responseText);
                        console.log(file, response.signed_request, response.url);
                        //upload_file(file, response.signed_request, response.url);
                    }
                    else{
                        alert("Could not get signed URL.");
                    }
                }
            };
            xhr.send();
        }

        vm.add = function(band) {
            //
            var files = document.getElementById("file_input").files;
            var file = files[0];
            if(file == null){
                alert("No file selected.");
                return;
            }
            get_signed_request(file);

            //
            vm.band = angular.copy(band);
            console.log(vm.band);
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
