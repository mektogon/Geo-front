import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import authService from "../../utils/services/auth.service";
import type { RootState } from "../store";

const storedUser: string | null = localStorage.getItem("user");
const user: string | null = storedUser !== null ? JSON.parse(storedUser) : null;

interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}

interface AuthState extends AsyncState {
  username?: string | null | undefined;
}

const initialState: AuthState = {
  username: user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (username: LoginUser, thunkAPI) => {
    try {
      return await authService.login(username);
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to login");
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.username = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.username = null;
        state.message = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.username = null;
      });
  },
});

export const { reset } = authSlice.actions;

export const selectedUser = (state: RootState) => state.auth;

export default authSlice.reducer;
