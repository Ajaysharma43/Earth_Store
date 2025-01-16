import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  ID: "", // Correct initial state type
};

// Create the slice
const idSlice = createSlice({
  name: "ID",
  initialState,
  reducers: {
    setID: (state, action) => {
      state.ID = action.payload; // Update the state properly
      console.log(action.payload);
    },
  },
});


export const { setID } = idSlice.actions;


export default idSlice.reducer;
