'use strict';

const Parse = require('parse/node');
const ParseInit = require('../lib/parseInit');
let veterinaryController = {};

// Listado de veterinarias
veterinaryController.getVeterinariesByLocation = (latitude, longitude, km) => {
    let promise = new Parse.Promise();

    let query = new Parse.Query('Veterinary');
    query.limit(20);
    query.containedIn('state', [0,2]);
    query.withinKilometers("geolocation", new Parse.GeoPoint(latitude, longitude), km);
    query.find()
        .then(veterinaries => {
            promise.resolve(veterinaries);
        })
        .catch(error => {
            console.log("Error en getVeterinariesByLocation: " + error);
            promise.reject(error);
        });

    let userInteraction = new Parse.Object('UserInteraction');
    userInteraction.set("date", new Date());
    userInteraction.set("category", 10);
    userInteraction.set("type", 10);
    userInteraction.set("searchGeolocation", new Parse.GeoPoint(latitude, longitude));
    userInteraction.save();

    return promise;
};

// Obtiene datos de la veterinaria desde su id
veterinaryController.getVeterinary = (veterinaryId) => {
    let promise = new Parse.Promise();

    let veterinaryQuery = new Parse.Query('Veterinary');
    veterinaryQuery.include("schedule");
    veterinaryQuery.get(veterinaryId)
        .then(veterinary => {
            promise.resolve(veterinary);
        })
        .catch(error => {
            promise.reject(error);
        });

    return promise;
};

// Obtiene datos de la veterinaria desde su id
veterinaryController.addRateToVeterinary = (value, comment, veterinaryId, sessionId) => {
    let promise = new Parse.Promise();


    let rateQuery = new Parse.Query('Rate');
    rateQuery.equalTo("sessionId", sessionId);
    rateQuery.equalTo("veterinary", {"__type": "Pointer", "className": "Veterinary", "objectId": veterinaryId});
    rateQuery.first()
        .then(rate => {
            if (rate) {
                console.log("Y una mierda" + JSON.stringify(rate));
            } else {
                console.log("Todo ok, no hay nada");
            }
        })
        .catch(error => {
            promise.reject(error);
        });
/*
    let rate = new Parse.Object('Rate');
    rate.set("state", 1);
    rate.set("value", value);
    rate.set("comment", comment);
    rate.set('veterinary', {"__type": "Pointer", "className": "Veterinary", "objectId": veterinaryId});
    rate.set("sessionId", sessionId);
    rate.save()
        .then(rateSaved => {
            promise.resolve(rateSaved);
        })
        .catch(error => {
            promise.reject(error);
        });*/

    return promise;
};

module.exports = veterinaryController;