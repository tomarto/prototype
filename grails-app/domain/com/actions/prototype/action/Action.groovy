package com.actions.prototype.action

class Action {

    Integer id
    String name
    Date dateCreated
    Date dueDate;

    static mapping = {
        autoTimestamp false
    }
}
