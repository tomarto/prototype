package com.prototype.product.command

import grails.validation.Validateable

class ProductCommand implements Validateable {

    String name
    String shortDescription
    String description
    Integer price
    Integer inventory
    boolean inStock

    static constraints = {
        name nullable: false, blank: false, minSize: 2, maxSize: 50
        shortDescription nullable: false, blank: false, minSize: 2, maxSize: 500
        price nullable: false, blank: false
        inventory validator: { val, obj, errors ->
            if(obj.inStock && val > 0) {
                errors.rejectValue('inventory', 'Inventory should be empty when "In Stock" is selected.')
                return false
            }
            if(!obj.inStock && val < 1) {
                errors.rejectValue('inventory', 'Inventory is required.')
                return false
            }

            return true
        }
        inStock validator: { val, obj, errors ->
            if(val && obj.inventory > 0) {
                errors.rejectValue('inStock', 'Inventory should be empty when "In Stock" is selected.')
                return false
            }
            if(!val && obj.inventory < 1) {
                errors.rejectValue('inventory', 'In Stock is required.')
                return false
            }

            return true
        }
    }
}
