(function () {
    'use strict';

    angular
        .module('app')
        .controller('IndexController', Controller);

    function Controller(GraphService, $uibModal) {
        var vm = this;
        var graph = Viva.Graph.graph();
        vm.nodes = null;
        vm.links = null;

        function updateGraph() {
            var nodesPromise = GraphService.nodes.getAll();
            var linksPromise = GraphService.links.getAll();
            Promise.all([
              nodesPromise,
              linksPromise
            ]).then(drawGraph);
        }

        function drawGraph(data) {
            vm.nodes = data[0];
            vm.links = data[1];
            vm.nodes.forEach(function(node) {
                graph.addNode(node.id);
            });
            vm.links.forEach(function(link) {
                graph.addLink(link.begin, link.end);
            });
            document.getElementById('graph').innerHTML = '';
            var renderer = Viva.Graph.View.renderer(graph, {
                container: document.getElementById('graph')
            });
            renderer.run();
        }

        function addNode(node) {
          GraphService.nodes.create(node)
            .then(updateGraph);
        }

        vm.openAddNodeModal = function () {
          var modalInstance = $uibModal.open({
            templateUrl: 'addNodeModel.html',
            controller: 'AddNodeModalCtrl'
          });

          modalInstance.result
            .then(addNode);
        };

        updateGraph();
    }

    angular
      .module('app')
      .controller('AddNodeModalCtrl', function ($scope, $uibModalInstance) {
          $scope.node = {
              attrs: []
          };

          $scope.addAttr = function () {
              $scope.node.attrs.push({
                  key: "",
                  value: ""
              });
          };

          $scope.save = function () {
              var node = {
                name: $scope.node.name.trim(),
                data: {}
              };
              $scope.node.attrs.forEach(function (attr) {
                if(attr.key && attr.value) {
                  node.data[attr.key] = attr.value.trim();
                }
              });
              $uibModalInstance.close(node);
          };

          $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
          };

      });
})();
