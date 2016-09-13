package com.prototype.product

class Option {

    String name
    String value

    static belongsTo = [control: Control]

    static constraints = {
        name nullable: true, blank: true
        value nullable: false
    }
}
