//= wrapped

angular
    .module('prototype.index')
    .controller('ContactCtrl', ContactCtrl);

function ContactCtrl($state, contactFactory, eventFactory) {
    var vm = this;

    vm.name = $state.current.name;
    vm.data = {};

    vm.search = search;

    init();

    function init() {
        if (vm.name === 'sugerencias') {
            vm.header = 'Sugerencias';
            vm.subheader = 'Nos interesan tus comentarios o sugerencias';
        } else {
            vm.header = 'Contacto';
            vm.subheader = 'Llena los datos y nos comunicaremos contigo';
        }
    }

    function search(form) {
        if (form.$dirty && form.$valid) {
            contactFactory.send(vm.data)
                .then(function(response) {
                    $state.go('home');
                    eventFactory.broadcastError(undefined);
                    eventFactory.broadcastSuccess('Tu mensaje ha sido enviado con éxito. Nosotros te contactaremos.');
                }, function(response) {
                    eventFactory.broadcastError(response.errorMessage ? response.errorMessage :
                        'Ocurrió un error. Por favor vuelve a intentarlo mas tarde.');
                });
        }
    }
}
