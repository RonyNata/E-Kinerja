(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('PengumpulanDataBebanKerjaController', PengumpulanDataBebanKerjaController);

    function PengumpulanDataBebanKerjaController(PengumpulanDataBebanKerjaService, $uibModal, $document, $scope, EkinerjaService) {
      var vm = this;

      EkinerjaService.checkCredential();
      // EkinerjaService.checkRole($.parseJSON(sessionStorage.getItem('credential')).id);

      vm.list_jabatan = [];
      vm.list_available_urtug = [];
      vm.list_used_urtug = [];
      $scope.jabatan = '';
      $scope.searchName = '';
      vm.jabatan;

      getAllJabatanByUnitKerja();
      // getUrtugByJabatan();

      $scope.$watch('jabatan', function(){
      	if($scope.jabatan.length == 8 || $scope.jabatan.length == 7){
      		findJabatan();
      		getUrtugByJabatan();
      	}
      });

      function getAllJabatanByUnitKerja(){
      	console.log(sessionStorage.getItem('credential'));
      	vm.loading = true;
      	PengumpulanDataBebanKerjaService.GetAllJabatanByUnitKerja($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja).then(
      		function(response){
      			vm.list_jabatan = response;
      			vm.loading = false;
      			debugger
      		}, function(errResponse){

      		}
      	);
      }

      function findJabatan(){
      	vm.jabatan = 
      		EkinerjaService.findJabatanByKdJabatan($scope.jabatan, vm.list_jabatan);
      		// debugger
      }

      function getUrtugByJabatan(){
      	PengumpulanDataBebanKerjaService.GetUrtugByJabatan($scope.jabatan).then(
      		function(response){
      			if(response.jabatanUraianTugasList == undefined)
      				vm.list_used_urtug = [];
      			else vm.list_used_urtug = response.jabatanUraianTugasList;
      			vm.list_available_urtug = response.notJabatanUraianTugasList;
      			vm.dataLook = vm.list_used_urtug;
      			paging();
      			// console.log(JSON.stringify(PengumpulanDataBebanKerjaService.SetDataUrtug(vm.list_used_urtug, vm.list_available_urtug)));
      		}, function(errResponse){

      		}
      	)
      }

      vm.open = function (items, parentSelector) {
	      // console.log(items);
	      var item = {
	      	"kdJabatan": $scope.jabatan,
	      	"kdUraianTugasList": [],
	      	"createdBy": $.parseJSON(sessionStorage.getItem('credential')).nipPegawai
	      };
	      var parentElem = parentSelector ? 
	        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
	      var modalInstance = $uibModal.open({
	        animation: true,
	        ariaLabelledBy: 'modal-title',
	        ariaDescribedBy: 'modal-body',
	        templateUrl: 'app/uraianJabatan/tambahUraianTugas/tambahUraianTugas.html',
	        controller: 'TambahUraianController',
	        controllerAs: 'form_urtug_jabatan',
	        // windowClass: 'app-modal-window',
	        size: 'lg',
	        appendTo: parentElem,
	        resolve: {
	          items: function () {
	            return item;
	          },
	          urtug: function(){
	          	return PengumpulanDataBebanKerjaService.SetDataUrtug(vm.list_used_urtug, vm.list_available_urtug);
	          },
	          used_urtug: function(){
	          	return vm.list_used_urtug;
	          }
	        }
	      });

	      modalInstance.result.then(function () {
	      	// showToastrSuccess('ditambahkan');
	      	getUrtugByJabatan();
	        // vm.selected = selectedItem;
	      }, function () {
	      	// showToastrFailed('menambahkan data');
	        // $log.info('Modal dismissed at: ' + new Date());
	      });
	    };

	    $scope.$watch('searchName', function(){
			if($scope.searchName != '')
				vm.dataLook = EkinerjaService.searchByDeskripsi($scope.searchName, vm.list_used_urtug);
			else vm.dataLook = vm.list_used_urtug;
			// debugger
			paging();
		})

	    function paging(){ 
	          $scope.filteredData = [];
	          $scope.currentPage = 0;
	          $scope.numPerPage = 5;
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
   } 
})();