const express = require('/express');
const router = express.Router();
const validitionFuncs = require('./users/input_valid.js');
const usersManager = require('./users/usersManager');
const regAccountFields=/account_name|account_password|first_name|last_name|gender|age/;



router.post('/Createaccount', (req, res) => {
    const userDetails = req.body;
    validitionFuncs.isInputValid(userDetails,regAccountFields).then((validbody)=>{
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