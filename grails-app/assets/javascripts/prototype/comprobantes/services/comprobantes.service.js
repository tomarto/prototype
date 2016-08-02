//= wrapped

angular
    .module('prototype.comprobantes')
    .factory('comprobantesService', comprobantesService);

function comprobantesService($http, $q, $cacheFactory, $sessionStorage, pendingRequestFactory) {
    var comprobantesCache = $cacheFactory('comprobantes'),
        factory = {
            getComprobantes: getComprobantes
        };

    return factory;

    function getComprobantes() {
        var deferred = $q.defer(),
            cachedComprobantes = comprobantesCache.get('comprobantes'),
            request,
            requestOptions;

        if (cachedComprobantes) {
            deferred.resolve(cachedComprobantes);
        } else {
            request = pendingRequestFactory.register();
            requestOptions = {
                headers : {
                    'Authorization' : $sessionStorage.authorization
                },
                timeout: request.timeoutPromise
            };

            $http.get('api/comprobantes', requestOptions)
                .then(function(response) {
                    comprobantesCache.put('comprobantes', response.data.result.comprobantes);
                    deferred.resolve(response.data.result.comprobantes);
                    pendingRequestFactory.complete(request);
                }, function(response) {
                    deferred.reject(response.data);
                    pendingRequestFactory.complete(request);
                });
        }

        return deferred.promise;
    }
}
