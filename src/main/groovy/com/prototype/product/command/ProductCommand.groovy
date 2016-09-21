package com.prototype.product.command

class ProductCommand {

    String name
    String shortDescription
    String description
    Integer price
    Integer inventory
    boolean inStock

    static constraints = {
        inventory null: true, blank: true
        inStock null: true, blank: true
    }
}
