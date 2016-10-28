(function() {
    'use strict';

    angular
        .module('seoApp')
        .controller('DiagramController', DiagramController);

    DiagramController.$inject = ['$scope', '$state', 'Report', '$log'];

    function DiagramController ($scope, $state, Report, $log) {
        var vm = this;

      google.charts.load('current', {'packages':['line']});
      google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

      var data = new google.visualization.DataTable();
      data.addColumn('date', 'Data');
      data.addColumn('number', 'Guardians of the Galaxy');
      data.addColumn('number', 'The Avengers');
      data.addColumn('number', 'Transformers: Age of Extinction');

      data.addRows([
        [new Date('Jan 2, 2015'),  37.8, 80.8, 41.8],
        [new Date('Jan 3, 2015'),  30.9, 69.5, 32.4],
        [new Date('Jan 4, 2015'),  25.4,   57, 25.7],
        [new Date('Jan 5, 2015'),  11.7, 18.8, 10.5],
        [new Date('Jan 6, 2015'),  11.9, 17.6, 10.4],
        [new Date('Jan 7, 2015'),   8.8, 13.6,  7.7],
        [new Date('Jan 8, 2015'),   7.6, 12.3,  9.6],
        [new Date('Jan 9, 2015'),  12.3, 29.2, 10.6],
        [new Date('Jan 10, 2015'),  16.9, 42.9, 14.8],
        [new Date('Jan 11, 2015'), 12.8, 30.9, 11.6],
        [new Date('Jan 12, 2015'),  5.3,  7.9,  4.7],
        [new Date('Jan 13, 2015'),  6.6,  8.4,  5.2],
        [new Date('Jan 14, 2015'),  4.8,  6.3,  3.6],
        [new Date('Jan 15, 2015'),  4.2,  6.2,  3.4]
      ]);

      var options = {
        curveType: 'function',
        chart: {
          title: 'Box Office Earnings in First Two Weeks of Opening',
          subtitle: 'in millions of dollars (USD)'
        },
        width: 900,
        height: 500
      };

      var chart = new google.charts.Line(document.getElementById('linechart_material'));

      chart.draw(data, options);
    }

        vm.reports = [];

        loadAll();

        function loadAll() {
            Report.query(function(result) {
                vm.reports = result;
            });
        }
    }
})();
