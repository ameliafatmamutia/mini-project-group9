import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slice/index'

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;