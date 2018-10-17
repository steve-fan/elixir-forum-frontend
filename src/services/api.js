import {
    httpPostJson,
    httpGet
} from "./utils";

export const fetchLatestTopics = (params) => {
    return httpPostJson("/topics/latest", params);
}

export const fetchCurrentUser = () => {
    return httpGet("/current_user");
}

export const fetchAllCategories = () => {
    return httpGet("/categories")
}

export const createTopic = (params) => {
    return httpPostJson("/topics", params);
}

export default {
    fetchCurrentUser,
    fetchLatestTopics,
    fetchAllCategories,
    createTopic
}
