import { createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI } from '../../api/authAPI';
import { getErrorMessage } from '../../helpers/getErrorMessage';
import { authResponse, createOTPResponse } from '../../utils/types';

export const createOTP = createAsyncThunk<
  createOTPResponse,
  { phone: string },
  { rejectValue: string }
>('authSlice/createOTP', async ({ phone }, { rejectWithValue }) => {
  try {
    const response = await authAPI.createOTP(phone);
    return response;
  } catch (e) {
    return rejectWithValue(getErrorMessage(e));
  }
});

export const signIn = createAsyncThunk<
  authResponse,
  { phone: string; code: number },
  { rejectValue: string }
>('authSlice/signIn', async ({ phone, code }, { rejectWithValue }) => {
  try {
    const response = await authAPI.signIn(phone, code);
    return response;
  } catch (e) {
    return rejectWithValue(getErrorMessage(e));
  }
});
