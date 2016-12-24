(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state'];

    function HomeController ($scope, Principal, LoginService, $state) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function(account) {
                console.log('Sending a request for the user');
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
                console.log('is Auth: ' + Principal.isAuthenticated);
            });
        }
        function register () {
            $state.go('register');
        }
    }
})();
