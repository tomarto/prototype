package com.prototype.product

import grails.validation.Validateable

class RuleCommand implements Validateable {

    String name
    String displayName
    List<ControlCommand> controls

    static constraints = {
        name null: false, blank: false
        displayName null: false, blank: false
    }
}
