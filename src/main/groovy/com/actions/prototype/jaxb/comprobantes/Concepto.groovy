package com.actions.prototype.jaxb.comprobantes

import javax.xml.bind.annotation.XmlAccessType
import javax.xml.bind.annotation.XmlAccessorType
import javax.xml.bind.annotation.XmlAttribute
import javax.xml.bind.annotation.XmlRootElement

@XmlAccessorType(XmlAccessType.FIELD)
class Concepto {

    @XmlAttribute
    Integer cantidad

    @XmlAttribute
    String unidad

    @XmlAttribute
    String descripcion

    @XmlAttribute
    Double valorUnitario

    @XmlAttribute
    Double importe
}
