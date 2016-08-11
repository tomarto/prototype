package com.contport.exception

import groovy.transform.InheritConstructors

@InheritConstructors
class ConflictedRequestException extends RuntimeException {

    ConflictedRequestException(String s) {
        super((String) s)
    }

    ConflictedRequestException(String s, Throwable throwable) {
        super(s, throwable)
    }

    ConflictedRequestException(Throwable throwable) {
        super((Throwable) throwable)
    }
}
