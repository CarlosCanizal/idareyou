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
      templateUrl: 'app/dare/dare.new.template.html',
      controller: 'Dare',
      controllerAs: 'dare'
    });
  $urlRouterProvider.otherwise('/');
}