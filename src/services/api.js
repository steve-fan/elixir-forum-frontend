import {
    httpPostJson,
    httpGet
} from "./utils";

export const fetchPost = (id) => {
    return httpPostJson("/post.show", {id});
}

export const fetchHotPosts = (params) => {
    return httpPostJson("/post.list", params);
}

export const createPost = (params) => {
    return httpPostJson("/post.create", params);
}

export const updatePost = ({id, title, content}) => {
    return httpPostJson("/post.update", {
        id,
        post: { title, content }
    });
}

export const createPostComment = (params) => {
    return httpPostJson("/post.create_comment", params);
}

export const fetchLatestTopics = (params) => {
    return httpPostJson("/topics/latest", params);
}

export const fetchCurrentUser = (params) => {
    return httpGet("/current_user");
}
