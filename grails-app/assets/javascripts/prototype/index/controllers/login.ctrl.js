//= wrapped

'use strict';

angular
    .module('prototype.index')
    .controller('LoginCtrl', LoginCtrl);

function LoginCtrl($state, constant, eventFactory, userFactory) {
    var vm = this;

    vm.credentials = {};

    vm.login = login;

    function login() {
        userFactory.login(vm.credentials)
            .then(function(response) {
                userFactory.getUser()
                    .then(function(response) {
                        eventFactory.broadcastError(undefined);
                        $state.go('actions');
                    }, function(response) {
                        eventFactory.broadcastSuccess(undefined);
                        eventFactory.broadcastError(constant.login.error);
                    });
            }, function(response) {
                eventFactory.broadcastSuccess(undefined);
                eventFactory.broadcastError(constant.login.error);
            });
    }
}
