import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILED } from './requestTypes'
import axios from 'axios'

export const fetchRequest = () => {
   return {
       type: FETCH_REQUEST
   }
}

export const fetchSuccess = stormData => {
    return {
        type: FETCH_SUCCESS,
        payload: stormData
    }
 }

 export const fetchFailed = error => {
    return {
        type: FETCH_FAILED,
        payload: error
    }
 }

 export const fetchStormData = () => {
     return (dispatch) => {
         dispatch(fetchRequest)
         axios.get('https://eonet.sci.gsfc.nasa.gov/api/v2.1/events?api_key=DEMO_KEY')
              .then(response => {
                  const event = response.data
                  dispatch(fetchSuccess(event))
              })
              .catch(error => {
                  const msg = error.message
                  dispatch(fetchFailed(msg))
              })
     }
 }