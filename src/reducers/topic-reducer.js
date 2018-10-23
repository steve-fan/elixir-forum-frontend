import update from 'immutability-helper';

import {
    FETCH_TOPIC_SUCCESS,
    FETCH_TOPICS_SUCCESS,
    CREATE_TOPIC_POST_SUCCESS,
    CREATE_POST_REPLY_SUCCESS
} from "../constants/action-types"

const initialState = {
    currentTopic: null,
    topics: {
        data: []
    }
}

export default function topicReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_TOPICS_SUCCESS:
            return update(state, {
               topics: {$set: action.topics}
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
            // TODO update posts
            return update(state, {
                currentTopic: {
                    posts: {$push: [action.post]}
                }
            });

        default:
            return state;
    }
}
