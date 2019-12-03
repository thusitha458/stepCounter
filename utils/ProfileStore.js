import {getItem, setItem} from "./JSONStorage";
import {PROFILE_KEY} from "../config/Constants";

export const getProfile = async () => {
    return await getItem(PROFILE_KEY);
};

export const setProfile = async profile => {
    await setItem(PROFILE_KEY, profile);
};
