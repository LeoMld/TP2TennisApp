import {combineReducers, configureStore} from '@reduxjs/toolkit'
import matchsReducer from './reduxSlice/matchsSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import idReducer from './reduxSlice/idSlice'
import thunk from 'redux-thunk'

const reducers = combineReducers(
    {
        matchs: matchsReducer,
        id: idReducer
    }
);

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})