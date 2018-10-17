import update from 'immutability-helper';

import {
    FETCH_TOPIC_SUCCESS,
    FETCH_LATEST_TOPICS_SUCCESS
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

        default:
            return state;
    }
}
