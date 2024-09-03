import { createSlice } from "@reduxjs/toolkit";

export const savedPlacesSlice = createSlice({
  name: "savedPlaces",
  initialState: [],
  reducers: {
    addPlaceToSaved: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addPlaceToSaved } = savedPlacesSlice.actions;

export default savedPlacesSlice.reducer;
