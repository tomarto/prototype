//= wrapped

angular
    .module('contport.layout')
    .controller('HeaderCtrl', HeaderCtrl);

function HeaderCtrl($state, $cacheFactory, user, userFactory, toasterService) {
    var vm = this;

    vm.user = user;
    vm.logout = logout;

    init();

    function init() {

    }

    function logout() {
        userFactory.logout()
            .then(function(response) {
                angular.forEach($cacheFactory.info(), function(item) {
                    if (item.id !== 'templates' && item.id.indexOf('$') !== 0) {
                        $cacheFactory.get(item.id).removeAll();
                    }
                });
                $state.go('app.home', {}, {reload: true});
            }, function(response) {
                toasterService.error('An error ocurred while logging out. Please try again later');
            });
    }
}
