import { GET_CHECKOUTFORM_DATA,GET_SHIPPING_METHOD,SELECTED_SHIPPING_DATA,PAYMENT_GATEWAY,SELECTED_PAYMENT_DATA,APPLY_COUPONS_DATA } from '../ActionTypes/ActionType'
const init = {
  payment_method: "",
  payment_method_title: "",
  line_items: [],
  shipping_lines: [],
  coupon_lines : [],
  billing: {
    firstName: "",
    lastName: "",
    Streetaddress: "",
    // address_2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    email: "",
    phone: "",
  },
  shipping: {
    Shipping_firstName: "",
    Shipping_lastName: "",
    Shipping_Streetaddress: "",
    // address_2: "",
    Shipping_city: "",
    Shipping_pincode: "",

    Shipping_Country: "",
    Shipping_state: "",
  },
 
  
}


const CheckoutFormDataReducer = (state = init, action) => {
  console.log("coupon_lines------->",state.coupon_lines);
  switch (action.type) {
    
    case GET_CHECKOUTFORM_DATA:
      
      const valuesdata = action.payload.val
      let billingData = {
        firstName: valuesdata.firstName,
        lastName: valuesdata.lastName,
        Streetaddress: valuesdata.Streetaddress,
        city: valuesdata.city,
        
        pincode: valuesdata.pincode,
        email: valuesdata.email,
        phone: valuesdata.phone,
      }
      let shippingData = {
        Shipping_firstName: valuesdata?.Shipping_firstName ? valuesdata.Shipping_firstName :  valuesdata.firstName ,
        Shipping_lastName: valuesdata?.Shipping_lastName ? valuesdata.Shipping_lastName :  valuesdata.lastName,
        Shipping_Streetaddress: valuesdata?.Shipping_Streetaddress ?  valuesdata.Shipping_Streetaddress  : valuesdata.Streetaddress ,
        Shipping_city: valuesdata?.Shipping_city ?   valuesdata.Shipping_city : valuesdata.city ,
        Shipping_pincode: valuesdata?.Shipping_pincode ? valuesdata.Shipping_pincode : valuesdata.pincode ,
        Shipping_Country : valuesdata?.Shipping_Country ?  valuesdata.Shipping_Country :  valuesdata.Country,
        Shipping_state : valuesdata?.Shipping_state ? valuesdata.Shipping_state :  valuesdata.state,
      }

      state.line_items = []
      const ordersdata = action.payload.data1
      ordersdata.map((data) => {
        let line_item = {
          product_id: data.id,
          quantity: data.quantity
        }
        state.line_items.push(line_item)
      })
      // console.log("action.payload?.coupons?.amount========",action.payload.coupons.discount);
    let FinalApplycouponsData = {
      id: action.payload?.coupons?.id  ,
      code : action.payload?.coupons?.code,
      discount : action.payload?.coupons?.discount 
    }

      return {
        ...state,
        billing: billingData,
        shipping: shippingData,
        coupon_lines:FinalApplycouponsData
        

      }
      case GET_SHIPPING_METHOD :
        let shipping_line_data = {
          method_id: action.payload[0].method_id,
          method_title : action.payload[0].method_title,
          total : action.payload[0]?.settings?.cost?.value || 0
        }
        return{
          shipping_lines : shipping_line_data || null
        }
         case  SELECTED_SHIPPING_DATA :
          console.log(' action.payload====>', state.shipping_lines.total );
             let shipping_line_Selected_data = {
              method_id : action.payload?.method_id,
              method_title : action.payload?.method_title,
              total : action.payload?.settings?.cost?.value || 0
             } 
           
            return {
              ...state,
              shipping_lines : shipping_line_Selected_data
            }
            case PAYMENT_GATEWAY :
              return{
                ...state,
              payment_method: action.payload[0].id,
             payment_method_title: action.payload[0].title
              }
              case SELECTED_PAYMENT_DATA : 
              return{
                payment_method :action.payload.id,
                payment_method_title: action.payload.title
              }
              case APPLY_COUPONS_DATA:
                console.log("applycouponsactionpayload===========>",action.payload);
                let ApplyCouponsData = {
                  id: action.payload?.id || null ,
                  code : action.payload?.code || null ,
                  discount : action.payload?.amount || null
                }
                return{
                  ...state,
                  coupon_lines:ApplyCouponsData
                  
                }
           
    default: 
      return state
  }
}
export default CheckoutFormDataReducer;