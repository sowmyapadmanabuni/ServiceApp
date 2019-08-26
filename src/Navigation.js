import {createAppContainer,createStackNavigator} from "react-navigation";
import EnrolAssoc from './screens/AssociationManagemnet/EnrolAssoc';
import Login from './screens/Login';
import OtpScreen from './screens/Auth/OtpScreen';
import PanDetails from './screens/AssociationManagemnet/PanDetails';
import BlockDetails from './screens/AssociationManagemnet/BlockDetails';
import AdministratorDetails from './screens/AssociationManagemnet/AdministratorDetails';

const AppNavigation = createStackNavigator({
  Login: {
    screen:Login,
    navigationOptions: ({}) => ({
        title: "Login"
    })
}, 

Otp: {
screen: OtpScreen
},
Association:{
screen:EnrolAssoc
},
// EnrolDevice:{
// screen: AddDevice
// },
PanDetails:{
screen: PanDetails
},
BlockDetails:{
screen:BlockDetails
},
AdminDetails:{
screen:AdministratorDetails
},

}, {
headerMode: "none"

})

export default createAppContainer(AppNavigation);