(function() {
  'use strict';

  angular
  .module('app.dare')
  .controller('Invite', Invite);

  Invite.$inject = ['$scope', 'dareApi', 'query'];

  function Invite($scope, dareApi, query) {
    var invite = this;
    invite.dare  = query.results[0];
    console.log(invite.dare);
  }



})();
