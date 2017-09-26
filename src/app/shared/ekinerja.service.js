 (function(){
    'use strict';
    angular
    .module('eKinerja')
    .service('EkinerjaService',
    ['$state', 'toastr',
    function ($state, toastr) {
        var service = {}; 
        
        service.checkCredential = function(){
            if(sessionStorage.getItem('credential') == undefined)
                $state.go('home');
        }

        service.checkRole = function(role){
            switch(role){
                case 'AD001' : $state.go('master-urtug'); break;
                case 'AD002' : $state.go('urtug-jabatan'); break;
                case 'AD003' : $state.go('kontrak'); break;
            }
        }

        service.logout = function(){
            // console.log(123);
            sessionStorage.removeItem('credential');
            $state.reload();
        }

        service.searchByName = function(name, array){
            var result = [];
            for(var i = 0; i<array.length; i++){
                if (array[i].nama.toLowerCase().search(name.toLowerCase()) != -1){
                    result.push(array[i]); debugger
                } 
            }
            debugger
            return result;
        }

        service.searchByNip = function(nip, array){
            var result = [];
            for(var i = 0; i<array.length; i++){
                if (array[i].nipPegawai.search(nip) != -1){
                    result.push(array[i]);
                } 
            }
            return result;
        }

        service.searchByDeskripsi = function(name, array){
            var result = [];
            for(var i = 0; i<array.length; i++){
                if (array[i].deskripsi.toLowerCase().search(name.toLowerCase()) != -1){
                    result.push(array[i]);
                } 
            }
            return result;
        }

        service.showToastrSuccess = function(message) {
          toastr.success(message);

        }

        service.showToastrError = function(message) {
          toastr.error(message);

        }

        service.findJabatanByKdJabatan = function(kdJabatan, array){
            for(var i = 0; i<array.length; i++){
                if (array[i].kdJabatan.search(kdJabatan) != -1){
                    return array[i]; break;
                } 
            }
        }

        service.searchByAktivitas = function(aktivitas, array){
            var result = [];
            for(var i = 0; i<array.length; i++){
                if (array[i].namaUrtug.toLowerCase().search(aktivitas.toLowerCase()) != -1){
                    result.push(array[i]);
                } 
            }
            return result;
        }

        service.IndonesianDateFormat = function(date){
            var month = ['Januari', 'February', 'Maret', 'April', 'Mei', 'Juni', 
                            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
            var result = date.getDate().toString() + ' ' + month[date.getMonth()] + ' ' + 
                            (1900 + date.getYear()).toString();
            return result;
        }
 
        return service;
    }])
    /* jshint ignore:end */

})();
