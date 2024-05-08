import { createSlice } from "@reduxjs/toolkit";
import { UserTypes } from "utils/types/user.types";

// Define a type for the slice state
interface AuthState {
  value: number;
  user: UserTypes | null;
  loading: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
  value: 0,
  user: null,
  loading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    stopLoading: (state) => {
      state.loading = false;
    },
    setUser: (state, payload) => {
      state.user = payload.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { stopLoading, setUser, logout } = authSlice.actions;

export default authSlice.reducer;
