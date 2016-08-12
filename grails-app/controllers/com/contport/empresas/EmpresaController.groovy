package com.contport.empresas

import com.contport.BaseController
import grails.plugin.springsecurity.annotation.Secured

class EmpresaController extends BaseController {

    @Secured(value = ['isAuthenticated()'], httpMethod = 'POST')
    def registrar() {
        executeSafelyForJSON("registrar()", 'No se pudo registrar la empresa', log) {
            throw new RuntimeException('Ocurrió un error al tratar de registrar la empresa')
        }
    }
}
