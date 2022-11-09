import { GET_COUNTRIES,PAYMENT_GATEWAY, GET_SHIPPING_METHOD, SELECTED_SHIPPING_DATA } from "../ActionTypes/ActionType";
const initialstate = {
  CountriesData : [],
  PaymentGatewayData : [],
  ShippingApiData : [],
  SelectedShippingData : null,
  
  loading : true
}

const CheckOutDataReducer = (state = initialstate, action) => {
  console.log("amisha======>",state.SelectedShippingData);
  console.log("updatedshippingdata===>",state.ShippingApiData);
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
            case  SELECTED_SHIPPING_DATA :
              console.log("selectedshippingdata======>",action.payload);
             
            //     state.ShippingApiData.map(item =>{
            //     if(item.title == action.payload.title) 
            //       {  
                 
            //         item.active= true


            //       }
            //       else{
            //         item.active = false
            //       }
                
                
            // })
            return {
              ...state,
              SelectedShippingData : action.payload
            }
            
        default:
          return state;
      }
    };
    export default CheckOutDataReducer;