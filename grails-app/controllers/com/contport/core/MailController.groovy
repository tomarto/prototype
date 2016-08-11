package com.contport.core

import grails.plugin.springsecurity.annotation.Secured
import grails.transaction.Transactional

class MailController {

    static allowedMethods = [send: "POST"]
    static responseFormats = ['json']

    def mailService

    @Transactional
    @Secured('isAnonymous()')
    def send() {
        def jsonObject = request.JSON

        mailService.sendMail {
            to 'tomarto11@gmail.com'
            subject 'Contacto'
            text "Nombre: ${jsonObject.name} ***** Nombre de Equipo: ${jsonObject.teamName} ***** Correo Electrónico: ${jsonObject.email} ***** Telefono: ${jsonObject.phone} ***** Tipo; ${jsonObject.type} ***** Comentario: ${jsonObject.comment}"
        }

        def res = [
                result: 'SUCCESS'
        ]

        respond res
    }
}
