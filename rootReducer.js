import {combineReducers} from "redux";
import screensReducer from "./reducers/screens.reducer";
import stepCounterReducer from "./reducers/stepCounter.reducer";
import historyReducer from "./reducers/history.reducer";
import profileReducer from "./reducers/profile.reducer";

export default combineReducers({
    screens: screensReducer,
    stepCounter: stepCounterReducer,
    history: historyReducer,
    profile: profileReducer,
});
