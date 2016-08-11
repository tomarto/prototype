//= wrapped

angular
    .module('contport.index')
    .factory('paymentFactory', paymentFactory);

function paymentFactory($http, $q, $sessionStorage, pendingRequestFactory) {
    var factory = {
        pay: pay
    };

    return factory;

    function pay(data) {
        var deferred = $q.defer(),
            request,
            requestOptions;

        data.username = $sessionStorage.loggedUser.username;
        request = pendingRequestFactory.register();
        requestOptions = {
            url: 'api/pay',
            method: 'POST',
            data: data,
            headers : {
                'Authorization' : $sessionStorage.authorization
            },
            timeout: request.timeoutPromise
        };

        $http(requestOptions)
            .then(function(response) {
                deferred.resolve(response);
                pendingRequestFactory.complete(request);
            })
            .catch(function(response) {
                deferred.reject(response);
                pendingRequestFactory.complete(request);
            });

        return deferred.promise;
    }
}
