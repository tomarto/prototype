package com.prototype.user

import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString

import org.grails.databinding.BindingFormat

@EqualsAndHashCode(includes = 'username')
@ToString(includes = 'username', includeNames = true, includePackage = false)
class AppUser implements Serializable {

    private static final long serialVersionUID = 1

    transient springSecurityService

    String username
    String firstName
    String lastName
    String password
    String email
    @BindingFormat('MM/dd/yyyy')
    Date birthDate
    boolean enabled = true
    boolean accountExpired
    boolean accountLocked
    boolean passwordExpired

    AppUser(String username, String firstName, String lastName, String password, String email, Date birthDate) {
        this()
        this.username = username
        this.firstName = firstName
        this.lastName = lastName
        this.password = password
        this.email = email
        this.birthDate = birthDate
    }

    Set<Role> getAuthorities() {
        UserRole.findAllByUser(this)*.role
    }

    def beforeInsert() {
        encodePassword()
    }

    def beforeUpdate() {
        if (isDirty('password')) {
            encodePassword()
        }
    }

    protected void encodePassword() {
        password = springSecurityService?.passwordEncoder ? springSecurityService.encodePassword(password) : password
    }

    static transients = ['springSecurityService']

    static constraints = {
        username blank: false, unique: true
        birthDate nullable: true
        email nullable: true
    }

    static mapping = {
        password column: '`password`'
    }
}
