import { configureStore } from "@reduxjs/toolkit"
import Component, { componentData } from "../types"
import userReducer from "./userSlice"
import filterReducer from "./filtersSlices"
import cartReducer from "./cartSlice"


export interface RootState {
  user: {
    user_id: BigInteger
    user_email: string
    is_authenticated: boolean
    is_moderator: boolean
    current_cart: number
    // l:number
  }
  filter: {
    price_range: number[]
    input_value: string
    dropdown_value: Component
    components: componentData[]
  }
  cart: {
    items: componentData[]
  }

}

const store = configureStore({
  reducer: {
    user: userReducer,
    filter: filterReducer,
    cart: cartReducer,

  },
})

export default store

