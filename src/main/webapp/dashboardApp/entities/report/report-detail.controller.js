(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .controller('ReportDetailController', ReportDetailController);

    ReportDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Report', 'User'];

    function ReportDetailController($scope, $rootScope, $stateParams, previousState, entity, Report, User) {
        var vm = this;

        vm.report = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('dashboardApp:reportUpdate', function(event, result) {
            vm.report = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
