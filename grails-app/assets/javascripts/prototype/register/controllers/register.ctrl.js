//= wrapped

angular
    .module('prototype.register')
    .controller('RegisterCtrl', RegisterCtrl);

function RegisterCtrl($state, userFactory, toasterService) {
    var vm = this;

    vm.dateOptions = {
        maxDate: new Date()
    };
    vm.registerData = {};
    vm.status = {opened: false};

    vm.openDatepicker = openDatepicker;
    vm.register = register;

    function openDatepicker() {
        vm.status.opened = true;
    }

    function register(registerForm) {
        if(registerForm.$valid) {
            userFactory.register(vm.registerData)
                .then(function(response) {
                    toasterService.success('You have been successfully registered');
                    $state.go('app.login');
                }, function(response) {
                    toasterService.error(response.errorMessage ||
                            'An error ocurred while trying to register user. Please try again later');
                });
        }
    }
}
