package com.actions.prototype.action

import grails.transaction.Transactional
import com.actions.prototype.actions.command.ActionCommand

@Transactional
class ActionService {

    def getActions(ActionCommand actionCommand) {
        Integer rows = actionCommand.rows ?: 25
        Integer offset = actionCommand.offset ?: 0

        def list = Action.createCriteria().list(max: rows, offset: offset) {
            if (actionCommand.id) {
                eq('id', actionCommand.id)
            }
            if (actionCommand.name) {
                eq('name', actionCommand.name)
            }
            if (actionCommand.dateCreated) {
                between('dateCreated', actionCommand.dateCreated, actionCommand.dateCreated + 1)
            }
            if (actionCommand.dueDate) {
                between('dueDate', actionCommand.dueDate, actionCommand.dueDate + 1)
            }
        }

        return [
            actions: list,
            total: list.totalCount
        ]
    }
}
