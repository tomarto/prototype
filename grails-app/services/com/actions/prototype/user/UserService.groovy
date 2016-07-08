package com.actions.prototype.user

import com.actions.prototype.exception.ConflictedRequestException
import com.actions.prototype.exception.InvalidRequestException
import com.actions.prototype.user.command.UserCommand
import grails.converters.JSON
import grails.transaction.Transactional

@Transactional
class UserService {

    def springSecurityService

    def getLoggedUser() {
        return springSecurityService.currentUser
    }

    def save(UserCommand userCommand) {
        if (User.findByUsername(userCommand?.username)) {
            throw new ConflictedRequestException('Username already exist')
        }

        if (!userCommand?.password?.equals(userCommand?.passwordConfirmation)) {
            throw new InvalidRequestException('Please verify the fields and try again')
        }

        User newUser = new User(JSON.parse((userCommand as JSON).toString())).save()
        UserRole.create(newUser, Role.findByAuthority('ROLE_USER'))

        return newUser
    }
}
