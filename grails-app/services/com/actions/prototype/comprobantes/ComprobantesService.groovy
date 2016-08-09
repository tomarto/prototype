package com.actions.prototype.comprobantes

import com.actions.prototype.generated.jaxb.comprobantes.Comprobante
import grails.transaction.Transactional
import org.springframework.web.multipart.MultipartFile
import org.xml.sax.InputSource

import javax.xml.bind.JAXBContext
import java.text.SimpleDateFormat

@Transactional
class ComprobantesService {

    static final JAXBContext JAXB_CONTEXT_INSTANCE = JAXBContext.newInstance(Comprobante.class)
    static final SimpleDateFormat FORMATTER = new SimpleDateFormat('MMMM-yyyy', new Locale('es', 'MX'))

    def springSecurityService

    def getData() {
        def types = [:]
        Document.findAllByUsername(springSecurityService.currentUser.username).each { doc ->
            if(types.get(doc.type) == null) {
                types.put(doc.type, []);
            }
            types.get(doc.type) << JAXB_CONTEXT_INSTANCE.createUnmarshaller().unmarshal(
                    new InputSource(new ByteArrayInputStream(doc.data)))
        }

        def result = [:]
        types.each { type, comprobantes ->
            if(result.get(type) == null) {
                result.put(type, [:])
            }
            comprobantes.sort { a, b ->
                a.fecha.toGregorianCalendar().getTime() <=> b.fecha.toGregorianCalendar().getTime()
            }.each { comprobante ->
                String fecha = FORMATTER.format(comprobante.fecha.toGregorianCalendar().getTime())
                if(result.get(type).get(fecha) == null) {
                    result.get(type).put(fecha, [])
                }
                result.get(type).get(fecha) << comprobante
            }
        }

        return [comprobantes: result]
    }

    def save(MultipartFile file, String type) {
        Comprobante comprobante = JAXB_CONTEXT_INSTANCE.createUnmarshaller().unmarshal(
                new InputSource(new ByteArrayInputStream(file.getBytes())))
        new Document(uuid: comprobante.complemento.timbreFiscalDigital.uuid, name: file.getOriginalFilename(),
                username: springSecurityService.currentUser.username, data: file.getBytes(), type: type).save()
        return [comprobante: 'Success']
    }

    def delete() {
        Document.delete()
        return [comprobante: 'Success']
    }
}
