import historySaga from "./sagas/history.saga";
import profileSaga from "./sagas/profile.saga";

const sagas = [
    historySaga,
    profileSaga,
];

export const registerSagasWithMiddleware = function registerSagasWithMiddleware(sagaMiddleware) {
    sagas.forEach(saga => sagaMiddleware.run(saga));
};
