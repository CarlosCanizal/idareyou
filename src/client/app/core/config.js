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
    .state('newChallenge', {
      url:'/challenge/new',
      templateUrl: 'app/challenge/challenge.new.html'
    });
  $urlRouterProvider.otherwise('/');
}