(function(){
	'use strict';
	
	angular
	.module('app')
	.controller('ReservationController',ReservationController);
	
	ReservationController.$inject = ['$location','$rootScope','ReservationService','AuthenticationService','$timeout','GuestService']
	
	function ReservationController($location,$rootScope,ReservationService,AuthenticationService,$timeout,GuestService){
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
	    vm.reservation = $rootScope.reservation;
		vm.friends = [];
		vm.searchCondition;
	    
		vm.getNumber = getNumber;
		vm.getTableOznaka = getTableOznaka;
		vm.rowCheckNumberOfTables = rowCheckNumberOfTables;
		vm.addToSelected = addToSelected;
		vm.checkIfAdded = checkIfAdded;
		vm.removeFromSelected = removeFromSelected;
		vm.showTables = showTables;
		vm.checkIfReserved = checkIfReserved;
		vm.getStatus = getStatus;
		vm.getTable = getTable;
		vm.confirmReservation = confirmReservation;
		vm.getDateFromReservation = getDateFromReservation;
		vm.searchFriends = searchFriends;
		vm.inviteFriend = inviteFriend;
		
		(function getSelectedRestaurant(){
			ReservationService.getSelectedRestaurant()
			.then(function(httpData){
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
        
        //proanadji sto iz zeljenog segmenta , u zeljenom redu i zeljenoj koloni
        function getTable(regionIndex,row,col){
        	var rez = null;
    		var reg = vm.selectedRestaurant.regions[regionIndex];
    		for(var j = 0; j < reg.tables.length;j++){
    			var table = reg.tables[j];
        		if(table.colNum== col && table.rowNum == row){
        			rez = table;
        		}
    		}
    		return rez;        	
        }
        
        //uzimam oznaku tabele
        function getTableOznaka(regionIndex,row,col){
        	var table = vm.getTable(regionIndex,row,col);
        	var rez = undefined;
        	if(table != null)
        		rez = table.oznakaStola;
        	return rez;
        }
        //vraza niz od 1 do zeljenog broja
        function getNumber(num) {
        	var niz = [];
        	for(var i = 1; i <= num; i++){
        		niz.push(i);
        	}
            return niz;   
        }
        //proveravam broj kolona, ako nema nsita da ne prikazuje red
        function rowCheckNumberOfTables(regionIndex,row){
        	var reg = vm.selectedRestaurant.regions[regionIndex];
        	for(var j = 0; j < reg.tables.length;j++){
        		var table = reg.tables[j];
        		if(table.rowNum == row)
        			return true;
        	}
        	return false;
        }
        //dodavanje sto u listu izabranih za rezervaciju
        function addToSelected(regionIndex,row,col){
        	var added = vm.checkIfAdded(regionIndex,row,col);
        	if(!added)
	    		var table = vm.getTable(regionIndex,row,col);
	    		if(table != null)
	    			vm.selectedTables.push(table);
        }
        //provaeravamo da li je gost izabrao ovaj sto, radi promene izgleda
        function checkIfAdded(regionIndex,row,col){
    		var t = vm.getTable(regionIndex,row,col);
    		if(t != null)
	    		for(var i = 0; i < vm.selectedTables.length;i++){
	    			var table = vm.selectedTables[i];
	    			if(t.id == table.id)
	    				return true;
	    		}
    		return false;
        }
        //brisanje iz liste selektovanih za rezervaciju
        function removeFromSelected(index){
        	vm.selectedTables.splice(index,1);
        }
        //prikazujem tabele i postavljam unete datume rezervacije 
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
        //na serveru vrsim proveru da li je sto rezervisan, za uneti termin
        function checkIfReserved(regionIndex,row,col){
        	var reg = vm.selectedRestaurant.regions[regionIndex];
        	var t = vm.getTable(regionIndex,row,col);
    		if(t != null)
	        	ReservationService.checkIfReserved(t.id)
	        	.then(function(httpData){
	        		vm.tablesStatus.push({id:t.id,value: httpData.data})
	        	},
	        	function(httpData){
	        		console.log(httpData.data.message)
	        	})
        }
        //proveram da li je sto, za uneti termin, vec rezervisan 
        function getStatus(regionIndex,row,col){
        	var rez = undefined;
        	var t = vm.getTable(regionIndex,row,col);
    		if(t != null)
	    		for(var i = 0; i < vm.tablesStatus.length;i++){
	    			var tableStatus = vm.tablesStatus[i];
	    			if(tableStatus.id == t.id)
	    				return tableStatus.value;
	    		}
    		return false;
        }
        
        function confirmReservation(){
        	ReservationService.confirmReservation(vm.selectedTables)
        	.then(function(httpData){
        		$rootScope.reservation = httpData.data;
            	$location.path('/reservations/friends');
        	},
        	function(httpData){
        		
        	})
        }
        function getDateFromReservation(condition){
        	var splitted = new Date(vm.reservation.date).toString().split(" ");
        	var splittedTime = splitted[4].split(":");
        	var splitted1 = new Date(vm.reservation.stay).toString().split(" ");
        	var splittedStay = splitted[4].split(":");

        	if(condition == "date"){
        		return splitted[1]+ " "+splitted[2]+ " "+ splitted[3]
        	}
        	else if(condition == "startTime"){
        		return splittedTime[0] + ":" + splittedTime[1];
        	}
        	else if(condition == "stayTime"){
        		return splittedStay[0] + ":" + splittedStay[1];
       		
        	}
        	return "";
        }
        
		function searchFriends(){
			GuestService.searchFriends(vm.searchCondition)
			.then(function(httpData){
				vm.friends =httpData.data;
			},
			function(httpData){
				console.log(httpData.data.message);
			})
		}
		
		function inviteFriend(index){
			ReservationService.inviteFriend(vm.friends[index],vm.reservation.id)
			.then(function(httpData){
				
			},
			function(httpData){
				console.log.httpData.data.message;
			})
		}
	}
})();