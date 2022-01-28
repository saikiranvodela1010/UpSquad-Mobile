import burgerReducer from "./src/screens/Events/Pre_events/Reducer"
import thunk from 'redux-thunk';
import {createStore, applyMiddleware,combineReducers} from 'redux';

const rootReducer=combineReducers({
    burgerReducer:burgerReducer,
})


// Passing burgerReducer to createStore
const store = createStore(burgerReducer, applyMiddleware(thunk));

export default store;
