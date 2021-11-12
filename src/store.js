import { configureStore } from '@reduxjs/toolkit'
import matchsReducer from './reduxSlice/matchsSlice'

export default configureStore({
    reducer: {
        matchs: matchsReducer
    },
})