import { GET_CHECKOUTFORM_DATA,GET_SHIPPING_METHOD,SELECTED_SHIPPING_DATA,PAYMENT_GATEWAY } from '../ActionTypes/ActionType'
const init = {
  payment_method: "",
  payment_method_title: "",
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
  line_items: [],
  shipping_lines: [
    
  ]
  
}


const CheckoutFormDataReducer = (state = init, action) => {
  
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
        Shipping_firstName: valuesdata.Shipping_firstName ? valuesdata.Shipping_firstName :  valuesdata.firstName ,
        Shipping_lastName: valuesdata.Shipping_lastName ? valuesdata.Shipping_lastName :  valuesdata.lastName,
        Shipping_Streetaddress: valuesdata.Shipping_Streetaddress ?  valuesdata.Shipping_Streetaddress  : valuesdata.Streetaddress ,
        Shipping_city: valuesdata.Shipping_city ?   valuesdata.Shipping_city : valuesdata.city ,
        Shipping_pincode: valuesdata.Shipping_pincode ? valuesdata.Shipping_pincode : valuesdata.pincode ,
        Shipping_Country : valuesdata.Shipping_Country ?  valuesdata.Shipping_Country :  valuesdata.Country,
        Shipping_state : valuesdata.Shipping_state ? valuesdata.Shipping_state :  valuesdata.state,
      }



      //pass the selected product id and quntity
      state.line_items = []
      const ordersdata = action.payload.data1
      ordersdata.map((data) => {
        let line_item = {
          product_id: data.id,
          quantity: data.quantity
        }
        state.line_items.push(line_item)
      })
      

      // console.log("line_items========> ", state.line_items);
      //------------------------//
      state.shipping_lines = [] 
      const shippingmethodata = action.payload.shippingdata
      console.log("shippingmethodata.method_id========>",shippingmethodata.method_id);
      let shipping_line = {
        method_id : shippingmethodata.method_id,
        method_title : shippingmethodata.method_title
      }
      state.shipping_lines.push(shipping_line)


      return {
        ...state,
        billing: billingData,
        shipping: shippingData,
        payment_method: action.payload.paymentdata.id,
        payment_method_title: action.payload.paymentdata.title


      }
      case GET_SHIPPING_METHOD :
        let shipping_line_data = {
          method_id: action.payload[0].method_id,
          method_title : action.payload[0].method_title,
        }
        return{
          shipping_lines : shipping_line_data
        }
         case  SELECTED_SHIPPING_DATA :
              console.log("selectedshippingdataonreducer======>",action.payload);
            
           
            return {
              ...state,
              shipping_lines : action.payload
            }
           
    default: 
      return state
  }
}
export default CheckoutFormDataReducer;