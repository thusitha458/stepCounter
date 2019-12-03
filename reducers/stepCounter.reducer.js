import {
    SET_CALORIE_COUNT,
    SET_PEDOMETER_AVAILABILITY,
    SET_STEP_COUNT,
    SET_STEP_TARGET,
    STEP_COUNTER_STARTED,
    STEP_COUNTER_RESUMED,
    STEP_COUNTER_PAUSED,
    STEP_COUNTER_STOPPED,
} from "../actionTypes";
import {DEFAULT_TARGET_VALUE} from "../config/Constants";

const initState = {
    running: false,
    paused: false,
    stopped: true,
    isPedometerAvailable: false,
    stepCount: 0,
    stepCountWhenPaused: 0,
    target: DEFAULT_TARGET_VALUE,
    calorieCount: 0,
    startTime: null,
    endTime: null,
    lastCalorieUpdatedSteps: 0,
    lastCalorieUpdatedTime: null,
};

const stepCounterReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_PEDOMETER_AVAILABILITY: {
            return {
                ...state,
                isPedometerAvailable: action.isAvailable,
            };
        }
        case SET_STEP_COUNT: {
            return {
                ...state,
                stepCount: action.stepCount,
            };
        }
        case SET_STEP_TARGET: {
            return {
                ...state,
                target: action.target || DEFAULT_TARGET_VALUE,
            };
        }
        case SET_CALORIE_COUNT: {
            return {
                ...state,
                calorieCount: action.calorieCount,
                lastCalorieUpdatedSteps: state.stepCount,
                lastCalorieUpdatedTime: new Date().getTime(),
            };
        }
        case STEP_COUNTER_STARTED: {
            return {
                ...state,
                running: true,
                paused: false,
                stopped: false,
                stepCount: 0,
                stepCountWhenPaused: 0,
                calorieCount: 0,
                startTime: new Date().getTime(),
                lastCalorieUpdatedSteps: 0,
                lastCalorieUpdatedTime: new Date().getTime(),
            };
        }
        case STEP_COUNTER_RESUMED: {
            return {
                ...state,
                running: true,
                paused: false,
                stopped: false,
                lastCalorieUpdatedSteps: state.stepCountWhenPaused,
                lastCalorieUpdatedTime: new Date().getTime(),
            };
        }
        case STEP_COUNTER_PAUSED: {
            return {
                ...state,
                running: false,
                paused: true,
                stopped: false,
                calorieCount: state.calorieCount + (action.caloriesToAdd || 0),
                stepCountWhenPaused: state.stepCount,
            };
        }
        case STEP_COUNTER_STOPPED: {
            return {
                ...state,
                running: false,
                paused: false,
                stopped: true,
                calorieCount: state.calorieCount + (action.caloriesToAdd || 0),
                stepCountWhenPaused: 0,
                endTime: action.endTime || new Date().getTime(),
                lastCalorieUpdatedSteps: 0,
                lastCalorieUpdatedTime: null,
            };
        }
        default:
            return state;
    }
};

export default stepCounterReducer;
