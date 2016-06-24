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
                .attr('height', 24)
                .attr('fill', '#00A2E8');
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
                container: document.getElementById('graph'),
                graphics: graphics
            });
            renderer.run();
        }

        function addNode(node) {
          GraphService.nodes.create(node)
            .then(updateGraph);
        }

      function editNode(node) {
        GraphService.nodes.update(node)
          .then(updateGraph);
      }

        function addLink(link) {
          GraphService.links.create(link)
            .then(updateGraph);
        }

        function importGraph(file) {
          GraphService.file.importFile(file)
            .then(console.log('imported file ' + file));
        }

        vm.openAddNodeModal = function () {
          var modalInstance = $uibModal.open({
            templateUrl: 'formNodeModel.html',
            controller: 'FormNodeModalCtrl',
            resolve: {
              node: function () {
                return false;
              }
            }
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

        vm.openImportModal = function () {
          var modalInstance = $uibModal.open({
            templateUrl: 'importGraphModel.html',
            controller: 'ImportGraphCtrl'
          });
          modalInstance.result
            .then(importGraph);
        };
        function onNodeClick(node) {
          $uibModal.open({
            templateUrl: 'nodeModel.html',
            controller: 'NodeModalCtrl',
            resolve: {
              node: function () {
                return node;
              },
              editNode: function () {
                return editNode;
              }
            }
          });
        }

        updateGraph();
    }

    angular
      .module('app')
      .controller('FormNodeModalCtrl', function ($scope, $uibModalInstance, node) {
          $scope.node = {
              attrs: []
          };

          // Edit nodes
          $scope.editing = !!node;
          if ($scope.editing) {
              $scope.node.name = node.name;
              for (var key in node.data) {
                if (node.data.hasOwnProperty(key)) {
                  $scope.node.attrs.push({
                    key: key,
                    value: node.data[key]
                  });
                }
              }
          }

          $scope.addAttr = function () {
              $scope.node.attrs.push({
                  key: "",
                  value: ""
              });
          };

          $scope.save = function () {
              var newNode = {
                name: $scope.node.name.trim(),
                data: {}
              };
              if(node && node.id) {
                newNode.id = node.id;
              }
              $scope.node.attrs.forEach(function (attr) {
                if(attr.key && attr.value) {
                  newNode.data[attr.key] = attr.value.trim();
                }
              });
              $uibModalInstance.close(newNode, $scope.editing);
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
      .directive("fileread", [function () {
          return {
              scope: {
                  fileread: "="
              },
              link: function (scope, element, attributes) {
                  element.bind("change", function (changeEvent) {
                      scope.$apply(function () {
                          scope.fileread = changeEvent.target.files[0];
                      });
                  });
              }
          }
      }])
      .controller('ImportGraphCtrl', function ($scope, $uibModalInstance) {
          $scope.importFile = null;
          $scope.save = function () {
              var file = $scope.importFile;
              $uibModalInstance.close(file);
          };

          $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
          };

      });

    angular
      .module('app')
      .controller('NodeModalCtrl', function ($scope, $uibModalInstance, $uibModal, node, editNode) {
        $scope.node = node;

        $scope.edit = function () {
          $uibModalInstance.dismiss('cancel');
          var modalInstance = $uibModal.open({
            templateUrl: 'formNodeModel.html',
            controller: 'FormNodeModalCtrl',
            resolve: {
              node: node
            }
          });

          modalInstance.result
            .then(editNode);
        };

        $scope.close = function () {
          $uibModalInstance.dismiss('cancel');
        };

    });
})();
