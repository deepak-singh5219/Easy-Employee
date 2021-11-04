const mongoose = require('mongoose');

const dbConnection = () =>
{    
    mongoose.connect('mongodb://localhost:27017/emp')
    .then(()=>console.log('Database Connection Successfull'))
    .catch(err=>console.log('Failed To Connect With Database, \n Reason :' +err))
}

module.exports = dbConnection;