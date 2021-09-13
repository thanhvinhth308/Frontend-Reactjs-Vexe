//tính toán một cái gì đó phụ thuộc vào một redux,có thể xem là một redux va lấy bằng useSelector(cartItemsCountSelector),useSelector(cartTotalSelector)

import { createSelector } from "@reduxjs/toolkit";
const cartItemsSelector = (state) => state.cart.cartItems; //đi từ root,tao cai phu thuoc selector
//count number product in cart,tao selector
export const cartItemsCountSelector = createSelector(cartItemsSelector, (cartItems) =>
  cartItems.reduce((count, item) => count+item.quantity, 0)
);
//calculate total of cart,tao selector
export const cartTotalSelector = createSelector(cartItemsSelector, (cartItems) =>
  cartItems.reduce((total, item) => total+item.product.salePrice*item.quantity, 0)
  // {console.log(cartItems)}
);
