    const createUserRoute = require('./routes/createAccountPosts.js');
    const updateUserRoute = require('./routes/updateAccountPosts.js');
    const logInRoute = require('./routes/logInPosts.js');
module.exports = (app) => {
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use('/user/details', createUserRoute);
    app.use('/user/details', updateUserRoute);
    app.use('/user/details', logInRoute);
}