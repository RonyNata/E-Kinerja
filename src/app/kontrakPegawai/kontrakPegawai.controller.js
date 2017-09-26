(function() {
'use strict';
 
angular.
    module('eKinerja')
    .controller('KontrakPegawaiController', KontrakPegawaiController);

    function KontrakPegawaiController(KontrakPegawaiService, EkinerjaService, $scope) {
      var vm = this;

      EkinerjaService.checkCredential();
      // EkinerjaService.checkRole($.parseJSON(sessionStorage.getItem('credential')).id);

      vm.list_urtug = [];
      vm.pegawai = $.parseJSON(sessionStorage.getItem('credential'));

      getUrtugByJabatan();
      // getUrtugByJabatan();

      function getUrtugByJabatan(){
        KontrakPegawaiService.GetUrtugByJabatan(vm.pegawai.kdJabatan).then(
          function(response){
            vm.list_urtug = response;
            vm.dataLook = response;
            paging();
            // debugger
          }, function(errResponse){

          }
        )
      }

      function paging(){ 
        $scope.filteredData = [];
        $scope.currentPage = 0;
        $scope.numPerPage = 10;
        $scope.maxSize = Math.ceil(vm.dataLook.length/$scope.numPerPage);
        function page(){
          $scope.page = [];
          for(var i = 0; i < vm.dataLook.length/$scope.numPerPage; i++){
              $scope.page.push(i+1);
          }
        }
        page();
        $scope.pad = function(i){
          $scope.currentPage += i;
        }

        $scope.max = function(){
          if($scope.currentPage >= $scope.maxSize - 1)
              return true;
          else return false;
        }

        $scope.$watch("currentPage + numPerPage", function() {
          var begin = (($scope.currentPage) * $scope.numPerPage)
          , end = begin + $scope.numPerPage;

          $scope.filteredData = vm.dataLook.slice(begin, end);
        });
      }

      $scope.$watch('searchName', function(){
        if($scope.searchName != '')
          vm.dataLook = EkinerjaService.searchByDeskripsi($scope.searchName, vm.list_urtug);
        else vm.dataLook = vm.list_urtug;
        // debugger
        paging();
      })
   } 
})();