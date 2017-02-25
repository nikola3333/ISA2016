<<<<<<< HEAD
(function(){
	'use strict';
	
	angular
	.module('app')
	.controller('ReservationController',ReservationController);
	
	ReservationController.$inject = ['$location','$rootScope','ReservationService','AuthenticationService','$timeout']
	
	function ReservationController($location,$rootScope,ReservationService,AuthenticationService,$timeout){
		var vm = this;
        (function () {
            $('#datetimepicker1').datetimepicker();
            $('#datetimepicker3').datetimepicker({
                format: 'LT'
            });
        })();
	}
=======
(function(){
	'use strict';
	
	angular
	.module('app')
	.controller('ReservationController',ReservationController);
	
	ReservationController.$inject = ['$location','$rootScope','ReservationService','AuthenticationService','$timeout']
	
	function ReservationController($location,$rootScope,ReservationService,AuthenticationService,$timeout){
		var vm = this;
        (function () {
            $('#datetimepicker1').datetimepicker();
            $('#datetimepicker3').datetimepicker({
                format: 'LT'
            });
        })();
	}
>>>>>>> d3ab6ffacfb3d335f2c6fca13e3aea717b0618a8
})();