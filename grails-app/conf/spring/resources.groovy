import grails.rest.render.json.JsonRenderer

import com.actions.prototype.user.User

// Place your Spring DSL code here
beans = {
    dateMarshaller(com.actions.prototype.marshallers.DateMarshaller)

    userJSONRenderer(JsonRenderer, User) {
        excludes = ['password', 'enabled', 'accountExpired', 'accountLocked', 'passwordExpired']
    }

    oauthUserDetailsService(com.prototype.spring.security.DefaultOauthUserDetailsService) { bean ->
        bean.autowire = 'byName'
    }
}
