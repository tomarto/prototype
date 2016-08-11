//= wrapped

angular
    .module('contport.index')
    .controller('LoginCtrl', LoginCtrl);

function LoginCtrl($state, userFactory, toasterService) {
    var vm = this;

    vm.credentials = {};

    vm.login = login;

    function login() {
        userFactory.login(vm.credentials)
            .then(function(response) {
                userFactory.getUser()
                    .then(function(response) {
                        $state.go('actions');
                    }, function(response) {
                        toasterService.error(constant.login.error);
                    });
            }, function(response) {
                toasterService.error(constant.login.error);
            });
    }
}
