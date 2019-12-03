import {setItem, removeItem, getAllKeys, multiGet} from "./JSONStorage";
import {MAX_HISTORY_ITEMS_STORED, PROFILE_KEY} from "../config/Constants";

const sortKeysInDescendingOrder = keys => {
    return keys.sort((key1, key2) => {
        if (key1 > key2) {
            return -1;
        } else if (key1 < key2) {
            return 1;
        } else {
            return 0;
        }
    });
};

const historyItemsCompareForDescendingOrder = (historyItem1, historyItem2) => {
    let key1 = extractKey(historyItem1);
    let key2 = extractKey(historyItem2);
    if (key1 > key2) {
        return -1;
    } else if (key1 < key2) {
        return 1;
    } else {
        return 0;
    }
};

export const extractKey = historyItem => historyItem.startTime.toString();

export const insertHistoryItem = async (historyItem, sortKeys = sortKeysInDescendingOrder) => {
    let keys = await getAllKeys() || [];
    if (keys.length >= MAX_HISTORY_ITEMS_STORED) {
        let sortedKeys = sortKeys(keys);
        let lastKey = sortedKeys[sortKeys.length - 1];
        await removeItem(lastKey);
    }

    let key = extractKey(historyItem);
    await setItem(key, historyItem);
};

export const removeHistoryItem = async key => {
    await removeItem(key);
};

export const getHistoryItems = async (compareFunction = historyItemsCompareForDescendingOrder) => {
    let keys = await getAllKeys() || [];
    let historyItemKeys = keys.filter(key => key !== PROFILE_KEY) || [];
    let historyItems = historyItemKeys.length > 0 ? (await multiGet(historyItemKeys) || []) : [];
    let parsedHistoryItems = historyItems.map(historyItem => JSON.parse(historyItem));
    return parsedHistoryItems.sort(compareFunction);
};
