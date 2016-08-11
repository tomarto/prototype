package com.contport.facturas

import com.contport.BaseController
import grails.plugin.springsecurity.annotation.Secured

class FacturasController extends BaseController {

    FacturasService facturasService

    @Secured(value = ['isAuthenticated()'], httpMethod = 'GET')
    def get() {
        executeSafelyForJSON("get()", 'Unable to fetch facturas', log) {
            return facturasService.getData()
        }
    }

    @Secured(value = ['isAuthenticated()'], httpMethod = 'POST')
    def save() {
        executeSafelyForJSON("save()", 'Unable to save your file', log) {
            return facturasService.save(request.getFile('file'))
        }
    }

    @Secured(value = ['isAnonymous()'], httpMethod = 'DELETE')
    def delete() {
        executeSafelyForJSON("delete()", 'Unable to delete your files', log) {
            return facturasService.delete()
        }
    }
}
