import { createSlice } from "@reduxjs/toolkit";

/*
SIDE NOTE:
I could use an array for this cart to make the coding
and dispatching actions easier.
I used this object for many preformance issues:
1- to be able to access
the item using its id, that will reduce the time complexity
a little for sure
2- to get the total price or pizzas without needing to loop
over the array
*/
const initialState = {
  cart: {},
  totalPizzas: 0,
  totalPrice: 0,
  // cart: {
  //   12: {
  //     pizzaId: 12,
  //     name: "Mediterranean",
  //     quantity: 2,
  //     unitPrice: 16,
  //     totalPrice: 32,
  //   },
  // },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.cart[action.payload.pizzaId] = action.payload;
    },
    deleteItem(state, action) {
      // payload: pizzaId
      delete state.cart[action.payload];
    },
    increaseItemQuantity(state, action) {
      // payload: pizzaId
      const item = state.cart[action.payload];
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // payload: pizzaId
      const item = state.cart[action.payload];
      if (item.quantity !== 1) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    clearCart(state) {
      state.cart = {};
      state.totalPizzas = 0;
      state.totalPrice = 0;
    },
    icreaseTotalPrice(state, action) {
      // payload: pizza price
      state.totalPrice += action.payload;
    },
    decreaseTotalPrice(state, action) {
      // payload: pizza price
      state.totalPrice -= action.payload;
    },
    increasePizzaCount(state, action) {
      // payload: pizza quantity
      state.totalPizzas += action.payload;
    },
    decreasePizzaCount(state, action) {
      // payload: pizza quantity
      state.totalPizzas -= action.payload;
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
  icreaseTotalPrice,
  decreaseTotalPrice,
  increasePizzaCount,
  decreasePizzaCount,
} = cartSlice.actions;

export default cartSlice.reducer;
