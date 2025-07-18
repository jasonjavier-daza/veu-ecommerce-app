import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

// Cliente
import HomeView from "../views/HomeView.vue";
import ProductView from "../views/ProductView.vue";
import CartView from "../views/CartView.vue";
import CheckoutView from "../views/CheckoutView.vue";
import ProfileView from "../views/ProfileView.vue";
import OrderHistoryView from "../views/OrderHistoryView.vue";
import TrackingView from "../views/TrackingView.vue";

// Admin
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import AdminDashboardView from "../views/AdminDashboardView.vue";
import ProductManageView from "../views/ProductManageView.vue";
import BrandsView from "../views/BrandsView.vue";
import CategoriesView from "../views/CategoriesView.vue";
import UsersView from "../views/UsersView.vue";

const routes = [
  // PÚBLICAS
  { path: "/", component: HomeView },
  { path: "/product/:id", component: ProductView },
  { path: "/cart", component: CartView },
  { path: "/checkout", component: CheckoutView },
  { path: "/tracking", component: TrackingView },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },

  // ADMIN PROTEGIDAS
  {
    path: "/admin",
    component: AdminDashboardView,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/admin/productos",
    component: ProductManageView,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/admin/categorias",
    component: CategoriesView,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/admin/marcas",
    component: BrandsView,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/admin/usuarios",
    component: UsersView,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/admin/profile",
    component: ProfileView,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/admin/order-history",
    component: OrderHistoryView,
    meta: { requiresAuth: true, role: "admin" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware de protección
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  const userRole = store.state.user?.role;

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      return next("/login");
    }

    if (to.meta.role && to.meta.role !== userRole) {
      return next("/"); // Si no tiene permisos, redirige a Home
    }
  }

  next();
});

export default router;
