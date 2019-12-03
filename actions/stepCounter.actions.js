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

export const setPedometerAvailability = isAvailable => {
    return {
        type: SET_PEDOMETER_AVAILABILITY,
        isAvailable: isAvailable,
    };
};

export const setStepCount = stepCount => {
    return {
        type: SET_STEP_COUNT,
        stepCount: stepCount,
    };
};

export const setStepTarget = target => {
    return {
        type: SET_STEP_TARGET,
        target: target,
    };
};

export const setCalorieCount = calorieCount => {
    return {
        type: SET_CALORIE_COUNT,
        calorieCount: calorieCount,
    };
};

export const stepCounterStarted = () => {
    return {
        type: STEP_COUNTER_STARTED,
    };
};

export const stepCounterResumed = () => {
    return {
        type: STEP_COUNTER_RESUMED,
    };
};

export const stepCounterPaused = caloriesToAdd => {
    return {
        type: STEP_COUNTER_PAUSED,
        caloriesToAdd: caloriesToAdd,
    };
};

export const stepCounterStopped = (caloriesToAdd, endTime) => {
    return {
        type: STEP_COUNTER_STOPPED,
        caloriesToAdd: caloriesToAdd,
        endTime: endTime,
    };
};
