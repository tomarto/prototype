package com.prototype.payment

import com.prototype.BaseController
import com.prototype.payment.command.PaymentCommand
import grails.plugin.springsecurity.annotation.Secured

class PaymentController extends BaseController {

    PaymentService paymentService

    @Secured(value = ['isAuthenticated()'], httpMethod = 'POST')
    def pay(PaymentCommand payment) {
        executeSafelyForJSON("pay($payment)", 'Unable to process your payment', log) {
            return paymentService.pay(payment)
        }
    }
}
