//= wrapped

'use strict';

angular
    .module('prototype.index')
    .factory('userFactory', userFactory);

function userFactory($http, $q, $sessionStorage, constant, eventFactory, pendingRequestFactory) {
    var factory = {
        getUser: getUser,
        login: login,
        logout: logout,
        register: register
    };

    return factory;

    function getUser() {
        var deferred = $q.defer(),
            request,
            requestOptions;

        if ($sessionStorage.loggedUser) {
            deferred.resolve($sessionStorage.loggedUser);
        } else {
            request = pendingRequestFactory.register();
            requestOptions = {
                url: constant.api.user.get,
                method: 'GET',
                headers : {
                    'Authorization' : $sessionStorage.authorization
                },
                timeout: request.timeoutPromise
            };

            $http(requestOptions)
                .then(function(response) {
                    $sessionStorage.loggedUser = response.data.result;
                    eventFactory.broadcast('login', response.data.result);
                    deferred.resolve(response.data.result);
                    pendingRequestFactory.complete(request);
                }, function(response) {
                    deferred.reject(response.data);
                    pendingRequestFactory.complete(request);
                });
        }

        return deferred.promise;
    }

    function login(credentials) {
        var deferred = $q.defer(),
            request,
            requestOptions;

        delete $sessionStorage.token;
        delete $sessionStorage.authorization;
        delete $sessionStorage.loggedUser;

        request = pendingRequestFactory.register();
        requestOptions = {
            url: constant.api.user.login,
            method: 'POST',
            data: credentials,
            timeout: request.timeoutPromise
        };

        $http(requestOptions)
            .then(function(response) {
                $sessionStorage.authorization = response.data.token_type + ' ' + response.data.access_token;
                deferred.resolve('Success');
                pendingRequestFactory.complete(request);
            }, function(response) {
                deferred.reject('Error');
                pendingRequestFactory.complete(request);
            });

        return deferred.promise;
    }

    function logout() {
        var deferred = $q.defer(),
            request,
            requestOptions;

        request = pendingRequestFactory.register();
        requestOptions = {
            url: constant.api.user.logout,
            method: 'POST',
            headers : {
                'Authorization' : $sessionStorage.authorization
            },
            timeout: request.timeoutPromise
        };

        $http(requestOptions)
            .then(function(response) {
                delete $sessionStorage.token;
                delete $sessionStorage.authorization;
                delete $sessionStorage.loggedUser;
                deferred.resolve('Success');
                pendingRequestFactory.complete(request);
            }, function(response) {
                deferred.reject('Error');
                pendingRequestFactory.complete(request);
            });

        return deferred.promise;
    }

    function register(registerData) {
        var deferred = $q.defer(),
            request,
            requestOptions = {
                url: constant.api.user.register,
                method: 'POST',
                data: registerData
            };

        request = pendingRequestFactory.register();
        requestOptions = {
            url: constant.api.user.register,
            method: 'POST',
            data: registerData,
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
