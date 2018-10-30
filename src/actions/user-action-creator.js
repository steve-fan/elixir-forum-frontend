import api from "../services/api";

import {
    FETCH_CURRENT_USER_SUCCESS,
    FETCH_ALL_CATEGORIES_SUCCESS,
    FETCH_TOPIC_SUCCESS,
    FETCH_TOPICS_SUCCESS,
    FETCH_LATEST_TOPICS_SUCCESS,
    CLEAN_LATEST_TOPICS,
    CLEAN_TOP_TOPICS,
    FETCH_TOP_TOPICS_SUCCESS,
    CREATE_TOPIC_POST_SUCCESS,
    FETCH_UNREAD_NOTIFICATIONS_SUCCESS,
    MARK_NOTIFICATION_SUCCESS,
    CREATE_POST_REPLY_SUCCESS,
} from "../constants/action-types";

// Topic actions

export function fetchLatestTopicsSuccess(json) {
    return {
        type: FETCH_LATEST_TOPICS_SUCCESS,
        topics: json.data
    }
}

export function cleanLatestTopicsAction() {
    return {
        type: CLEAN_LATEST_TOPICS
    }
}

export function fetchLatestTopicsAction(params) {
    return dispatch => {
        return api.fetchLatestTopics(params).then(json => {
            if (json.success) {
                dispatch(fetchLatestTopicsSuccess(json));
            }

            return json;
        });
    }
}

export function fetchTopTopicsSuccess(json) {
    return {
        type: FETCH_TOP_TOPICS_SUCCESS,
        topics: json.data
    }
}

export function cleanTopTopicsAction() {
    return {
        type: CLEAN_TOP_TOPICS
    }
}

export function fetchTopTopicsAction(params) {
    return dispatch => {
        return api.fetchTopTopics(params).then(json => {
            if (json.success) {
                dispatch(fetchTopTopicsSuccess(json));
            }
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
            return json;
        });
    }
}

export function createPostReplySuccess(post) {
    return {
        type: CREATE_POST_REPLY_SUCCESS,
        post
    }
}

export function createPostReplyAction(reply) {
    return dispatch => {
        return api.createTopicPost({post: reply}).then(json => {
            if (json.success) {
                dispatch(createPostReplySuccess(json.data));
            }
            return json;
        });
    }
}


// Notification actions
export function fetchUnreadNotificationsSuccess(notifications) {
    return {
        type: FETCH_UNREAD_NOTIFICATIONS_SUCCESS,
        notifications
    };
}

export function fetchUnreadNotificationsAction() {
    return dispatch => {
        return api.fetchUnreadNotifications().then(json => {
            if (json.success) {
                dispatch(fetchUnreadNotificationsSuccess(json.data));
            }
        });
    }
}

export function markNotificationSuccess(notification) {
    return {
        type: MARK_NOTIFICATION_SUCCESS,
        notification
    }
}

export function markNotificationAction(id) {
    return dispatch => {
        return api.markNotification(id).then(json => {
            if (json.success) {
                dispatch(markNotificationSuccess(json.data));
            }
        });
    }
}
