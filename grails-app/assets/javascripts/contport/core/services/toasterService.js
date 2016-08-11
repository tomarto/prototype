//= wrapped

angular
    .module('contport.core')
    .factory('toasterService', toasterService);

function toasterService(toaster) {
    var factory = {
        success: success,
        error: error,
        warning: warning,
        working: working,
        clear: clear
    };

    return factory;

    function success(body) {
        pop('success', body, false);
    }

    function error(body) {
        pop('error', body, false);
    }

    function warning(body) {
        pop('warning', body, true);
    }

    function working() {
        pop('wait', 'Working...', false);
    }

    function clear() {
        toaster.clear();
    }

    function pop(type, body, showCloseButton) {
        toaster.pop({type: type, title: 'SAM', body: body, showCloseButton: showCloseButton});
    }
}
