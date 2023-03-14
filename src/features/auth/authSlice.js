import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { userInfo: null },
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
    },
    logOut: (state, action) => {
      state.userInfo = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.userInfo?.accessToken;

export const selectCurrentUserStatus = (state) => state.auth.userInfo;
