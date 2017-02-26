(function(){
	'use strict'
	
	angular
		.module('app',['ngRoute','ngCookies'])
		.config(config)
		.run(run);
	config.$inject = ['$qProvider','$routeProvider','$locationProvider'];
	function config($qProvider,$routeProvider,$locationProvider){
	    $qProvider.errorOnUnhandledRejections(false);

		$routeProvider
		.when('/homePage',{
			templateUrl : 'app-guest/guest.view.Home.html',			
			controller : 'GuestController',
			controllerAs : 'vm'
		})
		.when('/homePage/restaurants',{
			templateUrl : 'app-guest/guest.view.restaurants.html',			
			controller : 'GuestController',
			controllerAs : 'vm'
		})
		.when('/homePage/friends',{
			templateUrl : 'app-guest/guest.view.friends.html',			
			controller : 'GuestController',
			controllerAs : 'vm'
		})
		.when('/homePage/profile',{
			templateUrl : 'app-guest/guest.view.profile.html',			
			controller : 'GuestController',
			controllerAs : 'vm'
		})
		.when('/manager',{
			templateUrl : 'rest-man/manager.html',			
		})
		.when('/waiter',{
			templateUrl : 'waiter/waiter.html',			
		})
		.when('/bartender',{
			templateUrl : 'bartender/bartender.html',			
		})
		.when('/bidder',{
			templateUrl : 'bidder/bidder.html',			
		})
		.when('/cook',{
			templateUrl : 'cook/cook.html',			
		})
		
		.when('/registerWaiter',{
			templateUrl : 'rest-man/registerWaiter.html',
			controller : 'RegisterWaiterController',
			controllerAs : 'vm'
		})
		.when('/registerBartender',{
			templateUrl : 'rest-man/registerBartender.html',
			controller : 'RegisterBartenderController',
			controllerAs : 'vm'
		})
		.when('/registerBidder',{
			templateUrl : 'rest-man/registerBidder.html',
			controller : 'RegisterBidderController',
			controllerAs : 'vm'
		})
		.when('/registerCook',{
			templateUrl : 'rest-man/registerCook.html',
			controller : 'RegisterCookController',
			controllerAs : 'vm'
		})
		.when('/sys_manager',{
			templateUrl : 'sys-man/systemManager.html',			
		})	
					
		.when('/',{
			templateUrl:'login/login.view.html',			
			controller:'LoginController',
			controllerAs:'vm'
		})
		.when('/register',{
			templateUrl : 'register/register.view.html',
			controller :'RegisterController',
			controllerAs :'vm'
		})
		
		.when('/registerManager',{
			templateUrl : 'sys-man/registerManager.html',
			controller :'RegisterManControler',
			controllerAs :'vm'
		})

		.when('/registerSysManager',{
			templateUrl : 'sys-man/registerSysManager.html',
			controller :'RegisterSysControler',
			controllerAs :'vm'
		})
		.when('/registerRestaurant',{
			templateUrl : 'sys-man/registerRestaurant.html',
			controller :'RegisterResControler',
			controllerAs :'vm'
		})

		.when('/reservation',{
			templateUrl : 'app-reservation/reservation.view.html',
			controller :'ReservationController',
			controllerAs :'vm'
		})
		.when('/reservations/friends',{
			templateUrl : 'app-reservation/reservation.inviteFriends.html',
			controller :'ReservationController',
			controllerAs :'vm'
		})
		.otherwise({redirectTo:'/#'})
	}

	run.$inject = ['$rootScope','$location','$cookies','$http'];
	function run($rootScope,$location,$cookies,$http){
		$rootScope.globals = $cookies.getObject('globals') || {};
		if($rootScope.globals.currentUser){

			$http.defaults.headers.common['Authorization'] = 'Basic' + $rootScope.globals.currentUser.authdata;
		}
		$rootScope.$on('$locationChangeStart',function(event, next, current){
			var restrictedPage = $.inArray($location.path(),['/register'])=== -1;//da li login ili register postoje u putanji
			var loggedIn = $rootScope.globals.currentUser;
			if(restrictedPage && ! loggedIn){
				$location.path('/');
			}
		});
	}
})();