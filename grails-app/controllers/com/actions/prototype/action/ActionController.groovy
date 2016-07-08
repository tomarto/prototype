package com.actions.prototype.action

import com.actions.prototype.BaseController
import com.actions.prototype.actions.command.ActionCommand
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
