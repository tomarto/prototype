package com.contport.actions.command

import grails.validation.Validateable
import org.grails.databinding.BindingFormat

class ActionCommand implements Validateable {

    Integer id
    String name
    @BindingFormat('MM/dd/yyyy')
    Date dateCreated
    @BindingFormat('MM/dd/yyyy')
    Date dueDate
    Integer rows
    Integer offset
}
