package com.prototype.product.command

import grails.validation.Validateable

class OptionCommand implements Validateable {

    String name
    String value

    static constraints = {
        name nullable: false, blank: false
        value nullable: false, blank: false, minSize: 2, maxSize: 50, matches: '^[a-zA-Z0-9_ ]*$'
    }
}
