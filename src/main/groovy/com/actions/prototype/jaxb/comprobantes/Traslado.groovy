package com.actions.prototype.jaxb.comprobantes

import javax.xml.bind.annotation.XmlAccessType
import javax.xml.bind.annotation.XmlAccessorType
import javax.xml.bind.annotation.XmlAttribute

@XmlAccessorType(XmlAccessType.FIELD)
class Traslado {

    @XmlAttribute
    String impuesto

    @XmlAttribute
    Double tasa

    @XmlAttribute
    Double importe
}
