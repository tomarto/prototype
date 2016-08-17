package com.prototype.action

import com.prototype.BaseController
import com.prototype.actions.command.ActionCommand
import grails.plugin.springsecurity.annotation.Secured

class ActionController extends BaseController {

    ActionService actionService

    @Secured(value = ['isAuthenticated()'], httpMethod = 'GET')
    def list(ActionCommand actionCommand) {
        executeSafelyForJSON("list()", 'Unable to fetch Actions', log) {
            return actionService.getActions(actionCommand)
        }
    }
}
