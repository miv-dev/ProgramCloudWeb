import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ITokenSession, IUser } from '../api/types';

interface IUserState {
  user: IUser | null;
  token: ITokenSession | null;
}

const initialState: IUserState = {
  user: null,
  token: null
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setToken:(state , action)=>{
      state.token = action.payload
    }
  },
});

export default userSlice.reducer;

export const { logout, setUser, setToken } = userSlice.actions;