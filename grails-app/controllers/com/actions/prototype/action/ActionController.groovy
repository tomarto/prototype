package com.actions.prototype.action

import grails.plugin.springsecurity.annotation.Secured
import grails.transaction.Transactional

@Transactional(readOnly = true)
class ActionController {

    static allowedMethods = [list: "GET"]
    static responseFormats = ['json']

    @Secured('isAuthenticated()')
    def list(Integer max) {
        def rows = params.rows ? Integer.parseInt(params.rows) : 25
        def offset = params.offset ? Integer.parseInt(params.offset) : 0

        def list = Action.createCriteria().list(max: rows, offset: offset) {
            if (params.id) {
                eq('id', Integer.parseInt(params.id))
            }
            if (params.name) {
                eq('name', params.name)
            }
            if (params.dateCreated) {
                def dateCreated = Date.parse('MM/dd/yyyy', params.dateCreated)
                between('dateCreated', dateCreated, dateCreated + 1)
            }
            if (params.dueDate) {
                def dueDate = Date.parse('MM/dd/yyyy', params.dueDate)
                between('dueDate', dueDate, dueDate + 1)
            }
        }

        def res = [
                result: [
                        actions: list,
                        total: list.totalCount
                ]
        ]

        respond res
    }
}
