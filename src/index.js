const express = require('express');
const path = require('path');

let port = process.env.PORT || 3000;

let app = express();


//Public access
app.use('/public',express.static(path.resolve(__dirname, '../public')));

// Websites Routes
//Will have many routes 
app.use(require('./routes/web'));

//Listening to port ${port}
app.listen(port, ()=> console.log('Server up on http://localhost:' + port));