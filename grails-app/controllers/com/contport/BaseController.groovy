package com.contport

import com.contport.exception.ConflictedRequestException
import com.contport.exception.InvalidRequestException
import com.contport.resource.Response
import grails.converters.JSON
import org.apache.commons.logging.Log

abstract class BaseController {

    protected def executeSafelyForJSON(String method, String errorMessage, Log logger, Closure closure) {
        executeSafely(method, errorMessage, logger) {
            def result = closure.call()

            if(!response.committed) {
                if(result == null) {
                    throw new RuntimeException("No data found.")
                }

                result = render (Response.build(result) as JSON)
            }

            return result
        }
    }

    protected def executeSafely(String method, String errorMessage, Log logger, Closure closure) {
        try {
            def result = closure.call()
            logger.info("$method 'Success'}")
            return result
        } catch (InvalidRequestException e) {
            logger.error("$method : $errorMessage with ${params}", e)
            response.status = 400
            render (Response.build(e.message) as JSON)
        } catch (ConflictedRequestException e) {
            logger.error("$method : $errorMessage with ${params}", e)
            response.status = 409
            render (Response.build(e.message) as JSON)
        } catch (e) {
            logger.error("$method : $errorMessage with ${params}", e)
            response.status = 500
            render (Response.build(e.message) as JSON)
        }
    }
}
