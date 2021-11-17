import { LoginPage } from "../Views/Admin/LoginPage";

// VIEWERS
import { LandingPage } from "../Views/Viewer/LandingPage";
import { Contact_us } from "../Views/Viewer/Contact_us";
import { Blog_page } from "../Views/Viewer/Blog_page";
import { CartPage } from "../Views/Viewer/CartPage";
import About_us from "../Views/Viewer/About_us/About_us";
import BookDetail from "../Components/Viewer/Book/BookDetail";
import ViewBooks from "../Views/Viewer/ViewBooks/ViewBooks";
import OrderTracking from "../Components/Viewer/Orders/OrderTracking";
import WishlistPage from "../Views/Viewer/Wishlist/WishlistPage";
import Publisher from "../Views/Viewer/Publisher/Publisher";
import Profile from "../Views/Viewer/Profile/Profile";
import Categories from "../Views/Viewer/Categories/Categories";
import Category from "../Views/Viewer/Categories/Category";
import BlogDetailsPage from "../Views/Viewer/Blog_page/BlogDetailsPage";
import FilteredBookForAPublisher from "../Views/Viewer/Publisher/FilteredBookForAPublisher";
import ViewFilteredBook from "../Views/Viewer/ViewBooks/ViewFilteredBook";

const routes = [
  // VIEWR SITE ROUTERS
  { path: "/", component: LandingPage, exact: true },
  { path: "/About", component: About_us, exact: true },
  { path: "/Contact", component: Contact_us, exact: true },
  { path: "/blog", component: Blog_page, exact: true },
  { path: "/blog/:blogID", component: BlogDetailsPage, exact: true },
  { path: "/Book/:bookID", component: BookDetail, exact: true },
  { path: "/Cart", component: CartPage, exact: true },
  { path: "/wishlist", component: WishlistPage, exact: true },
  { path: "/BestSeller", component: ViewBooks, exact: true },
  { path: "/NewArrivals", component: ViewBooks, exact: true },
  { path: "/ExtraDiscount", component: ViewBooks, exact: true },
  { path: "/Preorder", component: ViewBooks, exact: true },
  { path: "/Trending", component: ViewBooks, exact: true },
  { path: "/publisher", component: Publisher, exact: true },
  {
    path: "/publisher/:name",
    component: FilteredBookForAPublisher,
    exact: true,
  },
  {
    path: "/genre/:name",
    component: ViewFilteredBook,
    exact: true,
  },
  {
    path: "/author/:name",
    component: ViewFilteredBook,
    exact: true,
  },
  { path: "/profile", component: Profile, exact: true },
  { path: "/order/:id", component: OrderTracking, exact: true },
  { path: "/categories", component: Categories, exact: true },
  { path: "/category/:name", component: Category, exact: true },
  { path: "/sub-category/:name", component: Category, exact: true },
  // { path: "*", component: ErrorPage },

  // ADMIN SITE ROUTERS
  { path: "/admin/login", component: LoginPage, exact: true },
];

export default routes;
