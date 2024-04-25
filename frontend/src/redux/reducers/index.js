import { combineReducers } from "redux";
import {
  productCategoriesReducer,
  allProductReducer,
  singleProductReducer,
  addProductReviewsReducer,
  adminProductReducer,
  adminReviewsReducer,
} from "./productReducer";
import {
  adminUsersReducer,
  changePasswordReducer,
  getAllUsersReducer,
  profileReducer,
  userReducer,
} from "./userReducer";
import { cartReducer } from "./cartReducer";
import {
  adminOrderReducer,
  allOrdersReducer,
  myOrderReducer,
  newOrderReducer,
  orderDetailsReducer,
} from "./orderReducer";

const rootReducer = combineReducers({
  products: allProductReducer,
  singleProduct: singleProductReducer,
  productCategories: productCategoriesReducer,
  user: userReducer,
  productReviews: addProductReviewsReducer,
  profileUpdate: profileReducer,
  changePassword: changePasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  orders: myOrderReducer,
  orderDetails: orderDetailsReducer,
  // allOrders: allOrdersReducer,
  adminUser: adminUsersReducer,
  adminProduct: adminProductReducer,
  adminOrders: adminOrderReducer,
  adminReview: adminReviewsReducer,
});

export default rootReducer;
