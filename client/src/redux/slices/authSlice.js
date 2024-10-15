import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, logoutUser } from '../actions/authAction.js';

const loadAuthState = () => {
  
    const serializedState = localStorage.getItem('auth');
    if (!serializedState) {
      return {
        user: null,
        token: null,
        isLoading: false,
        error: null,
      };
    }
    return JSON.parse(serializedState);
};

const saveAuthState = (state) => {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('auth', serializedState);
};

const authSlice = createSlice({
  name: 'auth',
  initialState:loadAuthState(),
  reducers: { },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading=false
      state.error=null
      saveAuthState(state);
    });
    builder.addCase(loginUser.pending,(state)=>{state.isLoading=true,state.error=null})
    builder.addCase(loginUser.rejected,(state,action)=>{
      console.log(action)
      state.isLoading=false
      state.error=action.payload
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading=false
      state.error=null
      saveAuthState(state);
    });
    builder.addCase(registerUser.pending,(state)=>{state.isLoading=true,state.error=null})
    builder.addCase(registerUser.rejected,(state,action)=>{
      state.error=action.payload
      state.isLoading=false
    })
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('auth');
    });
  },
});

export default authSlice.reducer;
