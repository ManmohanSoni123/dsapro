import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./auth";
import sheetDataSlice from "./sheetData";
const store = configureStore({
  reducer: { login: loginSlice.reducer,Dsa450:sheetDataSlice.reducer },
});

export default store;
