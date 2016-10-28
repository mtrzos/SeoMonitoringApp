(function() {
    'use strict';

    angular
        .module('seoApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('diagram', {
                     parent: 'entity',
                     url: '/diagram',
                     data: {
                         authorities: ['ROLE_USER'],
                         pageTitle: 'seoApp.report.home.title'
                     },
                     views: {
                         'content@': {
                             templateUrl: 'app/entities/diagram/diagram.html',
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
