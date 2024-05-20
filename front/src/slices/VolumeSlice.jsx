
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from "../../config"


export const fetchVolumeDetails = createAsyncThunk(
  'volume/fetchVolumeDetails',
  async (volumeID, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${config.backend}/volume/${volumeID}`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Erreur lors du chargement des détails du volume');
    }
  }
);

const volumeSlice = createSlice({
  name: 'volume',
  initialState: {
    details: null,
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVolumeDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVolumeDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details = action.payload;
      })
      .addCase(fetchVolumeDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default volumeSlice.reducer;
