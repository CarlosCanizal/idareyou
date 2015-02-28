(function() {
  'use strict';

  angular
  .module('app.dare')
  .controller('Show', Show);

  Show.$inject = ['$scope','$state', 'dareApi', 'info'];

  function Show($scope,$state, dareApi, info) {
    var shell = $scope.shell;
    var challenge = this;
    challenge.info = info;
    challenge.messages = [];
    challenge.haveAccepted =[];
    challenge.haveNotAccepted = [];


    dareApi.getUsers(challenge.info.objectId).then(function(result){
      challenge.haveAccepted = result.acceptedUsers;
      challenge.haveNotAccepted = result.denyUsers;
    },function(error){
      console.log(error);
    });


    dareApi.getMessages(challenge.info.objectId).then(function(result){
      challenge.messages = result.results;
    },function(error){
      console.error(error);
    });


    challenge.sendMessage = function(){
      if(challenge.form.$valid){
         dareApi.sendMessage(shell.user,challenge.info,challenge.message).then(function(result){
          challenge.messages.push({objectId:result.objectId, message: challenge.message});
         },function(error){
          console.log(error);
         })
      }
    }

  }



})();
