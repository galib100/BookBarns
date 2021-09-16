import { BestSeller } from "../Views/Admin/BestSeller";
import { BlogPage } from "../Views/Admin/BlogPage";
import { DashboardPage } from "../Views/Admin/DashboardPage";
import { NewArrivalPage } from "../Views/Admin/NewArrivalPage";
import { NewBookPage } from "../Views/Admin/NewBookPage";
import { OnSalePage as OnSaleAdmin } from "../Views/Admin/OnSalePage";
import { OrdersPage } from "../Views/Admin/OrdersPage";
import { PreOrderPage as PreOrderAdmin } from "../Views/Admin/PreOrderPage";
import { UsersPage } from "../Views/Admin/UsersPage";
import { AddAdminPage } from "../Views/Admin/AddAdminPage";
import { LandingPage } from "../Views/Viewer/LandingPage";
import { About_us } from "../Views/Viewer/About_us";
import { Contact_us } from "../Views/Viewer/Contact_us";
import { Blog_page } from "../Views/Viewer/Blog_page";
import { CartPage } from "../Views/Viewer/CartPage";
import { EmptyCartPage } from "../Views/Viewer/EmptyCartPage";
import { ErrorPage } from "../Views/Viewer/ErrorPage";
import { BookDetailPage } from "../Views/Viewer/BookDetailsPage";
import { ObosorBestsPage } from "../Views/Viewer/ObosorBestsPage";
import { NewArrivalsPage } from "../Views/Viewer/NewArrivalsPage";
import { OnSalePage } from "../Views/Viewer/OnSalePage";
import { PreOrderPage } from "../Views/Viewer/PreOrderPage";
import { HeroCarouselPage } from "../Views/Admin/HeroCarouselPage";
import { AllAdminPage } from "../Views/Admin/AllAdminPage";
import { UserProfilePage } from "../Views/Admin/UserProfilePage";
import { TrendingPage } from "../Views/Admin/TrendingPage";
import { OrderItemPage } from "../Views/Admin/OrderItemPage";
import { LoginPage } from "../Views/Admin/LoginPage";
import {VTredingPage} from "../Views/Viewer/VTredingPage/";

const routes = [
  {
    path: "/",
    component: LandingPage,
    exact: true,
  },
  {
    path: "/About",
    component: About_us,
    exact: true,
  },
  {
    path: "/Contact",
    component: Contact_us,
    exact: true,
  },
  {
    path: "/Blog",
    component: Blog_page,
    exact: true,
  },
  {
    path: "/BookDetails",
    component: BookDetailPage,
    exact: true,
  },
  {
    path: "/Cart",
    component: CartPage,
    exact: true,
  },
  {
    path: "/EmptyCart",
    component: EmptyCartPage,
    exact: true,
  },
  {
    path: "/BestSeller",
    component: ObosorBestsPage,
    exact: true,
  },
  {
    path: "/NewArrivals",
    component: NewArrivalsPage,
    exact: true,
  },
  {
    path: "/OnSale",
    component: OnSalePage,
    exact: true,
  },
  {
    path: "/Preorder",
    component: PreOrderPage,
    exact: true,
  },
  {
    path: "/Trending",
    component: VTredingPage,
    exact: true,
  },
  {
    path: "/admin/login",
    component: LoginPage,
    exact: true,
  },

  {
    path: "/admin/dashboard",
    component: DashboardPage,
    exact: true,
  },
  {
    path: "/admin/orders",
    component: OrdersPage,
    exact: true,
  },
  {
    path: "/admin/orders/:id",
    component: OrderItemPage,
    exact: true,
  },
  {
    path: "/admin/users",
    component: UsersPage,
    exact: true,
  },
  {
    path: "/admin/users/:id",
    component: UserProfilePage,
    exact: true,
  },
  {
    path: "/admin/new",
    component: NewBookPage,
    exact: true,
  },
  {
    path: "/admin/blog",
    component: BlogPage,
    exact: true,
  },
  {
    path: "/admin/best",
    component: BestSeller,
    exact: true,
  },
  {
    path: "/admin/new-arrivals",
    component: NewArrivalPage,
    exact: true,
  },
  {
    path: "/admin/on-sale",
    component: OnSaleAdmin,
    exact: true,
  },
  {
    path: "/admin/trending",
    component: TrendingPage,
    exact: true,
  },
  {
    path: "/admin/pre-order",
    component: PreOrderAdmin,
    exact: true,
  },
  {
    path: "/admin/new-admin",
    component: AddAdminPage,
    exact: true,
  },
  {
    path: "/admin/all-admin",
    component: AllAdminPage,
    exact: true,
  },
  {
    path: "/admin/edit/:id",
    component: AddAdminPage,
    exact: true,
  },
  {
    path: "/admin/book/:id",
    component: NewBookPage,
    exact: true,
  },
  {
    path: "/admin/hero",
    component: HeroCarouselPage,
    exact: true,
  },
  {
    path: "*",
    component: ErrorPage,
  },
];

export default routes;
