(function() {
  'use strict';

  angular
  .module('app.dare')
  .controller('Challenges', Challenges);

  Challenges.$inject = ['$scope', 'dareApi'];

  function Challenges($scope, dareApi) {
    var challenges = this;
    var shell = $scope.shell;

    dareApi.getAll(shell.user.username).then(function(response){
      challenges.list = response.results;
    },function(error){
      console.log(error);
    });


  }



})();
