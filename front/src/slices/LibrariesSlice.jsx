
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';

export const fetchLibraries = createAsyncThunk(
  'libraries/fetchLibraries',
  async (userID, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${config.backend}/classes/user/${userID}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

const librariesSlice = createSlice({
  name: 'libraries',
  initialState: {
    items: [],
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLibraries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLibraries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchLibraries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default librariesSlice.reducer;
