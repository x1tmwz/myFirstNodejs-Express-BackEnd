const express = require('express');
const router = express.Router();
const validitionFuncs = require('../users/input_valid');
const usersManager = require('../users/usersManager');
const regAccountFields=/account_name|account_password|first_name|last_name|gender|age/;
const regUpdatePasswordFields=/account_name,account_password,new_password,/;

router.post('/updatePassword', (req, res) => {
    const userDetails = req.body;
     validitionFuncs.isInputValid(userDetails,regUpdatePasswordFields).then((validbody)=>{
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
router.post('/updateUserInfo', (req, res) => {
    const userDetails = req.body;
    validitionFuncs.isInputValid(userDetails,regAccountFields).then((validbody)=>{
        if(validbody.valid){
                usersManager.changeUserInfo(userDetails).then((userDetails) => {
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
module.exports = router;
