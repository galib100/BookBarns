import { combineReducers } from "redux";
import Viewer from "./Viewer/Viewer";
import AdminPages from "./Admin/AdminPage";
import UsersAdminPage from "./Admin/UsersAdminPage";
import BooksPage from "./Admin/BooksPage";
import OrdersAdminPage from "./Admin/OrdersAdminPage";
import BookController from "./Viewer/Book";
import userReducer from "./Viewer/UserReducer";
import Auth from "./Admin/Auth";
import BlogsPage from "./Admin/BlogsPage";
import CarouselAdmin from "./Admin/CarouselAdmin";
import AdAdmin from "./Admin/AdAdmin";
import CategoryAdmin from "./Admin/CategoryAdmin";
import CuponAdmin from "./Admin/CuponAdmin";
import PublisherAdmin from "./Admin/PublisherAdmin";
import RequestedBookAdmin from "./Admin/RequestedBookAdmin";
import AuthorAdmin from "./Admin/AuthorAdmin";

const reducers = combineReducers({
  // Viewr
  pages: Viewer,
  bookController: BookController,
  viewer: userReducer,

  // Admin
  admin_page: AdminPages,
  user_admin_page: UsersAdminPage,
  admin_book_page: BooksPage,
  admin_blog_page: BlogsPage,
  admin_orders: OrdersAdminPage,
  auth_admin: Auth,
  auth_hero: CarouselAdmin,
  auth_ad: AdAdmin,
  auth_category: CategoryAdmin,
  auth_author: AuthorAdmin,
  auth_cupon: CuponAdmin,
  auth_publisher: PublisherAdmin,
  auth_requested: RequestedBookAdmin,
});
export default reducers;
