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

    @Secured(value = ['isAuthenticated()'], httpMethod = 'POST')
    def save() {
        executeSafelyForJSON("save()", 'Unable to save your file', log) {
            return comprobantesService.save(request.getFile('file'), request.getParameter('type'))
        }
    }

    @Secured(value = ['isAnonymous()'], httpMethod = 'DELETE')
    def delete() {
        executeSafelyForJSON("delete()", 'Unable to delete your files', log) {
            return comprobantesService.delete()
        }
    }
}
