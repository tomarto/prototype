//= wrapped

angular
    .module('contport.login')
    .controller('LoginCtrl', LoginCtrl);

function LoginCtrl($state, userFactory, toasterService) {
    var vm = this;

    vm.credentials = {};

    vm.login = login;

    function login() {
        userFactory.login(vm.credentials)
            .then(function(response) {
                $state.go('app.actions', {}, {reload: true});
            }, function(response) {
                toasterService.error('An error ocurred while logging in.');
            });
    }
}
