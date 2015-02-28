(function() {
  'use strict';

  angular
  .module('app.core')
  .controller('User', User);

  User.$inject = ['$scope','$state','storage','userApi'];

  function User($scope, $state, storage, userApi) {
    var user = this;

    user.login = function(){
      if($scope.loginForm.$valid){
        alert();
        userApi.login(user.info).then(function(result){
          console.log(result);
          // user.store(user);
          // console.log(user);
        },function(error){
          console.log(error);
        });
      }else{
        $scope.loginForm.username.$setDirty();
        $scope.loginForm.password.$setDirty();
      }
    };

    user.store = function(userInfo){
      storage.set('user',userInfo);
    }
  }

  



})();
