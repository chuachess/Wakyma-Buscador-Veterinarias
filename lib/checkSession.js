'use strict';

module.exports = (allowedUserTypes) => {
    return function(req, res, next) {
        // Usuario sin sesión de usuario
        if (!req.session.isLogged) {
            console.log("Creando nueva sesión");
            req.session.isLogged = true;
        }
        return next();
    }
};