import { combineReducers } from "redux";
import {
  productCategoriesReducer,
  allProductReducer,
  singleProductReducer,
} from "./productReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  products: allProductReducer,
  singleProduct: singleProductReducer,
  productCategories: productCategoriesReducer,
  user: userReducer,
});

export default rootReducer;
