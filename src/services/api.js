import {
    httpPostJson,
    httpGet
} from "./utils";

// User

export const fetchCurrentUser = () => {
    return httpGet("/current_user");
}

// Category

export const fetchAllCategories = () => {
    return httpGet("/categories")
}

// Topic

export const createTopic = (params) => {
    return httpPostJson("/topics", params);
}

export const fetchLatestTopics = (params) => {
    return httpPostJson("/topics/latest", params);
}

export const fetchTopic = (id) => {
    return httpGet(`/topics/${id}`);
}

export default {
    fetchCurrentUser,
    fetchAllCategories,
    createTopic,
    fetchLatestTopics,
    fetchTopic,
}
