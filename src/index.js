const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cookies = require("cookie-parser");
const session = require("express-session");
const cors = require('cors');


let port = process.env.PORT || 3000;

let app = express();

//Public access
app.use('/public',express.static(path.resolve(__dirname, '../public')));

//Setting view Engine
app.set("view engine","ejs");
app.set("views",path.resolve(__dirname,"./views"));

//Data config
app.use(express.urlencoded({
    extended: false,
    limit: "100mb"
}));
app.use(express.json());

app.use(cors());

app.use(methodOverride("_method")); // enable other HTTP methods rather than get & post (PUT, DELETE, PATCH)
app.use(cookies()); // add req.cookies and res.cookie()
app.use(session({
    secret: 'ourSecretePrivateKey', //should be a environment variable
    resave: true,
    saveUninitialized: false
})); // add req.session
app.use(require("./middlewares/user")) // save user for views
//app.use(require("./middlewares/logged")) // save user for views
//app.use(require("./middlewares/styles")) // save user for views


// Websites Routes
//Will have many routes 
app.use(require('./routes/web'));
app.use(require('./routes/userRoutes'));
app.use(require('./routes/productsRoutes'));
//Listening to port ${port}
app.listen(port, ()=> console.log('Server up on http://localhost:' + port));