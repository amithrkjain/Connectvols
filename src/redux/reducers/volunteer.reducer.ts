import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserTypes } from "utils/types/user.types";

const initialState: {
  data: UserTypes[];
} = {
  data: [],
};

export const volunteerSlice = createSlice({
  name: "volunteer",
  initialState,
  reducers: {
    setVolunteers: (state, payload: PayloadAction<UserTypes[]>) => {
      state.data = payload.payload;
    },
  },
});

export const { setVolunteers } = volunteerSlice.actions;

export default volunteerSlice.reducer;
