import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../core/api/ApiClient'


interface AuthState {
  id: number | null;
  firstName: string;
  secondName: string;
  displayName: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
  isLoggedIn: boolean;
}


const initialState: AuthState = {
  id: null,
  firstName: '',
  secondName: '',
  displayName: '',
  login: '',
  email: '',
  phone: '',
  avatar: '',
  isLoggedIn: false,
};

interface LoginData {
  login: string;
  password: string;
}
// TODO: вынести в env, либо на сервер
const url = `https://ya-praktikum.tech/api/v2`;
const client = new ApiClient(url)

export const fetchLogin = createAsyncThunk(
  'auth/login',
  async (loginData: LoginData, thunkAPI) => {
    try {
      const response = await client.post('/auth/signin', loginData);
      return response.data as AuthState;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as any).message });
    }
  }
);

export const checkAuth = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, thunkAPI) => {
    try {
      const response = await client.get('/auth/user');
      return response.data as AuthState;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as any).message });
    }
  }
);

export const fetchLogout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const response = await client.post('/auth/logout', {});
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as any).message });
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.fulfilled, (state, action: PayloadAction<AuthState>) => {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.secondName = action.payload.secondName;
      state.displayName = action.payload.displayName;
      state.login = action.payload.login;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.avatar = action.payload.avatar;
      state.isLoggedIn = true;
    })
    .addCase(checkAuth.fulfilled, (state, action: PayloadAction<AuthState>) => {
      if (action.payload) {
        state.id = action.payload.id;
        state.firstName = action.payload.firstName;
        state.secondName = action.payload.secondName;
        state.displayName = action.payload.displayName;
        state.login = action.payload.login;
        state.email = action.payload.email;
        state.phone = action.payload.phone;
        state.avatar = action.payload.avatar;
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    })
    .addCase(fetchLogout.fulfilled, (state) => {
      state.id = null;
      state.firstName = '';
      state.secondName = '';
      state.displayName = '';
      state.login = '';
      state.email = '';
      state.phone = '';
      state.avatar = '';
      state.isLoggedIn = false;
    })
    .addCase(fetchLogout.rejected, (state) => {
      console.error('Logout failed');
    })
    .addCase(fetchLogin.rejected, (state) => {
      state.isLoggedIn = false;
    })
    .addCase(checkAuth.rejected, (state) => {
      state.isLoggedIn = false;
    });
  }
});

export default authSlice.reducer;
