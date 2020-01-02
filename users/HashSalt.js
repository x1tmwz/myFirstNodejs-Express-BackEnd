const crypto = require('crypto');
function genrateSecretKey() {
    let result = '';
    const charaters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let charactersLength = charaters.length;
    for (let i = 0; i < 5; i++) {
        result += charaters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function encrypt(password) {
    let salt = genrateSecretKey();
    let hash = crypto.createHmac('sha512',salt);
    hash.update(password);
    let hashValue = hash.digest('hex');
    return { salt, hashValue };
}
function decrypt(password, userSalt,userHash) {
    let salt = userSalt;
    let hash = crypto.createHmac('sha512',salt);
    hash.update(password);
    let hashValue = hash.digest('hex');
    if (userHash === hashValue){
        return true;
    }
    return false;
}
module.exports = {
    encrypt,
    decrypt,
}
