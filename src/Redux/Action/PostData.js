import {POST_API_DATA,POST_API_ERROR} from '../ActionTypes/ActionType'
import api from '../Api'
export const PostApiData = (AllCheckoutData) => async (dispatch) => {
    console.log("postadata=========>",AllCheckoutData);

    try {
  
      const res = await api.post( "orders",  AllCheckoutData );
  
      dispatch({
  
        type: POST_API_DATA,
  
        payload: { AllCheckoutData: res.AllCheckoutData },
  
      });
  
    } catch (error) {
  
      dispatch({
  
        type: POST_API_ERROR,
  
        payload: { data: error },
  
      });
  
    }
  }