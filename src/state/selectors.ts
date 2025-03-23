import { RootState } from "./store";

export const getUserLoginStatus = (state: RootState) =>
    state.auth.isUserLoggedIn;
