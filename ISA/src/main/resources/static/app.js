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
		.when('/abc',{
			templateUrl : 'abc.html',			
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