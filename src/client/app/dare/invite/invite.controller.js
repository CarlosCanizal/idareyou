(function() {
  'use strict';

  angular
  .module('app.dare')
  .controller('Invite', Invite);

  Invite.$inject = ['$scope', 'dareApi', 'query'];

  function Invite($scope, dareApi, query) {
    var dare = this;
    dare.info  = query.results[0];
    

    dare.send = function(){
      dareApi.send(dare.info,dare.email).then(function(result){
        console.log(result);
      },function(error){
        console.log(error);
      });
    }


  }



})();
