import com.actions.prototype.marshallers.DateMarshaller
import com.actions.prototype.spring.security.DefaultOauthUserDetailsService
import grails.rest.render.json.JsonRenderer

import com.actions.prototype.user.User

// Place your Spring DSL code here
beans = {
    dateMarshaller(DateMarshaller)

    userJSONRenderer(JsonRenderer, User) {
        excludes = ['password', 'enabled', 'accountExpired', 'accountLocked', 'passwordExpired']
    }

    oauthUserDetailsService(DefaultOauthUserDetailsService) { bean ->
        bean.autowire = 'byName'
    }
}
