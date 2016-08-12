//= wrapped
//= require_self

// Configure the app with the routes
angular
    .module('contport')
    .config(routes);

function routes($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('app', {
            abstract: true,
            url: '/',
            resolve: {
                user: function(userFactory) {
                    return userFactory.getUser();
                }
            },
            views: {
                'header': {
                    templateUrl: '/contport/layout/header.html',
                    controller: 'HeaderCtrl',
                    controllerAs: 'headerCtrl'
                },
                'content': {
                    templateUrl: '/contport/index/home.html'
                }
            }
        })
        .state('app.home', {
            url: 'home'
        })
        .state('app.login', {
            url: 'login',
            views: {
                'content@': {
                    templateUrl: '/contport/login/login.html',
                    controller: 'LoginCtrl',
                    controllerAs: 'loginCtrl'
                }
            }
        })
        .state('app.register', {
            url: 'register',
            views: {
                'content@': {
                    templateUrl: '/contport/register/register.html',
                    controller: 'RegisterCtrl',
                    controllerAs: 'registerCtrl'
                }
            }
        })
        .state('app.oauthLogin', {
            url: 'oauthLogin?token',
            views: {
                'content@': {
                    controller: 'OauthLoginCtrl',
                    controllerAs: 'OauthLoginCtrl'
                }
            }
        })
        .state('app.actions', {
            url: 'actions?searchId',
            views: {
                'content@': {
                    templateUrl: '/contport/actions/actions.html',
                    controller: 'ActionCtrl',
                    controllerAs: 'actionCtrl'
                }
            },
            resolve: {
                result: function(actionFactory, $stateParams) {
                    return actionFactory.getActions($stateParams.searchId);
                }
            }
        })
        .state('app.checkout', {
            url: 'checkout',
            views: {
                'content@': {
                    templateUrl: '/contport/index/checkout.html',
                    controller: 'CheckoutCtrl',
                    controllerAs: 'checkoutCtrl'
                }
            }
        })
        .state('app.subirFacturas', {
            url: 'subir-facturas',
            views: {
                'content@': {
                    templateUrl: '/contport/facturas/guardar-facturas.html',
                    controller: 'GuardarFacturasCtrl',
                    controllerAs: 'guardarFacturasCtrl'
                }
            }
        })
        .state('app.facturas', {
            url: 'facturas',
            views: {
                'content@': {
                    templateUrl: '/contport/facturas/facturas.html',
                    controller: 'FacturasCtrl',
                    controllerAs: 'facturasCtrl'
                }
            },
            resolve: {
                facturasResult: function(facturasService) {
                    return facturasService.get();
                }
            }
        });

    $urlRouterProvider.otherwise('/home');

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}
