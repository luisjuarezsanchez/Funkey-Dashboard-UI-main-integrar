import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  profile: {
    name: string;
    email: string;
    avatar: string;
  };
  isLoggedIn: boolean;
}

export const initialState: IAuthState = {
  profile: {
    name: "",
    email: "",
    avatar: "",
  },
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
