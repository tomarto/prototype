//= wrapped

angular
    .module('contport.facturas')
    .controller('GuardarFacturasCtrl', GuardarFacturasCtrl);

function GuardarFacturasCtrl($state, facturasService, toasterService) {
    var vm = this;

    vm.subirXML = subirXML;

    function subirXML(archivos, archivosInvalidos) {
        vm.archivos = archivos;
        vm.archivosInvalidos = archivosInvalidos;

        if(archivos.length) {
            facturasService.save(vm.archivos)
                .then(function(response) {
                    toasterService.success('Carga completa');
                    $state.go('app.facturas');
                })
                .catch(function(response) {
                    toasterService.error(response + ' archivos fallaron');
                });
        }
    }
}
