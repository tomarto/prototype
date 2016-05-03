//= wrapped

angular
    .module("prototype.index")
    .factory("applicationDataFactory", applicationDataFactory);

function applicationDataFactory($http) {
    return {
        get: function() {
            return $http({method: "GET", url: "api/application/index"});
        }
    }
}

