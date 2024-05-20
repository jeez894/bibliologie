import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    query: ''
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.results = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    }
  },
});


export const { setSearchResults, setQuery } = searchSlice.actions;


export default searchSlice.reducer;
