(function() {
  'use strict';

  angular
  .module('app.dare')
  .controller('Show', Show);

  Show.$inject = ['$scope','$state', 'dareApi', 'info', '$sce'];


  function Show($scope,$state, dareApi, info, $sce) {
    
    var shell = $scope.shell;
    var challenge = this;
    challenge.info = info;
    challenge.messages = [];
    challenge.hasAccepted =[];
    challenge.hasNotAccepted = [];
    challenge.users = [];
    challenge.hasCompleted = [];

    dareApi.getUsers(challenge.info.objectId).then(function(result){      
      challenge.users = result.all;
      challenge.hasAccepted = result.hasAccepted;
      challenge.hasNotAccepted = result.hasNotAccepted;
      challenge.hasCompleted = result.hasCompleted;
    },function(error){
      console.log(error);
    });


    dareApi.getMessages(challenge.info.objectId).then(function(result){
      var messages = result.results;
      angular.forEach(messages,function(message){
        if(message.fileType == 'video/quicktime'){
          message.file.url = $sce.trustAsResourceUrl(message.file.url);
        }
        challenge.messages.push(message);
      });
    },function(error){
      console.error(error);
    });


    challenge.sendMessage = function(){
      if(challenge.form.$valid){
        shell.showLoading();
        var file;
        if(challenge.file)
          file = challenge.file[0];

         dareApi.sendMessage(shell.user,challenge.info,challenge.message,file).then(function(result){
          result.file.url =  $sce.trustAsResourceUrl(result.file.url);
          challenge.messages.push(result);
         },function(error){
          console.log(error);
         }).finally(shell.hideLoading());
      }
    }

    challenge.finishIt = function(){
      if(challenge.completed.$valid){
        shell.showLoading();
        var file;
        if(challenge.proof)
          file = challenge.proof[0];
         dareApi.finishIt(shell.user,challenge.info,challenge.completedMessage,file).then(function(result){
          result.file.url =  $sce.trustAsResourceUrl(result.file.url);
          challenge.messages.push(result);
         }).then(function(){
          return dareApi.getUsers(challenge.info.objectId);
         }).then(function(result){      
            challenge.users = result.all;
            challenge.hasAccepted = result.hasAccepted;
            challenge.hasNotAccepted = result.hasNotAccepted;
            challenge.hasCompleted = result.hasCompleted;
          },function(error){
          console.log(error);
         }).finally(shell.hideLoading);
      }
    }

  }



})();
