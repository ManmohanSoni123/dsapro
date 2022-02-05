import { createSlice } from "@reduxjs/toolkit";

const initialState = { loginId: "", isLoggedIn: false };

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    login(state, action) {
      const userId = action.payload;
      console.log(userId);
      state.loginId = userId;
      state.isLoggedIn = true;
    },
    logout(state){
      state.isLoggedIn = false; 
    }
  },
});

const loginActions = loginSlice.actions;
export { loginActions };
export default loginSlice;
