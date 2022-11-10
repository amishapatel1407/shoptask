import { GET_COUPONS,APPLY_COUPONS_DATA } from "../ActionTypes/ActionType";
const initialstate = {
  CouponsData : [],
  AppluCouponsData:[],
 
}

const CouponsReducer = (state = initialstate, action) => {
  
  switch (action.type) {
    case GET_COUPONS:
      return {
        ...state,
        CouponsData: action.payload
        
      }
      case APPLY_COUPONS_DATA:
        console.log("applycouponsactionpayload===========>",action.payload);
        return{
          ...state,
          AppluCouponsData:action.payload  
          
        }
        
        default:
          return state;
      }
    };
    export default CouponsReducer;