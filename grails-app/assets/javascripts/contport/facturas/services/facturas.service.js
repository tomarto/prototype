//= wrapped

angular
    .module('contport.facturas')
    .factory('facturasService', facturasService);

function facturasService($http, $q, $timeout, $cacheFactory, $sessionStorage, Upload, pendingRequestFactory) {
    var facturasCache = $cacheFactory('facturas'),
        factory = {
            get: get,
            save: save
        };

    return factory;

    function get() {
        var deferred = $q.defer(),
            cachedFacturas = facturasCache.get('facturas'),
            request,
            requestOptions;

        if (cachedFacturas) {
            deferred.resolve(cachedFacturas);
        } else {
            request = pendingRequestFactory.register();
            requestOptions = {
                headers : {
                    'Authorization' : $sessionStorage.authorization
                },
                timeout: request.timeoutPromise
            };

            $http.get('api/facturas', requestOptions)
                .then(function(response) {
                    facturasCache.put('facturas', response.data.result.facturas);
                    deferred.resolve(response.data.result.facturas);
                    pendingRequestFactory.complete(request);
                })
                .catch(function(response) {
                    deferred.reject(response.data);
                    pendingRequestFactory.complete(request);
                });
        }

        return deferred.promise;
    }

    function save(archivos, type) {
        facturasCache.remove('facturas');
        var deferred = $q.defer(),
            request = pendingRequestFactory.register(),
            requestOptions = {
                url: 'api/facturas',
                headers: {
                    'Authorization' : $sessionStorage.authorization
                }
            },
            requestsToComplete = archivos.length,
            requestsCompleted = 0,
            requestsFailed = 0;

        angular.forEach(archivos, function(archivo) {
            requestOptions.data = {file : archivo, type: type};
            archivo.upload = Upload.upload(requestOptions);

            archivo.upload.then(function (success) {
                requestsCompleted++;
                $timeout(function() {
                    archivo.result = success.data;
                });
            }, function (error) {
                requestsFailed++;
            }, function (evt) {
                archivo.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            })
            .finally(function() {
                if(requestsToComplete === (requestsCompleted + requestsFailed)) {
                    if(requestsFailed) {
                        deferred.reject(requestsFailed);
                    } else {
                        deferred.resolve(requestsCompleted);
                    }
                    pendingRequestFactory.complete(request);
                }
            });
        });

        return deferred.promise;
    }
}
