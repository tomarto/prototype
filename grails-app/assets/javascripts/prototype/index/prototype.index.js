//= wrapped
//= require_self
//= require_tree services
//= require_tree controllers
//= require_tree directives
//= require_tree templates
//= require /angular/angular-ui-router
//= require /angular/angular-animate
//= require /angular/angular-touch
//= require /bootstrap/ui-bootstrap-tpls
//= require /angular-treasure-overlay-spinner/treasure-overlay-spinner.min
//= require /ngstorage/ngStorage

angular
    .module('prototype.index', [
        'prototype.core',
        'ui.router',
        'ui.bootstrap',
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
        .state('quienesSomos', {
            url: '/quienes-somos',
            templateUrl: '/prototype/index/who-we-are.html'
        })
        .state('ubicacion', {
            url: '/ubicacion',
            templateUrl: '/prototype/index/location.html'
        })
        .state('reglamento', {
            url: '/reglamento',
            templateUrl: '/prototype/index/regulation.html'
        })
        .state('torneos', {
            url: '/torneos',
            templateUrl: '/prototype/index/tournaments.html'
        })
        .state('rolDeJuegos', {
            url: '/rol-de-juegos',
            templateUrl: '/prototype/index/game-roles.html'
        })
        .state('infoRolDeJuegos', {
            url: '/rol-de-juegos/:tournament/:category/:group',
            templateUrl: '/prototype/index/game-roles-info.html'
        })
        .state('galeria', {
            url: '/galeria',
            templateUrl: '/prototype/index/gallery.html'
        })
        .state('galeriaFotos', {
            url: '/galeria/:id',
            templateUrl: '/prototype/index/photo-gallery.html',
            controller: 'PhotoGalleryCtrl',
            controllerAs: 'photoGalleryCtrl'
        })
        .state('sugerencias', {
            url: '/sugerencias',
            templateUrl: '/prototype/index/contact.html',
            controller: 'ContactCtrl',
            controllerAs: 'contactCtrl'
        })
        .state('contacto', {
            url: '/contacto',
            templateUrl: '/prototype/index/contact.html',
            controller: 'ContactCtrl',
            controllerAs: 'contactCtrl'
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
