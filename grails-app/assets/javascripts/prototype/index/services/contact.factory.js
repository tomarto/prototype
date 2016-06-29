//= wrapped

angular
    .module('prototype.index')
    .factory('contactFactory', contactFactory);

function contactFactory($http, $q, $sessionStorage, constant, eventFactory, pendingRequestFactory) {
    var factory = {
            send: send
        };

    return factory;

    function send(data) {
        var deferred = $q.defer(),
            request,
            requestOptions;

        request = pendingRequestFactory.register();
        requestOptions = {
            url: 'api/mail/contact',
            method: 'POST',
            data: data,
            timeout: request.timeoutPromise
        };

        $http(requestOptions)
            .then(function(response) {
                deferred.resolve(response.data.result);
                pendingRequestFactory.complete(request);
            }, function(response) {
                deferred.reject(response.data);
                pendingRequestFactory.complete(request);
            });

        return deferred.promise;
    }
}
