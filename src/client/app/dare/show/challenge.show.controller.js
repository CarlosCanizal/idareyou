(function() {
  'use strict';

  angular
  .module('app.dare')
  .controller('Show', Show);

  Show.$inject = ['$scope','$state', 'dareApi', 'info'];

  function Show($scope,$state, dareApi, info) {
    var challenge = this;
    challenge.info = info;
    challenge.message = [];

    dareApi.getMessages(challenge.info.objectId).then(function(result){
      challenge.messages = result.results;
    },function(error){
      console.error(error);
    });


    challenge.sendMessage = function(){
      if(challenge.form.$valid){
         dareApi.sendMessage(challenge.info,challenge.message).then(function(result){
          console.log(result);
         },function(error){
          console.log(error);
         })
      }
    }

  }



})();
