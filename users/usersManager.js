const users = require('../sequelizeFolder/seuqlize');
module.exports = {
    addUser: ({
        account_name,
        account_password,
        first_name,
        last_name,
        gender,
        age
    }) => {
        return new Promise((resolve, reject) => {
            connection.connect();
            connection.query(`INSERT INTO users ( account_name,account_password,first_name, last_name, gender, age)
                                VALUES ('${account_name}','${account_password}','${first_name}', '${last_name}', ${gender}, ${age});`, 
                                function (error, results, fields) {
                    connection.end();
                    if (error) reject(error);
                    console.log(results);
                    resolve({
                        data: `${first_name} is add succesfully`,
                        error: null
                    });

                });

        })
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