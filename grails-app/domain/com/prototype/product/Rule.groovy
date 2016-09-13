package com.prototype.product

class Rule {

    String name
    String displayName
    String username

    static hasMany = [controls: Control]
}
