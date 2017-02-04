(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('report', {
            parent: 'entity',
            url: 'dashboard/report',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dashboardApp.report.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'dashboardApp/entities/report/reports.html',
                    controller: 'ReportController',
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
        })
        .state('report-detail', {
            parent: 'entity',
            url: 'dashboard/report/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dashboardApp.report.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'dashboardApp/entities/report/report-detail.html',
                    controller: 'ReportDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('report');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Report', function($stateParams, Report) {
                    return Report.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'report',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('report-detail.edit', {
            parent: 'report-detail',
            url: 'dashboard/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'dashboardApp/entities/report/report-dialog.html',
                    controller: 'ReportDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Report', function(Report) {
                            return Report.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('report.new', {
            parent: 'report',
            url: 'dashboard/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'dashboardApp/entities/report/report-dialog.html',
                    controller: 'ReportDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                date: null,
                                position: null,
                                phrase: null,
                                website: null,
                                location: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('report', null, { reload: 'report' });
                }, function() {
                    $state.go('report');
                });
            }]
        })
        .state('report.edit', {
            parent: 'report',
            url: 'dashboard/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'dashboardApp/entities/report/report-dialog.html',
                    controller: 'ReportDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Report', function(Report) {
                            return Report.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('report', null, { reload: 'report' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('report.delete', {
            parent: 'report',
            url: 'dashboard/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'dashboardApp/entities/report/report-delete-dialog.html',
                    controller: 'ReportDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Report', function(Report) {
                            return Report.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('report', null, { reload: 'report' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
