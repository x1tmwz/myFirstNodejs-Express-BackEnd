const port = 3000;
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const validitionFuncs = require('./users/input_valid.js');
const usersManager = require('./users/usersManager');
const jwt = require('jsonwebtoken');
const regAccountFields=/account_name|account_password|first_name|last_name|gender|age/;
const regLogInFields =/account_name|account_password/;
const regUpdatePasswordFields=/account_name|account_password|new_password/;
app.use(bodyParser.json());

app.get('/user/:userId/details', (req, res) => {
    const userId = req.params.userId;
    let userDetails = usersManager.getUserById(userId).then((userDetails) => {
        let responseObj = {};
        if (!userDetails) {
            res.statusCode = 403;
            responseObj.data = null;
            responseObj.error = "user not found"
        } else {
            responseObj.data = userDetails;
            responseObj.error = null;
        }
        res.send(JSON.stringify(responseObj));
    });
})

app.post('/user/details/Createaccount', (req, res) => {
    const userDetails = req.body;
    let validbody = validitionFuncs.isInputValid(userDetails,regAccountFields).then((validbody)=>{
        if(validbody.valid){
                usersManager.addUser(userDetails).then((userDetails) => {
                console.log(userDetails);
                res.send(JSON.stringify(userDetails));
            });
        }
        else{
            res.statusCode = 403;
            res.send(JSON.stringify(validbody));
        }
         
    })
})
app.post('/user/details/updatePassword', (req, res) => {
    const userDetails = req.body;
    let validbody = validitionFuncs.isInputValid(userDetails,regUpdatePasswordFields).then((validbody)=>{
        if(validbody.valid){
            usersManager.chanegPassword(userDetails).then((userDetails) => {
                console.log(userDetails);
                res.send(JSON.stringify(userDetails));
            });
        }
        else{
            res.statusCode = 403;
            res.send(JSON.stringify(validbody));
        }
       
    });
})
app.post('/user/details/updateUserInfo', (req, res) => {
    const userDetails = req.body;
    usersManager.changeUserInfo(userDetails).then((userDetails) => {
        console.log(userDetails);
        res.send(JSON.stringify(userDetails));
    });
})
app.post('/user/details/logIn', (req, res) => {
    const userDetails = req.body;
    let validbody = validitionFuncs.isInputValid(userDetails,regLogInFields).then((validbody)=>{
        if(validbody.valid){
            let isUserIsSign = usersManager.isThisUserIsSign(userDetails).then((isUserIsSign) => {
                let responseObj = {};
                if (!isUserIsSign) 
                {
                    res.statusCode = 403;
                    responseObj.data = null;
                    responseObj.error = "user not found"
                    res.send(JSON.stringify(responseObj));
                } 
                else
                {
                    jwt.sign(userDetails, 'BobSponge', (err, token) => {
                        res.send(JSON.stringify(token));
                    });
                }
            })
        }
        else{
            res.statusCode = 403;
            res.send(JSON.stringify(validbody));
        }
       
    });
    
    
});


    app.listen(port, () => {
        console.log(`The server is running on port ${port}`);
    });


