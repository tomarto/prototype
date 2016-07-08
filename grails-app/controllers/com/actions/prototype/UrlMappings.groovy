package com.actions.prototype

class UrlMappings {

    static mappings = {
        group '/api', {
            get '/application/index'(controller: 'application', action: 'index')

            get '/actions'(controller: 'action', action: 'list')

            group '/user', {
                get '/'(controller: 'user', action: 'get')
                post '/'(controller: 'user', action: 'save')
            }

            '/mail/contact'(controller: 'mail', action: 'send')
            post '/pay'(controller: 'payment', action: 'pay')
        }

        '/**'(view:'/index.gsp')
        '/grails-home'(view:'/grails-home.gsp')
        '500'(view:'/error')
        '404'(view:'/notFound')
    }
}
