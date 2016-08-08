//= wrapped

angular
    .module('prototype.index')
    .controller('CheckoutCtrl', CheckoutCtrl);

function CheckoutCtrl(paymentFactory, toasterService) {
    var vm = this;

    vm.data = {};

    vm.pay = pay;

    function pay(checkoutForm) {
        if(checkoutForm.$valid) {
            paymentFactory.pay(vm.data)
                .then(function(response) {
                    toasterService.success('DONE!');
                }, function(response) {
                    toasterService.error('An error ocurred');
                });
        }
    }
}
