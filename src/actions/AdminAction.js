import {ADMIN_CREATE,ADMIN_SEQUENCE,RESET_ADMIN_FORM, ACCOUNT_LIST} from './types';
import api from '../base/utils/strings';
import axios from "axios"; 
import _ from 'lodash'

export const onAdminFieldChange =({prop,value})=>{
    return(dispatch) =>{
        dispatch({
            type: ADMIN_CREATE,
            payload: {prop,value}
        })
    }
};
export const onAccountList=() => {
  return (dispatch) => {
    dispatch({
      type: ACCOUNT_LIST
    })
  }
}

export const AdminAccountCreate =(Name,MobileNumber, pannumber)=>{
  console.log(pannumber, "pannumber")
    return dispatch => {
       console.log(Name,MobileNumber)
      axios.post(api.oyeLivingUrl+"account/signup", {
        //Request Body 
        
             ACFName     : Name ,
             ACLName     :  "",
             ACMobile    : MobileNumber,
             ACMobile1   : "" ,
             ACMobile2   : "", 
             ACMobile3   : "",
             ACMobile4   : "",
             ACEmail     : "",
             ACEmail1    :  "" ,
             ACEmail2    :  "" ,
             ACEmail3    :  "" ,
             ACEmail4    :  "" ,
             ACISDCode   :  "+91" ,
             ACISDCode1  :  "" ,
             ACISDCode2  :  "" ,
             ACISDCode3  :  "" ,
             ACISDCode4  :  "" ,
             ACCrtyCode  : "IN" ,
             ACCrtyCode1 : "" 
        
      }, { 
         headers: {
             "Content-Type": "application/json",
             "X-CHAMP-APIKey": api.oyeLivingApiKey
         }
     }).then(response => {
       let accountId= response.data.data.account.acAccntID;
       console.log(accountId, "admin create") 
       dispatch({
         type:ADMIN_SEQUENCE,
         payload:"Account Created Successfully"
       });

     
       PanNumberCheck(accountId, pannumber, dispatch)
       console.log("Admin Account Created successully")
       //alert('Admin Account Created successully')
     })
     .catch(error => {
       console.log("admin create error",error)
     });
    }
};


export const ExistingNumberCheck =(MobileNumber,pannumber)=>{
  return dispatch =>{
 axios.get(api.oyeLivingUrl+"Account/GetAccountList",{
   headers:{
    "Content-Type": "application/json",
     "X-Champ-APIKey": api.oyeLivingApiKey
   }
 }).then(res => {
      let accoList = res.data.data.account
       let acctmobile = _.find(accoList, (acco) => {
           return acco.acMobile === MobileNumber
        
       }) 
       if(acctmobile)
       {      
         console.log("Ifound mobilenumber",acctmobile.acAccntID)
         dispatch({
           type:ACCOUNT_LIST
         })
         PanNumberCheck(acctmobile.acAccntID,pannumber,dispatch)
       }else{

       }
      }).catch(error =>{
        console.log("error",error)
      })
}
}

const PanNumberCheck =(accountid, PanNumber, dispatch)=>{

  console.log("ini pannumbercheck", PanNumber)
  console.log(api.oyeLivingUrl+"association/getassociationlist", "api")
              axios.get(api.oyeLivingUrl+"association/getassociationlist",  {
                 headers: {
                     "Content-Type": "application/json",
                     "X-Champ-APIKey": api.oyeLivingApiKey
                 }
             }).then(res => {
               console.log("Api Called")
                 let assoList = res.data.data.associations
                  let foundData = _.find(assoList, (asso) => {
                    console.log(asso.aspanNum, "pan")
                    console.log(PanNumber.toUpperCase(), "prevPan")
                      return asso.aspanNum === PanNumber.toUpperCase()
                  })
                                  
                  console.log("foundData", foundData)
                  if(foundData) {
                    console.log("MemberApi Called")
                      console.log(accountid,foundData.asAssnID) 

                     
                      axios.post(api.oyeLivingUrl+"Member/UpdateMemberAccountID", {
                        ACAccntID     : accountid,
                        ASAssnID     :  foundData.asAssnID,    
                 }, {
                    headers: {
                        "Content-Type": "application/json",
                        "X-CHAMP-APIKey": api.oyeLivingApiKey
                    }
                }).then(res => {
                  let data = res.data;
                  console.log(data, "member account id update")
                  dispatch({
                    type:ADMIN_SEQUENCE,
                    payload:"AccountID Updated In Member Successfully" 
                  });

                  axios.post(api.oyeLivingUrl+"association/UpdateAccountID", {
                    //Request Body 
                    
                         ACAccntID     : accountid,
                         ASAssnID     :  foundData.asAssnID,    
                  }, {
                     headers: {
                         "Content-Type": "application/json",
                         "X-CHAMP-APIKey": api.oyeLivingApiKey
                     }
                 }).then(response => {
                  console.log("AssociationApi Called")
                   let data = response.data;
                   console.log(data, "account id update")
                   dispatch({
                     type:ADMIN_SEQUENCE,
                     payload:"AccountID Updated Successfully"
                   });
                   
                  // this.props.navigation.navigate("Association");    
                 })
                 .catch(error => {
                   console.log("error",error)
                 });
                })
                .catch(error => {
                  console.log("error",error)
                });
                  }
             })    
           .catch(error =>{
             console.log("error calling api", error);
           });
          };

export const resetAdminFom= () => {
            return (dispatch) => {
              dispatch({
                type: RESET_ADMIN_FORM
              })
            }
          }

         