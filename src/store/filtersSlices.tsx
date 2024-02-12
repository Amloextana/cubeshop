import { createSlice } from "@reduxjs/toolkit";
import Component from "../types";


const initialState = {
  price_range: [0, 10000],
  input_value: "",
  dropdown_value: {
    id: 0,
    name: "Любая категория",
  },
  components: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setComponents(state, action) {
      state.components = action.payload;
    },
    setInputValue(state, action) {
      state.input_value = action.payload;
    },
    setDropdownValueId(state, action) {
      state.dropdown_value.id = action.payload;
    },
    setDropdownValueName(state, action) {
      state.dropdown_value.name = action.payload;
    },
    setSliderValue(state, action) {
      state.price_range = action.payload;
    },
  },
});

export const {
  setSliderValue,
  setDropdownValueId,
  setDropdownValueName,
  setInputValue,
  setComponents,
} = filterSlice.actions;
export default filterSlice.reducer;
