import { createSlice } from '@reduxjs/toolkit'

export const idSlice = createSlice({
    name: 'id',
    initialState: {
        value: 0
    },
    reducers: {
        update: (state, action )=> {
            state.value = action.payload
        }
    }
})

export const { update } = idSlice.actions

export default idSlice.reducer