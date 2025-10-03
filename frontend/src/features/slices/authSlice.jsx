import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  initialState: {
    user: null,
    isLoggedin: false,
    isError: null,
  },
  reducers: {
    setUser: (state, action) => {
      (state.user = action.payload),
        (state.isLoggedin = true),
        (state.isError = null);
    },
    removeUser: (state) => {
      (state.user = action.payload),
        (state.isLoggedin = false),
        (state.isError = null);
    },
    setError: (state, action) => {
      state.isError = action.payload;
    },
  },
});

export const {setUser, removeUser, setError} = authSlice.actions;
export default authSlice.reducer;
