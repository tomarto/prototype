package com.actions.prototype.payment

import com.actions.prototype.exception.ConflictedRequestException
import com.actions.prototype.payment.command.PaymentCommand
import com.stripe.exception.CardException
import com.stripe.exception.InvalidRequestException
import com.stripe.exception.RateLimitException
import com.stripe.model.Charge
import grails.transaction.Transactional

@Transactional
class PaymentService {

    def pay(PaymentCommand payment) {
        def chargeMap = [
            'amount': (payment.amount * 100).toInteger(),
            'currency': 'usd',
            'card': [
                'number': payment.card.cardNumber,
                'exp_month': payment.card.expirationMonth,
                'exp_year': payment.card.expirationYear
            ]
        ]

        try {
            return Charge.create(chargeMap)
        } catch (CardException | InvalidRequestException e) {
            // Since it's a decline, CardException will be caught
            // OR
            // Invalid parameters were supplied to Stripe's API
            throw new com.actions.prototype.exception.InvalidRequestException(e.getMessage())
        } catch (RateLimitException e) {
            // Too many requests made to the API too quickly
            throw new ConflictedRequestException('Please wait before submitting another payment.')
        } catch (Exception e) {
            // Authentication with Stripe's API failed
            // (maybe you changed API keys recently)
            // OR
            // Network communication with Stripe failed
            // OR
            // Display a very generic error to the user, and maybe send
            // yourself an email
            // OR
            // Something else happened, completely unrelated to Stripe
            throw new RuntimeException('An error occurred. Please contact support.')
        }
    }
}
