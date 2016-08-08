//= wrapped

angular
    .module('prototype.core')
    .factory('notifyingService', notifyingService);

function notifyingService($rootScope) {
    var factory = {
        subscribe: subscribe,
        notify: notify
    };

    return factory;

    function subscribe(scope, eventName, callback) {
        var handler = $rootScope.$on(eventName, callback);
        scope.$on('$destroy', handler);
    }

    function notify(eventName, value) {
        $rootScope.$emit(eventName, value);
    }
}
