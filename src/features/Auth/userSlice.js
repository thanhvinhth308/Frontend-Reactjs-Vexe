// import { JSON } from "express"
import userApi from "../../api/userApi";
import StorageKeys from "../../constants/storage-keys";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const register = createAsyncThunk(
  "users/register", //action type
  async (payload, thunkApi) => {
    //call api to register
    const data = await userApi.register(payload);
    console.log("🚀 ~ file: userSlice.js ~ line 21 ~ data", data);
    return "vinh";
  }
);
export const login = createAsyncThunk(
  "users/login", //action type
  async (payload, thunkApi) => {
    //thunkApi có thể dispatch một action khác
    //call api to register
    const data = await userApi.login(payload);
    console.log("🚀 ~ file: userSlice.js ~ line 21 ~ data", data);
    // console.log("payload", data);
    //save data to local storage
    localStorage.setItem(StorageKeys.TOKEN, data.token);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
    return "vinh";
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || { id: null },
    setting: {},
  },
  reducers: {
    logout(state, action) {
      //clear localstorage
      state.isLoading = true;
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);
      state.current = {};
      // state.current.isLoading = false;
    },
  },
  extraReducers: {
    // 'users/register.fulfilled':()=>{}
    [register.fulfilled]: (state, action) => {
      // console.log(action.payload)
      //   state.current=action.payload//action.payload là cái return về trong ham regiter
    },
    [register.rejected]: (state, action) => {
      // console.log(action.payload)
      //   state.current=action.payload//action.payload là cái return về trong ham regiter
      console.log("vinh");
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload.user; //action.payload là cái return về trong ham regiter
    },
  },
});

// Action creators are generated for each case reducer function
const { actions, reducer } = userSlice;
export default reducer;
export const { logout } = actions;
