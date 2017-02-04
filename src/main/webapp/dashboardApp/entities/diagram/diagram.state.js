(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('diagram', {
            parent: 'entity',
            url: 'dashboard/diagram',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dashboardApp.report.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'dashboardApp/entities/diagram/diagram.html',
                    controller: 'DiagramController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('report');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
