package com.actions.prototype.jaxb.comprobantes

import javax.xml.bind.annotation.XmlAccessType
import javax.xml.bind.annotation.XmlAccessorType
import javax.xml.bind.annotation.XmlAttribute
import javax.xml.bind.annotation.XmlElement

@XmlAccessorType(XmlAccessType.FIELD)
class Emisor {

    @XmlAttribute
    String rfc

    @XmlAttribute
    String nombre

    @XmlElement(name = 'DomicilioFiscal')
    DomicilioFiscal domicilioFiscal

    @XmlElement(name = 'RegimenFiscal')
    RegimenFiscal regimenFiscal
}
