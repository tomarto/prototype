//= wrapped

angular
    .module('prototype.index')
    .controller('CheckoutCtrl', CheckoutCtrl);

function CheckoutCtrl(eventFactory, paymentFactory) {
    var vm = this;

    vm.data = {};

    vm.pay = pay;

    function pay(checkoutForm) {
        if(checkoutForm.$valid) {
            paymentFactory.pay(vm.data)
                .then(function(response) {
                    eventFactory.broadcastError(undefined);
                    eventFactory.broadcastSuccess('DONE!');
                }, function(response) {
                    eventFactory.broadcastSuccess(undefined);
                    eventFactory.broadcastError('An error ocurred');
                });
        }
    }
}
