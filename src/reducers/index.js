import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import userReducer from "./user-reducer";
import categoryReducer from "./category-reducer"
import topicReducer from "./topic-reducer";

export default combineReducers({
    user: userReducer,
    topic: topicReducer,
    category: categoryReducer,
    routing: routerReducer,
});
