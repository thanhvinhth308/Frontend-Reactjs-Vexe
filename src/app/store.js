import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../features/Auth/userSlice'
import cartReducer from '../features/Cart/CartSlice'
const rootReducer={
    user:userReducer,
    cart:cartReducer
}
const store= configureStore({
  reducer: rootReducer,
})
export default store