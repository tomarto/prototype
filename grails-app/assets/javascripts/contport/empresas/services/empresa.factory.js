//= wrapped

angular
    .module('contport.empresas')
    .factory('empresaFactory', empresaFactory);

function empresaFactory($http, $q, $cacheFactory, pendingRequestFactory) {
    var empresaCache = $cacheFactory('empresaCache'),
        factory = {
            register: register
        };

    return factory;

    function register(data) {
        var deferred = $q.defer(),
            request,
            requestOptions;

        request = pendingRequestFactory.register();
        requestOptions = {
            url: 'api/empresa',
            method: 'POST',
            data: data,
            timeout: request.timeoutPromise
        };

        $http(requestOptions)
            .then(function(response) {
                deferred.resolve(response.data.result);
                pendingRequestFactory.complete(request);
            })
            .catch(function(response) {
                deferred.reject(response.data);
                pendingRequestFactory.complete(request);
            });

        return deferred.promise;
    }
}
