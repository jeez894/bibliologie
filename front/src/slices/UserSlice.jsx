import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiVerifyToken } from '../api/UserAPI'; 

export const verifyToken = createAsyncThunk(
    'user/verifyToken',
    async (_, thunkAPI) => {
      const token = localStorage.getItem('b4y-token'); 
      if (!token) return thunkAPI.rejectWithValue('No token found');
      try {
        const response = await apiVerifyToken(token); 
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
);

const initialState = {
    infos: {},
    isLogged: !!localStorage.getItem('b4y-token'),
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        connectUser: (state, action) => {
            state.infos = action.payload
            state.isLogged = true
        },
        logoutUser: (state) => {
            state.infos = {}
            state.isLogged = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyToken.fulfilled, (state, action) => {
                
                state.infos = action.payload;
                state.isLogged = true;
            })
            .addCase(verifyToken.rejected, (state) => {
                
                state.infos = {}; 
                state.isLogged = false;
                localStorage.removeItem('b4y-token'); 
            });
    },
    
})

export const {connectUser, logoutUser} = userSlice.actions
export const selectUser = (state) => state.user
export default userSlice.reducer
