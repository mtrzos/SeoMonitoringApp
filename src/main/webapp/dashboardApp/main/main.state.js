(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig ($stateProvider) {
        $stateProvider.state('main', {
            parent: 'dashboardApp',
            url: 'dashboard.html#/main',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'configuration.title'
            },
            views: {
                'content@': {
                    templateUrl: 'dashboardApp/main/main.html',
                    controller: 'MainController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', function ($translate) {
                    return $translate.refresh();
                }]
            }
        });
    }
})();
