import React, {Component} from "react";
import {View,Text,TextInput} from "react-native";
import Button from "../../../src/components/common/Button";
import Header from "../../../src/components/common/Header";
import {onEnrollFieldChange,EnrolAssociaiton,resetAdminFom} from "../../actions";
import Validation from "../../components/common/Validation";
import { connect } from "react-redux";

class BlockDetails extends Component{
    constructor(props){
        super(props);
        this.state ={
        }
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

     render(){
         const {NoofBlocks,NoofUnits,onEnrollFieldChange} = this.props;
         return(
             <View>
                 <Header></Header>
                
                     <Text>Input No.of Blocks</Text>
                     <TextInput
                     placeholder ="Enter No.of Blocks"
                     value ={NoofBlocks}
                     onChangeText ={NoofBlocks=>{   
                         onEnrollFieldChange({
                             prop:"NoofBlocks",value:NoofBlocks
                         })                     
                     }}
                     /> 
                      <Text>Input No.of Units</Text>
                     <TextInput
                     placeholder ="Enter No.of Units"
                     value ={NoofUnits}
                     onChangeText ={NoofUnits=>{   
                         onEnrollFieldChange({
                             prop:"NoofUnits",value:NoofUnits
                         })                     
                     }}
                     /> 
               
                 <Button
                 title ="Next"
                onPress ={()=>{
                    this.BlockValidation()
                }}
                 />
             </View>
         )
     }

   

     BlockValidation=()=>{
         const{AssociationName,AssociationAddress,PropertyName,Country,State,City,Pincode,EmailID,NoofBlocks,NoofUnits,PanNumber,MobileNumber,resetAdminFom}=this.props;
         if(NoofBlocks === '' || Validation.Numeric.test(NoofBlocks) === false || NoofBlocks.length > 3)
         {
             alert('Enter Valid Noof Blocks');
         }
         else if(NoofUnits === ''  || Validation.Numeric.test(NoofUnits) === false || NoofUnits.length >4){
             alert('Enter Valid Noof Units');
         }
         else if(Number(NoofUnits) < Number(NoofBlocks))
         {
             alert('Noof Units cant be more than Noof Blocks');
         }
         else{
              
               console.log("LoginMobileNumber", MobileNumber)
               resetAdminFom()
               this.props.EnrolAssociaiton(AssociationName,AssociationAddress,PropertyName,Country,State,City,Pincode,EmailID,NoofBlocks,NoofUnits,PanNumber,MobileNumber,this.props.navigation);
            
            }
     }
    
     
}

const mapStateToProps =state =>{
    return{
     NoofBlocks: state.EnrolAssocReducer.NoofBlocks,
     NoofUnits: state.EnrolAssocReducer.NoofUnits,
    
     //Newly Adding to create Association 
     AssociationName    : state.EnrolAssocReducer.AssociationName,
     AssociationAddress : state.EnrolAssocReducer.AssociationAddress, 
     PropertyName       : state.EnrolAssocReducer.PropertyName,
     Country            : state.EnrolAssocReducer.Country,
     State              : state.EnrolAssocReducer.State,
     City               : state.EnrolAssocReducer.City,
     Pincode            : state.EnrolAssocReducer.Pincode,
     EmailID            : state.EnrolAssocReducer.EmailID,
     PanNumber          : state.EnrolAssocReducer.PanNumber,
     MobileNumber       : state.LoginReducer.MobileNumber,
    };
}


export default connect(mapStateToProps,{onEnrollFieldChange,EnrolAssociaiton,resetAdminFom})(BlockDetails);
