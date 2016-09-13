package com.prototype.product

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
        type null: false, blank: false
        typeName null: false, blank: false
        name null: false, blank: false
        displayName null: false, blank: false
        value null: false, blank: true
    }
}
