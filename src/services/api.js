import {
    httpPostJson
} from "./utils";

export const fetchPost = (id) => {
    return httpPostJson("/post.show", {id});
}

export const fetchHotPosts = (params) => {
    return httpPostJson("/post.list", params);
}

export const createPost = ({title, content}) => {
    return httpPostJson("/post.create", {
        post: {title, content}
    });
}

export const updatePost = ({id, title, content}) => {
    return httpPostJson("/post.update", {
        id,
        post: { title, content }
    });
}
