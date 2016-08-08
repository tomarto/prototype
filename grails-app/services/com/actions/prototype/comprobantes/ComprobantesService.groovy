package com.actions.prototype.comprobantes

import com.actions.prototype.generated.jaxb.comprobantes.Comprobante
import grails.transaction.Transactional
import org.springframework.web.multipart.MultipartFile
import org.xml.sax.InputSource

import javax.xml.bind.JAXBContext
import javax.xml.bind.Unmarshaller

@Transactional
class ComprobantesService {

    static Unmarshaller unmarshaller = JAXBContext.newInstance(Comprobante.class).createUnmarshaller()

    def springSecurityService

    def getData() {
        def result = []
        Document.findAllByUsername(springSecurityService.currentUser.username).each { doc ->
            result << unmarshaller.unmarshal(new InputSource(new ByteArrayInputStream(doc.data)))
        }

        return [comprobantes: result]
    }

    def save(MultipartFile file) {
        new Document(name: file.getOriginalFilename(), username: springSecurityService.currentUser.username,
                data: file.getBytes()).save()
        return [comprobante: 'Success']
    }
}
