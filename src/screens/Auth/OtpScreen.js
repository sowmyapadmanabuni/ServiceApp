import React, { Component } from "react";
import { View,Text,TextInput } from 'react-native';
import base from "../../base";
import {GlobalStyle} from '../../components/common/GlobalStyle';
import Header from "../../components/common/Header";
import TitleStyle from "../../components/common/TitleStyle";
import Button from "../../components/common/Button";
import { onLoginFieldChange,VerifyOTP,GetOTP } from "../../actions";
import {connect} from "react-redux";


class OtpScreen extends Component {
    
    renderButton = (MobileNumber) => {
       
            return (
                <Button 
                title ="Resend OTP"
                titleStyle ={{color: "#fff", fontSize: 15}}
                type ="solid"
                containerStyle ={{width:"20%"}}
                onPress={() => {
                  this.props.GetOTP("+91",MobileNumber,this.props.navigation)     
                  //this.OTPValidation()
                }}
                />     
            )
        }
    
    renderLoginButton = () => {
      
            return (
                <Button 
                title ="Login"
                titleStyle ={{color: "#fff", fontSize: 15}}
                type ="solid"
                containerStyle ={{width:"20%"}}
                onPress={() => {
                  this.OTPValidation()
                }}
                /> 
                    
            )
        }
    


   render(){
       const{OTP,MobileNumber,onLoginFieldChange}= this.props;
       return(
           <View><Header></Header>
             <TitleStyle 
                    name ="OTP Details"
                    />         
                 <View style={GlobalStyle.cardContainerStyle} style={GlobalStyle.Title}> 
                      <Text style={GlobalStyle.noMargins}> OTP <Text style={{color:base.theme.colors.red}}>*</Text></Text>
                      <TextInput style={GlobalStyle.noMargins}
                       placeholder ="Enter OTP"
                       keyboardType ="number-pad"
                       value={OTP}
                       onChangeText={OTP=> 
                        onLoginFieldChange({
                            prop:"OTP",value:OTP
                        })
                    }
                       />
                       
                  </View>
 
              
                <View style ={GlobalStyle.buttonTextSyle}>
                {this.renderButton(MobileNumber)}  
                {this.renderLoginButton()}
                </View>
            </View>
       )
   }

   OTPValidation=()=>{
    const{OTP,MobileNumber}=this.props;
    console.log("OTPvalue",OTP);
        if(OTP === '')
        {
            alert('Enter Valid OTP');
           
        }
        else{
          this.props.VerifyOTP("+91",MobileNumber,OTP,this.props.navigation);
        
        }
    }
}

const mapStateToProps =state =>{
    return{
     MobileNumber: state.LoginReducer.MobileNumber,
     OTP : state.LoginReducer.OTP,
     loading: state.LoginReducer.loading
    };
}


export default connect(mapStateToProps,{onLoginFieldChange,VerifyOTP,GetOTP})(OtpScreen);
