var path = require('path');
var express = require('express');
var dbInit = require('./mongoose/dbInit');
var bodyParser = require('./includes/bodyParser');
var express_graphql = require('express-graphql');
var schema = require('./graphql/Schema');
var createTodo = require('./includes/createTodo');

dbInit();
var app = express();

app.listen(3000, () => {
    console.log("Express Server is Running!")
});
bodyParser(app);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.use('/graphql', express_graphql({
    schema: schema,
    graphiql: true
}));

app.post('/quotes', (req, res) => createTodo(req, res));