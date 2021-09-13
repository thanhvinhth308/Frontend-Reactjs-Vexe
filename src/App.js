import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import seatApi from "./api/seat";
import AuthRouter from "./components/AuthRouter";
import Footer from "./components/Footer";
import Header from "./components/header";
import HomePage from "./components/HomePage";
import PrivateRouter from "./components/PrivateRouter";
import Profile from "./components/Profile";
import AdminFeature from "./features/Admin";
import CartItemList from "./features/Cart/CartItemList";
import { setInitialValue } from "./features/Cart/CartSlice";
import ProductFeature from "./features/Product";

function App() {
  const userId = useSelector((state) => state.user.current.id);
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = async () => {
      const cartItems = await seatApi.getByUserId(userId);
      const action = setInitialValue(cartItems);
      dispatch(action);
    };
    getUser();
  }, [userId]);

  return (
    <div className="App">
      <Header />
      <Switch>
        <AuthRouter path={`/`} exact component={HomePage} />
        <PrivateRouter path={`/cart`} exact component={CartItemList} />
        <PrivateRouter path={`/admin`} exact component={AdminFeature} />
        <PrivateRouter path={`/products`} component={ProductFeature} />
        <PrivateRouter path={`/profile`} component={Profile} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
