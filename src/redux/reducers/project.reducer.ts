import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProjectTypes } from "utils/types/project.types";

const initialState: { data: ProjectTypes[] } = {
  data: [],
};

export const snackSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, payload: PayloadAction<ProjectTypes[]>) => {
      state.data = payload.payload;
    },
  },
});

export const { setProjects } = snackSlice.actions;

export default snackSlice.reducer;
