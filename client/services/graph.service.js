(function () {
    'use strict';

    angular
        .module('app')
        .factory('GraphService', Service);

    function Service($http, $q) {
        var service = {};
        service.setApiName = setApiName;
        service.getAll = getAll;
        service.getById = getById;
        service.create = create;
        service.update = update;
        service.delete = Delete;

        return service;
        // set the api name that will be requested ('nodes' or 'links')
        function setApiName(apiName) {
            this.apiName = apiName;
        }

        function getAll() {
            return $http.get('/api/' + this.apiName).then(handleSuccess, handleError);
        }

        function getById(_id) {
            return $http.get('/api/' + this.apiName  + '/' + _id).then(handleSuccess, handleError);
        }

        function create(data) {
            return $http.post('/api/' + this.apiName  + '/', data).then(handleSuccess, handleError);
        }

        function update(data) {
            return $http.put('/api/' + this.apiName  + '/' + data._id, data).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/' + this.apiName  + '/' + _id).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
