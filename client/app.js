var graph = Viva.Graph.graph();
 // TODO
(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config);

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'client/index.html',
                controller: 'IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'home' }
            });
    }
})();
