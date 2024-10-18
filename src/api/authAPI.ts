import { API } from '../utils/constants';
import { authResponse, createOTPResponse } from '../utils/types';

async function createOTP(phone: string): Promise<createOTPResponse> {
  try {
    const response = await fetch(`${API}/auth/otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Ошибка при создании кода:', error);
    throw error;
  }
}

async function signIn(phone: string, code: number): Promise<authResponse> {
  try {
    const response = await fetch(`${API}/users/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone,
        code,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Ошибка при авторизации:', error);
    throw error;
  }
}

export const authAPI = {
  createOTP: createOTP,
  signIn: signIn,
};
