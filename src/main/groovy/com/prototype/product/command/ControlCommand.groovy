package com.prototype.product.command

import grails.validation.Validateable

class ControlCommand implements Validateable {

    String type
    String typeName
    String name
    String displayName
    String templateUrl
    String value
    List<OptionCommand> dropdownOptions
    List<OptionCommand> checkBoxOptions
    List<OptionCommand> radioButtonOptions

    static constraints = {
        type nullable: false, blank: false
        typeName nullable: false, blank: false
        templateUrl nullable: false, blank: false
        name nullable: false, blank: false, minSize: 2, maxSize: 50, matches: '^[a-zA-Z0-9_]*$'
        displayName nullable: false, blank: false, minSize: 2, maxSize: 50, matches: '^[a-zA-Z0-9_ ]*$'
        value nullable: false, blank: true
    }
}
