package com.actions.prototype.jaxb.comprobantes

import javax.xml.bind.annotation.*

@XmlRootElement(name = 'Comprobante', namespace = 'http://www.sat.gob.mx/cfd/3')
@XmlAccessorType(XmlAccessType.FIELD)
class Comprobante {

    @XmlAttribute(name = 'noCertificado')
    String numeroCertificado

    @XmlAttribute
    String sello

    @XmlAttribute
    String certificado

    @XmlAttribute
    String fecha

    @XmlAttribute(name = 'LugarExpedicion')
    String lugarExpedicion

    @XmlAttribute
    String tipoDeComprobante

    @XmlAttribute
    String formaDePago

    @XmlAttribute
    String metodoDePago

    @XmlAttribute
    Double subTotal

    @XmlAttribute
    Double total

    @XmlElement(name = 'Emisor')
    Emisor emisor

    @XmlElement(name = 'Receptor')
    Receptor receptor

    @XmlElement(name = 'Conceptos')
    Conceptos conceptos

    @XmlElement(name = 'Impuestos')
    Impuesto Impuestos

    @XmlElement(name = 'Complemento')
    Complemento complemento
}
