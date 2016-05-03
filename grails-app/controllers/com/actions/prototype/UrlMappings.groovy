package com.actions.prototype

class UrlMappings {

    static mappings = {
        group '/api', {
            '/application/index'(controller: 'application', action: 'index')

            '/actions'(controller: 'action', action: 'list')

            group '/user', {
                '/'(controller: 'user', action: 'get')
                '/register'(controller: 'user', action: 'save')
            }
        }

        '/**'(view:'/index.gsp')
        '/grails-home'(view:'/grails-home.gsp')
        '500'(view:'/error')
        '404'(view:'/notFound')
    }
}
