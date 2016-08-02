package com.actions.prototype.graph.jaxb

import javax.xml.bind.annotation.XmlAccessType
import javax.xml.bind.annotation.XmlAccessorType
import javax.xml.bind.annotation.XmlAttribute

@XmlAccessorType(XmlAccessType.FIELD)
class Receptor {

    @XmlAttribute
    String rfc

    @XmlAttribute
    String nombre
}
