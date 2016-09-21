//= wrapped
//= require_self

// Configure the app with the routes
angular
    .module('prototype')
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
                    templateUrl: '/prototype/layout/header.html',
                    controller: 'HeaderCtrl',
                    controllerAs: 'headerCtrl'
                },
                'content': {
                    templateUrl: '/prototype/index/home.html'
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
                    templateUrl: '/prototype/login/login.html',
                    controller: 'LoginCtrl',
                    controllerAs: 'loginCtrl'
                }
            }
        })
        .state('app.register', {
            url: 'register',
            views: {
                'content@': {
                    templateUrl: '/prototype/register/register.html',
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
                    templateUrl: '/prototype/actions/actions.html',
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
                    templateUrl: '/prototype/index/checkout.html',
                    controller: 'CheckoutCtrl',
                    controllerAs: 'checkoutCtrl'
                }
            }
        })
        .state('app.productDetail', {
            url: 'product-detail',
            views: {
                'content@': {
                    templateUrl: '/prototype/product-detail/product-detail.html',
                    controller: 'ProductDetailCtrl',
                    controllerAs: 'productDetailCtrl'
                }
            }
        })
        .state('app.addProductRule', {
            url: 'add-product-rule',
            views: {
                'content@': {
                    templateUrl: '/prototype/product-detail/add-product-rule.html',
                    controller: 'AddProductRuleCtrl',
                    controllerAs: 'addProductRuleCtrl'
                }
            }
        })
        .state('app.addProduct', {
            url: 'add-product',
            views: {
                'content@': {
                    templateUrl: '/prototype/product-detail/add-product.html',
                    controller: 'AddProductCtrl',
                    controllerAs: 'addProductCtrl'
                }
            }
        });

    $urlRouterProvider.otherwise('/home');

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}
