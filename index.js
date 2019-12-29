const port = 3000;
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const createUserRoute = require('./routes/createAccountPosts.js');
const updateUserRoute = require('./routes/updateAccountPosts.js');
const logInRoute = require('./routes/logInPosts.js');
app.use('/user/details',createUserRoute);
app.use('/user/details',updateUserRoute);
app.use('/user/details',logInRoute);






app.listen(port, () => {
        console.log(`The server is running on port ${port}`);
    });


