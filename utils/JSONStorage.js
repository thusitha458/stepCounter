import {AsyncStorage} from 'react-native';

export const getItem = async key => {
    try {
        let item = await AsyncStorage.getItem(key);
        return JSON.parse(item);
    } catch (error) {
        return null;
    }
};

export const setItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
    }
};

export const removeItem = async key => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
    }
};

export const getAllKeys = async () => {
    try {
        return await AsyncStorage.getAllKeys();
    } catch (error) {
        return null;
    }
};

export const multiGet = async keys => {
    try {
        let keyValuePairs = await AsyncStorage.multiGet(keys);
        return keyValuePairs.map(keyValuePair => {
            return keyValuePair[1];
        });
    } catch (error) {
        return null;
    }
};
