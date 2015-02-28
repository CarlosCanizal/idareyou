(function() {
  'use strict';

  angular
  .module('app.dare')
  .controller('Dare', Dare);

  Dare.$inject = ['$scope', 'dareApi'];

  function Dare($scope, dareApi) {
    var dare = this;

    dare.saveDare = function(){
      if($scope.form.$valid){
        console.log(dare.file);
        dareApi.save(dare.info, dare.file).then(function(result){
          console.log(result);
        },function(error){
          console.log(error);
        })
      }
    }

  }



})();
