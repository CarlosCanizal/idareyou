(function() {
  'use strict';

  angular
  .module('app.core')
  .controller('User', User);

  User.$inject = ['$scope','$state','storage','userApi'];

  function User($scope, $state, storage, userApi) {
    var shell = $scope.shell;
    var user = this;
    user.error = null;
    user.errorRegister = null;

    user.login = function(){
      user.error = null;
      if($scope.loginForm.$valid){
        shell.showLoading();
        userApi.login(user.info).then(function(currentUser){
          shell.setUser(currentUser);
          $state.go('challenges');
        },function(error){
          user.error = {message:error.data.error};
          console.log(error);
        }).finally(shell.hideLoading);
      }else{
        $scope.loginForm.username.$setDirty();
        $scope.loginForm.password.$setDirty();
      }
    };

    user.register = function(){
        user.errorRegister = null;
        if($scope.registerForm.$valid){
          shell.showLoading();
          userApi.register(user.new).then(function(currentUser){
            shell.setUser(currentUser);
            $state.go('challenges');
          },function(error){
            console.error(error);
            user.errorRegister = {message:error.data.error};
          }).finally(shell.hideLoading);
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
