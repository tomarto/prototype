package com.prototype.json

import com.prototype.product.response.ControlResponse
import com.prototype.product.response.OptionResponse
import grails.converters.JSON

class CustomObjectMarshallers {
    static init() {
        registerMarshallers()
    }

    static final EXCLUDE = ['class', 'constraints', 'constraintsMap', 'errors']
//    static final ID_EXCLUDE = ['id']

    private static void registerMarshallers() {
        //Standard Behavior without ID
        [
                ControlResponse, OptionResponse
        ].each {
            JSON.registerObjectMarshaller(it, 7) { return toJSON(it) }
        }

        //Custom
//      JSON.registerObjectMarshaller(UserInfo, 7) { return toJSON(it, ['dn', 'constraints', 'constraintsMap', 'errors'] + ID_EXCLUDE) }
//      JSON.registerObjectMarshaller(Site, 7) { return toJSON(it, ['parentCompanyName']) }
    }

    /**
     * Simple POGO marshaller (NOT for use with Domain classes).
     *
     * @param obj
     * @param excludes
     * @return
     */
    private static def toJSON(def obj, def excludes = null) {
        if(obj && obj.getClass().isEnum()) {
            return obj.name()
        }

        def map = [:]

        Map filteredProperties = filteredProperties(obj, excludes)
        List<String> orderedPropertiesNames = orderedProperties(obj, excludes)

        orderedPropertiesNames.each { name ->
            Map.Entry prop = filteredProperties.find { it.key == name}
            //Just skips nulls. Don't throw out empty strings or integer values of 0...
            if (prop.value != null) {
                if(prop.value && prop.value.getClass().isEnum()) {
                    map.putAt(prop.key, prop.value.name())
                } else {
                    map.putAt(prop.key, prop.value)
                }
            }
        }

        return map
    }

    private static List<String> orderedProperties(def obj, def excludes) {
        List<String> allFieldsOrdered = allFieldsOrdered(obj.getClass())
        Map filteredProperties = filteredProperties(obj, excludes)
        List<String> orderedProperties = []

        allFieldsOrdered.each { field ->
            if(filteredProperties.find{ it.key == field}) {
                orderedProperties << field
            }
        }

        filteredProperties.each { prop ->
            if(!orderedProperties.find { it == prop.key }) {
                orderedProperties << prop.key
            }
        }

        return orderedProperties
    }

    private static List<String> allFieldsOrdered(Class clazz) {
        //get the superclass first, unless the superclass is Object
        List<String> orderedFields = clazz.superclass.superclass? allFieldsOrdered(clazz.superclass) : []
        List<String> currentFields = clazz.getDeclaredFields().grep { !it.synthetic }.collect{ it.name }

        currentFields.each { cf ->
            if(!orderedFields.contains(cf)) {
                orderedFields << cf
            }
        }

        return orderedFields
    }

    private static Map filteredProperties(def obj, def excludes) {
        return obj.getProperties().findAll{ !EXCLUDE.contains(it.key) && (excludes == null || !excludes.contains(it.key)) }
    }
}