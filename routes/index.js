'use strict';

const express = require('express');
const router = express.Router();
const checkSession = require('../lib/checkSession');
const constants = require('../lib/constants');

/**
 * GET /
 * Redirige a página especifica en función de la sesion de usuario
 */
router.get('/', checkSession(), function(req, res, next) {
    let renderVars = {};
    renderVars.constants = constants;

    return res.render('index.ejs', renderVars);
});

module.exports = router;