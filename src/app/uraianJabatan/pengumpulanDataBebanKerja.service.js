(function(){
    'use strict';
    angular
    .module('eKinerja')
    .factory('PengumpulanDataBebanKerjaService',
    ['$http', 'API', '$q',
    function ($http, API, $q) {
        var service = {}; 
        service.GetAllJabatan = function () {
            var deferred = $q.defer();
            // debugger
            $http.get(API + 'get-jabatan-list/').then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetAllJabatanByUnitKerja = function (kdUnit) {
            var deferred = $q.defer();
            // debugger
            $http.get(API + 'get-jabatan-by-unit-kerja/' + kdUnit).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetUrtugByJabatan = function (kdJabatan) {
            var deferred = $q.defer();
            $http.get(API + 'get-uraian-tugas-by-jabatan/' + kdJabatan).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.SetUrtugAndJabatan = function(urtugJabatan){
          var deferred = $q.defer();
            $http.post(API + 'add-uraian-tugas-jabatan/', urtugJabatan).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;  
        }

        service.SetDataUrtug = function(used_urtug, available_urtug){
            var urtug = angular.copy(available_urtug);
            for(var i = 0; i < used_urtug.length; i++){
                used_urtug[i].selected = true;
                urtug.unshift(angular.copy(used_urtug[i]));
            }
            return urtug;
        }

        service.FindIndex = function(array, id){
            var index = -1;
            for(var i = 0; i < array.length; i++){
                if(array[i].kdUrtug == id){
                    index = i;
                    break;
                }
            }
            return index;
        }
 
        return service;
    }])
    /* jshint ignore:end */

})();
