package com.actions.prototype.user.command

import grails.validation.Validateable
import org.grails.databinding.BindingFormat

class UserCommand implements Validateable {

    String username
    String firstName
    String lastName
    String password
    String passwordConfirmation
    String email
    @BindingFormat('MM/dd/yyyy')
    Date birthDate

    static constraints = {
        username blank: false
        birthDate nullable: true
        email nullable: true
    }
}
