import update from 'immutability-helper';
import {updateElem} from "../utils";

import {
    FETCH_TOPIC_SUCCESS,
    FETCH_TOPICS_SUCCESS,
    CLEAN_LATEST_TOPICS,
    FETCH_LATEST_TOPICS_SUCCESS,
    CLEAN_TOP_TOPICS,
    FETCH_TOP_TOPICS_SUCCESS,
    CREATE_TOPIC_POST_SUCCESS,
    CREATE_POST_REPLY_SUCCESS
} from "../constants/action-types"

const initialState = {
    currentTopic: null,
    latest: {
        data: [],
        pagination: {
            current_page: 0,
            per_page: 10
        }
    },
    top: {
        data: [],
        pagination: {
            current_page: 0,
            per_page: 10
        }
    }
}

export default function topicReducer(state = initialState, action) {
    switch (action.type) {
        case CLEAN_LATEST_TOPICS:
            return update(state, {
                latest: {$set: initialState.latest}
            });

        case FETCH_LATEST_TOPICS_SUCCESS:
            return update(state, {
                latest: {
                    data: {$push: action.topics.data},
                    pagination: {$set: action.topics.pagination}
                }
            });

        case CLEAN_TOP_TOPICS:
            return update(state, {
                top: {$set: initialState.top}
            });

        case FETCH_TOP_TOPICS_SUCCESS:
            return update(state, {
                top: {
                    data: {$push: action.topics.data},
                    pagination: {$set: action.topics.pagination}
                }
            });

        case FETCH_TOPIC_SUCCESS:
            return update(state, {
                currentTopic: {$set: action.topic}
            });

        case CREATE_TOPIC_POST_SUCCESS:
            return update(state, {
                currentTopic: {
                    posts: {$push: [action.post]}
                }
            });

        case CREATE_POST_REPLY_SUCCESS:
            const index = state.currentTopic.posts.findIndex(p => p.id === action.post.parent_post_id)
            const targetTopic = state.currentTopic.posts[index];
            const replies = updateElem(targetTopic.replies, "id", action.post)
            targetTopic.replies = replies;

            return update(state, {
                currentTopic: {
                    posts: {
                        $splice: [[index, 1, targetTopic]],
                        $push: [action.post],
                    },
                }
            });

        default:
            return state;
    }
}
