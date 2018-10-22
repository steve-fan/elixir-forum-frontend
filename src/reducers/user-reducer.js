import update from 'immutability-helper';
import { removeElem } from "../utils";

import {
    FETCH_CURRENT_USER_SUCCESS,
    FETCH_UNREAD_NOTIFICATIONS_SUCCESS,
    MARK_NOTIFICATION_SUCCESS
} from "../constants/action-types"

const initialState = {
    currentUser: null,
    notifications: null
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CURRENT_USER_SUCCESS:
            return update(state, {
                currentUser: { $set: action.currentUser }
            });

        case FETCH_UNREAD_NOTIFICATIONS_SUCCESS:
            return update(state, {
                notifications: { $set: action.notifications }
            });

        case MARK_NOTIFICATION_SUCCESS:
            const notificationItems = removeElem(state.notifications.data, "id", action.notification)
            return update(state, {
                notifications: {
                    data: {$set: notificationItems}
                }
            })

        default:
            return state;
    }
}
