(function() {
  'use strict';

  angular
  .module('app.dare')
  .controller('Response', Response);

  Response.$inject = ['$scope', 'dareApi', 'invitation'];

  function Response($scope, dareApi, invitation) {

    var response = this;
    invitation = invitation.results[0];
    response.email = invitation.email;
    response.dare = invitation.dare;
    

    response.accept = function(){
      dareApi.response(invitation,true).then(function(result){
        console.log(result);
      },function(error){
        console.log(error);
      })
    };

    response.decline = function(){
      dareApi.response(invitation, false).then(function(result){
        console.log(result);
      },function(error){
        console.log(error);
      })
    };




    


  }



})();
