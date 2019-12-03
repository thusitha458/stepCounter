import {takeLatest, takeEvery, put, all} from 'redux-saga/effects';
import {DELETE_HISTORY_ITEM, INSERT_HISTORY_ITEM, LOAD_HISTORY} from "../actionTypes";
import {getHistoryItems, insertHistoryItem, removeHistoryItem} from "../utils/HistoryStore";
import {
    deleteHistoryItemFailed,
    deleteHistoryItemSuccess,
    insertHistoryItemFailed,
    insertHistoryItemSuccess,
    loadHistoryFailed,
    loadHistorySuccess,
} from "../actions/history.actions";

function* loadHistoryAsync() {
    try {
        let history = yield getHistoryItems();
        yield put(loadHistorySuccess(history || []));
    } catch (error) {
        yield put(loadHistoryFailed());
    }
}

function* deleteHistoryItemAsync(action) {
    try {
        yield removeHistoryItem(action.key);
        yield put(deleteHistoryItemSuccess(action.key));
    } catch (error) {
        yield put(deleteHistoryItemFailed(action.key));
    }
}

function* insertHistoryItemAsync(action) {
    try {
        yield insertHistoryItem(action.historyItem);
        yield put(insertHistoryItemSuccess());
    } catch (error) {
        yield put(insertHistoryItemFailed());
    }
}

export function* watchLoadHistory () {
    yield takeLatest(LOAD_HISTORY, loadHistoryAsync);
}

export function* watchDeleteHistoryItem () {
    yield takeEvery(DELETE_HISTORY_ITEM, deleteHistoryItemAsync);
}

export function* watchInsertHistoryItem () {
    yield takeEvery(INSERT_HISTORY_ITEM, insertHistoryItemAsync);
}

export default function* historySaga() {
    yield all([watchLoadHistory(), watchDeleteHistoryItem(), watchInsertHistoryItem()]);
}
