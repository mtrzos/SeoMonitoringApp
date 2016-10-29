(function() {
    'use strict';
    angular
        .module('seoApp')
        .factory('Report', Report);

    Report.$inject = ['$resource', 'DateUtils', '$http'];

    function Report ($resource, DateUtils) {
        var resourceUrl =  'api/reports/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.date = DateUtils.convertDateTimeFromServer(data.date);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
