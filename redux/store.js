// store.js
import { configureStore } from "@reduxjs/toolkit";
import savedPlacesReducer from "./savedPlacesSlice";

export const store = configureStore({
  reducer: {
    savedPlaces: savedPlacesReducer,
  },
});
