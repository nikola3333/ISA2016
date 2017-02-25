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
		vm.staySelected = false;
		vm.reservedTimeSelected = false;
	    vm.tablesStatus = [];
	    vm.tableView = false;
		vm.getNumber = getNumber;
		vm.getTableOznaka = getTableOznaka;
		vm.rowCheckNumberOfTables = rowCheckNumberOfTables;
		vm.addToSelected = addToSelected;
		vm.checkIfAdded = checkIfAdded;
		vm.removeFromSelected = removeFromSelected;
		vm.showTables = showTables;
		vm.checkIfReserved = checkIfReserved;
		vm.getStatus = getStatus;
		
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
        $("#datetimepicker1").on('dp.change',function(e){
        	vm.reservedDate =new Date (e.date);
        	var current = new Date();
        	if(vm.reservedDate.getTime() >= current.getTime())
        		vm.reservedTimeSelected = true

        })
        $("#datetimepicker3").on('dp.change',function(e){
        	vm.stayTime = new Date(e.date);
        	var current = new Date();
        	if(vm.stayTime.getTime() > current.getTime())
        		vm.staySelected = true;
        	//alert(date);
        })
        
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
        
        function showTables(){
        	var dates = []
        	dates.push(vm.reservedDate);
        	dates.push(vm.stayTime);
        	ReservationService.sendDate(dates)
        	.then(function(httpData){
        		vm.stayTime = new Date(httpData.data);
        		alert(vm.stayTime);
        		vm.tableView = true;
        	},
        	function(httpData){
        		console.log(httpData.data.message);
        	})
        }
        
        function checkIfReserved(regionIndex,row,col){
        	var reg = vm.selectedRestaurant.regions[regionIndex];
        	var t = null;
        	var rez = true;
    		for(var j = 0; j < reg.tables.length;j++){
    			var table = reg.tables[j];
        		if(table.colNum== col && table.rowNum == row){
        			t = table;
        		}
    		}
    		if(t != null)
	        	ReservationService.checkIfReserved(t.id)
	        	.then(function(httpData){
	        		vm.tablesStatus.push({id:t.id,value: httpData.data})
	        	},
	        	function(httpData){
	        		console.log(httpData.data.message)
	        	})
        }
        
        function getStatus(regionIndex,row,col){
        	var rez = undefined;
        	var t = null;
    		var reg = vm.selectedRestaurant.regions[regionIndex];
    		for(var j = 0; j < reg.tables.length;j++){
    			var table = reg.tables[j];
        		if(table.colNum== col && table.rowNum == row){
        			t = table;
        		}
    		}
    		if(t != null)
	    		for(var i = 0; i < vm.tablesStatus.length;i++){
	    			var tableStatus = vm.tablesStatus[i];
	    			if(tableStatus.id == t.id)
	    				return tableStatus.value;
	    		}
    		return false;
        }        	

	}
})();