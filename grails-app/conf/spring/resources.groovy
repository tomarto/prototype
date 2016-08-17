import com.prototype.marshallers.DateMarshaller
import com.prototype.spring.security.DefaultOauthUserDetailsService
import grails.rest.render.json.JsonRenderer

import com.prototype.user.AppUser

// Place your Spring DSL code here
beans = {
    dateMarshaller(DateMarshaller)

    userJSONRenderer(JsonRenderer, AppUser) {
        excludes = ['password', 'enabled', 'accountExpired', 'accountLocked', 'passwordExpired']
    }

    oauthUserDetailsService(DefaultOauthUserDetailsService) { bean ->
        bean.autowire = 'byName'
    }
}
