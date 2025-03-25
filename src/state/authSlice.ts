import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const checkUserLoginStatus = () => {
    const hostcodeAccessToken = Cookies.get("HOSTCODE_ACCESS_TOKEN");
    return hostcodeAccessToken !== null && hostcodeAccessToken !== undefined;
};

const authSlice = createSlice({
    name: "authToken",
    initialState: {
        isUserLoggedIn: checkUserLoginStatus(),
    },
    reducers: {
        setToken: (state) => {
            state.isUserLoggedIn = true;
        },
        removeToken: (state) => {
            state.isUserLoggedIn = false;
            Cookies.remove("HOSTCODE_ACCESS_TOKEN")
        },
    },
});

// Action creators are generated for each case reducer function
export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
