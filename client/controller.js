(function () {
    'use strict';

    angular
        .module('app')
        .controller('IndexController', Controller);

    function Controller(GraphService) {
        var vm = this;
        var graph = Viva.Graph.graph();
        vm.nodes = null;
        vm.links = null;

        var nodesPromise = GraphService.nodes.getAll();
        var linksPromise = GraphService.links.getAll();
        Promise.all([
            nodesPromise,
            linksPromise
        ]).then(drawGraph);


        function drawGraph(data) {
            vm.nodes = data[0];
            vm.links = data[1];
            vm.nodes.forEach(function(node) {
                graph.addNode(node.id);
            });
            vm.links.forEach(function(link) {
                graph.addLink(link.begin, link.end);
            });
            var renderer = Viva.Graph.View.renderer(graph, {
                container: document.getElementById('graph')
            });
            renderer.run();
        }
    }
})();
