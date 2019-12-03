import {DELETE_HISTORY_ITEM_SUCCESS, INSERT_HISTORY_ITEM, LOAD_HISTORY_SUCCESS} from "../actionTypes";
import {extractKey} from "../utils/HistoryStore";

const initState = {
    history: [],
};

const historyReducer = (state = initState, action) => {
    switch (action.type) {
        case LOAD_HISTORY_SUCCESS: {
            return {
                ...state,
                history: action.history,
            };
        }
        case DELETE_HISTORY_ITEM_SUCCESS: {
            return {
                ...state,
                history: state.history.filter(item => extractKey(item) !== action.key),
            };
        }
        case INSERT_HISTORY_ITEM: {
            return {
                ...state,
                history: [action.historyItem, ...state.history],
            };
        }
        default:
            return state;
    }
};

export default historyReducer;
