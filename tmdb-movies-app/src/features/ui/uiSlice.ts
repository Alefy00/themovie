import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  globalError: string | null;
};

const initialState: UIState = {
  globalError: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setGlobalError(state, action: PayloadAction<string | null>) {
      state.globalError = action.payload;
    },
  },
});

export const { setGlobalError } = uiSlice.actions;
export default uiSlice.reducer;
