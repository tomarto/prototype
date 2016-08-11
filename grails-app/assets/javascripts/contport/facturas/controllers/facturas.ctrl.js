//= wrapped

angular
    .module('contport.facturas')
    .controller('FacturasCtrl', FacturasCtrl);

function FacturasCtrl(facturasResult) {
    var vm = this,
        series = 0;

    vm.labels = [];
    vm.series = [];
    vm.data = [];
    vm.facturasResult = facturasResult;

    init();

    function init() {
        angular.forEach(vm.facturasResult, function(tipo, llaveTipo) {
            vm.data.push([]);
            vm.series.push(llaveTipo);
            angular.forEach(tipo, function(facturas, fecha) {
                if(vm.labels.indexOf(fecha) === -1) {
                    vm.labels.push(fecha);
                }
                var subTotal = 0;
                angular.forEach(facturas, function(factura) {
                    subTotal += factura.subTotal;
                });
                vm.data[series].push(subTotal);
            });
            series++;
        });
    }
}
