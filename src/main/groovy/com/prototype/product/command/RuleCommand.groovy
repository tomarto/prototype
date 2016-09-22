package com.prototype.product.command

import grails.validation.Validateable

class RuleCommand implements Validateable {

    String name
    String displayName
    List<ControlCommand> controls

    static constraints = {
        name nullable: false, blank: false, minSize: 2, maxSize: 50, matches: '^[a-zA-Z0-9_ ]*$'
        displayName nullable: false, blank: false, minSize: 2, maxSize: 50, matches: '^[a-zA-Z0-9_ ]*$'
        controls nullable: false
    }
}
