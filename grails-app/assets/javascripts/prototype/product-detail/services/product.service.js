//= wrapped

angular
    .module('prototype.productDetail')
    .factory('productService', productService);

function productService($http, $q, $sessionStorage, pendingRequestFactory) {
    var factory = {
        list: list,
        save: save
    };

    return factory;

    function list() {
        var deferred = $q.defer(),
            request,
            requestOptions;

        request = pendingRequestFactory.register();
        requestOptions = {
            url: 'api/product',
            method: 'GET',
            timeout: request.timeoutPromise
        };

        $http(requestOptions)
            .then(function(success) {
                deferred.resolve(success.data.result);
                pendingRequestFactory.complete(request);
            })
            .catch(function(error) {
                deferred.reject(error.data);
                pendingRequestFactory.complete(request);
            });

        return deferred.promise;
    }

    function save(product) {
        var deferred = $q.defer(),
            request,
            requestOptions;

        request = pendingRequestFactory.register();
        requestOptions = {
            url: 'api/product',
            method: 'POST',
            data: product,
            headers : {
                'Authorization' : $sessionStorage.authorization
            },
            timeout: request.timeoutPromise
        };

        $http(requestOptions)
            .then(function(success) {
                deferred.resolve(success.data.result);
                pendingRequestFactory.complete(request);
            })
            .catch(function(error) {
                deferred.reject(error.data);
                pendingRequestFactory.complete(request);
            });

        return deferred.promise;
    }
}
