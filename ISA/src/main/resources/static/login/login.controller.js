(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService'];
    function LoginController($location, AuthenticationService) {
    	//this = $scope because of  controller as 
        var vm = this;

        vm.clearErrorMessage = clearErrorMessage;
        vm.login = login;
        vm.errorMessage = undefined;
        
        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            AuthenticationService.Login(vm.email, vm.password, function (response) {
                if (response.status == 200) {
                    AuthenticationService.SetCredentials(vm.email, vm.password);
                    if(response.data.role.name == "GUEST"){
                    	$location.path('/homePage');
                    }
                }
                else {
                	vm.errorMessage = response.data.message;
                }
            });
        };
        
        function clearErrorMessage(){
        	vm.errorMessage = undefined;
        }
    }


})();
