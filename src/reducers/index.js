import {combineReducers} from "redux";
import LoginReducer from "./LoginReducer";
import EnrolAssocReducer from "./EnrolAssocReducer";
// import DeviceReducer from "./DeviceReducer";
import AdminReducer from "./AdminReducer";

export default combineReducers({
    LoginReducer:LoginReducer,
    EnrolAssocReducer :EnrolAssocReducer,
    // DeviceReducer: DeviceReducer,
    AdminReducer:AdminReducer
});