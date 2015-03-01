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
    .state('user', {
      url:'/user',
      templateUrl: 'app/user/user.template.html',
      controller: 'User',
      controllerAs: 'user'
    })
    .state('newDare', {
      url:'/dare/new',
      templateUrl: 'app/dare/new/dare.new.template.html',
      controller: 'Dare',
      controllerAs: 'dare',
      data:{
        access: true
      }
    })
    .state('challenge', {
      url:'/challenge/:challengeId',
      templateUrl: 'app/dare/show/challenge.show.template.html',
      controller: 'Show',
      controllerAs: 'challenge',
      resolve: {
        info: function(dareApi, $stateParams){
          var challengeId = $stateParams.challengeId;
          return dareApi.get(challengeId);
        }
      },
      data:{
        access: true
      }
    })
    .state('challenges', {
      url:'/challenges',
      templateUrl: 'app/dare/list/challenges.template.html',
      controller: 'Challenges',
      controllerAs: 'challenges',
      data:{
        access: true
      }
    })
    .state('invite', {
      url:'/invite/:dareId',
      templateUrl: 'app/dare/invite/invite.template.html',
      controller: 'Invite',
      controllerAs: 'dare',
      resolve: {
        info: function(dareApi, $stateParams){
          var dareId = $stateParams.dareId;
          return dareApi.get(dareId);
        }
      },
      data:{
        access: true
      }
    })
    .state('response', {
      url:'/response/:key',
      templateUrl: 'app/dare/response/response.template.html',
      controller: 'Response',
      controllerAs: 'response',
      resolve: {
        invitation: function(dareApi, $stateParams){
          var key = $stateParams.key;
          return dareApi.getByKey(key);
        }
      }
    });
  $urlRouterProvider.otherwise('/');
}