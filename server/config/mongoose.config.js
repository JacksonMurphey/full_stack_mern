const mongoose = require('mongoose');


const dbName = 'games';
mongoose.connect('mongodb://localhost/' + dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Established connection to your database: ${dbName}`))
    .catch(err => console.log('Something went wrong while connecting to your database', err))

