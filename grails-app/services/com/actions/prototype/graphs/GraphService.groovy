package com.actions.prototype.graphs

import com.actions.prototype.graph.jaxb.Comprobante
import grails.transaction.Transactional

import javax.xml.bind.JAXBContext
import javax.xml.bind.Unmarshaller

@Transactional
class GraphService {

    static Unmarshaller unmarshaller = JAXBContext.newInstance(Comprobante.class).createUnmarshaller()

    def getData() {
        Enumeration<URL> en = this.class.getClassLoader().getResources('comprobantes')
        if(en.hasMoreElements()) {
            File[] files = new File(en.nextElement().toURI()).listFiles()
            if(files.length > 0) {
                def result = []
                files.each {file ->
                    result << unmarshaller.unmarshal(file)
                }
                return [comprobantes: result]
            }
        }

        return [comprobantes: []]
    }
}
