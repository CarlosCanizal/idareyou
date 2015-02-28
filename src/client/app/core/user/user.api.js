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
      login: login,
      register: register,
      setSessionToken: setSessionToken,
      getCurrentUser: getCurrentUser,
      currentUser: currentUser,
      setCurrentUser: setCurrentUser
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

    function register(params) {
      var deferred = $q.defer();
      Register.save(params).$promise.then(function(user){
        storage.set('user',user);
        deferred.resolve(user);
      },function(error){
        deferred.reject(error);
      });

      return deferred.promise
    }

    function setSessionToken(){
      var user = currentUser();
      var userHeaders = parseheaders.storeKeys;
      userHeaders['X-Parse-Session-Token'] = user.sessionToken;
      return parse.newUserResource(parseheaders.storeKeys);
    }

    function getCurrentUser(){
      var  User  = setSessionToken();
      return User.currentUser({objectId:'me'}).$promise;
    }

    function currentUser() {
      return storage.get('user');
    }

    function setCurrentUser(user){
      return storage.set('user', user);
    }

  }
})();