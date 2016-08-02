package com.actions.prototype.comprobantes

import com.actions.prototype.BaseController
import grails.plugin.springsecurity.annotation.Secured

class ComprobantesController extends BaseController {

    ComprobantesService comprobantesService

    @Secured(value = ['isAuthenticated()'], httpMethod = 'GET')
    def get() {
        executeSafelyForJSON("get()", 'Unable to fetch comprobantes', log) {
            return comprobantesService.getData()
        }
    }
}
