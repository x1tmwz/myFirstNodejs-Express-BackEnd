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
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let hashValue = hash.digest('hex');
    return { salt, hashValue };
}
function decrypt(password, salt, hash) {
    let newhash = crypto.createHmac('sha512', salt);
    newhash.update(password);
    let value = newhash.digest('hex');
    if (hash === value)
        return true;
    return false;
}
module.exports = {
    encrypt,
    decrypt,
}
