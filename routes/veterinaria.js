'use strict';

const express = require('express');
const router = express.Router();
const checkSession = require('../lib/checkSession');
const constants = require('../lib/constants');
const veterinaryController = require('../controllers/veterinaryController');

router.get('/:veterinaryId', checkSession(), function(req, res, next) {
    let renderVars = {};
    renderVars.constants = constants;
    renderVars.veterinary = null;

    let array = req.params.veterinaryId.split('_');
    let veterinaryId = array.pop();

    // Obtiene la veterinaria por su id
    veterinaryController.getVeterinary(veterinaryId)
        .then(veterinary => {
            renderVars.veterinary = veterinary;
            return res.render('veterinary.ejs', renderVars);
        })
        .catch(error => {
            return res.status(500).send({ error: error });
        });
});

router.post('/rate', checkSession(), function(req, res, next) {

    let value = Number(req.body.rate);
    let comment = req.body.comment;
    let veterinaryId = req.body.veterinaryId;

    // Obtiene la veterinaria por su id
    veterinaryController.addRateToVeterinary(value, comment, veterinaryId, req.session.id)
        .then(rate => {
            return res.json({ success: true, data: rate });
        })
        .catch(error => {
            return res.status(500).send({ error: error });
        });
});

module.exports = router;