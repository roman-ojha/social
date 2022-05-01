import { createStore } from "redux";
import rootReducers from "../redux-reducer";

const store = createStore(rootReducers);

export default store;
