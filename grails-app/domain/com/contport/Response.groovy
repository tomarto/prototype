package com.contport

class Response {

    def static build(result) {
        return [result: result]
    }

    def static build(String errorMessage) {
        return [errorMessage: errorMessage, errorCode: new Date().getTime()]
    }
}
