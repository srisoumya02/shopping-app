import {createStore,combineReducers} from "redux";
import { cartReducer } from "../Redux/reducers/CartReducer";
import {wishListReducer} from "./reducers/WishListReducer";

const rootReducer = combineReducers({
  cart:cartReducer,
  wishlist:wishListReducer
});

const store = createStore(rootReducer);

export default store;