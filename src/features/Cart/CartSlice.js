const { createSlice } = require("@reduxjs/toolkit");
// const userId=useSelector(state=>state.user.current.id)
const CartSlice = createSlice({
  name: "cart",
  initialState: {
    showMiniCart: false,
    cartItems: [],
    // cartItems:seatApi.getByUserId(userId) || [],
  },
  reducers: {
    resetCart(state, action) {
      state.cartItems = [];
    },
    setInitialValue(state, action) {
      state.cartItems = action.payload;
    },
    addToCart(state, action) {
      //newItem={id,product,quantity}
      const newItem = action.payload;
      const cartItemList = [...state.cartItems, newItem];
      state.cartItems = cartItemList;
    },

    removeFromCart(state, action) {
      const idNeedToRemove = action.payload;
      state.cartItems = state.cartItems.filter((x) => x.id !== idNeedToRemove);
    },
  },
});

// Action creators are generated for each case reducer function
const { actions, reducer } = CartSlice;
export default reducer;
export const {
  addToCart,
  removeFromCart,
  setInitialValue,
  resetCart,
} = actions;
