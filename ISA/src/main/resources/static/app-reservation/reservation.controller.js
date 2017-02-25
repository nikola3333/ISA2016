(function(){
	'use strict';
	
	angular
	.module('app')
	.controller('ReservationController',ReservationController);
	
	ReservationController.$inject = ['$location','$rootScope','ReservationService','AuthenticationService','$timeout']
	
	function ReservationController($location,$rootScope,ReservationService,AuthenticationService,$timeout){
		var vm = this;
		vm.selectedRestaurant = undefined;
		vm.reservationDate = undefined;
		vm.selectedTables = [];
	    vm.reservedDate =undefined; 		
	    vm.stayTime = undefined;		
		
		vm.getNumber = getNumber;
		vm.getTableOznaka = getTableOznaka;
		vm.rowCheckNumberOfTables = rowCheckNumberOfTables;
		vm.addToSelected = addToSelected;
		vm.checkIfAdded = checkIfAdded;
		vm.removeFromSelected = removeFromSelected;
		(function getSelectedRestaurant(){
			ReservationService.getSelectedRestaurant().
			then(function(httpData){
				vm.selectedRestaurant = httpData.data;
			},
			function(httpData){
				console.log(httpData.data.message)
			})
		})();
        (function () {
            $('#datetimepicker1').datetimepicker();
            $('#datetimepicker3').datetimepicker({
                format: 'LT'
            });
        })();
        
        function getTableOznaka(regionIndex,row,col){
        	var rez = undefined;
        		var reg = vm.selectedRestaurant.regions[regionIndex];
        		for(var j = 0; j < reg.tables.length;j++){
        			var table = reg.tables[j];
	        		if(table.colNum== col && table.rowNum == row){
	        			rez = table.oznakaStola;
	        		}
        		}
        	return rez;
        }
        function getNumber(num) {
        	var niz = [];
        	for(var i = 1; i <= num; i++){
        		niz.push(i);
        	}
            return niz;   
        }
        function rowCheckNumberOfTables(regionIndex,row){
        	var reg = vm.selectedRestaurant.regions[regionIndex];
        	for(var j = 0; j < reg.tables.length;j++){
        		var table = reg.tables[j];
        		if(table.rowNum == row)
        			return true;
        	}
        	return false;
        }
        function addToSelected(regionIndex,row,col){
        	var rez = undefined;
    		var reg = vm.selectedRestaurant.regions[regionIndex];
    		for(var j = 0; j < reg.tables.length;j++){
    			var table = reg.tables[j];
        		if(table.colNum== col && table.rowNum == row){
        			vm.selectedTables.push(table);
        		}
    		}
        }
        function checkIfAdded(regionIndex,row,col){
        	var rez = undefined;
        	var t = {};
    		var reg = vm.selectedRestaurant.regions[regionIndex];
    		for(var j = 0; j < reg.tables.length;j++){
    			var table = reg.tables[j];
        		if(table.colNum== col && table.rowNum == row){
        			t = table;
        		}
    		}
    		for(var i = 0; i < vm.selectedTables.length;i++){
    			var table = vm.selectedTables[i];
    			if(t.id == table.id)
    				return true;
    		}
    		return false;
        }
        function removeFromSelected(index){
        	vm.selectedTables.splice(index,1);
        }
        $("#datetimepicker1").on('dp.change',function(e){
        	vm.reservationData = e.date;
        })
        $("#datetimepicker3").on('dp.change',function(e){
        	
        	var date = new Date(e.date);
        	alert(date);

        })
	}
})();