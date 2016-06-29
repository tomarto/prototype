grails {
    plugin {
        springsecurity {
            authority {
                className = 'com.actions.prototype.user.Role'
            }
            userLookup {
                userDomainClassName = 'com.actions.prototype.user.User'
                authorityJoinClassName = 'com.actions.prototype.user.UserRole'
            }
            rest {
                token {
                    validation {
                        enableAnonymousAccess = true
                    }
                    storage {
                        gorm {
                            tokenDomainClassName = 'com.actions.prototype.security.AuthenticationToken'
                        }
                    }
                }
            }
            rejectIfNoRule = false
            filterChain {
                chainMap = [
                    // Stateless chain
                    [
                        pattern: '/api/**',
                        filters: 'JOINED_FILTERS,-exceptionTranslationFilter,-authenticationProcessingFilter,-securityContextPersistenceFilter,-rememberMeAuthenticationFilter'
                    ],
                    // Traditional chain
                    [
                        pattern: '/**',
                        filters: 'JOINED_FILTERS,-restTokenValidationFilter,-restExceptionTranslationFilter'
                    ]
                ]
            }
            controllerAnnotations {
                staticRules = [
                    [pattern: '/',               access: ['permitAll']],
                    [pattern: '/error',          access: ['permitAll']],
                    [pattern: '/index',          access: ['permitAll']],
                    [pattern: '/index.gsp',      access: ['permitAll']],
                    [pattern: '/grails-home.gsp',access: ['permitAll']],
                    [pattern: '/shutdown',       access: ['permitAll']],
                    [pattern: '/assets/**',      access: ['permitAll']],
                    [pattern: '/**/js/**',       access: ['permitAll']],
                    [pattern: '/**/css/**',      access: ['permitAll']],
                    [pattern: '/**/images/**',   access: ['permitAll']],
                    [pattern: '/**/favicon.ico', access: ['permitAll']]
                ]
            }
        }
    }
    mail {
        host = "smtp.gmail.com"
        port = 587
        username = "tomarto11@gmail.com"
        password = ""
        props = [
            "mail.smtp.starttls.enable": "true",
            "mail.smtp.EnableSSL.enable": "true",
            "mail.smtp.auth": "true",
            "mail.smtp.socketFactory.port": "587",
            "mail.smtp.socketFactory.class": "javax.net.ssl.SSLSocketFactory",
            "mail.smtp.socketFactory.fallback": "false",
        ]
    }
}
