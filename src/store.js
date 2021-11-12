import { configureStore } from '@reduxjs/toolkit'
import matchsReducer from './reduxSlice/matchsSlice'
import idReducer from './reduxSlice/idSlice'

export default configureStore({
    reducer: {
        matchs: matchsReducer,
        id: idReducer
    },
})