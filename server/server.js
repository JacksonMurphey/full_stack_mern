require('dotenv').config() //NEW: requiring our .env file that we have created. The order here is important!!! 
const express = require('express');
const cors = require('cors');  //cors = Cross Origin Resource Sharing. This is what allows our React Server to speak with our Express server
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.MY_PORT;

//-- middleware --
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// The below line is linking to our React-app
app.use(cors({
    credentials: true, //allows the cookie with all our user information to be passed around freely, for us.
    origin: "http://localhost:3000",
}));

//configuring the server to accept and update cookies, and it helps us decode the content of said cookies
app.use(cookieParser());

//-- other important imports that have to come after app.use(): config and routes --
require('./config/mongoose.config');

require('./routes/game.routes')(app);
require('./routes/user.routes')(app);
//The above line could also be written as follows: 
//const gameRoutes = require('./routes/game.routes);
//gameRoutes(app);


app.listen(port, () => console.log(`Listening on port: ${port}`));