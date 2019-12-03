import {SELECT_SCREEN} from "../actionTypes";

export const selectScreen = screen => {
    return {
        type: SELECT_SCREEN,
        screen: screen,
    };
};
