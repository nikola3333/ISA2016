(function(){
	'use strict'
	
	angular
		.module('app',['ngRoute','ngCookies'])
		.config(config)
		.run(run);
	
	config.$inject = ['$routeProvider','$locationProvider'];
	function config($routeProvider,$locationProvider){
		$routeProvider
		.when('/homePage',{
			templateUrl : 'app-guest/guest.view.Home.html',
		})
		
		.when('/',{
			controller:'LoginController',
			templateUrl:'login/login.view.html',
			controllerAs:'vm'
		})
		.when('/register',{
			controller :'RegisterController',
			templateUrl : 'register/register.view.html',
			controllerAs :'vm'
		})
		.otherwise({redirectTo:'/'})
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