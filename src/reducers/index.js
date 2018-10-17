import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import userReducer from "./user-reducer";
import categoryReducer from "./category-reducer"

export default combineReducers({
    user: userReducer,
    category: categoryReducer,
    routing: routerReducer,
});
