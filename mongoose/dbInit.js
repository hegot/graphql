var mongoose = require('mongoose');
function dbInit(){
    mongoose.connect('mongodb://localhost:27017/local');
    var db = mongoose.connection;
    db.on('error', () => {console.log('---FAILED to connect to mongoose')
    })
    db.once('open', () => {
        console.log('+++Connected to mongoose')
    }) 
}

module.exports = dbInit;