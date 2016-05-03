//= wrapped
//= require_self
//= require_tree services
//= require_tree controllers
//= require_tree directives
//= require_tree templates
//= require /angular-ui-router/release/angular-ui-router
//= require /angular-animate/angular-animate
//= require /angular-bootstrap/ui-bootstrap-tpls
//= require /angular-treasure-overlay-spinner/src/treasure-overlay-spinner
//= require /ngstorage/ngStorage

'use strict';

angular.module("prototype.index", [
    "prototype.core",
    'ui.router',
    "ui.bootstrap",
    'ngStorage',
    'treasure-overlay-spinner'
])
    .config(config);

function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/prototype/index/home.html'
        })
        .state('login', {
            url: '/login',
            templateUrl: '/prototype/index/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'loginCtrl'
        })
        .state('register', {
            url: '/register',
            templateUrl: '/prototype/index/register.html',
            controller: 'RegisterCtrl',
            controllerAs: 'registerCtrl'
        })
        .state('actions', {
            url: '/actions?searchId',
            templateUrl: '/prototype/index/actions.html',
            controller: 'ActionCtrl',
            controllerAs: 'actionCtrl',
            resolve: {
                result: function(actionFactory, $stateParams) {
                    return actionFactory.getActions($stateParams.searchId);
                }
            }
        });
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}
