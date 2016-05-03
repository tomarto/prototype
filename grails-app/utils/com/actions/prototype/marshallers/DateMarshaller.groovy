package com.actions.prototype.marshallers

import grails.converters.JSON

import java.text.DateFormat
import java.text.SimpleDateFormat

import javax.annotation.PostConstruct

class DateMarshaller {

    static final DateFormat df = new SimpleDateFormat("MM/dd/yyyy")

    @PostConstruct
    void registerMarshallers() {
        JSON.registerObjectMarshaller(Date) {
            return df.format(it)
        }
    }
}
