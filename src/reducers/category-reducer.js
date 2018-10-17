import update from 'immutability-helper';

import {
    FETCH_ALL_CATEGORIES_SUCCESS
} from "../constants/action-types"

const initialState = {
    categories: []
}

export default function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_CATEGORIES_SUCCESS:
            return update(state, {
                categories: { $set: action.categories }
            });

        default:
            return state;
    }
}
