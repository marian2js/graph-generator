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
            var graphics = Viva.Graph.View.svgGraphics();
            graphics.node(function(node) {
              var ui = Viva.Graph
                .svg('rect')
                .attr('width', 24)
                .attr('height', 24);
              ui.addEventListener('click', function () {
                onNodeClick(node.data);
              });
              return ui;
            });
            vm.nodes = data[0];
            vm.links = data[1];
            vm.nodes.forEach(function(node) {
                graph.addNode(node.id, node);
            });
            vm.links.forEach(function(link) {
                graph.addLink(link.begin, link.end);
            });
            document.getElementById('graph').innerHTML = '';
            var renderer = Viva.Graph.View.renderer(graph, {
                graphics: graphics,
                container: document.getElementById('graph')
            });
            renderer.run();
        }

        function addNode(node) {
          GraphService.nodes.create(node)
            .then(updateGraph);
        }

        function addLink(link) {
          GraphService.links.create(link)
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

        vm.openAddLinkModal = function () {
          var modalInstance = $uibModal.open({
            templateUrl: 'addLinkModel.html',
            controller: 'AddLinkModalCtrl',
            resolve: {
                nodes: function(){
                    return vm.nodes;
                }
            }
          });

          modalInstance.result
            .then(addLink);
        };

        function onNodeClick(node) {
          $uibModal.open({
            templateUrl: 'nodeModel.html',
            controller: 'NodeModalCtrl',
            resolve: {
              node: function () {
                return node;
              }
            }
          });
        }

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

      angular
      .module('app')
      .controller('AddLinkModalCtrl', function ($scope, $uibModalInstance, nodes) {
          $scope.link = {
              attrs: []
          };
          $scope.nodes = nodes;

          $scope.addAttr = function () {
              $scope.link.attrs.push({
                  key: "",
                  value: ""
              });
          };

          $scope.save = function () {
              var link = {
                begin: $scope.link.begin,
                end: $scope.link.end,
                data: {}
              };
              $scope.link.attrs.forEach(function (attr) {
                if(attr.key && attr.value) {
                  link.data[attr.key] = attr.value.trim();
                }
              });
              $uibModalInstance.close(link);
          };

          $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
          };

      });

  angular
    .module('app')
    .controller('NodeModalCtrl', function ($scope, $uibModalInstance, node) {
      $scope.node = node;

      $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
      };

  });
})();
