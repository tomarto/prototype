//= wrapped

angular
    .module('prototype.comprobantes')
    .controller('ComprobantesCtrl', ComprobantesCtrl);

function ComprobantesCtrl(comprobantesResult) {
    var vm = this,
        series = 0;

    vm.labels = [];
    vm.series = [];
    vm.data = [];
    vm.comprobantesResult = comprobantesResult;

    init();

    function init() {
        angular.forEach(vm.comprobantesResult, function(tipo, llaveTipo) {
            vm.data.push([]);
            vm.series.push(llaveTipo);
            angular.forEach(tipo, function(comprobantes, fecha) {
                if(vm.labels.indexOf(fecha) === -1) {
                    vm.labels.push(fecha);
                }
                var subTotal = 0;
                angular.forEach(comprobantes, function(comprobante) {
                    subTotal += comprobante.subTotal;
                });
                vm.data[series].push(subTotal);
            });
            series++;
        });
    }
}
