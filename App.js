import React from "react";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from "redux";
import rootReducer from "./rootReducer";
import MainScreen from "./MainScreen";
import createSagaMiddleware from 'redux-saga';
import {registerSagasWithMiddleware} from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
registerSagasWithMiddleware(sagaMiddleware);

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <MainScreen />
            </Provider>
        );
    }
}

export default App;
