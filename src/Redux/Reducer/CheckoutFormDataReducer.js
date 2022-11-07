import {GET_CHECKOUTFORM_DATA } from  '../ActionTypes/ActionType'
const init = {
    // ChekoutFormData : []
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
        Shipping_phone :"",
        Shipping_email:"",
       Shipping_Country: "",
       Shipping_state: "",
      },
      line_items : []
    }
    
    
    const CheckoutFormDataReducer = (state = init, action) => {
      console.log("shippingdata========>",state.shipping);
      console.log("billidata  =========>",state.billing);
      switch(action.type){
        
        case GET_CHECKOUTFORM_DATA: 
        console.log("formactionpayload=====>",action.payload.val);
        const  valuesdata = action.payload.val
            let billingData = {
                firstName: valuesdata.firstName,
                lastName: valuesdata.lastName,
                Streetaddress: valuesdata.Streetaddress,
                // address_2: "",
                city: valuesdata.city,
                // state: valuesdata.state,
                pincode: valuesdata.pincode,
                // country: valuesdata.Country,
                email: valuesdata.email,
                phone: valuesdata.phone,    
              };
              let shippingData = {
                Shipping_firstName : valuesdata.Shipping_firstName,
                Shipping_lastName : valuesdata.Shipping_lastName,
                Shipping_Streetaddress : valuesdata.Shipping_Streetaddress,
                Shipping_city : valuesdata.Shipping_city,
                Shipping_pincode : valuesdata.Shipping_pincode,
                Shipping_phone : valuesdata.Shipping_phone,
                Shipping_email : valuesdata.Shipping_email,
                // Shipping_Country : valuesdata.Shipping_Country,
                // Shipping_state : valuesdata.Shipping_state
              }
              console.log("check------->",state.billing.country);



              //pass the selected product id and quntity
              state.line_items=[]
              const ordersdata = action.payload.data1
              ordersdata.map((data) => {
                let line_item = {
                    product_id : data.id,
                    quantity : data.quantity
                }
                state.line_items.push(line_item)
                console.log("line_item1",line_item);
            })
          
             
              console.log("line_items========> ",state.line_items);
              //------------------------//
              
              return {
                ...state,
                billing: billingData,
                shipping : shippingData
                
                
              }
              default:
                return state
         }
}
export default CheckoutFormDataReducer;