import {ENROLL_ASSOCIATION,ENROLL_SEQUENCE, RESET_ASSOCIATION_FORM} from './types';
import api from '../base/utils/strings';
import axios from "axios"; 

export const onEnrollFieldChange =({prop,value})=>{
    return(dispatch) =>{
        dispatch({
            type: ENROLL_ASSOCIATION,
            payload: {prop,value}
        })
    }
};
      
 export const EnrolAssociaiton =(AssociationName,AssociationAddress,PropertyName,Country,State,City,Pincode,EmailID,NoofBlocks,NoofUnits,PanNumber,MobileNumber,navigation)=>{
    return dispatch => {
      
      axios.post(api.oyeLivingUrl+"association/create", {
        //Request Body 
        
    ACAccntID : 2,
    association:  
    {
       ASAddress :  AssociationAddress,
       ASCountry : Country ,
       ASBToggle : "False" ,
       ASAVPymnt : "False" ,
       ASCity    : City ,
       ASState   : State ,
       ASPinCode : Pincode ,
       ASAsnLogo :  "",
       ASAsnName : AssociationName ,
       ASPrpName : PropertyName ,
       ASPrpType : "" ,//Should be added
       ASRegrNum  :  "",
       ASMtDimBs  :  "" ,
       ASWebURL  :  "",
       ASMgrName :  "",
       ASMgrMobile :""  ,
       ASMgrEmail :  "",
       ASAsnEmail :  EmailID,
       ASPANStat : "True" ,
       ASPANNum :  PanNumber,
       ASNofBlks :NoofBlocks,
       ASNofUnit :NoofUnits,
       ASONStat : "True" ,
       ASOMStat : "False" ,
       ASFaceDet : "True" ,
       SAMobileNo      : "+91"+MobileNumber,
     
      BankDetails :
     [  {
                                        
     BABName : "" ,
       BAActType : "" ,
       BAActNo : "" ,
       BAIFSC : "" ,
       BAActBal :  "" 
     }
  ],
 Amenities :[{
       AMType : "" ,
       NoofUnits : "" ,
       AMDCreated :  ""
            }]          
    } 
      }, {
         headers: {
             "Content-Type": "application/json",
             "X-Champ-APIKey": api.oyeLivingApiKey
         }
     }).then(response => {
       let data = response.data;
       dispatch({
         type:ENROLL_SEQUENCE,
         payload:"Associaiton Created Successfully"
        
       });
       alert("Association Created Successfully")
       navigation.navigate("AdminDetails");
     
     })
     .catch(error => {
       console.log("error",error)
     });
   }
};


export const resetEnrolFom= () => {
  return (dispatch) => {
    dispatch({
      type: RESET_ASSOCIATION_FORM
    })
  }
}