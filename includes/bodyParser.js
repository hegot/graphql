var bodyParserMiddleware = require('body-parser');
var express = require('express');
function bodyParser(app){
    app.use(bodyParserMiddleware.json() );
    app.use(bodyParserMiddleware.urlencoded({
        extended: true
    }));
    app.use(express.json());
    app.use(express.urlencoded());
}

module.exports = bodyParser;


