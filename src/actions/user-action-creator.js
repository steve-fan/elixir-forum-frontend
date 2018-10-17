import api from "../services/api";

import {
    FETCH_CURRENT_USER_SUCCESS,
    FETCH_ALL_CATEGORIES_SUCCESS
} from "../constants/action-types";

export function fetchCurrentUserSuccess(currentUser) {
    return {
        type: FETCH_CURRENT_USER_SUCCESS,
        currentUser
    }
}

export function fetchCurrentUser() {
    return dispatch => {
        return api.fetchCurrentUser().then(json => {
            if (json.success) {
                dispatch(fetchCurrentUserSuccess(json.data))
            }
            return json
        })
    }
}

// Category

export function fetchAllCategoriesSuccess(categories) {
    return {
        type: FETCH_ALL_CATEGORIES_SUCCESS,
        categories
    }
}

export function fetchAllCategories() {
    return dispatch => {
        return api.fetchAllCategories().then(json => {
            if (json.success) {
                dispatch(fetchAllCategoriesSuccess(json.data))
            }
            return json;
        })
    }
}


// Topic

export function createTopic(params) {
    return dispatch => {
        return api.createTopic(params);
    }
}
