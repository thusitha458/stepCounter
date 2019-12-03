import {Pedometer} from "expo-sensors";

export const isPedometerAvailable = async () => {
    return await Pedometer.isAvailableAsync();
};

export const onStepCount = onStepCountCallback => {
    return Pedometer.watchStepCount(onStepCountCallback);
};

