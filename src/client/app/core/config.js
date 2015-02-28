angular
.module('app')
.config(config);

config.$inject = ['$locationProvider', '$urlRouterProvider','$stateProvider'];

function config($locationProvider,$urlRouterProvider, $stateProvider) {

  $stateProvider
    .state('home', {
      url:'/',
      templateUrl: 'app/layout/shell.html'
    })
    .state('newDare', {
      url:'/dare/new',
      templateUrl: 'app/dare/new/dare.new.template.html',
      controller: 'Dare',
      controllerAs: 'dare'
    })
    .state('invite', {
      url:'/invite/:dareId',
      templateUrl: 'app/dare/invite/invite.template.html',
      controller: 'Invite',
      controllerAs: 'dare',
      resolve: {
        query: function(dareApi, $stateParams){
          var dareId = $stateParams.dareId;
          return dareApi.get($stateParams.objectId);
        }
      }
    });
  $urlRouterProvider.otherwise('/');
}