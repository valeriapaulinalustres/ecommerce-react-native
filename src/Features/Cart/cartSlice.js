import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'Cart',
  initialState: {
    value: {
      user: 'Hardcoder user',
      updatedAt: '',
      total: null,
      items: [],
    },
  },
  reducers: {
    addCartItem: (state, action) => {
      const productExists = state.value.items.some(
        (item) => item.id === action.payload.id
      );

      if (productExists) {
        state.value.items = state.value.items.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity += action.payload.quantity;
            return item;
          }
          return item;
        });
      } else state.value.items.push(action.payload);

      //Update total
      state.value.total = state.value.items.reduce(
        (acc, currentItem) => (acc += currentItem.price * currentItem.quantity),
        0
      );

      //Update updatedAt
      state.value.updatedAt = new Date().toLocaleString();
    },
    removeCartItem: (state, action) => {
      const productExists = state.value.items.find(
        (item) => item.id === action.payload.id
      );
      console.log(productExists);

      if (productExists) {
        if (productExists.quantity >= 2) {
          state.value.items = state.value.items.map((item) => {
            if (item.id === action.payload.id) {
              item.quantity -= action.payload.quantity;
              return item;
            }
            return item;
          });
          console.log('cart + de 2', state.value.items);
        } else {
          const index = state.value.items.findIndex(
            (el) => el.id === action.payload.id
          );
          state.value.items.splice(index, 1);
          console.log('cart con 1', state.value.items);
        }
      }

      //Update total
      state.value.total = state.value.items.reduce(
        (acc, currentItem) => (acc += currentItem.price * currentItem.quantity),
        0
      );

      //Update updatedAt
      state.value.updatedAt = new Date().toLocaleString();
    },
    deleteProduct: (state, action) => {
      const productExists = state.value.items.find(
        (item) => item.id === action.payload.id
      );
      console.log(productExists);

      if (productExists) {
        const index = state.value.items.findIndex(
          (el) => el.id === action.payload.id
        );
        state.value.items.splice(index, 1);
        console.log('cart entra a delete', state.value.items);
      } else {
        console.log('This product is not in the cart');
      }

      //Update total
      state.value.total = state.value.items.reduce(
        (acc, currentItem) => (acc += currentItem.price * currentItem.quantity),
        0
      );

      //Update updatedAt
      state.value.updatedAt = new Date().toLocaleString();
    },
    deleteCart: (state) => {
      state.value.items = [];
      state.value.total = 0;
    },
  },
});

export const { addCartItem, removeCartItem, deleteProduct, deleteCart } =
  cartSlice.actions;

export default cartSlice.reducer;
