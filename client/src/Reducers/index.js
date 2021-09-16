import { combineReducers } from "redux";
import Viewer from "./Viewer/Viewer";
import AdminPages from "./Admin/AdminPage";
import UsersAdminPage from "./Admin/UsersAdminPage";
import BooksPage from "./Admin/BooksPage";
import OrdersAdminPage from "./Admin/OrdersAdminPage";

const reducers = combineReducers({
  pages: Viewer,
  admin_page: AdminPages,
  user_admin_page: UsersAdminPage,
  admin_book_page: BooksPage,
  admin_orders: OrdersAdminPage,
});
export default reducers;
