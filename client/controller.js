(function () {
    'use strict';

    angular
        .module('app')
        .controller('IndexController', Controller);

    function Controller(GraphService) {
        var vm = this;

        vm.nodes = null;
        vm.links = null;

        initController();

        function initController() {
            // get current user
            GraphService.setApiName('nodes');
            GraphService.getAll().then(function (nodes) {
                vm.nodes = nodes;
            });
            // links api to be implemented
            GraphService.setApiName('links');
            GraphService.getAll().then(function (links) {
                vm.links = links;
            });
        }
    }

})();
