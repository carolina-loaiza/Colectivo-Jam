'use strict';

(function() {

  angular
  .module('colectivo')
  .controller('NewBandController', NewBandController);

    function NewBandController ($timeout, $q, reqService) {
        var vm = this;
        
        vm.band = {};
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

        vm.add = function(band, social) {

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
            
            reqService.create(vm.band)
            .success(function(data) {
                console.log(data);
            })
            .error(function(err) {
                console.log(err);
            });
        };

        vm.readonly = false;
        vm.selectedItem = null;
        vm.searchText = null;
        vm.querySearch = querySearch;
        vm.vegetables = loadVegetables();
        vm.selectedVegetables = [];
        vm.numberChips = [];
        vm.numberChips2 = [];
        vm.numberBuffer = '';
        vm.chipSearch = chipSearch;

        /**
        * Search for vegetables.
        */
        function querySearch (query) {
            var results = query ? vm.vegetables.filter(createFilterFor(query)) : [];
            return results;
        }

        function chipSearch() {
            console.log("chipSearch");      
        }

        /**
        * Create filter function for a query string
        */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(vegetable) {
                return (vegetable._lowername.indexOf(lowercaseQuery) === 0) ||
                (vegetable._lowertype.indexOf(lowercaseQuery) === 0);
            };

        }

        function loadVegetables() {
            var veggies = [
                {
                    'name': 'Broccoli',
                    'type': 'Brassica'
                },
                {
                    'name': 'Cabbage',
                    'type': 'Brassica'
                },
                {
                    'name': 'Carrot',
                    'type': 'Umbelliferous'
                },
                {
                    'name': 'Lettuce',
                    'type': 'Composite'
                },
                {
                    'name': 'Spinach',
                    'type': 'Goosefoot'
                }
            ];

            return veggies.map(function (veg) {
                veg._lowername = veg.name.toLowerCase();
                veg._lowertype = veg.type.toLowerCase();
                return veg;
            });
        }
    }
})();
