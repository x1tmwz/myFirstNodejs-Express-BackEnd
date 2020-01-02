const table = require('../sequelizeFolder/seuqlize');
const hashsalt = require('./HashSalt');

module.exports = {
    addUser: async({
        account_name,
        account_password,
        first_name,
        last_name,
        gender,
        age
    }) => {
        let {salt,hashValue} = hashsalt.encrypt(account_password);
        let newUser= await table.create({
            hash:hashValue,
            salt,
            account_name,
            first_name,
            last_name,
            gender,
            age
        }).catch((err)=>console.log(err));
        return newUser; 

       
                

        
    },
    chanegPassword:async({
        account_name,
        account_password,
        new_password
    }) => {
       let user = await table.findAll({
            where:{
                account_name
            }
        }).catch((err)=>{console.log(err)});
        if(!user[0])
           return {error:"this account name not existent"}
        if(hashsalt.decrypt(account_password,user[0].salt,user[0].hash)){
            let {salt,hashValue} = hashsalt.encrypt(new_password);
            let updateuser = await table.update({hash:hashValue,salt},{where:{account_name}}).catch((err)=>{console.log(err)});
            return updateuser;

        }
        return {error:"your enter wrong password"};

        

        
    },
    changeUserInfo: async({
        account_name,
        account_password,
        first_name,
        last_name,
        gender,
        age,

    }) => {
        let user = await table.findAll({
            where:{
                account_name,
            }
        }).catch((err)=>{console.log(err)});
        if(!user[0])
           return {error:"this account name not existent"}
        if(hashsalt.decrypt(account_password,user[0].salt,user[0].hash)){
            let updateuser = await table.update({first_name,last_name,gender,age},{where:{account_name}}).catch((err)=>{console.log(err)});
            return updateuser;

        }
        return {error:"your enter wrong password"};

    },
    isThisUserIsSign: async ({
        account_name,
        account_password,
    }) => {
        let responObj ={};
        let user = await table.findAll({
            where:{
                account_name,
            }
        }).catch((err)=>{console.log(err)});
        if(!user[0]){
            responObj.message="user name is not found";
            responObj.valid = false;
            return responObj;
        }
        if(hashsalt.decrypt(account_password,user[0].salt,user[0].hash)){
            responObj.message="you are now log in";
            responObj.valid =true;
            return responObj;
        }
        responObj.message ="you enter wrong password";
        responObj.valid = false;
        return responObj;

        
    }

}