package com.actions.prototype.jaxb.comprobantes

import javax.xml.bind.annotation.XmlAccessType
import javax.xml.bind.annotation.XmlAccessorType
import javax.xml.bind.annotation.XmlAttribute

@XmlAccessorType(XmlAccessType.FIELD)
class DomicilioFiscal {

    @XmlAttribute
    String calle

    @XmlAttribute(name = 'noExterior')
    String numeroExterior

    @XmlAttribute(name = 'noInterior')
    String numeroInterior

    @XmlAttribute
    String colonia

    @XmlAttribute
    String referencia

    @XmlAttribute
    String municipio

    @XmlAttribute
    String estado

    @XmlAttribute
    String pais

    @XmlAttribute
    String codigoPostal
}
