(function() {
  'use strict';

  angular
  .module('app.dare')
  .controller('Dare', Dare);

  Dare.$inject = ['$scope','$state', 'dareApi'];

  function Dare($scope,$state, dareApi) {
    var dare = this;

    dare.saveDare = function(){
      if($scope.form.$valid){
        console.log(dare.file);
        dareApi.save(dare.info, dare.file).then(function(result){
          $state.go('invite',{dareId:result.objectId});
        },function(error){
          console.log(error);
        })
      }
    }

  }



})();
