package com.prototype.product

import com.prototype.BaseController
import com.prototype.product.command.ProductCommand
import grails.plugin.springsecurity.annotation.Secured

class ProductController extends BaseController {

    ProductService productService

    @Secured(value = ['permitAll'], httpMethod = 'GET')
    def list() {
        executeSafelyForJSON("list()", 'Unable to list Products for user', log) {
            return productService.list()
        }
    }

    @Secured(value = ['isAuthenticated()'], httpMethod = 'POST')
    def save(ProductCommand command) {
        executeSafelyForJSON("save(ProductCommand command)", 'Unable to save new Product', log) {
            return productService.save(command)
        }
    }
}
