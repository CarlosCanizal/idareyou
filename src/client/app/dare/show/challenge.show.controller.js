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
    challenge.hasAccepted =[];
    challenge.hasNotAccepted = [];
    challenge.users = [];
    challenge.hasCompleted = [];


    dareApi.getUsers(challenge.info.objectId).then(function(result){
      console.log(result);
      challenge.users = result.all;
      challenge.hasAccepted = result.hasAccepted;
      challenge.hasNotAccepted = result.hasNotAccepted;
      challenge.hasCompleted = result.hasCompleted;
    },function(error){
      console.log(error);
    });


    dareApi.getMessages(challenge.info.objectId).then(function(result){
      console.log(result);
      challenge.messages = result.results;
    },function(error){
      console.error(error);
    });


    challenge.sendMessage = function(){
      if(challenge.form.$valid){
        var file;
        if(challenge.file)
          file = challenge.file[0];

         dareApi.sendMessage(shell.user,challenge.info,challenge.message,file).then(function(result){
          console.log('done!');
          challenge.messages.push({objectId:result.objectId, message: challenge.message,type:'message'});
         },function(error){
          console.log(error);
         })
      }
    }

    challenge.finishIt = function(){
      if(challenge.completed.$valid){
        var file;
        if(challenge.proof)
          file = challenge.proof[0];

         dareApi.finishIt(shell.user,challenge.info,challenge.completedMessage,file).then(function(result){
          console.log('done!');
         },function(error){
          console.log(error);
         })
      }
    }

  }



})();
