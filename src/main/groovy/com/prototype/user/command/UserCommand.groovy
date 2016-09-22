package com.prototype.user.command

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
        username nullable: false, blank: false, minSize: 5, maxSize: 25, matches: '^[a-zA-Z0-9_]*$'
        firstName nullable: false, blank: false, minSize: 2, maxSize: 25, matches: '^[a-zA-Z0-9]*$'
        lastName nullable: false, blank: false, minSize: 2, maxSize: 25, matches: '^[a-zA-Z0-9]*$'
        email nullable: false, blank: false, matches: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z0-9]{2,4}$'
        password nullable: false, blank: false, minSize: 6, maxSize: 25, matches: '^[a-zA-Z0-9_.$]*$'
        passwordConfirmation nullable: false, blank: false, minSize: 6, maxSize: 16, validator: { val, obj, errors ->
            if(obj.password == val) {
                return true;
            }

            errors.rejectValue('passwordConfirmation', 'Passwords does not match')
            return false
        }
        birthDate nullable: true, blank: true
    }
}
