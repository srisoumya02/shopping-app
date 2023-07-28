import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "../Redux/reducers/CartReducer";
import {wishListReducer} from "./reducers/WishListReducer";

const rootReducer = combineReducers({
  cart:cartReducer,
  wishlist:wishListReducer
});

const store = createStore(rootReducer,applyMiddleware(thunk));

export default store;



