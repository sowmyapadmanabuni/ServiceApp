import React,{Component} from "react";
import {View,Text,TextInput,ScrollView} from "react-native";
import Header from "../../components/common/Header";
import {GlobalStyle} from "../../components/common/GlobalStyle";
import base from "../../base";
import Button from "../../../src/components/common/Button"; 
import Card from "../../components/common/Card";
import {onAdminFieldChange,AdminAccountCreate,AdminAccountUpdate,resetAdminFom,resetEnrolFom,ExistingNumberCheck} from "../../actions";
import { connect } from "react-redux";
import Validation from "../../components/common/Validation";
import axios from 'axios';
import api from "../../base/utils/strings";
import _ from 'lodash';

class AdministratorDetails extends Component{
    constructor(props)
    {
        super(props);
        this.state={}
    }
    render(){
        const {Name,MobileNumber,onAdminFieldChange,resetAdminFom}=this.props;
        return(
            <ScrollView>
            <Header></Header>
            <View style={GlobalStyle.Title}>
               <Text style={{ color: base.theme.colors.primary,marginBottom:20}}> Administrator Details </Text>
            </View>

            <Card style ={{backgroundColor:"orange"}} > 
                  <View style ={GlobalStyle.Title} >
                  <Text style ={{color:base.theme.colors.white}}> Administrator </Text>
               
                  </View>
              </Card>

              <Card>
                  <View style={GlobalStyle.cardContainerStyle}> 
                      <Text style={GlobalStyle.noMargins}> Name <Text style={{color:base.theme.colors.red}}>*</Text></Text>
                      <TextInput style={GlobalStyle.noMargins}
                       placeholder ="Enter Name"
                        value={Name}
                        onChangeText={Name => onAdminFieldChange({ prop:"Name", value : Name})}
                       />
                  </View>
                  <View style={GlobalStyle.cardContainerStyle}> 
                      <Text style={GlobalStyle.noMargins}> MobileNumber  <Text style={{color:base.theme.colors.red}}>*</Text></Text>
                      <TextInput style={GlobalStyle.noMargins}
                       placeholder ="Enter MobileNumber"
                       value={MobileNumber}
                       onChangeText={MobileNumber => onAdminFieldChange({ prop:"MobileNumber", value : MobileNumber})}
                      
                       />
                  </View>
                 
             <View style ={GlobalStyle.buttonTextSyle}>
                 <Button 
                title ="Reset"
                titleStyle ={{color: "#fff", fontSize: 15}}
                type ="solid"
                containerStyle ={{width:"20%"}}
                onPress={()=>{
                    resetAdminFom()
                }}
                />
                <Button 
                 title ="Submit"
                 titleStyle ={{color: "#fff", fontSize: 15}}
                 type ="solid"
                 containerStyle ={{width:"20%"}}
                 onPress={() => {
                
                  this.AdminDetailsValidation();
                 }}
                /> 
                </View>
             </Card>
     </ScrollView>
        );
    }

    AdminDetailsValidation=()=>{
        const {Name,MobileNumber} = this.props;
        if(Validation.Mobileregex.test(MobileNumber) === false)
        {
            alert('Enter Valid MobileNumber');
        }
        else if(Validation.Alphabets.test(Name) === false){
            alert('Enter Valid Name');
        }
        else{
          
            this.MobileNumberCheck()
        }
    }
    
    MobileNumberCheck=()=>{
            const{Name,MobileNumber, resetEnrolFom} = this.props;
            console.log(Name,MobileNumber,"Inside")
                        axios.get(api.oyeLivingUrl+"Account/GetAccountList",  {
                           
                           headers: {
                               "Content-Type": "application/json",
                               "X-Champ-APIKey": api.oyeLivingApiKey
                           }
                       }).then(res => {
                           let accoList = res.data.data.account
                            let s = _.find(accoList, (acco) => {
                                return acco.acMobile === MobileNumber
                            })

                            if(s) { 
                          //  alert("Mobile Number already exists")
                           this.props.ExistingNumberCheck(MobileNumber,this.props.PanNumber);
                           resetEnrolFom()
                           this.props.navigation.navigate("Association");      
                            } else {
                               
                                this.props.AdminAccountCreate(Name,MobileNumber, this.props.PanNumber)
                                resetEnrolFom()
                                this.props.navigation.navigate("Association");                             
                            }
                       })    
                     .catch(error =>{
                       console.log("error", error);
                     });
                    };              
    }

const mapStateToProps =state =>{
    return{
        Name         : state.AdminReducer.Name,
        MobileNumber : state.AdminReducer.MobileNumber,   
        EmailID      : state.AdminReducer.EmailID,
        PanNumber    : state.EnrolAssocReducer.PanNumber,
    };
}

export default connect(mapStateToProps,{AdminAccountCreate,onAdminFieldChange,AdminAccountUpdate,resetAdminFom,resetEnrolFom,ExistingNumberCheck})(AdministratorDetails);