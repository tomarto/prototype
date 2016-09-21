//= wrapped

angular
    .module('prototype.productDetail')
    .controller('AddProductCtrl', AddProductCtrl);

function AddProductCtrl(productService) {
    var vm = this;

    vm.product = {};

    vm.changeInventory = changeInventory;
    vm.save = save;

    init();

    function init() {

    }

    function changeInventory() {
        delete vm.product.inStock;
    }

    function save() {
        var product = angular.copy(vm.product);
        product.price = product.price * 100;
        productService.save(product)
            .then(function(success) {
                alert('Success');
            })
            .catch(function(error) {
                alert('Error');
            });
    }
}
