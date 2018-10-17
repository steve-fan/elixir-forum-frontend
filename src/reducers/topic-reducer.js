import update from 'immutability-helper';

import {
    FETCH_TOPIC_SUCCESS
} from "../constants/action-types"

const initialState = {
    currentTopic: null
}

export default function topicReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_TOPIC_SUCCESS:
            return update(state, {
                currentTopic: {$set: action.topic}
            })

        default:
            return state;
    }
}
