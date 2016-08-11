package com.contport.facturas

import com.contport.facturas.utils.UnzipUtility
import com.contport.contabilidad.generated.jaxb.facturas.Comprobante
import grails.transaction.Transactional
import org.springframework.web.multipart.MultipartFile
import org.xml.sax.InputSource

import javax.xml.bind.JAXBContext
import java.text.SimpleDateFormat

@Transactional
class FacturasService {

    private static final String XML_EXTENSION = '.XML'
    private static final String ZIP_EXTENSION = '.ZIP'
    private static final String TMP_DIR = '/tmp'
    private static final JAXBContext JAXB_CONTEXT_INSTANCE = JAXBContext.newInstance(Comprobante.class)
    private static final SimpleDateFormat FORMATTER = new SimpleDateFormat('MMMM-yyyy', new Locale('es', 'MX'))

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

        return [facturas: result]
    }

    def save(MultipartFile file) {
        String fileName = file.getOriginalFilename()?.toUpperCase()
        if(fileName?.endsWith(XML_EXTENSION)) {
            saveFactura(file)
        } else if(fileName?.endsWith(ZIP_EXTENSION)) {
            UnzipUtility unzipper = UnzipUtility.getInstance(TMP_DIR)
            unzipper.unzip(file)
            saveFacturasFromDirectory(new File(TMP_DIR).listFiles())
            unzipper.delete()
        } else {
            throw new Exception('Not a valid format')
        }

        return [facturas: 'Success']
    }

    private void saveFacturasFromDirectory(File[] files) {
        for (File file : files) {
            if(file.isDirectory()) {
                saveFacturasFromDirectory(file.listFiles())
            } else {
                if(file?.getName()?.toUpperCase()?.endsWith(XML_EXTENSION)) {
                    saveFactura(file)
                }
            }
        }
    }

    private void saveFactura(File file) {
        Comprobante comprobante = JAXB_CONTEXT_INSTANCE.createUnmarshaller().unmarshal(file)
        new Document(uuid: comprobante.complemento.timbreFiscalDigital.uuid, name: file.getName(),
                username: springSecurityService.currentUser.username, data: file.getBytes(),
                type: comprobante.tipoDeComprobante.capitalize()).save()
    }

    private void saveFactura(MultipartFile file) {
        Comprobante comprobante = JAXB_CONTEXT_INSTANCE.createUnmarshaller().unmarshal(
                new InputSource(new ByteArrayInputStream(file.getBytes())))
        new Document(uuid: comprobante.complemento.timbreFiscalDigital.uuid, name: file.getOriginalFilename(),
                username: springSecurityService.currentUser.username, data: file.getBytes(),
                type: comprobante.tipoDeComprobante.capitalize()).save()
    }

    def delete() {
        Document.delete()
        return [facturas: 'Success']
    }
}
