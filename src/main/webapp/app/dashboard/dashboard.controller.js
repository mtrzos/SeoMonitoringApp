(function() {
    'use strict';

    angular
        .module('seoApp')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', 'Principal', 'LoginService', '$state'];

    function DashboardController ($scope, Principal, LoginService, $state) {
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
