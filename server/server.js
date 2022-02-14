const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

//-- middleware --
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// The below line is linking to our React-app
app.use(cors({ origin: "http://localhost:3000" }));


//-- other important imports that have to come after app.use(): config and routes --
require('./config/mongoose.config');
require('./routes/game.routes')(app);
//The above line could also be written as follows: 
//const gameRoutes = require('./routes/game.routes);
//gameRoutes(app);


app.listen(port, () => console.log(`Listening on port: ${port}`));