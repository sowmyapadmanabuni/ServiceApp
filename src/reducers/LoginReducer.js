import {LOGIN_SERVICEAGENT, ON_LOGIN_START} from "../actions/types";

const INITIAL_STATE ={
    MobileNumber :"",
    OTP:"",
    loading : false,
    message: "",
    error: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ON_LOGIN_START:
        return { ...state, loading: true, message: "", error: false }
      case LOGIN_SERVICEAGENT:
        return { ...state, [action.payload.prop]: action.payload.value, loading: false };
  
      default:
        
        return state;
    }
  };


  
 