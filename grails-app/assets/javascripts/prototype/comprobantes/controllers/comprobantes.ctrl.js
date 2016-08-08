//= wrapped

angular
    .module('prototype.comprobantes')
    .controller('ComprobantesCtrl', ComprobantesCtrl);

function ComprobantesCtrl($filter, comprobantes) {
    var vm = this;

    vm.labels = [];
    vm.data = [[]];
    vm.comprobantes = comprobantes;

    init();

    function init() {
        vm.series = [vm.comprobantes[0].receptor.nombre];

        angular.forEach(vm.comprobantes, function(comprobante) {
            var fecha = $filter('date')(new Date(comprobante.fecha.month + '/' + comprobante.fecha.day + '/' + comprobante.fecha.year), 'MMM-yyyy');
            if(vm.labels.indexOf(fecha) === -1) {
                vm.labels.push(fecha);
                vm.data[0].push(comprobante.subTotal);
            }
        });
    }
}
