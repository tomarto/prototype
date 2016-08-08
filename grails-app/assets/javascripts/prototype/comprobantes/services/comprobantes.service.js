//= wrapped

angular
    .module('prototype.comprobantes')
    .factory('comprobantesService', comprobantesService);

function comprobantesService($http, $q, $timeout, $cacheFactory, $sessionStorage, Upload, pendingRequestFactory) {
    var comprobantesCache = $cacheFactory('comprobantes'),
        factory = {
            get: get,
            save: save
        };

    return factory;

    function get() {
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
                })
                .catch(function(response) {
                    deferred.reject(response.data);
                    pendingRequestFactory.complete(request);
                });
        }

        return deferred.promise;
    }

    function save(archivos, type) {
        comprobantesCache.remove('comprobantes');
        var deferred = $q.defer(),
            request = pendingRequestFactory.register(),
            requestOptions = {
                url: 'api/comprobantes',
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
