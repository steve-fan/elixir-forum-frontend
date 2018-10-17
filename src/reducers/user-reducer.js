import update from 'immutability-helper';
import {
    FETCH_CURRENT_USER_SUCCESS
} from "../constants/action-types"

const initialState = {
    currentUser: null
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CURRENT_USER_SUCCESS:
            return update(state, {
                currentUser: { $set: action.currentUser }
            });

        default:
            return state;
    }
}
