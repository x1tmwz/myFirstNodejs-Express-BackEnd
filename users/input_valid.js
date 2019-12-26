
const regExInputValid = {account_name:/^[a-zA-Z0-9]+$/,account_password:/^[a-zA-Z0-9]+$/,new_password:/^[a-zA-Z0-9]+$/,first_name:/^[a-zA-Z]+$/,last_name:/^[a-zA-Z]+$/,gender:/^[01]+$/,age:/^[\d]+$/}
const validLength={account_name:30,new_password:30,account_password:30,first_name:30,last_name:30,gender:1,age:3}
function isFiledsExices(regEx,keys)
{
    for(let key of keys){
        if(!regEx.test(key))
           return false
    }
    return true;
}
function isValid(regEx,detail,obj,length)
{
    if(!regEx.test(detail))
    {
        obj.valid = false;
        obj.error += "////"+detail + " is wrong syntax////";
    } 
    if(!(detail.length <= length)){
        obj.valid = false;
        obj.error += "//// wrong "+detail + " have more then "+length+" charaters////";
    }
    return obj;

}
const isInputValid = (objDetails,regEx)=>{
    
    let inputKeys = Object.keys(objDetails);
    let inputValid = {error:"",valid:true};
    if(!isFiledsExices(regEx,inputKeys))
    {
        inputValid.error="YOU DIDNT ENTER THE RIGHT FIELDS";
        inputValid.valid= false;

    }
    if(inputValid.valid){
       for(let detail of inputKeys) 
        if(!objDetails[detail])
        {
            isAllDetailsIsFound =false;
            inputValid.error = "one of the input is missing";
            inputValid.valid = false;
            break;
        }
    }
    if(inputValid.valid)
    {
      for(let key of inputKeys){
        inputValid=isValid(regExInputValid[key],objDetails[key],inputValid,validLength[key]);
      } 
    }
    else
     return inputValid;
    
    return inputValid;
}

module.exports ={
  isInputValid: (userDetails,regEx) => {
    return new Promise((resolve, reject) => {
       const valid = isInputValid(userDetails,regEx);
       console.log(valid);
       resolve(valid);
    });
 },
}