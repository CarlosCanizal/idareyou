(function() {
  'use strict';

  angular
  .module('app.dare')
  .controller('Invite', Invite);

  Invite.$inject = ['$scope', 'dareApi', 'info'];

  function Invite($scope, dareApi, info) {
    var dare = this;
    dare.info  = info;
    

    dare.send = function(){
      dareApi.send(dare.info,dare.email).then(function(result){
        console.log(result);
      },function(error){
        console.log(error);
      });
    }


  }



})();
