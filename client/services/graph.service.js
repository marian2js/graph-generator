(function () {
    'use strict';

    angular
        .module('app')
        .factory('GraphService', function($http, $q, $window){
            var nodesService = new GraphService('nodes', $http, $q);
            var linksService = new GraphService('links', $http, $q);
            var fileService = new FileService($http, $q, $window);
            var graph = {
                nodes: nodesService,
                links: linksService,
                file: fileService
            }
            return graph;
        });

    function GraphService(apiName, $http, $q) {
        var self = this;
        this.apiName = apiName;
        this.getAll = getAll;
        this.getById = getById;
        this.create = create;
        this.update = update;
        this.delete = Delete;

        function getAll() {
            return $http.get('/api/' + self.apiName).then(handleSuccess, handleError);
        }

        function getById(_id) {
            return $http.get('/api/' + self.apiName  + '/' + _id).then(handleSuccess, handleError);
        }

        function create(data) {
            return $http.post('/api/' + self.apiName  + '/', data).then(handleSuccess, handleError);
        }

        function update(data) {
            return $http.put('/api/' + self.apiName  + '/' + data._id, data).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/' + self.apiName  + '/' + _id).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

    function FileService($http, $q, $window) {
      var self = this;
      this.importFile = importFile;
      this.exportFile = exportFile;

      function importFile(file) {
          return $http.post('/api/import', file).then(handleSuccess, handleError);
      }

      function exportFile(file) {
          return $http.post('/api/export').success(function(data){
            $window.open('/api/export?file=' + data.file);
          });
      }

      // private functions

      function handleSuccess(res) {
        console.log('res', res);
          return res.data;
      }

      function handleError(res) {
          return $q.reject(res.data);
      }
    }

})();
