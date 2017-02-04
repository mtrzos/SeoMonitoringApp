(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$state', 'Auth', 'Principal', 'ProfileService', 'LoginService', '$scope'];

    function SidebarController ($state, Auth, Principal, ProfileService, LoginService, $scope) {
        console.log("SIDEBAR IS LOADING");
        var vm = this;

        vm.isSidebarCollapsed = true;
        vm.isAuthenticated = Principal.isAuthenticated;

        ProfileService.getProfileInfo().then(function(response) {
            vm.inProduction = response.inProduction;
            vm.swaggerEnabled = response.swaggerEnabled;
        });

        vm.login = login;
        vm.logout = logout;
        vm.$state = $state;
        vm.account = null;
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

        Principal.identity().then(function(account) {
            vm.account = account;
            vm.isAuthenticated = Principal.isAuthenticated;
        });

        function login() {
            console.log('Opening modal');
            collapseSidebar();
            LoginService.open();
        }

        function logout() {
            collapseSidebar();
            Auth.logout();
            $state.go('home');
        }
    }
})();
