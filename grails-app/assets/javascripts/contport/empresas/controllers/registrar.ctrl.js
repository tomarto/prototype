//= wrapped

angular
    .module('contport.empresas')
    .controller('RegistrarEmpresaCtrl', RegistrarEmpresaCtrl);

function RegistrarEmpresaCtrl($state, empresaFactory, toasterService) {
    var vm = this;

    vm.data = {};

    vm.registrar = registrar;

    function registrar(empresaForm) {
        if(empresaForm.$valid) {
            empresaFactory.register(vm.data)
                .then(function(response) {
                    toasterService.success('La empresa se ha registrado correctamente');
                    $state.go('app.empresas');
                })
                .catch(function(response) {
                    toasterService.error(response.errorMessage ||
                        'Ha ocurrido un error al tratar registrar la empresa. Intente de nuevo más tarde');
                });
        }
    }
}
