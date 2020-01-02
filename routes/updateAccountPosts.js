const express = require('express');
const router = express.Router();
const validitionFuncs = require('../users/input_valid');
const usersManager = require('../users/usersManager');
const regAccountFields=/account_name|account_password|first_name|last_name|gender|age/;
const regUpdatePasswordFields=/account_name,account_password,new_password,/;

router.post('/updatePassword', async(req, res) => {
    const userDetails = req.body;
    let validbody= validitionFuncs.isInputValid(userDetails,regUpdatePasswordFields)
        if(validbody.valid)
        {
            let changeobj = await usersManager.chanegPassword(userDetails).catch((err)=>{console.log(err)});
            if(changeobj[0])
               res.send(JSON.stringify({message:"your password has update"}));
            else
               res.send(JSON.stringify(changeobj));
            1
        }
        else{
            res.statusCode = 403;
            res.send(JSON.stringify(validbody));
        }
       
    });

router.post('/updateUserInfo',async (req, res) => {
    const userDetails = req.body;
    let validbody = validitionFuncs.isInputValid(userDetails,regAccountFields)
        if(validbody.valid){
                let updateobj =await usersManager.changeUserInfo(userDetails).catch((err)=>{console.log(err)});
                if(updateobj[0])res.send(JSON.stringify({message:"your info is update"}));
                else
                   res.send(JSON.stringify(updateobj));
            
        }
        else{
            res.statusCode = 403;
            res.send(JSON.stringify(validbody));
        }
         
    })
module.exports = router;
