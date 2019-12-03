import {GENDER} from "../config/Constants";

const getStepsPerMinute = (stepCount, startTime, endTime) => {
    let durationInMS = Math.max(endTime - startTime, 1);
    let durationInMinutes = durationInMS / (1000 * 60);
    return (stepCount / durationInMinutes);
};

const getMETs = (stepCount, startTime, endTime) => {
    let stepsPerMinute = getStepsPerMinute(stepCount, startTime, endTime);
    if (stepsPerMinute === 0) {
        return 0;
    } else if (stepsPerMinute < 50) {
        return 2 - (2 - 1.3) * (50 - stepsPerMinute) / 50;
    } else if (stepsPerMinute < 130) {
        return 6.3 - (6.3 - 2) * (80 - (stepsPerMinute - 50)) / 80;
    } else if (stepsPerMinute < 180) {
        return 11.5 - (11.5 - 6.3) * (50 - (stepsPerMinute - 130)) / 50;
    } else {
        return 11.5;
    }
};

const getBMR = (gender, age, height, weight) => {
    if (gender === GENDER.MALE) {
        return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        return 10 * weight + 6.25 * height - 5 * age - 161;
    }
};

export const getCalorieCount = (profile, stepCount, startTime, endTime) => {
    let BMR = getBMR(profile.gender, profile.age, profile.height, profile.weight);
    let MET = getMETs(stepCount, startTime, endTime);

    let durationInMS = Math.max(endTime - startTime, 0);
    let durationInHours = durationInMS / (1000 * 60 * 60);

    return BMR * MET / 24 * durationInHours;
};
