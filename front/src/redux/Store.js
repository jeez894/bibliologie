import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/UserSlice";
import searchReducer from '../slices/SearchSlice';
import volumeReducer from '../slices/VolumeSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    volume: volumeReducer,

  },
});

export default store;
