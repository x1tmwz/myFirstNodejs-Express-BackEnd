const users = require('../sequelizeFolder/seuqlize');
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
        let newUser= await users.create({
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
    chanegPassword:({
        account_name,
        account_password,
        new_password
    }) => {
        return new Promise((resolve, reject) => {
            connection.connect();
            connection.query(`UPDATE users SET account_password='${new_password}' WHERE account_name='${account_name}' AND account_password='${account_password}'`, function (error, results, fields) {
                    connection.end();
                    if (error) reject(error);
                    console.log(results);
                    resolve({
                        data: `${account_name} your password as changed`,
                        error: null
                    });

                });

        })
    },
    changeUserInfo: ({
        account_name,
        account_password,
        first_name,
        last_name,
        gender,
        age,

    }) => {
        return new Promise((resolve, reject) => {
            connection.connect();
            connection.query(`UPDATE users SET first_name='${first_name}', last_name='${last_name}', gender= '${gender}', age='${age}' WHERE account_name='${account_name}' AND account_password='${account_password}'`, function (error, results, fields) {
                    connection.end();
                    if (error) reject(error);
                    console.log(results);
                    resolve({
                        data: `${account_name} you personal info updated`,
                        error: null
                    });

                });

        })
    },
    isThisUserIsSign: ({
        account_name,
        account_password,
    }) => {
        return new Promise((resolve, reject) => {
            connection.connect();
            connection.query(`SELECT * from users WHERE account_name='${account_name}'AND account_password='${account_password}' `, function (error, results, fields) {
                    connection.end();
                    if (error)reject(error);
                    resolve(results[0]);

                });

        })
    },

}