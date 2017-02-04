(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .controller('ReportController', ReportController);

    ReportController.$inject = ['$scope', '$state', 'Report'];

    function ReportController ($scope, $state, Report) {
        var vm = this;

        vm.reports = [];

        loadAll();

        function loadAll() {
            Report.query(function(result) {
                vm.reports = result;
            });
        }
    }
})();
