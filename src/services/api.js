import {
    httpPostJson,
    httpGet
} from "./utils";

// User API

export const fetchCurrentUser = () => {
    return httpGet("/current_user");
}

// Category API

export const fetchAllCategories = () => {
    return httpGet("/categories")
}

// Topic API

export const createTopic = (params) => {
    return httpPostJson("/topics", params);
}

export const fetchLatestTopics = (params) => {
    return httpPostJson("/topics/latest", params);
}

export const fetchTopic = (id) => {
    return httpGet(`/topics/${id}`);
}

// Post API

export const createTopicPost = (params) => {
    return httpPostJson("/posts", params);
}

// Notification API

export const fetchNotifications = (params) => {
    return httpPostJson("/notifications.list", params);
}

export const fetchUnreadNotifications = () => {
    return httpPostJson("/notifications.list", {
        filter: {
            read: false
        }
    });
}

export const markNotification = (id) => {
    return httpPostJson(`/notifications/${id}`, {read: true});
}

export default {
    fetchCurrentUser,
    fetchAllCategories,
    createTopic,
    fetchLatestTopics,
    fetchTopic,
    createTopicPost,
    fetchUnreadNotifications,
    markNotification
}
