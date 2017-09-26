 (function(){
    'use strict';
    angular
    .module('eKinerja')
    .factory('MasterUrtugService',
    ['$http', 'API', '$q',
    function ($http, API, $q) {
        var service = {}; 
        service.GetUrtug = function (nip) {
            var deferred = $q.defer();
            $http.get(API + 'get-urtug-by-nip/' + nip).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetAllUrtug = function () {
            var deferred = $q.defer();
            $http.get(API + 'get-all-urtug/').then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.CreateUrtug = function (urtug) {
            var deferred = $q.defer();
            $http.post(API + 'create-urtug/', urtug).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.UpdateUrtug = function (urtug) {
            var deferred = $q.defer();
            $http.put(API + 'update-urtug/', urtug).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.DeleteUrtugById = function (kd_urtug) {
            var deferred = $q.defer();
            $http.delete(API + 'delete-urtug/' + kd_urtug).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };
 
        return service;
    }])
    /* jshint ignore:end */

})();
