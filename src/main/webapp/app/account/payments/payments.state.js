(function() {
    'use strict';

    angular
        .module('seoApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('payments', {
            parent: 'account',
            url: '/payment',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'global.menu.account.password'
            },
            views: {
                'content@': {
                    templateUrl: 'app/account/payments/payments.html',
                    controller: 'PaymentsController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('payments');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
