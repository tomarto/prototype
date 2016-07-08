package com.actions.prototype.actions.command

import org.grails.databinding.BindingFormat

import java.time.LocalDate

class ActionCommand {

    Integer id
    String name
    @BindingFormat('MM/dd/yyyy')
    Date dateCreated
    @BindingFormat('MM/dd/yyyy')
    Date dueDate
    Integer rows
    Integer offset
}
