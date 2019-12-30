const port = 3000;
const express = require('express');
const app = express();
require('./server_initializer')(app)

app.listen(port, () => {
        console.log(`The server is running on port ${port}`);
});


