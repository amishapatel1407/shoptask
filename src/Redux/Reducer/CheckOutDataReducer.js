import { GET_COUNTRIES,PAYMENT_GATEWAY, GET_SHIPPING_METHOD} from "../ActionTypes/ActionType";
const initialstate = {
  CountriesData : [],
  PaymentGatewayData : [],
  ShippingApiData : [],
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
          case GET_SHIPPING_METHOD:
            return{
              ...state,
              ShippingApiData:action.payload

            }
        default:
          return state;
      }
    };
    export default CheckOutDataReducer;