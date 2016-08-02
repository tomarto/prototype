package com.actions.prototype.graphs

import com.actions.prototype.BaseController
import grails.plugin.springsecurity.annotation.Secured

class GraphController extends BaseController {

    GraphService graphService

    @Secured(value = ['permitAll'], httpMethod = 'GET')
    def get() {
        executeSafelyForJSON("get()", 'Unable to fetch comprobantes for graphs', log) {
            return graphService.getData()
        }
    }
}
