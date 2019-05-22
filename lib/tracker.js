'use strict';

// Función para trackear información de usuario
module.exports = () => {
    return function (req, res, next) {
        console.log('----------- INFORMACION DE TRACKER MOLONA ----------- ');
        console.log('IP CLIENTE: ' + req.ip);
        console.log('USERAGENT: ' + req.headers['user-agent']);
        console.log('METODO: ' + req.method);
        console.log('REFERER: ' + req.headers.referer);
        console.log('URL: ' + req._parsedOriginalUrl.pathname);
        console.log('ORIGINAL URL: ' + req.originalUrl);
        console.log('QUERY: ' + JSON.stringify(req.query));
        console.log('PARAMS: ' + JSON.stringify(req.params));
        console.log('BODY: ' + JSON.stringify(req.body));
        console.log('SESSION-ID: ' + req.sessionID);
        console.log('Datos Session: ' + JSON.stringify(req.session));

        next();
    }
};