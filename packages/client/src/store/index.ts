import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import thunk from 'redux-thunk';
import { useDispatch } from 'react-redux';



const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: [thunk]
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();


export default store;
