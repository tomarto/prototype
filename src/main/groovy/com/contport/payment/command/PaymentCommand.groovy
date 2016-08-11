package com.contport.payment.command

import grails.validation.Validateable

class PaymentCommand implements Validateable {

    String username
    Double amount
    CardCommand card

    static constraints = {
        username blank: false
        amount min: Double.MIN_VALUE, max: Double.MAX_VALUE
    }
}
