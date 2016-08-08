package com.actions.prototype.comprobantes

class Document {

    String name
    String username
    byte[] data
    Date uploadDate = new Date()

    static constraints = {
        name blank: false, nullable:false, unique: true
        data blank: true, nullable:true, maxSize: 20971520
    }
}
