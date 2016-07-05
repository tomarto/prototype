//= wrapped
//= require_self

// Configure the app with the routes
angular
    .module('prototype')
    .config(routes);

function routes($stateProvider, $urlRouterProvider, $locationProvider) {

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
        .state('oauthLogin', {
            url: '/oauthLogin?token',
            controller: 'OauthLoginCtrl',
            controllerAs: 'OauthLoginCtrl'
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
