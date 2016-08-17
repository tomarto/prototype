//= wrapped

angular
    .module('prototype.login')
    .controller('OauthLoginCtrl', OauthLoginCtrl);

function OauthLoginCtrl($state, $stateParams, $sessionStorage) {
    function init() {
        $sessionStorage.authorization = 'Bearer ' + $stateParams.token;
        $state.go('app.actions', {}, {reload: true});
    }

    init();
}
