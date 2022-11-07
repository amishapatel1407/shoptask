import { GET_COUNTRIES,PAYMENT_GATEWAY } from "../ActionTypes/ActionType";
const initialstate = {
  CountriesData : [],
  PaymentGatewayData : [],
  loading : true
}

const CheckOutDataReducer = (state = initialstate, action) => {
  
  
      switch (action.type) {
        case GET_COUNTRIES:
          return {
            ...state,
            CountriesData: action.payload,
            loading: false
           
          }
        case PAYMENT_GATEWAY:
          return{
            ...state,
            PaymentGatewayData:action.payload

          }
        default:
          return state;
      }
    };
    export default CheckOutDataReducer;