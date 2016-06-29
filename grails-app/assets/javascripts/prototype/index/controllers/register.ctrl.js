//= wrapped

angular
    .module('prototype.index')
    .controller('RegisterCtrl', RegisterCtrl);

function RegisterCtrl($state, eventFactory, userFactory) {
    var vm = this;

    vm.dateOptions = {
        formatYear: 'yyyy',
        startingDay: 1
    };
    vm.maxDate = new Date();
    vm.registerData = {};
    vm.status = {opened: false};

    vm.openDatepicker = openDatepicker;
    vm.register = register;

    function openDatepicker() {
        vm.status.opened = true;
    }

    function register(registerForm) {
        if (registerForm.$valid) {
            userFactory.register(vm.registerData)
                .then(function(response) {
                    eventFactory.broadcastError(undefined);
                    $state.go('login');
                    eventFactory.broadcastSuccess('You have been successfully registered.');
                }, function(response) {
                    eventFactory.broadcastError(response.errorMessage ? response.errorMessage :
                        'An error ocurred while trying to register user. Please try again later.');
                });
        }
    }
}
