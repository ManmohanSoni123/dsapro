import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./auth";

const store = configureStore({
  reducer: { login: loginSlice.reducer },
});

export default store;
