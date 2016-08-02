//= wrapped

angular
    .module('prototype.index')
    .controller('ComprobantesCtrl', ComprobantesCtrl);

function ComprobantesCtrl($filter, comprobantes) {
    var vm = this;

    vm.comprobantes = comprobantes;
    vm.config = {
        title: 'Comprobantes',
        tooltips: true,
        labels: false,
        mouseover: function() {},
        mouseout: function() {},
        click: function() {},
        legend: {
            display: true,
            //could be 'left, right'
            position: 'right'
        }
    };

    init();

    function init() {
        var data = [];
        angular.forEach(comprobantes, function(comprobante) {
            var fecha = $filter('date')(new Date(comprobante.fecha), 'MMM-yyyy');
            if(!$filter('filter')(data, {x: fecha}, true)[0]) {
                data.push(
                    {
                        x: fecha,
                        y: [comprobante.subTotal],
                        tooltip: comprobante.receptor.nombre
                    }
                );
            }
        });

        vm.data = {
            series: ['Subtotal'],
            data: data
        };
    }
}
