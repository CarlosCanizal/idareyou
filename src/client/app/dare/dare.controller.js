(function() {
  'use strict';

  angular
  .module('app.dare')
  .controller('Dare', Dare);

  Dare.$inject = ['$scope'];

  function Dare($scope) {
    var dare = this;

    dare.saveDare = function(){
      if($scope.form.$valid){
        console.log(dare.info);
      }
    }
  }



})();
