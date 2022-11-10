import {GET_CHECKOUTFORM_DATA,SELECTED_SHIPPING_DATA } from '../ActionTypes/ActionType'
// import api from '../Api';




export const CheckFormData  = (data) => async dispatch => {

        // const getCountries = await api.get('/data/countries')
        dispatch( {
            type:GET_CHECKOUTFORM_DATA ,
            payload: data
           
        })
    
 

}
export const  SelectedShipppingData = (data) => async (dispatch) => {
    console.log("SelectedShipppingData==========<",data);
    dispatch ({
        type :  SELECTED_SHIPPING_DATA ,
        payload : data
    })
}