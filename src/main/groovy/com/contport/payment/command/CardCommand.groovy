package com.contport.payment.command

import grails.validation.Validateable

class CardCommand implements Validateable {
    String cardNumber
    Integer expirationMonth
    Integer expirationYear
    String cvc

    static constraints = {
        cardNumber creditCard: true
        expirationMonth min: 1, max: 12
        expirationYear min: Calendar.getInstance().get(Calendar.YEAR), max: Calendar.getInstance().get(Calendar.YEAR) + 10
        cvc minSize: 3, maxSize: 3
    }
}
