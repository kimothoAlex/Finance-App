import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutStart: (state, action) => {
      state.loading = true;
    },
    signOutSuccess: (state, action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateStart: (state, action) => {
      state.loading = true;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    updateFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteStart: (state, action) => {
      state.loading = true;
    },
    deleteSuccess: (state, action) => {
      state.currentUser = null;
      state.loading = false;
    },
    deleteFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOutFailure,
  signOutStart,
  signOutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
  deleteStart,
  deleteFailure,
  deleteSuccess,
} = userSlice.actions;

export default userSlice.reducer;
