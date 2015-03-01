(function() {
  'use strict';

  angular
  .module('app.core')
  .controller('User', User);

  User.$inject = ['$scope','$state','storage','userApi'];

  function User($scope, $state, storage, userApi) {
    var user = this;
    user.error = null;

    user.login = function(){
      user.error = null;
      if($scope.loginForm.$valid){
        userApi.login(user.info).then(function(result){
          $state.go('challenges');
        },function(error){
          user.error = {message:error.data.error};
          console.log(error);
        });
      }else{
        $scope.loginForm.username.$setDirty();
        $scope.loginForm.password.$setDirty();
      }
    };

    user.register = function(){
        if($scope.registerForm.$valid){
          userApi.register(user.new).then(function(user){
            console.log(user);
            // scope.setUser(user);
          },function(error){
            console.error(error);
          });
        }else{
          $scope.registerForm.username.$setDirty();
          $scope.registerForm.password.$setDirty();
        }
    }

    user.store = function(userInfo){
      storage.set('user',userInfo);
    }
  }

})();
