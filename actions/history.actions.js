import {
    DELETE_HISTORY_ITEM,
    DELETE_HISTORY_ITEM_SUCCESS,
    DELETE_HISTORY_ITEM_FAILED,
    LOAD_HISTORY,
    LOAD_HISTORY_FAILED,
    LOAD_HISTORY_SUCCESS, INSERT_HISTORY_ITEM, INSERT_HISTORY_ITEM_SUCCESS, INSERT_HISTORY_ITEM_FAILED,
} from "../actionTypes";

export const loadHistory = () => {
    return {
        type: LOAD_HISTORY,
    };
};

export const loadHistorySuccess = history => {
    return {
        type: LOAD_HISTORY_SUCCESS,
        history: history,
    };
};

export const loadHistoryFailed = () => {
    return {
        type: LOAD_HISTORY_FAILED,
    };
};

export const deleteHistoryItem = key => {
    return {
        type: DELETE_HISTORY_ITEM,
        key: key,
    };
};

export const deleteHistoryItemSuccess = key => {
    return {
        type: DELETE_HISTORY_ITEM_SUCCESS,
        key: key,
    };
};

export const deleteHistoryItemFailed = key => {
    return {
        type: DELETE_HISTORY_ITEM_FAILED,
        key: key,
    };
};

export const insertHistoryItem = historyItem => {
    return {
        type: INSERT_HISTORY_ITEM,
        historyItem: historyItem,
    };
};

export const insertHistoryItemSuccess = () => {
    return {
        type: INSERT_HISTORY_ITEM_SUCCESS,
    };
};

export const insertHistoryItemFailed = () => {
    return {
        type: INSERT_HISTORY_ITEM_FAILED,
    };
};
