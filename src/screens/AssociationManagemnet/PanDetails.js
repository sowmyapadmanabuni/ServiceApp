import React,{Component} from "react";
import {View,Text,TextInput} from "react-native";
import { connect } from "react-redux";
import Button from "../../../src/components/common/Button";
import Header from "../../../src/components/common/Header";
import { GlobalStyle } from "../../../src/components/common/GlobalStyle";
import base from "../../../src/base";
import Validation from "../../components/common/Validation";
import {onEnrollFieldChange} from "../../actions";
import _ from "lodash";
import axios from 'axios';
import api from '../../base/utils/strings';

class PanDetails extends Component{
    constructor(props){
        super(props);
        this.state ={}
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
    render()
    {  const{PanNumber,onEnrollFieldChange} = this.props;
    
        return(
            <View>
                 <Header></Header>
            <View style={GlobalStyle.Title}>
             <Text style={{ color: base.theme.colors.primary}}> Create Association </Text>
            </View>

            <View style={GlobalStyle.cardContainerStyle}> 
                <Text>PanNumber</Text>
                <TextInput
                placeholder="Enter PanNumber"
                autoCapitalize ="characters"
                value ={PanNumber}
                onChangeText={PanNumber=> 
                    onEnrollFieldChange({
                        prop:"PanNumber",value:PanNumber
                    })
                }/>
            </View>
            <View  style={GlobalStyle.rightContainer}>
            <Button 
             style={{ width: "20%", padding: 4 ,marginBottom:10}}
             title ="Validate"
             onPress = {()=> {
                this.PanNumberCheck()
            }}
            />
            </View>
            </View>

        )
    }
   
    PanValidation =()=>{
    const {PanNumber,AssociationName} = this.props;
    if(Validation.AlphaNumeric.test(PanNumber) === false || PanNumber === ''||PanNumber.length < 10 || PanNumber.length >10)
    {
        alert('Enter Valid PanNumber');
    }
    else if(AssociationName.charAt(0) !== PanNumber.charAt(4))
    {
        alert('Enter Valid PanNumber');     
    }
   else{
       this.props.navigation.navigate("BlockDetails");
   }
        
 } 

  PanNumberCheck =()=>{
        const{PanNumber} = this.props;
                    axios.get(api.oyeLivingUrl+"association/getassociationlist",  {
                       headers: {
                           "Content-Type": "application/json",
                           "X-Champ-APIKey": api.oyeLivingApiKey
                       }
                   }).then(res => {
                       let assoList = res.data.data.associations
                        let foundData = _.find(assoList, (asso) => {
                            return asso.aspanNum === PanNumber
                        })

                        if(foundData) {
                            let value = asso.asAssnID
                            alert("pan Number already exists")
                        } else {
                           this.PanValidation()
                        }
                   })    
                 .catch(error =>{
                   console.log("error", error);
                 });
                };
}
const mapStateToProps =state =>{
    return{
     PanNumber: state.EnrolAssocReducer.PanNumber,
     AssociationName: state.EnrolAssocReducer.AssociationName
    };
}


export default connect(mapStateToProps,{onEnrollFieldChange})(PanDetails);