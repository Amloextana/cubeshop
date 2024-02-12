import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { componentData } from "../types"


interface cartData {
  items: componentData[]
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  } as cartData,
  reducers: {
    setCart: (state, action: PayloadAction<componentData[]>) => {
      state.items = action.payload
    },
    addItem: (state, action: PayloadAction<componentData>) => {
      state.items.push(action.payload)
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload)
    },
  },
})

export const { setCart, addItem, removeItem } = cartSlice.actions

export default cartSlice.reducer
