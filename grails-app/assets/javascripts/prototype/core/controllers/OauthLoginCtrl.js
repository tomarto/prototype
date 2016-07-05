//= wrapped

angular
    .module('prototype.core')
    .controller('OauthLoginCtrl', OauthLoginCtrl);

function OauthLoginCtrl($state, $stateParams, $sessionStorage, userFactory, eventFactory) {
    function init() {
        $sessionStorage.authorization = 'Bearer ' + $stateParams.token;
        userFactory.getUser()
            .then(function(response) {
                eventFactory.broadcastError(undefined);
                $state.go('actions');
            }, function(response) {
                eventFactory.broadcastSuccess(undefined);
                eventFactory.broadcastError(constant.login.error);
            });
    }

    init();
}
