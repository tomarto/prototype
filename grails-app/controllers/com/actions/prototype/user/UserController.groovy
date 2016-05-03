package com.actions.prototype.user

import grails.plugin.springsecurity.annotation.Secured
import grails.transaction.Transactional

class UserController {

    static allowedMethods = [get: 'GET', save: 'POST']
    static responseFormats = ['json']

    def springSecurityService

    @Secured('isAuthenticated()')
    def get() {
        def res = [
            result: springSecurityService.currentUser
        ]
        respond res
    }

    @Transactional
    @Secured('isAnonymous()')
    def save() {
        def res = [:]
        def jsonObject = request.JSON

        if (User.findByUsername(jsonObject.username)) {
            res.error = 'Username already exist.'
            response.status = 409
            respond res
            return
        }

        def newUser = new User(jsonObject)

        if (!jsonObject?.password.equals(jsonObject?.passwordConfirmation) || newUser.hasErrors()) {
            res.error = 'Please verify the fields.'
            response.status = 400
            respond res
            return
        }

        newUser.save()
        def userRole = Role.findByAuthority('ROLE_USER')
        UserRole.create(newUser, userRole)

        res.result = newUser
        respond res
    }
}
