package com.actions.prototype.jaxb.comprobantes

import javax.xml.bind.annotation.XmlAccessType
import javax.xml.bind.annotation.XmlAccessorType
import javax.xml.bind.annotation.XmlElement

@XmlAccessorType(XmlAccessType.FIELD)
class Complemento {

    @XmlElement(name = 'TimbreFiscalDigital')
    TimbreFiscalDigital timbreFiscalDigital
}
