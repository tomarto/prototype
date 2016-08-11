//= wrapped
//= require_self

// Configure the app with the routes
angular
    .module('contport')
    .config(routes);

function routes($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/contport/index/home.html'
        })
        .state('login', {
            url: '/login',
            templateUrl: '/contport/index/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'loginCtrl'
        })
        .state('register', {
            url: '/register',
            templateUrl: '/contport/index/register.html',
            controller: 'RegisterCtrl',
            controllerAs: 'registerCtrl'
        })
        .state('oauthLogin', {
            url: '/oauthLogin?token',
            controller: 'OauthLoginCtrl',
            controllerAs: 'OauthLoginCtrl'
        })
        .state('actions', {
            url: '/actions?searchId',
            templateUrl: '/contport/index/actions.html',
            controller: 'ActionCtrl',
            controllerAs: 'actionCtrl',
            resolve: {
                result: function(actionFactory, $stateParams) {
                    return actionFactory.getActions($stateParams.searchId);
                }
            }
        })
        .state('checkout', {
            url: '/checkout',
            templateUrl: '/contport/index/checkout.html',
            controller: 'CheckoutCtrl',
            controllerAs: 'checkoutCtrl'
        })
        .state('subirFacturas', {
            url: '/subir-facturas',
            templateUrl: '/contport/facturas/guardar-facturas.html',
            controller: 'GuardarFacturasCtrl',
            controllerAs: 'guardarFacturasCtrl'
        })
        .state('facturas', {
            url: '/facturas',
            templateUrl: '/contport/facturas/facturas.html',
            controller: 'FacturasCtrl',
            controllerAs: 'facturasCtrl',
            resolve: {
                facturasResult: function(facturasService) {
                    return facturasService.get();
                }
            }
        });

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}
