import {
    GET_PROFILE,
    GET_PROFILE_FAILED,
    GET_PROFILE_SUCCESS,
    UPDATE_PROFILE,
    UPDATE_PROFILE_FAILED,
    UPDATE_PROFILE_SUCCESS,
} from "../actionTypes";

export const getProfile = () => {
    return {
        type: GET_PROFILE,
    };
};

export const getProfileSuccess = profile => {
    return {
        type: GET_PROFILE_SUCCESS,
        profile: profile,
    };
};

export const getProfileFailed = () => {
    return {
        type: GET_PROFILE_FAILED,
    };
};

export const updateProfile = profile => {
    return {
        type: UPDATE_PROFILE,
        profile: profile,
    };
};

export const updateProfileSuccess = () => {
    return {
        type: UPDATE_PROFILE_SUCCESS,
    };
};

export const updateProfileFailed = () => {
    return {
        type: UPDATE_PROFILE_FAILED,
    };
};
