import {LOGIN_SERVICEAGENT,LOGIN_SEQUENCE, ON_LOGIN_START} from './types';
import api from '../base/utils/strings';
import axios from "axios"; 

export const onLoginFieldChange = ({ prop, value }) => {
    return dispatch => {
      dispatch({
        type: LOGIN_SERVICEAGENT,
        payload: { prop, value }
      });
    };
  };


export const GetOTP =(CountryCode,MobileNumber, navigation)=>{
  return dispatch => {
    dispatch({ type: ON_LOGIN_START })
    axios.post(api.oyeLivingUrl+"account/sendotp", {
      //Request Body 
     CountryCode  : CountryCode,
     MobileNumber: MobileNumber
    }, {
       headers: {
           "Content-Type": "application/json",
           "X-Champ-APIKey": api.oyeLivingApiKey
       }
   }).then(response => {
     let data = response.data;
     dispatch({
       type:LOGIN_SEQUENCE,
       payload:"OTP Sent Successfully"
     });
    
     navigation.navigate("Otp")
   })
   .catch(error => {
     console.log("Invalid OTP",error)
     alert(error.message);
   });
  }
  };

  
  
export const VerifyOTP =(CountryCode,MobileNumber,OTP, navigation)=>{
    return dispatch => {
      dispatch({ type: ON_LOGIN_START })
      console.log( "CountryCode" ,CountryCode);
       console.log("MobileNumber",MobileNumber);
       console.log("OTPnumber",  OTP);
       console.log(api.oyeLivingUrl+"account/verifyotp");
      axios.post(api.oyeLivingUrl+"account/verifyotp", {
        //Request Body 
       CountryCode  : CountryCode,
       MobileNumber: MobileNumber,
       OTPnumber : OTP
      }, {
         headers: {
             "Content-Type": "application/json",
             "X-Champ-APIKey": api.oyeLivingApiKey
         }
     }).then(response => {
       let data = response.data;
       dispatch({
         type:LOGIN_SEQUENCE,
         payload:"OTP Verified Successfully"
       });
      
       navigation.navigate("Association")
     })
     .catch(error => {
       console.log("error from get otp api",error)
       alert('Invalid OTP');
     });
    }
    };

