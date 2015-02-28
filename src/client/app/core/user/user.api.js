(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('userApi', userApi);

  userApi.$inject = ['$resource','$q', 'headers', 'parse', 'storage'];

  /* @ngInject */
  function userApi($resource, $q, headers, parse, storage) {

    var  Login = parse.newLoginResource(headers.keys);
    var  Register  = parse.newRegisterResource(headers.keys);
    var  User = parse.newUserResource(headers.keys);

    var factory = {
      login: login
    };

    return factory;

    function login(params) {
      var deferred = $q.defer();
      Login.login(params).$promise.then(function(user){
        storage.set('user',user);
        deferred.resolve(user);
      },function(error){
        deferred.reject(error);
      });
      return deferred.promise
    }

    

  }
})();