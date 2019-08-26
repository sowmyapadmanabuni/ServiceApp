import React,{Component} from "react";
import {View,TextInput,Text, ActivityIndicator} from "react-native"; 
import  Button  from "../../src/components/common/Button";
import { connect } from "react-redux";
import Header from "../../src/components/common/Header";
import  {GlobalStyle} from "../../src/components/common/GlobalStyle";
import TitleStyle from "../../src/components/common/TitleStyle";
import { onLoginFieldChange,GetOTP } from "../actions";
import base from "../../src/base";
import Validation from "../components/common/Validation";
import axios from 'axios';
import api from '../base/utils/strings';
import _ from "lodash";

 class Login extends Component {
    constructor(props) {
      super(props);
      this.state ={
      };
    }


    componentDidMount(){}
    static getDerivedStateFromProps(props,state)
    {
        return null;
    }
    shouldComponentUpdate(){
        return true;
    }
    getSnapshotBeforeUpdate(prevprops,prevstate){
        return null;
    }
    componentDidUpdate(prevprops,prevstate){
    }
    componentWillUnmount(){}

    renderButton = () => {
        const { loading } = this.props;

        if(loading) {
            <View style={{ justifyContent: 'center', alignItems: "center"}}>
                <ActivityIndicator size="small"/>
            </View>
        } else {
            return (
                <Button 
                title ="GetOTP"
                titleStyle ={{color: "#fff", fontSize: 15}}
                type ="solid"
                containerStyle ={{width:"20%"}}
                onPress={() => {
                 
                  this.MobileNumberValidation()
                }}
                />  
              
            )
        }
    }

    render(){
        const {MobileNumber,onLoginFieldChange} = this.props;
        return(
           
            <View>  
                <Header></Header>                
                    <TitleStyle 
                    name ="Login Details"
                    />         
                 <View style={GlobalStyle.cardContainerStyle} style={GlobalStyle.Title}> 
                      <Text style={GlobalStyle.noMargins}> Mobile Number <Text style={{color:base.theme.colors.red}}>*</Text></Text>
                      <TextInput style={GlobalStyle.noMargins}
                       placeholder ="Enter MobileNumber"
                       keyboardType ="number-pad"
                       value={MobileNumber}
                       onChangeText={MobileNumber=> 
                        onLoginFieldChange({
                            prop:"MobileNumber",value:MobileNumber
                        })
                    }
                       />
                       
                  </View>

                <View style ={GlobalStyle.buttonTextSyle}>
                {this.renderButton()}  
                </View>
            </View>
    
            
        );
    }
  
    MobileNumberValidation=()=>{
    
        const { MobileNumber } = this.props;
       
        if(MobileNumber === '' || MobileNumber.length < 10 || MobileNumber.length >10)
        {
          alert('Enter Valid MobileNumber')
        }
        else
         if(Validation.Mobileregex.test(MobileNumber) === false){
            alert('Enter Valid MobileNumber')
        }
        else{
       this.MobileNumberCheck()
        // this.props.navigation.navigate("Otp")
        }
    }

    MobileNumberCheck =()=>{
        const{MobileNumber} = this.props;
        console.log(MobileNumber)
                 axios.get(api.oyeServiceAgentUrl+"ServiceAgent/GetServiceAgentDetailsByMobileNo",  {
                       headers: {
                           "Content-Type": "application/json",
                           "X-SA-APIKey": api.oyeServiceAgentApiKey
                       }
                   }).then(res => {
                      console.log( "response",MobileNumber)
                       let mobilelist = res.data.data.serviceagent
                        let foundData = _.find(mobilelist, (mobi) => {
                            return mobi.saMobileNo === "+91"+MobileNumber
                        })

                        if(foundData) {    
                         this.props.GetOTP("+91",MobileNumber, this.props.navigation);
                        } else {
                            alert("MobileNumber is not registered. Please Contact Your Administrator")
                        }
                   })    
                 .catch(error =>{
                   console.log("error", error);
                 });
                };
};

const mapStateToProps =state =>{
    return{
     MobileNumber: state.LoginReducer.MobileNumber,
     loading: state.LoginReducer.loading
    };
}


export default connect(mapStateToProps,{onLoginFieldChange,GetOTP})(Login);