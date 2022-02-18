const mongoose = require('mongoose');

//process.env.DB_NAME is calling the value we setup in our .env file for our dbname
const dbName = process.env.DB_NAME;

mongoose.connect('mongodb://localhost/' + dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Established connection to your database: ${dbName}`))
    .catch(err => console.log('Something went wrong while connecting to your database', err))

