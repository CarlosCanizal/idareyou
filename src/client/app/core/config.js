angular
.module('app')
.config(config);

config.$inject = ['$locationProvider', '$urlRouterProvider','$stateProvider'];

function config($locationProvider,$urlRouterProvider, $stateProvider) {

  $stateProvider
    .state('home', {
      url:'/',
      templateUrl: 'app/layout/shell.html',
      data:{
        menu: 'home',
        submenu: 'store'
      }
    });  
  $urlRouterProvider.otherwise('/');
}