const express = require('express');
const router = express.Router();
const validitionFuncs = require('../users/input_valid');
const usersManager = require('../users/usersManager');
const regValidtionReqObj=/account_name,account_password,first_name,last_name,gender,age,/;



router.post('/Createaccount',async(req, res) => {
    const userDetails = req.body;
    let validobj = validitionFuncs.isInputValid(userDetails,regValidtionReqObj);
        if(validobj.valid){
               let users = await usersManager.addUser(userDetails).catch((err)=>{console.log(err)}) 
               console.log(users);
               res.send(JSON.stringify(users));
            }
        else{
            res.statusCode = 403;
            res.send(JSON.stringify(validobj));
        }
         
    })

    

module.exports = router;