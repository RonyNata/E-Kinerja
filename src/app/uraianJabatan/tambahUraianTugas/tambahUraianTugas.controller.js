(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('TambahUraianController', TambahUraianController);

    
    function TambahUraianController(EkinerjaService, $scope, items, urtug, used_urtug, PengumpulanDataBebanKerjaService, $uibModalInstance) {
      	var vm = this;

      	vm.data_urtug = urtug;
      	vm.urtug_selected = angular.copy(used_urtug);
      	$scope.searchName = '';
      	vm.dataLook = angular.copy(urtug);
      	paging();

      	vm.onClick = function(urtg){
      		if(urtg.selected){
      			var newUrtug = {
      				"kdUrtug": angular.copy(urtg.kdUrtug)
      			}
      			vm.urtug_selected.push(newUrtug);
      		}
      		else
				vm.urtug_selected.splice(
					PengumpulanDataBebanKerjaService.FindIndex(vm.urtug_selected, urtg.kdUrtug), 1);
	      		// console.log(JSON.stringify(vm.data_urtug.findIndex(x => x.kdUrtug==urtg.kdUrtug)));
      			
      	}

      	$scope.$watch('searchName', function(){
			if($scope.searchName != '')
				vm.dataLook = EkinerjaService.searchByDeskripsi($scope.searchName, vm.data_urtug);
			else vm.dataLook = vm.data_urtug;
			// debugger
			paging();
		})

      	vm.save = function setUrtugAndJabatan(){
      		
      		items.kdUraianTugasList = vm.urtug_selected;
      		// console.log(JSON.stringify(items));
      		PengumpulanDataBebanKerjaService.SetUrtugAndJabatan(items).then(
      			function(response){
      				$uibModalInstance.close();
      			},function(errResponse){

      			}
      		)
      	}

      	vm.cancel = function () {
	      $uibModalInstance.dismiss('cancel');
	    };

	    $scope.myCallback = function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {            
            $('td:eq(2)', nRow).bind('click', function() {
                $scope.$apply(function() {
                    $scope.someClickHandler(aData);
                });
            });
            return nRow;
        };

        $scope.someClickHandler = function(info) {
            $scope.message = 'clicked: '+ info.price;
        };

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
    
        $scope.columnDefs = [ 
            { "mDataProp": "deskripsi", "aTargets":[0]},
            { "mDataProp": "satuan", "aTargets":[1] },
            { "mDataProp": "volumeKerja", "aTargets":[2] },
            { "mDataProp": "normaWaktu", "aTargets":[3] },
            { "mDataProp": "bebanKerja", "aTargets":[4] },
            { "mDataProp": "peralatan", "aTargets":[5] },
            { "mDataProp": "keterangan", "aTargets":[6] }
        ]; 
        
        $scope.overrideOptions = {
            "bStateSave": true,
            "iCookieDuration": 2419200, /* 1 month */
            "bJQueryUI": true,
            "bPaginate": true,
            "bLengthChange": false,
            "bFilter": true,
            "bInfo": true,
            "bDestroy": true
        };
    
       
        $scope.sampleProductCategories = urtug;
   	} 
})();