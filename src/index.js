const express = require('express');
const path = require('path');
const method = require('method-override');

let port = process.env.PORT || 3000;

let app = express();


//Public access
app.use('/public',express.static(path.resolve(__dirname, '../public')));

// Websites Routes
//Will have many routes 
app.use(require('./routes/web'));
app.use(require('./routes/productsRoutes'));
app.use(require('./routes/userRoutes'));

//Setting view Engine
app.set("view engine","ejs");
app.set("views",path.resolve(__dirname,"./views"));

//Data config
app.use(express.urlencoded({extended:false})); // Not fund req.body
app.use(method("_method")); // enable other HTTP methods rather than get & post (PUT, DELETE, PATCH)

//Listening to port ${port}
app.listen(port, ()=> console.log('Server up on http://localhost:' + port));