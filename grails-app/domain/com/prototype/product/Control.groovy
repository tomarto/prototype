package com.prototype.product

class Control {

    String type
    String typeName
    String name
    String displayName
    String templateUrl
    String value

    static hasMany = [dropdownOptions: Option, checkBoxOptions: Option, radioButtonOptions: Option]

    static belongsTo = [rule: Rule]

    static constraints = {
        value nullable: true, blank: true
    }
}
