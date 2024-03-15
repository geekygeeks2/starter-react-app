
import { SETTING } from "app-config/cofiguration";
import Axios from "axios";
const CryptoJS = require('crypto-js');

const SECRET_MSG =  process.env.REACT_APP_SECRET_MSG
const SECRET_MSG_PASSWORD =  process.env.REACT_APP_SECRET_MSG_PASSWORD
const USER = localStorage.getItem("userInformation") && JSON.parse(localStorage.getItem("userInformation"));
export const activityTypeList =['Login', 'Logout', 'Update','Create/Add','Delete','Menu Log','Event Log','Status Change','Suspended', 'Error Log']

export const logoutFunc=(errData)=>{
    if(errData.response && errData.response.status===401){
        localStorage.clear()
        window.location.href = '/login'
    }
    // else if(!errData || !errData.response || !errData.response.data || !errData.response.data.message){
    //     window.location.href = '/login'
    // }
}

export const capitalize=(sentance)=>{ 
    sentance = sentance.replace(/ +(?= )/g,'')
     if(sentance.length===0) return ""
    const words = sentance.split(" "); 
    const capitalizeWord = words.map((word) => { 
        if(word.trim().length>0) return word[0].toUpperCase() + (word.substring(1)? word.substring(1).trim().length>0 ? word.substring(1).trim().toLowerCase():'':''); 
    }).join(" "); 
    return capitalizeWord
 }

 export const encryptAES = (text) => {
    return CryptoJS.AES.encrypt(text, SECRET_MSG).toString();
  }

export const  passwordDecryptAES = (encryptedBase64) => {
    const decrypted = CryptoJS.AES.decrypt(encryptedBase64, SECRET_MSG_PASSWORD);
    if (decrypted) {
        try {
            const str = decrypted.toString(CryptoJS.enc.Utf8);
            if (str.length > 0) {
                return str;
            } else {
                return encryptedBase64;
            }
        } catch (e) {
            return encryptedBase64;
        }
    }
    return encryptedBase64;
  }

export const saveSecurityLogs= async(menuUrl, activityType, message='',userId='')=>{
  let dataToSend={
    message: message,
    menuUrl: menuUrl,
    activity_type: activityType, 
    userId: USER && USER._id?USER._id:userId?userId:'' , 
  }

  let options = SETTING.HEADER_PARAMETERS;
  options['Authorization'] = localStorage.getItem("token")
  await Axios.post(SETTING .APP_CONSTANT.API_URL+`security/save`,dataToSend,{headers: options})
  .then((res) => {
     // console.log("resss", res)
  })
  .catch((err) =>{
    console.log("errror", err)
  });

}
