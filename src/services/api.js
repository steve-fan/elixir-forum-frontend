import {
    httpPostJson
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
