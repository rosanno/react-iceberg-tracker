import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILED } from '../actions/requestTypes'

const initState = {
    isLoading: false,
    eventData: [],
    error: ''
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case FETCH_SUCCESS:
            return {
                isLoading: false,
                eventData: action.payload,
                error: ''
            }
        case FETCH_FAILED:
            return {
                isLoading: false,
                eventData: [],
                error: action.payload
            }
        default: return state
    }
}

export default reducer