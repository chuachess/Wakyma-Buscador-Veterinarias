'use strict';

const express = require('express');
const router = express.Router();
const checkSession = require('../lib/checkSession');
const constants = require('../lib/constants');
const veterinaryController = require('../controllers/veterinaryController');

router.get('/busqueda', checkSession(), function(req, res, next) {
    let renderVars = {};
    renderVars.constants = constants;
    renderVars.searchPlace = req.query.direccion;
    renderVars.latitude = Number(req.query.latitud);
    renderVars.longitude =  Number(req.query.longitud);

    console.log(renderVars.latitude + " ; " + renderVars.longitude);
    // Obtiene las veterinaria de la ciudad
    veterinaryController.getVeterinariesByLocation(renderVars.latitude, renderVars.longitude, 2)
        .then(veterinaries => {
            renderVars.veterinaries = veterinaries;
            return res.render('veterinaries.ejs', renderVars);
        })
        .catch(error => {
            return res.status(500).send({ error: error });
        });
});

router.get('/:city', checkSession(), function(req, res, next) {
    let city = req.params.city;

    let renderVars = {};
    renderVars.constants = constants;
    renderVars.searchPlace = null;
    renderVars.latitude = null;
    renderVars.longitude = null;

    if (city == "madrid") {
        renderVars.latitude = 40.416775;
        renderVars.longitude = -3.70379;
    } else if (city == "barcelona") {
        renderVars.latitude = 41.385064;
        renderVars.longitude = 2.173403;
    } else if (city == "valencia") {
        renderVars.latitude = 39.469908;
        renderVars.longitude = -0.376288;
    } else {
        return res.status(404).send();
    }

    renderVars.searchPlace = city.replace(/-/g, ' ');

    // Obtiene las veterinaria de la ciudad
    veterinaryController.getVeterinariesByLocation(renderVars.latitude, renderVars.longitude, 10)
        .then(veterinaries => {
            renderVars.veterinaries = veterinaries;
            return res.render('veterinaries.ejs', renderVars);
        })
        .catch(error => {
            return res.status(500).send({ error: error });
        });
});

router.get('/:city/:zone', checkSession(), function(req, res, next) {
    let city = req.params.city;
    let zone = req.params.zone;

    let renderVars = {};
    renderVars.constants = constants;
    renderVars.searchPlace = null;
    renderVars.latitude = null;
    renderVars.longitude = null;

    if (city == "madrid") {
        if (zone == "alcala-de-henares") {
            renderVars.searchPlace = "Alcalá de Henares";
            renderVars.latitude = 40.481979;
            renderVars.longitude = -3.363542;
        } else if (zone == "alcobendas") {
            renderVars.searchPlace = "Alcobendas";
            renderVars.latitude = 40.537251;
            renderVars.longitude = -3.637225;
        } else if (zone == "alcorcon") {
            renderVars.searchPlace = "Alcorcón";
            renderVars.latitude = 40.346845;
            renderVars.longitude = -3.827844;
        } else if (zone == "almagro") {
            renderVars.searchPlace = "Almagro";
            renderVars.latitude = 40.433862;
            renderVars.longitude = -3.695287;
        } else if (zone == "arganda-del-rey") {
            renderVars.searchPlace = "Arganda del Rey";
            renderVars.latitude = 40.306446;
            renderVars.longitude = -3.447906;
        } else if (zone == "arganzuela") {
            renderVars.searchPlace = "Arganzuela";
            renderVars.latitude = 40.398897;
            renderVars.longitude = -3.710223;
        } else if (zone == "arguelles") {
            renderVars.searchPlace = "Argüelles";
            renderVars.latitude = 40.429414;
            renderVars.longitude = -3.721413;
        } else if (zone == "carabanchel") {
            renderVars.searchPlace = "Carabanchel";
            renderVars.latitude = 40.377818;
            renderVars.longitude = -3.751232;
        } else if (zone == "centro") {
            renderVars.searchPlace = "Centro";
            renderVars.latitude = 40.411517;
            renderVars.longitude = -3.707645;
        } else if (zone == "chamartin") {
            renderVars.searchPlace = "Chamartín";
            renderVars.latitude = 40.461517;
            renderVars.longitude = -3.686584;
        } else if (zone == "chamberi") {
            renderVars.searchPlace = "Chamberí";
            renderVars.latitude = 40.434429;
            renderVars.longitude = -3.713178;
        } else if (zone == "chueca") {
            renderVars.searchPlace = "Chueca";
            renderVars.latitude = 40.422599;
            renderVars.longitude = -3.697799;
        } else if (zone == "ciudad-lineal") {
            renderVars.searchPlace = "Ciudad Lineal";
            renderVars.latitude = 40.445668;
            renderVars.longitude = -3.654384;
        } else if (zone == "collado-villalba") {
            renderVars.searchPlace = "Collado Villalba";
            renderVars.latitude = 40.630878;
            renderVars.longitude = -4.005561;
        } else if (zone == "coslada") {
            renderVars.searchPlace = "Coslada";
            renderVars.latitude = 40.426046;
            renderVars.longitude = -3.565165;
        } else if (zone == "cuatro-caminos") {
            renderVars.searchPlace = "Cuatro Caminos";
            renderVars.latitude = 40.45102;
            renderVars.longitude = -3.700727;
        } else if (zone == "fuencarral-el-pardo") {
            renderVars.searchPlace = "Fuencarral - El Pardo";
            renderVars.latitude = 40.532278;
            renderVars.longitude = -3.78415;
        } else if (zone == "hortaleza") {
            renderVars.searchPlace = "Hortaleza";
            renderVars.latitude = 40.469387;
            renderVars.longitude = -3.642499;
        } else if (zone == "la-latina") {
            renderVars.searchPlace = "La Latina";
            renderVars.latitude = 40.411059;
            renderVars.longitude = -3.712291;
        } else if (zone == "las-rozas") {
            renderVars.searchPlace = "Las Rozas";
            renderVars.latitude = 40.493533;
            renderVars.longitude = -3.875792;
        } else if (zone == "leganes") {
            renderVars.searchPlace = "Leganés";
            renderVars.latitude = 40.331951;
            renderVars.longitude = -3.768655;
        } else if (zone == "majadahonda") {
            renderVars.searchPlace = "Majadahonda";
            renderVars.latitude = 40.473759;
            renderVars.longitude = -3.868312;
        } else if (zone == "malasaña") {
            renderVars.searchPlace = "Malasaña";
            renderVars.latitude = 40.423372;
            renderVars.longitude = -3.707792;
        } else if (zone == "moncloa") {
            renderVars.searchPlace = "Moncloa";
            renderVars.latitude = 40.433508;
            renderVars.longitude = -3.717873;
        } else if (zone == "moncloa-aravaca") {
            renderVars.searchPlace = "Moncloa - Aravaca";
            renderVars.latitude = 40.441782;
            renderVars.longitude = -3.753666;
        } else if (zone == "moratalaz") {
            renderVars.searchPlace = "Moratalaz";
            renderVars.latitude = 40.40722;
            renderVars.longitude = -3.657005;
        } else if (zone == "mostoles") {
            renderVars.searchPlace = "Móstoles";
            renderVars.latitude = 40.323213;
            renderVars.longitude = -3.867629;
        } else if (zone == "pozuelo-de-alarcon") {
            renderVars.searchPlace = "Pozuelo de Alarcón";
            renderVars.latitude = 40.447527;
            renderVars.longitude = -3.807415;
        } else if (zone == "puente-de-vallecas") {
            renderVars.searchPlace = "Puente de Vallecas";
            renderVars.latitude = 40.387004;
            renderVars.longitude = -3.669533;
        } else if (zone == "retiro") {
            renderVars.searchPlace = "Retiro";
            renderVars.latitude = 40.411335;
            renderVars.longitude = -3.674908;
        } else if (zone == "salamanca") {
            renderVars.searchPlace = "Salamanca";
            renderVars.latitude = 40.427949;
            renderVars.longitude = -3.68675;
        } else if (zone == "san-blas") {
            renderVars.searchPlace = "San Blas";
            renderVars.latitude = 40.432184;
            renderVars.longitude = -3.62788;
        } else if (zone == "san-sebastian-de-los-reyes") {
            renderVars.searchPlace = "San Sebastián de los Reyes";
            renderVars.latitude = 40.558967;
            renderVars.longitude = -3.626198;
        } else if (zone == "tetuan") {
            renderVars.searchPlace = "Tetúan";
            renderVars.latitude = 40.458835;
            renderVars.longitude = -3.697826;
        } else if (zone == "tres-cantos") {
            renderVars.searchPlace = "Tres Cantos";
            renderVars.latitude = 40.605637;
            renderVars.longitude = -3.713049;
        } else if (zone == "usera") {
            renderVars.searchPlace = "Usera";
            renderVars.latitude = 40.382593;
            renderVars.longitude = -3.709875;
        } else if (zone == "vicalvaro") {
            renderVars.searchPlace = "Vicálvaro";
            renderVars.latitude = 40.394028;
            renderVars.longitude = -3.602876;
        } else if (zone == "villa-de-vallecas") {
            renderVars.searchPlace = "Villa de Vallecas";
            renderVars.latitude = 40.366956;
            renderVars.longitude = -3.606064;
        } else if (zone == "villaverde") {
            renderVars.searchPlace = "Villaverde";
            renderVars.latitude = 40.346911;
            renderVars.longitude = -3.710785;
        } else {
            return res.status(404).send();
        }
    } else if (city == "barcelona") {
        if (zone == "ciutat-vella") {
            renderVars.searchPlace = "Ciutat Vella";
            renderVars.latitude = 41.380923;
            renderVars.longitude = 2.167697;
        } else if (zone == "clot") {
            renderVars.searchPlace = "Clot";
            renderVars.latitude = 41.409704;
            renderVars.longitude = 2.189237;
        } else if (zone == "dreta-de-l-eixample") {
            renderVars.searchPlace = "Dreta de l'Eixample";
            renderVars.latitude = 41.39631;
            renderVars.longitude = 2.165383;
        } else if (zone == "eixample") {
            renderVars.searchPlace = "Eixample";
            renderVars.latitude = 41.391843;
            renderVars.longitude = 2.164197;
        } else if (zone == "el-carmel") {
            renderVars.searchPlace = "El Carmel";
            renderVars.latitude = 41.422371;
            renderVars.longitude = 2.156075;
        } else if (zone == "el-gotic") {
            renderVars.searchPlace = "El Gòtic";
            renderVars.latitude = 41.381906;
            renderVars.longitude = 2.178185;
        } else if (zone == "el-putxet") {
            renderVars.searchPlace = "El Putxet";
            renderVars.latitude = 41.407584;
            renderVars.longitude = 2.143797;
        } else if (zone == "gracia") {
            renderVars.searchPlace = "Gràcia";
            renderVars.latitude = 41.409775;
            renderVars.longitude = 2.15392;
        } else if (zone == "horta-guinardo") {
            renderVars.searchPlace = "Horta - Guinardó";
            renderVars.latitude = 41.433472;
            renderVars.longitude = 2.136887;
        } else if (zone == "l-antiga-esquerra-de-l-eixample") {
            renderVars.searchPlace = "L'Antiga Esquerra de l'Eixample";
            renderVars.latitude = 41.388557;
            renderVars.longitude = 2.157303;
        } else if (zone == "les-corts") {
            renderVars.searchPlace = "Les Corts";
            renderVars.latitude = 41.38349;
            renderVars.longitude = 2.116797;
        } else if (zone == "nou-barris") {
            renderVars.searchPlace = "Nou Barris";
            renderVars.latitude = 41.445699;
            renderVars.longitude = 2.179414;
        } else if (zone == "poblenou") {
            renderVars.searchPlace = "Poblenou";
            renderVars.latitude = 41.397737;
            renderVars.longitude = 2.201535;
        } else if (zone == "sabadell") {
            renderVars.searchPlace = "Sabadell";
            renderVars.latitude = 41.546275;
            renderVars.longitude = 2.108613;
        } else if (zone == "sagrada-familia") {
            renderVars.searchPlace = "Sagrada Familia";
            renderVars.latitude = 41.404484;
            renderVars.longitude = 2.175728;
        } else if (zone == "sant-andreu") {
            renderVars.searchPlace = "Sant Andreu";
            renderVars.latitude = 41.433675;
            renderVars.longitude = 2.18579;
        } else if (zone == "sant-marti") {
            renderVars.searchPlace = "Sant Martí";
            renderVars.latitude = 41.405293;
            renderVars.longitude = 2.199076;
        } else if (zone == "sants-montjuic") {
            renderVars.searchPlace = "Sants - Montjuïc";
            renderVars.latitude = 41.356136;
            renderVars.longitude = 2.149936;
        } else if (zone == "sarria") {
            renderVars.searchPlace = "Sarrià";
            renderVars.latitude = 41.396904;
            renderVars.longitude = 2.120389;
        } else if (zone == "sarria-sant-gervasi") {
            renderVars.searchPlace = "Sarrià - Sant Gervasi";
            renderVars.latitude = 41.399317;
            renderVars.longitude = 2.134175;
        } else if (zone == "vallcarca") {
            renderVars.searchPlace = "Vallcarca";
            renderVars.latitude = 41.415138;
            renderVars.longitude = 2.141341;
        } else {
            return res.status(404).send();
        }
    } else if (city == "valencia") {
        if (zone == "benicalap") {
            renderVars.searchPlace = "Benicalap";
            renderVars.latitude = 39.493547;
            renderVars.longitude = -0.391317;
        } else if (zone == "benimaclet") {
            renderVars.searchPlace = "Benimaclet";
            renderVars.latitude = 39.487196;
            renderVars.longitude = -0.354831;
        } else if (zone == "camins-al-grau") {
            renderVars.searchPlace = "Camins al Grau";
            renderVars.latitude = 39.462628;
            renderVars.longitude = -0.34895;
        } else if (zone == "campanar") {
            renderVars.searchPlace = "Campanar";
            renderVars.latitude = 39.48315;
            renderVars.longitude = -0.40545;
        } else if (zone == "ciutat-vella") {
            renderVars.searchPlace = "Ciutat Vella";
            renderVars.latitude = 39.472893;
            renderVars.longitude = -0.377189;
        } else if (zone == "el-pla-del-real") {
            renderVars.searchPlace = "El Pla del Real";
            renderVars.latitude = 39.472953;
            renderVars.longitude = -0.358361;
        } else if (zone == "extramurs") {
            renderVars.searchPlace = "Extramurs";
            renderVars.latitude = 39.472862;
            renderVars.longitude = -0.386607;
        } else if (zone == "jesus") {
            renderVars.searchPlace = "Jesús";
            renderVars.latitude = 39.446962;
            renderVars.longitude = -0.391317;
        } else if (zone == "patraix") {
            renderVars.searchPlace = "Patraix";
            renderVars.latitude = 39.457285;
            renderVars.longitude = -0.400738;
        } else if (zone == "poblados-maritimos") {
            renderVars.searchPlace = "Poblados Marítimos";
            renderVars.latitude = 39.452329;
            renderVars.longitude = -0.330134;
        } else if (zone == "quatre-carreres") {
            renderVars.searchPlace = "Quatre Carreres";
            renderVars.latitude = 39.449649;
            renderVars.longitude = -0.360714;
        } else if (zone == "rascana") {
            renderVars.searchPlace = "Rascaña";
            renderVars.latitude = 39.493624;
            renderVars.longitude = -0.367774;
        } else {
            return res.status(404).send();
        }
    } else {
        return res.status(404).send();
    }

    // Obtiene las veterinaria de la ciudad
    veterinaryController.getVeterinariesByLocation(renderVars.latitude, renderVars.longitude, 10)
        .then(veterinaries => {
            renderVars.veterinaries = veterinaries;
            return res.render('veterinaries.ejs', renderVars);
        })
        .catch(error => {
            return res.status(500).send({ error: error });
        });
});

module.exports = router;