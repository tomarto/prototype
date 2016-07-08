package com.actions.prototype.payment

import com.actions.prototype.BaseController
import com.actions.prototype.payment.command.PaymentCommand
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
