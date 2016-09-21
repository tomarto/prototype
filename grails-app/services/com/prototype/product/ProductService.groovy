package com.prototype.product

import com.prototype.product.command.ProductCommand
import grails.transaction.Transactional
import org.codehaus.groovy.runtime.InvokerHelper

@Transactional
class ProductService {

    def springSecurityService

    def list() {
        def list = Product.list()
        return [
            products: list,
            total: list.totalCount
        ]
    }

    def save(ProductCommand command) {
        Product product = new Product()
        use(InvokerHelper) {
            product.setProperties(command.properties)
        }
        product.username = springSecurityService.currentUser.username

        product.save()

        return [message: 'Product has been successfully saved']
    }
}
