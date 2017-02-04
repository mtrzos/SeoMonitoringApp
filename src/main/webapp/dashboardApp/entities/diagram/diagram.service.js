(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .factory('DiagramService', DiagramService);

    DiagramService.$inject = ['$filter', '$http', '$log'];

    function DiagramService ($filter, $http, $log) {
        var service = {
            getLocations: getLocations,
            getReportsForLocation: getReportsForLocation,
            getCompetitors: getCompetitors
        };

        return service;

        function getLocations () {
            return $http.get('api/reports/myLocations')
            .then(handleSuccess)
            .catch(handleError);
        }

        function getReportsForLocation (location) {
            return $http.get('api/reports/location/'+location)
            .then(handleSuccess)
            .catch(handleError);
        }

        function getCompetitors() {
            return $http.get('api/reports/competitors')
            .then(handleSuccess)
            .catch(handleError);
        }

        function handleSuccess(response){
            return response.data;
        }

        function handleError(error){
            $log.error("XHR failed: " + error.data);
        }

    }
})();
