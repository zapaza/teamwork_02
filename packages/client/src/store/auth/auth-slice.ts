import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { AuthState, LoginData, SignupData } from '../../types/auth'
import apiAuth from '../../core/api/api-auth'
import ApiProfile, {
  UpdatePasswordReq,
  UpdateProfileReq,
} from '../../core/api/api-profile'

const initialState: AuthState = {
  id: null,
  first_name: '',
  second_name: '',
  display_name: '',
  login: '',
  email: '',
  phone: '',
  avatar: '',
  isLoggedIn: false,
  isDataLoaded: false,
}


export const fetchSignup = createAsyncThunk(
  'auth/signup',
  async (signupData: SignupData, thunkAPI) => {
    try {
      return await apiAuth.signup(signupData);
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: (error as Error | null)?.message,
      });
    }
  }
)


export const fetchLogin = createAsyncThunk(
  'auth/login',
  async (loginData: LoginData, thunkAPI) => {
    try {
      return await apiAuth.login(loginData)
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: (error as Error | null)?.message,
      })
    }
  }
)

export const checkAuth = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, thunkAPI) => {
    try {
      return await apiAuth.checkAuth()
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: (error as Error | null)?.message,
      })
    }
  }
)

export const fetchLogout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      return await apiAuth.logout()
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: (error as Error | null)?.message,
      })
    }
  }
)

export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async (data: UpdatePasswordReq, thunkAPI) => {
    try {
      return await ApiProfile.updatePassword(data)
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: (error as Error | null)?.message,
      })
    }
  }
)
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (data: UpdateProfileReq, thunkAPI) => {
    try {
      return await ApiProfile.updateProfile(data)
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: (error as Error | null)?.message,
      })
    }
  }
)

export const updateAvatar = createAsyncThunk(
  'auth/updateAvatar',
  async (data: FormData, thunkAPI) => {
    try {
      return await ApiProfile.updateAvatar(data)
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: (error as Error | null)?.message,
      })
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadData: state => {
      //TODO в зависимости от логики можно будет переместить в extraReducers
      state.isDataLoaded = true
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        fetchLogin.fulfilled,
        (state, action: PayloadAction<AuthState>) => {
          state.id = action.payload.id
          state.first_name = action.payload.first_name
          state.second_name = action.payload.second_name
          state.display_name = action.payload.display_name
          state.login = action.payload.login
          state.email = action.payload.email
          state.phone = action.payload.phone
          state.avatar = action.payload.avatar
          state.isLoggedIn = true
        }
      )
      .addCase(
        checkAuth.fulfilled,
        (state, action: PayloadAction<AuthState>) => {
          if (action.payload) {
            state.id = action.payload.id
            state.first_name = action.payload.first_name
            state.second_name = action.payload.second_name
            state.display_name = action.payload.display_name
            state.login = action.payload.login
            state.email = action.payload.email
            state.phone = action.payload.phone
            state.avatar = action.payload.avatar
            state.isLoggedIn = true
          } else {
            state.isLoggedIn = false
          }
        }
      )
      .addCase(fetchLogout.fulfilled, state => {
        state.id = null
        state.first_name = ''
        state.second_name = ''
        state.display_name = ''
        state.login = ''
        state.email = ''
        state.phone = ''
        state.avatar = ''
        state.isLoggedIn = false
      })
      .addCase(
        updateProfile.fulfilled,
        (state, action: PayloadAction<AuthState>) => {
          state.id = action.payload.id
          state.first_name = action.payload.first_name
          state.second_name = action.payload.second_name
          state.display_name = action.payload.display_name
          state.login = action.payload.login
          state.email = action.payload.email
          state.phone = action.payload.phone
          state.avatar = action.payload.avatar
        }
      )
      .addCase(
        updateAvatar.fulfilled,
        (state, action: PayloadAction<AuthState>) => {
          state.id = action.payload.id
          state.first_name = action.payload.first_name
          state.second_name = action.payload.second_name
          state.display_name = action.payload.display_name
          state.login = action.payload.login
          state.email = action.payload.email
          state.phone = action.payload.phone
          state.avatar = action.payload.avatar
        }
      )
      .addCase(fetchLogout.rejected, state => {
        console.error('Logout failed')
      })
      .addCase(fetchLogin.rejected, state => {
        state.isLoggedIn = false
      })
      .addCase(checkAuth.rejected, state => {
        state.isLoggedIn = false
      })
      .addCase(updateProfile.rejected, state => {
        console.error('Update profile failed')
      })
      .addCase(updatePassword.rejected, state => {
        console.error('Update password failed')
      })
      .addCase(updateAvatar.rejected, state => {
        console.error('Update avatar failed')
      })
  },
})

export default authSlice.reducer
