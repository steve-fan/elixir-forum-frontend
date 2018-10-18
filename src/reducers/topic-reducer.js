import update from 'immutability-helper';

import {
    FETCH_TOPIC_SUCCESS,
    FETCH_LATEST_TOPICS_SUCCESS,
    CREATE_TOPIC_POST_SUCCESS
} from "../constants/action-types"

const initialState = {
    currentTopic: null,
    topics: {
        data: []
    }
}

export default function topicReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_LATEST_TOPICS_SUCCESS:
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

        default:
            return state;
    }
}
