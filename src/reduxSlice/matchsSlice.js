import { createSlice } from "@reduxjs/toolkit";

export const matchsSlice = createSlice({
  name: "matchs",
  initialState: {
    value: [],
  },
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { update, updateOne } = matchsSlice.actions;

export default matchsSlice.reducer;
