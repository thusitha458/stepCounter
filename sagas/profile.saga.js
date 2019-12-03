import {takeLatest, put, all} from 'redux-saga/effects';
import {GET_PROFILE, UPDATE_PROFILE} from "../actionTypes";
import {
    getProfileFailed,
    getProfileSuccess,
    updateProfileFailed,
    updateProfileSuccess
} from "../actions/profile.actions";
import {getProfile, setProfile} from "../utils/ProfileStore";

function* getProfileAsync () {
    try {
        let profile = yield getProfile();
        if (profile) {
            yield put(getProfileSuccess(profile));
        }
    } catch (error) {
        yield put(getProfileFailed());
    }
}

function* updateProfileAsync (action) {
    try {
        yield setProfile(action.profile);
        yield put(updateProfileSuccess());
    } catch (error) {
        yield put(updateProfileFailed());
    }
}

export function* watchGetProfile () {
    yield takeLatest(GET_PROFILE, getProfileAsync);
}

export function* watchUpdateProfile () {
    yield takeLatest(UPDATE_PROFILE, updateProfileAsync);
}

export default function* profileSaga() {
    yield all([watchGetProfile(), watchUpdateProfile()]);
}
