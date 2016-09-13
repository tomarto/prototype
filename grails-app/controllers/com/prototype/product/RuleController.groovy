package com.prototype.product

import com.prototype.BaseController
import com.prototype.product.command.RuleCommand
import grails.plugin.springsecurity.annotation.Secured

class RuleController extends BaseController {

    RuleService ruleService

    @Secured(value = ['isAuthenticated()'], httpMethod = 'GET')
    def list() {
        executeSafelyForJSON("list()", 'Unable to list Product Rules for user', log) {
            return ruleService.list()
        }
    }

    @Secured(value = ['isAuthenticated()'], httpMethod = 'POST')
    def save(RuleCommand command) {
        executeSafelyForJSON("save(RuleCommand command)", 'Unable to save new Product Rule', log) {
            return ruleService.save(command)
        }
    }
}
