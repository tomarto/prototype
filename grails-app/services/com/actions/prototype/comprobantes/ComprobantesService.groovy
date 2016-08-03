package com.actions.prototype.comprobantes

import com.actions.prototype.generated.jaxb.comprobantes.Comprobante
import grails.transaction.Transactional

import javax.xml.bind.JAXBContext
import javax.xml.bind.Unmarshaller

@Transactional
class ComprobantesService {

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
                println "RESULT: $result"
                return [comprobantes: result]
            }
        }

        return [comprobantes: []]
    }
}
