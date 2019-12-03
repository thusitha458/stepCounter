import {} from "../actionTypes";
import {GENDER} from "../config/Constants";
import {GET_PROFILE_SUCCESS} from "../actionTypes";
import {UPDATE_PROFILE} from "../actionTypes";

const initState = {
    gender: GENDER.MALE,
    age: 30,
    height: 170,
    weight: 65,
};

const profileReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_PROFILE_SUCCESS: {
            return {
                ...action.profile,
            };
        }
        case UPDATE_PROFILE: {
            return {
                ...action.profile,
            };
        }
        default:
            return state;
    }
};

export default profileReducer;
