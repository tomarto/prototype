//= wrapped

angular
    .module('prototype.core')
    .factory('eventFactory', eventFactory);

function eventFactory($rootScope) {
    var factory = {
        broadcast: broadcast,
        broadcastError: broadcastError,
        broadcastSuccess: broadcastSuccess
    };

    return factory;

    function broadcast(eventName, message) {
        $rootScope.$broadcast(eventName, message);
    }

    function broadcastError(message) {
        $rootScope.$broadcast('error', message);
    }

    function broadcastSuccess(message) {
        $rootScope.$broadcast('success', message);
    }
}
