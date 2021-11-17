// ADMINS
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
import { HeroCarouselPage } from "../Views/Admin/HeroCarouselPage";
import { AllAdminPage } from "../Views/Admin/AllAdminPage";
import { UserProfilePage } from "../Views/Admin/UserProfilePage";
import { TrendingPage } from "../Views/Admin/TrendingPage";
import { OrderItemPage } from "../Views/Admin/OrderItemPage";

import { AdPage } from "../Views/Admin/AdPage";
import CategoryPage from "../Views/Admin/CategoryPage/CategoryPage";
import CuponPage from "../Views/Admin/CuponPage/CuponPage";
import { PublisherPage } from "../Views/Admin/PublisherPage";
import { RequestedBooksPage } from "../Views/Admin/RequestedBooksPage";
import { AuthorPage } from "../Views/Admin/AuthorPage";

const protectedRoutes = [
  {
    path: "/admin/dashboard",
    component: DashboardPage,
    exact: true,
    editor: true,
  },
  { path: "/admin/orders", component: OrdersPage, exact: true },
  { path: "/admin/users", component: UsersPage, exact: true },
  { path: "/admin/new", component: NewBookPage, exact: true, editor: true },
  { path: "/admin/blog", component: BlogPage, exact: true, editor: true },
  { path: "/admin/category", component: CategoryPage, exact: true },
  { path: "/admin/author", component: AuthorPage, exact: true },
  { path: "/admin/cupon", component: CuponPage, exact: true },
  { path: "/admin/best", component: BestSeller, exact: true },
  { path: "/admin/new-arrivals", component: NewArrivalPage, exact: true },
  { path: "/admin/on-sale", component: OnSaleAdmin, exact: true },
  { path: "/admin/trending", component: TrendingPage, exact: true },
  { path: "/admin/requested", component: RequestedBooksPage, exact: true },
  { path: "/admin/pre-order", component: PreOrderAdmin, exact: true },
  { path: "/admin/new-admin", component: AddAdminPage, exact: true },
  { path: "/admin/all-admin", component: AllAdminPage, exact: true },
  { path: "/admin/hero", component: HeroCarouselPage, exact: true },
  { path: "/admin/publisher", component: PublisherPage, exact: true },
  { path: "/admin/ad", component: AdPage, exact: true },
  { path: "/admin/orders/:id", component: OrderItemPage, exact: true },
  { path: "/admin/users/:id", component: UserProfilePage, exact: true },
  { path: "/admin/edit/:id", component: AddAdminPage, exact: true },
  {
    path: "/admin/book/:id",
    component: NewBookPage,
    exact: true,
    editor: true,
  },
];

export default protectedRoutes;
