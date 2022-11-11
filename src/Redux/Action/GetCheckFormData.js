import {GET_CHECKOUTFORM_DATA,SELECTED_SHIPPING_DATA,SELECTED_PAYMENT_DATA,APPLY_COUPONS_DATA } from '../ActionTypes/ActionType'
// import api from '../Api';




export const CheckFormData  = (data) => async dispatch => {
        // const getCountries = await api.get('/data/countries')
        dispatch( {
            type:GET_CHECKOUTFORM_DATA ,
            payload: data
           
        })
    
 

}
export const  SelectedShipppingData = (data) => async (dispatch) => {
    dispatch ({
        type :  SELECTED_SHIPPING_DATA ,
        payload : data
    })
}
 export const SelectedPaymentData = (data) => async (dispatch) => {
    dispatch({
        type : SELECTED_PAYMENT_DATA,
        payload : data
    })
 }
 export const ApplyCouponsData  = (myRe) => async dispatch => {

     console.log("ApplyCouponsData",myRe);
        
           
            dispatch( {
                type: APPLY_COUPONS_DATA,
                payload: myRe
               
            })
        
       
    
    }