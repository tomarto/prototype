package com.actions.prototype

import grails.core.GrailsApplication
import grails.plugin.springsecurity.annotation.Secured
import grails.plugins.GrailsPluginManager

class ApplicationController {

    static allowedMethods = [index: 'GET']

    GrailsApplication grailsApplication
    GrailsPluginManager pluginManager

    @Secured('permitAll')
    def index() {
        [grailsApplication: grailsApplication, pluginManager: pluginManager]
    }
}
