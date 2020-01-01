const express = require('express');
const router = express.Router();
const validitionFuncs = require('../users/input_valid');
const usersManager = require('../users/usersManager');
const jwt = require('jsonwebtoken');
const regLogInFields =/account_name,account_password,/;

router.post('/logIn',async (req, res) => {
    const userDetails = req.body;
    let validbody = validitionFuncs.isInputValid(userDetails,regLogInFields);
        if(validbody.valid)
        {
            let UserIsSign = await usersManager.isThisUserIsSign(userDetails).catch((err)=>{console.log(err)});
                let responseObj = {};
                if (!UserIsSign) 
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
            
        }
        else{
            res.statusCode = 403;
            res.send(JSON.stringify(validbody));
        }
       
    });
    
    

module.exports = router;