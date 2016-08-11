//= wrapped

angular
    .module('contport.index')
    .controller('AppCtrl', AppCtrl);

function AppCtrl($scope, $state, $cacheFactory, $sessionStorage, userFactory, notifyingService, toasterService) {
    var vm = this;

    vm.logout = logout;

    init();

    function init() {
        notifyingService.subscribe($scope, 'login', login);

        if ($sessionStorage.loggedUser) {
            vm.user = $sessionStorage.loggedUser;
        }
    }

    function logout() {
        userFactory.logout()
            .then(function(response) {
                delete vm.user;
                angular.forEach($cacheFactory.info(), function(item) {
                    if (item.id !== 'templates' && item.id.indexOf('$') !== 0) {
                        $cacheFactory.get(item.id).removeAll();
                    }
                });
                $state.go('home', {}, {reload: true});
            }, function(response) {
                toasterService.error('An error ocurred while logging out. Please try again later');
            });
    }

    function login(event, user) {
        vm.user = user;
    }
}
