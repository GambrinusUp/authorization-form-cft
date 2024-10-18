import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { createOTPResponse, User } from '../../utils/types';
import { createOTP, signIn } from './AuthActionCreators';

export interface AuthState {
  user: User;
  token: string;
  isLoggedIn: boolean;
  code: string;
  error: string;
  retryDelay: number;
}

const initialState: AuthState = {
  user: {
    _id: '',
    phone: '',
    firstname: '',
    lastname: '',
    middlename: '',
    email: '',
    city: '',
  },
  token: '',
  isLoggedIn: false,
  code: '',
  error: '',
  retryDelay: -1,
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearRetry(state) {
      state.retryDelay = -1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOTP.pending, (state) => {
        state.error = '';
        state.retryDelay = -1;
      })
      .addCase(
        createOTP.fulfilled,
        (state, action: PayloadAction<createOTPResponse>) => {
          state.retryDelay = action.payload.retryDelay;
        }
      )
      .addCase(createOTP.rejected, (state, action) => {
        state.error = action.payload ?? 'Ошибка получения данных';
        state.retryDelay = -1;
      })
      .addCase(signIn.pending, (state) => {
        state.error = '';
      })
      .addCase(
        signIn.fulfilled,
        (
          state,
          action: PayloadAction<{
            success: boolean;
            user: Partial<User>;
            token: string;
          }>
        ) => {
          state.user = { ...state.user, ...action.payload.user };
          state.token = action.payload.token;
          state.retryDelay = -1;
          state.isLoggedIn = true;
        }
      )
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.payload ?? 'Ошибка получения данных';
        state.error = 'Неправильный отп код';
      });
  },
});

export const { clearRetry } = AuthSlice.actions;

export default AuthSlice.reducer;
