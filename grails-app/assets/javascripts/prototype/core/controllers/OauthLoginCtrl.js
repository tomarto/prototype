//= wrapped

angular
    .module('prototype.core')
    .controller('OauthLoginCtrl', OauthLoginCtrl);

function OauthLoginCtrl($state, $stateParams, $sessionStorage, userFactory, toasterService) {
    function init() {
        $sessionStorage.authorization = 'Bearer ' + $stateParams.token;
        userFactory.getUser()
            .then(function(response) {
                $state.go('actions');
            }, function(response) {
                toasterService.error(constant.login.error);
            });
    }

    init();
}
