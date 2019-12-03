import {Dimensions} from "react-native";

export const SCREEN_WIDTH =  Dimensions.get("window").width;
export const SCREEN_HEIGHT =  Dimensions.get("window").height;

export const CALORIE_COUNT_UPDATE_INTERVAL = 10000;

export const MAX_NUMBER_OF_TARGET_STEPS = 999999;

export const DEFAULT_TARGET_VALUE = 1000;

export const MAX_HISTORY_ITEMS_STORED = 2000;

export const SCREENS = {
    STEPS: 'STEPS',
    HISTORY: 'HISTORY',
    PROFILE: 'PROFILE',
};

export const TOOLBAR_HEIGHT = 40;
export const TOP_MARGIN_OF_SCREEN = 40;

export const GENDER = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
};

export const PROFILE_KEY = "profile";

export const MIN_AGE = 10;
export const MAX_AGE = 99;

export const MIN_HEIGHT = 50;
export const MAX_HEIGHT = 250;

export const MIN_WEIGHT = 20;
export const MAX_WEIGHT = 500;
