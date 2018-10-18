import api from "../services/api";

import {
    FETCH_CURRENT_USER_SUCCESS,
    FETCH_ALL_CATEGORIES_SUCCESS,
    FETCH_TOPIC_SUCCESS,
    FETCH_LATEST_TOPICS_SUCCESS,
    CREATE_TOPIC_POST_SUCCESS
} from "../constants/action-types";

// Topic actions

export function fetchLatestTopicsActionSuccess(json) {
    return {
        type: FETCH_LATEST_TOPICS_SUCCESS,
        topics: json.data
    }
}

export function fetchLatestTopicsAction() {
    return dispatch => {
        return api.fetchLatestTopics().then(json => {
            if (json.success) {
                dispatch(fetchLatestTopicsActionSuccess(json));
            }

            return json;
        });
    }
}

export function createTopic(params) {
    return dispatch => {
        return api.createTopic(params);
    }
}

export function fetchTopicActionSuccess(topic) {
    return {
        type: FETCH_TOPIC_SUCCESS,
        topic
    }
}


export function fetchTopicAction(id) {
    return dispatch => {
        return api.fetchTopic(id).then(json => {
            if (json.success) {
                dispatch(fetchTopicActionSuccess(json.data));
            }
            return json;
        })
    }
}

// User actions

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

// Category actions

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

export function createTopicPostSuccess(post) {
    return {
        type: CREATE_TOPIC_POST_SUCCESS,
        post
    }
}

export function createTopicPostAction(params) {
    return dispatch => {
        return api.createTopicPost(params).then(json => {
            if (json.success) {
                dispatch(createTopicPostSuccess(json.data));
            }
        });
    }
}
