package com.prototype.user

import com.prototype.exception.ConflictedRequestException
import com.prototype.exception.InvalidRequestException
import com.prototype.user.command.UserCommand
import grails.converters.JSON
import grails.transaction.Transactional

@Transactional
class UserService {

    def springSecurityService

    def getLoggedUser() {
        return springSecurityService.currentUser
    }

    def save(UserCommand userCommand) {
        if (AppUser.findByUsername(userCommand?.username)) {
            throw new ConflictedRequestException('Username already exist')
        }

        if (!userCommand?.password?.equals(userCommand?.passwordConfirmation)) {
            throw new InvalidRequestException('Please verify the fields and try again')
        }

        AppUser newUser = new AppUser(JSON.parse((userCommand as JSON).toString())).save()
        UserRole.create(newUser, Role.findByAuthority('ROLE_USER'))

        return newUser
    }
}
