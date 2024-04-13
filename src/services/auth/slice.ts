import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  fetchGetUser,
  fetchLoginUser,
  fetchLogoutUser,
  fetchRegisterUser,
  fetchUpdateUser
} from './action';

interface TAuthState {
  isAuthenticated: boolean;
  data: TUser;
  error: string | undefined;
  loginUserRequest: boolean;
}

const initialState: TAuthState = {
  isAuthenticated: false,
  data: {
    name: '',
    email: ''
  },
  error: undefined,
  loginUserRequest: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearErrorMessage: (state) => {
      state.error = '';
    }
  },
  selectors: {
    selectUserData: (state) => state.data,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectError: (state) => state.error,
    selectloginRequest: (state) => state.loginUserRequest
  },
  extraReducers(builder) {
    builder

      .addCase(fetchRegisterUser.pending, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.data.email = action.payload.user.email;
        state.data.name = action.payload.user.name;
      })

      .addCase(fetchLoginUser.pending, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.data.email = action.payload.user.email;
      })

      .addCase(fetchGetUser.pending, (state) => {
        state.loginUserRequest = true;
        state.isAuthenticated = false;
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.loginUserRequest = false;
      })

      .addCase(fetchUpdateUser.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.loginUserRequest = true;
        state.error = action.error.message;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isAuthenticated = true;
        state.loginUserRequest = false;
      })

      .addCase(fetchLogoutUser.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(fetchLogoutUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loginUserRequest = true;
      })
      .addCase(fetchLogoutUser.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.loginUserRequest = false;
      });
  }
});

export const { clearErrorMessage } = authSlice.actions;
export const { selectUserData, selectError, selectIsAuthenticated } =
  authSlice.selectors;
export const authReducer = authSlice.reducer;
