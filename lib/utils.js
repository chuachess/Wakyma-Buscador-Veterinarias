'use strict';

/**
 *  Utilidades para esos pequeños trozos de codigo repetitivos
 *
 */
const moment = require('moment');
const request = require('request');

let utils = {};

// Convierte un objeto Parse.Object en un JSON con todos los valores informados
utils.parseObjectToJSON = (parseObject) => {
    // Parse tiene la fea costumbre de enmascarar los valores de objetos "Pointer" al pasarlos a JSON aunque los tenga
    // en memoria, obligándote a realizar continuamente el "get" sobre Punteros hijos de punteros...
    // ... But God Hears You...

    function iterateObject(inputObject, fromArray = false) {

        var salida = null;
        if (fromArray) {
            salida = [];
        } else {
            salida = {};
        }

        var inputJSON = JSON.parse(JSON.stringify(inputObject));

        for (var key in inputJSON) {

            if (key == '__type' || key == 'className' || key == 'objectId' || key == 'createdAt' || key == 'updatedAt') {
                // keys especiales de Parse, copiamos su clave:valor
                salida[key] = inputJSON[key];

            } else if (fromArray) {
                // Si ésta extracción pertenece a un Array, simplemente profundiza y mete el resultado en salida de tipo array para evitar que meta numeros como keys
                salida.push(iterateObject(inputObject[key]));

            } else {
                // Hace un get sobre el objeto Parse para obtener el valor de sus keys (si están en local)
                var value = inputObject.get(key);
                if (typeof value === 'object' && inputJSON[key]['__type'] != 'Date') {
                    // Es un objeto y NO es de la clase Date de parse(el get se cargó sus atributos)

                    if (Array.isArray(value)) {
                        // Si el valor es un array, profundiza informando que venimos de un array de objetos
                        salida[key] = iterateObject(value, true);
                    } else {
                        // Profundiza en el Objeto
                        salida[key] = iterateObject(value);
                    }

                } else {
                    // Se trata de un key:valor standard
                    salida[key] = value;
                }
            }

        }
        return salida;
    }

    return iterateObject(parseObject);
};

// Convierte una hora de entrada (10:30) en un Date en formato UTC
utils.timeToParseDate = (time) => {
    // Crea fecha: 0000-01-01T00:00:00.000Z
    let momentDate = moment.utc([0, 1, 1, 0, 0, 0, 0]);

    let timeSplit = time.split(':');
    momentDate = momentDate.hour(timeSplit[0]);
    momentDate = momentDate.minute(timeSplit[1]);

    return momentDate.toDate();
};

// Convierte una duración de entrada(en minutos) en un Date en formato UTC
utils.durationInMinutesToParseDate = (duration) => {
    // Crea fecha: 0000-01-01T00:00:00.000Z
    let momentDate = moment.utc([0, 1, 1, 0, 0, 0, 0]);
    momentDate = momentDate.minutes(duration);
    return momentDate.toDate();
};

// Convierte una Fecha de Entrada (12-02-2018) en un Date en formato UTC
utils.dateToParseDate = (inDate) => {
    let inDateSplitted = inDate.split("-");
    let strInDate = inDateSplitted[2] + "-" + inDateSplitted[1] + "-" + inDateSplitted[0] + 'T00:00:00.000Z';
    let momentDate = moment.utc(strInDate);

    return momentDate.toDate();
};

// Convierte una fecha de entrada (DD-MM-YYYY) en un Moment UTC
utils.dateToMomentUTC = (inDate) => {
    let dateSplitted = inDate.split("-");
    let strDate = dateSplitted[2] + "-" + dateSplitted[1] + "-" + dateSplitted[0] + 'T00:00:00.000Z';
    
    return moment.utc(strDate);
};

// Convierte una fecha de entrada (DD-MM-YYYY) y una hora de entrada (HH:MM) en un Moment UTC
utils.dateAndTimeToMomentUTC = (inDate, inTime) => {
    let dateSplitted = inDate.split("-");
    let strDate = `${dateSplitted[2]}-${dateSplitted[1]}-${dateSplitted[0]}T${inTime}:00.000Z`;

    return moment.utc(strDate);
};

// Actualiza la fecha de un Moment sin variar su hora
utils.updateDateFromMoment = (inMoment, inDay, inMonth, inYear) => {
    inMoment.date(inDay);
    inMoment.month(inMonth);
    inMoment.year(inYear);

    return inMoment;
};

utils.callParseJob = (jobName, jsonData, ) => {
    const postUrl = `${process.env.PARSE_SERVER_URL}/jobs/${jobName}`;
    const postOptions = {
        url: postUrl,
        headers: {
            'X-Parse-Application-Id': process.env.PARSE_APP_ID,
            'X-Parse-Master-Key': process.env.PARSE_MASTER_KEY
        },
        json: jsonData
    };

    request.post(postOptions);
};

module.exports = utils;