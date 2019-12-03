import {SCREENS} from "../config/Constants";
import {SELECT_SCREEN} from "../actionTypes";

const initState = {
    selectedScreen: SCREENS.STEPS,
};

const screensReducer = (state = initState, action) => {
    switch (action.type) {
        case SELECT_SCREEN: {
            return {
                ...state,
                selectedScreen: action.screen,
            };
        }
        default:
            return state;
    }
};

export default screensReducer;
