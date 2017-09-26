(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('MasterUrtugController', MasterUrtugController);

	function MasterUrtugController(MasterUrtugService, $uibModal, $document, toastr, EkinerjaService, $scope){
		var vm = this;

		EkinerjaService.checkCredential();
      	// EkinerjaService.checkRole($.parseJSON(sessionStorage.getItem('credential')).id);

		vm.data = true;

		vm.data_pegawai = {};
		vm.data_urtug = [];
		$scope.deskripsi;

		getUrtug();

		function getUrtug(){
			MasterUrtugService.GetAllUrtug().then(
				function(response){
					// vm.data_pegawai = response;
					vm.data_urtug = response;
					vm.dataLook = angular.copy(vm.data_urtug);
					paging();
					// debugger
				},function(errResponse){

				}
			)
		}

		$scope.$watch('deskripsi', function(){
			// console.log($scope.deskripsi.length)
			if($scope.deskripsi != undefined){
				vm.dataLook = EkinerjaService.searchByDeskripsi($scope.deskripsi, vm.data_urtug);
			}else {
				vm.dataLook = vm.data_urtug;
			}
			paging();
		})

		function showToastrSuccess(message) {
	      toastr.success('Data Uraian Tugas berhasil ' + message);

	    }

	    function showToastrFailed(message){
	    	toastr.error('Terjadi Kesalahan saat ' + message);

	    }

		vm.deleteUrtug = function(kd_urtug){
			MasterUrtugService.DeleteUrtugById(kd_urtug).then(
				function(response){
					showToastrSuccess('dihapus');
					getUrtug();
					// vm.data_pegawai = response;
					vm.data_urtug = response;
					// debugger
				},function(errResponse){
					showToastrFailed('menghapus data');
				}
			)
		}

		vm.edit = function(urtug){
			vm.open(urtug);
		}

		vm.open = function (items, parentSelector) {
	      // console.log(items);
	      var item = angular.copy(items);
	      var parentElem = parentSelector ? 
	        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
	      var modalInstance = $uibModal.open({
	        animation: true,
	        ariaLabelledBy: 'modal-title',
	        ariaDescribedBy: 'modal-body',
	        templateUrl: 'app/formMaster/urtug/formMasterUrtug.html',
	        controller: 'FormMasterUrtugController',
	        controllerAs: 'form_urtug',
	        windowClass: 'app-modal-window',
	        // size: size,
	        appendTo: parentElem,
	        resolve: {
	          items: function () {
	            return item;
	          }
	        }
	      });

	      modalInstance.result.then(function () {
	      	showToastrSuccess('ditambahkan');
			getUrtug();
	        // vm.selected = selectedItem;
	      }, function () {
	      	// showToastrFailed('menambahkan data');
	        // $log.info('Modal dismissed at: ' + new Date());
	      });
	    };

	    function paging(){ 
          $scope.filteredTodos = [];
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