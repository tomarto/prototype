import com.contport.marshallers.DateMarshaller
import com.contport.spring.security.DefaultOauthUserDetailsService
import grails.rest.render.json.JsonRenderer

import com.contport.user.AppUser

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
