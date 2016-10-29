(function() {
    'use strict';

    angular
        .module('seoApp')
        .controller('DiagramController', DiagramController);

    DiagramController.$inject = ['$scope', '$state', 'Report', '$log', 'DiagramService'];

    function DiagramController ($scope, $state, Report, $log, DiagramService) {
        var vm = this;
        DiagramService.getLocations().then(function(data){
            $scope.locations = data;
//            $log.info("Then: " + $scope.locations);
        });
        DiagramService.getReportsForLocation('glasgow').then(function(data){
            $scope.locationReports = data;
//            $log.info($scope.locationReports);
        });
        DiagramService.getCompetitors().then(function(data){
            $scope.competitors = data;
//            $log.info("Competitors: "+$scope.competitors);
        });



$scope.Last30Days = function() {
    var result = [];
    for (var i=0; i<31; i++) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        var day = d.getDate();
        var month = d.getMonth();
        var year = d.getFullYear();
        result.push(day+"-"+month+"-"+year)
    }
    return result;
}

$scope.Last14Days = function () {
    var result = [];
    for (var i=0; i<14; i++) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        var day = d.getDate();
        var month = d.getMonth();
        var year = d.getFullYear();
        result.push(day+"-"+month+"-"+year)
    }
    return result;
}

$scope.Last7Days = function () {
    var result = [];
    for (var i=0; i<7; i++) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        var day = d.getDate();
        var month = d.getMonth();
        var year = d.getFullYear();
        result.push(day+"-"+month+"-"+year)
    }
    return result;
}


$scope.week = $scope.Last7Days();

var data = {
    labels: $scope.week,
    datasets: [
        {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [6, 5, 8, 8, 5, 5, 4, 1, 3, 7, 9, 5, 6, 7],
            spanGaps: false,
        },
        {
            label: "My second dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 13],
            spanGaps: false,
        }
    ]
};

        var ctx = document.getElementById("myChart");
        var scatterChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                scales: {
                    yAxes: [{
                         ticks: {
                              reverse: true
                         }
                    }],
//                    xAxes: [{
//                         ticks: {
//                              reverse: true
//                         }
//                    }]
                }
            }
        });
//        for(var i in $scope.competitors){
//        data.addColumn('number', $scope.competitors[i]);
//      }
$scope.$watch('data.group1', function(value) {
       if(value === '7'){
        scatterChart.data.labels = $scope.Last7Days();
//        scatterChart.data.datasets.data[0] = scatterChart.data.datasets[0].data.slice(0,7);
//        scatterChart.data.datasets.data[1] = scatterChart.data.datasets[1].data.slice(0,7);
        scatterChart.update();
       } else if (value === '14'){
        scatterChart.data.labels = $scope.Last14Days();
        scatterChart.update();
       } else {
        scatterChart.data.labels = $scope.Last30Days();
        scatterChart.update();
       }
 });



        vm.reports = [];

        loadAll();

        function loadAll() {
            Report.query(function(result) {
                vm.reports = result;
            });
        }

        function selected(button) {
            $log.info(button);
        }
    }
})();
