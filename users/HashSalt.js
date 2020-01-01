var CryptoJS = require("crypto-js");
function genrateSecretKey()
{
    let result ='';
    const charaters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let charactersLength = characters.length;
    for ( let i = 0; i < 5; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function encrypt(password){
    let serectWord = genrateSecretKey();
    let cryptotext = CryptoJS.AES.encrypt(password,serectWord);
    return {serectWord,cryptotext};
}
function decrypt(password,serectWord,cryptotext)
{
    let decrypttext = CryptoJS.AES(password,serectWord);
    if(decrypttext === cryptotext)
        return true;

    return false;

}
module.exports={
    encrypt,
    decrypt
}
