package com.prototype.exception

import groovy.transform.InheritConstructors

@InheritConstructors
class InvalidRequestException extends RuntimeException {

    InvalidRequestException(String s) {
        super((String) s)
    }

    InvalidRequestException(String s, Throwable throwable) {
        super(s, throwable)
    }

    InvalidRequestException(Throwable throwable) {
        super((Throwable) throwable)
    }
}
