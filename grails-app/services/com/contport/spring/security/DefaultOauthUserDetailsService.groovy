package com.contport.spring.security

import com.contport.user.Role
import com.contport.user.AppUser
import com.contport.user.UserRole
import grails.plugin.springsecurity.rest.oauth.OauthUser
import grails.plugin.springsecurity.rest.oauth.OauthUserDetailsService
import groovy.util.logging.Slf4j
import org.pac4j.core.profile.CommonProfile
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsChecker
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException

@Slf4j
class DefaultOauthUserDetailsService implements OauthUserDetailsService {

    @Delegate
    UserDetailsService userDetailsService

    UserDetailsChecker preAuthenticationChecks

    OauthUser loadUserByUserProfile(CommonProfile userProfile, Collection<GrantedAuthority> defaultRoles)
            throws UsernameNotFoundException {
        UserDetails userDetails
        OauthUser oauthUser

        try {
            log.info "Trying to fetch user details for user profile: ${userProfile}"
            userDetails = userDetailsService.loadUserByUsername userProfile.id

            log.info "Checking user details with ${preAuthenticationChecks.class.name}"
            preAuthenticationChecks?.check(userDetails)

            Collection<GrantedAuthority> allRoles = userDetails.authorities
            oauthUser = new OauthUser(userDetails.username, userDetails.password, allRoles, userProfile)
        } catch (UsernameNotFoundException unfe) {
            log.info "AppUser not found. Creating a new one with default roles: ${defaultRoles}"
            AppUser user = new AppUser(username: userProfile.id, firstName: userProfile.firstName, lastName: userProfile.familyName,
                    password: userProfile.id).save()
            UserRole.create(user, Role.findByAuthority('ROLE_USER'))
            oauthUser = new OauthUser(userProfile.id, userProfile.id, defaultRoles, userProfile)
        }

        return oauthUser
    }
}