(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('Shell',Shell);

  Shell.$inject = ['$scope','$state','userApi'];

  function Shell($scope, $state, userApi){
    // jshint validthis: true 
    var shell = this;
    shell.user = userApi.currentUser();
    shell.loading = false;

    shell.showLoading = function(){
      shell.loading = true;
    }

    shell.hideLoading = function(){
      shell.loading = false;
    }

    
  }

})();
