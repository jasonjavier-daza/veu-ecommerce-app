import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductView from '../views/ProductView.vue';
import CartView from '../views/CartView.vue';
import CheckoutView from '../views/CheckoutView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import ProfileView from '../views/ProfileView.vue';
import OrderHistoryView from '../views/OrderHistoryView.vue';
import AdminDashboardView from '../views/AdminDashboardView.vue';
import ProductManageView from '../views/ProductManageView.vue';
import BrandsView from '../views/BrandsView.vue';
import CategoriesView from '../views/CategoriesView.vue';
import UsersView from '../views/UsersView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/product', component: ProductManageView },
  { path: '/product/:id', component: ProductView },
  { path: '/cart', component: CartView },
  { path: '/checkout', component: CheckoutView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/profile', component: ProfileView },
  { path: '/order-history', component: OrderHistoryView },
  { path: '/brands', component: BrandsView },
  { path: '/categories', component: CategoriesView },
  { path: '/users', component: UsersView },
  { path: '/admin', component: AdminDashboardView },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;