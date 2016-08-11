grails {
    plugin {
        springsecurity {
            authority {
                className = 'com.contport.user.Role'
            }
            userLookup {
                userDomainClassName = 'com.contport.user.AppUser'
                authorityJoinClassName = 'com.contport.user.UserRole'
            }
            rest {
                token {
                    validation {
                        enableAnonymousAccess = true
                    }
                    storage {
                        gorm {
                            tokenDomainClassName = 'com.contport.security.AuthenticationToken'
                        }
                    }
                }
                oauth {
                    frontendCallbackUrl = { String tokenValue -> "${grails.serverURL}oauthLogin?token=${tokenValue}" }
                    facebook {
                        client = org.pac4j.oauth.client.FacebookClient
                        key = '195522433854618'
                        secret= 'e066dc9d26a25d2e6993d41bf0831de1'
                        scope = 'email'
                        fields = 'id,name,first_name,middle_name,last_name'
                        defaultRoles = ['ROLE_USER']
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

environments {
    development {
        grails {
            serverURL = 'http://localhost:9090/'
        }
    }
    production {
        dataSource {
            dbCreate = "update"
            driverClassName = "org.postgresql.Driver"
            dialect = org.hibernate.dialect.PostgreSQLDialect
            uri = new URI(System.env.DATABASE_URL ?: "postgres://localhost:5432/test")
            url = "jdbc:postgresql://" + uri.host + ":" + uri.port + uri.path + "?sslmode=require"
            username = uri.userInfo.split(":")[0]
            password = uri.userInfo.split(":")[1]
        }
        grails {
            serverURL = 'https://isra-comprobantes.herokuapp.com/'
        }
    }
}