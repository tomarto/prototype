package com.actions.prototype.comprobantes

class Document {

    String uuid
    String name
    String username
    byte[] data
    String type
    Date uploadDate = new Date()

    static constraints = {
        uuid blank: false, nullable:false, unique: true
        name blank: false, nullable:false
        data blank: true, nullable:true, maxSize: 20971520
    }
}
